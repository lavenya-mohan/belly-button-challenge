# Belly Button Biodiversity Dashboard

## Deployment(Deploy your app to a free static page hosting service, such as GitHub Pages):

You can view the live version of the project here: [Belly Button Biodiversity Dashboard](https://lavenya-mohan.github.io/belly-button-challenge/)


## Overview

This project is an interactive dashboard designed to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset helps visualize the diversity of microbial species (OTUs) present in individuals' belly buttons. 

The project leverages **HTML**, **D3.js**, **Plotly.js**, and **Bootstrap** for data visualization, interactivity, and responsive design.

## Features

### 1. Interactive Dropdown Menu
- A dropdown menu allows users to select a test subject ID.
- The selected ID dynamically updates all the visualizations on the dashboard, including:
  - **Top 10 Bacteria Cultures Found (Bar Chart)**
  - **Bacteria Cultures Per Sample (Bubble Chart)**
  - **Demographic Info Panel**

### 2. Horizontal Bar Chart
- Displays the top 10 OTUs for the selected test subject.
- Uses:
  - `sample_values` for the bar lengths.
  - `otu_ids` as the labels for each bar.
  - `otu_labels` as hover text.

### 3. Bubble Chart
- Visualizes all OTUs for the selected test subject.
- Uses:
  - `otu_ids` for the x-axis.
  - `sample_values` for the y-axis and bubble sizes.
  - `otu_ids` for the bubble colors.
  - `otu_labels` for hover text.

### 4. Demographic Info Panel
- Displays key demographic details (e.g., ID, ethnicity, gender, age, etc.) of the selected test subject.
- Dynamically updates based on the dropdown selection.

### 5. Responsive Design
- The layout is built using **Bootstrap**, ensuring compatibility across devices.

## Technologies Used
- **HTML**: Provides the structure of the dashboard.
- **D3.js**: Reads data from `samples.json` and manipulates DOM elements dynamically.
- **Plotly.js**: Generates bar and bubble charts for data visualization.
- **Bootstrap**: Ensures the dashboard is responsive and styled effectively.


## HTML Structure
- **Header Section**: Contains the project title and description.
- **Dropdown Menu**: Allows users to select a test subject ID.
- **Demographic Info Panel**: Displays metadata for the selected subject.
- **Charts**:
  - **Bar Chart**: Displays the top 10 OTUs for the selected ID.
  - **Bubble Chart**: Visualizes all OTUs for the selected ID.

## App JavaScript Functionality

### `buildMetadata(sample)`
- Fetches metadata for the selected sample ID and dynamically updates the **Demographic Info Panel**.

### `buildCharts(sample)`
- Reads `samples.json` and generates:
  - **Bar Chart**: Displays the top 10 OTUs for the selected ID.
  - **Bubble Chart**: Displays all OTUs with bubble size and color based on data values.

### `init()`
- Initializes the interactive dashboard by:
  - Populating the dropdown menu with sample IDs.
  - Generating charts and metadata for the first sample.

