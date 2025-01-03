// Creating variable for URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Build the metadata panel
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    // Get the metadata field
    const metadata = data.metadata;
    // Filter the metadata for the object with the desired sample number
    const resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0];
    
    // Select the panel with id of `#sample-metadata`
    const PANEL = d3.select("#sample-metadata");
    
    // Clear any existing metadata
    PANEL.html("");
    
    // Loop through each key-value in the filtered metadata
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// Function to build both charts (use same URL variable)
function buildCharts(sample) {
  d3.json(url).then((data) => {
    // Get the samples field
    const samples = data.samples;
    
    // Filter the samples for the object with the desired sample number
    const resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0];
    
    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;
    
    // Build a Bubble Chart
    const bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];
    
    // Bubble Chart Layout
    const bubbleLayout = {
      title: { 
        text: "Bacteria Cultures Per Sample",
        x: 0.5
      },
      margin: { t: 30, l: 60 },
      hovermode: "closest",
      xaxis: {
        title: "OTU ID",
        showgrid: true, // Show grid lines for better readability
        zeroline: false, // Hide the zero line
        tickmode: 'array', // Array mode for precise control of ticks
        tickvals: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500], // Custom tick values
        ticktext: ['0', '500', '1000', '1500', '2000', '2500', '3000', '3500'] // Custom tick text
      },
      yaxis: { 
        title: "Number of Bacteria"
      },
      autosize: true
    };
    
    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for yticks
    const yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();
    
    // Build a Bar Chart
    const barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    
    // Bar Chart Layout
    const barLayout = {
      title: {
        text: "Top 10 Bacteria Cultures Found",
        x: 0.5 // Center the title
      },
      margin: { t: 30, l: 60 },
      xaxis: {
        title: "Number of Bacteria",
        automargin: true,
        showgrid: true, // Show grid lines for clarity
        zeroline: false, // Hide the zero line
        tickmode: 'array', // Array mode for precise control of ticks
        tickvals: [0, 20, 40, 60, 80, 100, 120, 140, 160], // Custom tick values for bar chart
        ticktext: ['0', '20', '40', '60', '80', '100', '120', '140', '160'] // Custom tick text for bar chart
      },
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to build the dropdown menu
function init() {
  // Select the dropdown with id of `#selDataset`
  const selector = d3.select("#selDataset");
  
  d3.json(url).then((data) => {
    // Use the list of sample names to populate the select options
    const sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    const firstSample = sampleNames[0];
    
    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener when a new sample is selected
function optionChanged(newSample) {
  // Rebuild charts and metadata panel when a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
