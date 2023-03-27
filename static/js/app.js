
// Define Url in a constant varible
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Define a function to initialize the dashboard
function init() {
    // Get a reference to the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

    // Load the data from the JSON file
  d3.json(url).then(data => {
    // Get the sample names from the data
    let sampleNames = data.names;
    // Add  samples to dropdown menu
    sampleNames.forEach(id => {
      dropdownMenu.append("option")
        .text(id)
        .property("value",id);
    });

    createPlots(sampleNames[0], data);
  });
}

// Create a function to create chart
function createPlots(sample, data) {
  let sampleData = data.samples.filter(d => d.id === sample)[0];

  // Create bar chart
    // Create the trace for the bar chart
  let barDataTrace = [{
    // Get the top 10 OTUs for the selected sample
    x: sampleData.sample_values.slice(0, 10).reverse(),
    y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
    text: sampleData.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  }];
    // Define the layout for the bar chart
  let barLayout = {
    title: `Top 10 OTUs ${sample}`,
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", barDataTrace, barLayout);

  // Create bubble chart
    // Create the trace for the bubble chart
  let bubbleDataTrace = [{
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: "markers",
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: "Earth"
    }
  }];
    // Define the layout for the bubble chart
  let bubbleLayout = {
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values" }
  };

  Plotly.newPlot("bubble", bubbleDataTrace, bubbleLayout);



  // Display metadata
    // Retrieve all metadata and filtering
  let metaData = data.metadata.filter(d => d.id == sample)[0];
    // Clear out any previously displayed metadata information
  let metaDataPanel = d3.select("#sample-metadata");
  metaDataPanel.html("");
    // Returns an array of a given object's own enumerable string-keyed property [key, value] pairs to the panel
  Object.entries(metaData).forEach(([key,value]) => {
    metaDataPanel.append("h6").text(`${key}: ${value}`);
  });

    // Create gauge chart
  let wfreq = metaData.wfreq;
  let guageTrace = [
      {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: {
            text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
            font: {color: "black", size: 24}
            },
          type: "indicator",
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                      { range: [0, 2], color: "#FEF9E7" },
                      { range: [2, 4], color: "#FCF3CF" },
                      { range: [4, 6], color: "#F9E79F" },
                      { range: [6, 8], color: "#F7DC6F" },
                      { range: [8, 9], color: "#F4D03F" }
                    ]

                  }
      }
    ];
  let guageLayout = { 
            width: 700, 
            height: 600, 
            margin: { t: 0, b: 0 } 
    };
  Plotly.newPlot("gauge", guageTrace, guageLayout);
}

// Create function that updates dashboard when sample is changed
function optionChanged(value) {
  d3.json(url).then(data => {
    createPlots(value, data);
  });
}

// Call the initial function
init();
