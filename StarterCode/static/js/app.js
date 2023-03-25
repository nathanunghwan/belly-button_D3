// Define Url in a let varible
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
})
// Define a function to initialize the dashboard
function init() {

    // Get a reference to the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Load the data from the JSON file
    d3.json(url).then((data) => {
        
        // Get the sample names from the data
        let sampleNames = data.names;

        // Add  samples to dropdown menu
        sampleNames.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let firstSample = sampleNames[0];

        // Create the initial plots
        createBarchart(firstSample);
        createMetadata(firstSample);
        createBubbleChart(firstSample);
        createGuagechart(firstSample);
    });
};


// Define a function to create the bar chart
function createBarchart(sample) {
    // Load the data from the JSON file
    d3.json(url).then((data) => {
   
        // Retrieve all sample data
        let sampleData = data.samples;
        // filtering
        let fileterData=sampleData.filter(filtered => filtered.id===sample)[0];
        // Get the top 10 OTUs for the selected sample
        let otuIds = fileterData.otu_ids.slice(0, 10).reverse();
        let otuLabels = fileterData.otu_labels.slice(0, 10).reverse();
        let sampleValues = fileterData.sample_values.slice(0, 10).reverse();

        // Create the trace for the bar chart
        let trace = {
            x:sampleValues,
            y:otuIds.map(id => `OTU ${id}`),
            text:otuLabels,
            type:"bar",
            orientation: "h"
        };

        // Define the layout for the bar chart
        let layout = {
        title: `Top 10 OTUs ${sample}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
        };

        // Create the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Define a function to create the bubble chart
function createBubblechart(sample) {
    // Load the data from the JSON file
    d3.json(url).then((data) => {
   
        // Retrieve all sample data
        let bubbleSampleData = data.samples;
        // filtering
        let bubbleData=bubbleSampleData.filter(filtered => filtered.id===sample)[0];
        // Get the outIds,outLabels,sampleValues
        let otuIds = bubbleData.otu_ids;
        let otuLabels = bubbleData.otu_labels;
        let sampleValues = bubbleData.sample_values;

        // Create the trace for the bubble chart
        let trace = {
            x:otuIds,
            y:sampleValues,
            text:otuLabels,
            mode:"markers",
            marker: {
                size :sampleValues,
                color : otuIds,
                colorscale: "Earth"
            }
        };

        // Define the layout for the bubble chart
        let layout = {
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
        };

        // Create the bubble chart
        Plotly.newPlot("bubble", [trace], layout)
    });
};


// Define a function to create the metadata info
function createMetadata(sample) {

    // Load the data from the JSON file
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metaData = data.metadata;

        // filtering
        let filterMetadata=metaData.filter(filtered => filtered.id===sample);

        // Clear out any previously displayed metadata information
        d3.select("#sample-metadata").html("");

        // Returns an array of a given object's own enumerable string-keyed property [key, value] pairs to the panel
        Object.entries(filterMetadata).forEach(([key,value]) => {

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};




// // Function that builds the bubble chart
// function buildBubbleChart(sample) {

//     // Use D3 to retrieve all of the data
//     d3.json(url).then((data) => {
        
//         // Retrieve all sample data
//         let sampleData = data.samples;

//         // Filter based on the value of the sample
//         let value = sampleData.filter(result => result.id == sample);

//         // Get the first index from the array
//         let sampleData = value[0];

//         // Get the otu_ids, lables, and sample values
//         let otu_ids = sampleData.otu_ids;
//         let otu_labels = sampleData.otu_labels;
//         let sample_values = sampleData.sample_values;

//         // Log the data to the console
//         console.log(otu_ids,otu_labels,sample_values);
        
//         // Set up the trace for bubble chart
//         let trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Earth"
//             }
//         };

//         // Set up the layout
//         let layout = {
//             title: "Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
//         };

//         // Call Plotly to plot the bubble chart
//         Plotly.newPlot("bubble", [trace1], layout)
//     });
// };

// // Function that updates dashboard when sample is changed
// function optionChanged(value) { 

//     // Log the new value
//     console.log(value); 

//     // Call all functions 
//     buildMetadata(value);
//     buildBarChart(value);
//     buildBubbleChart(value);
//     buildGaugeChart(value);
// };

// // Call the initialize function
// init();
// const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function init() {
//     const dropdownMenu = d3.select("#selDataset");

//     d3.json(url).then(data => {
//         const names = data.names;

//         names.forEach(id => {
//             dropdownMenu.append("option")
//                 .text(id)
//                 .property("value", id);
//         });

//         const sample_one = names[0];

//         buildMetadata(sample_one);
//         buildBarChart(sample_one);
//         buildBubbleChart(sample_one);
//         // buildGaugeChart(sample_one);
//     });
// };

// function buildMetadata(sample) {
//     d3.json(url).then(data => {
//         const metadata = data.metadata;
//         const valueData = metadata.filter(result => result.id === sample)[0];

//         d3.select("#sample-metadata").html("");

//         Object.entries(valueData).forEach(([key, value]) => {
//             d3.select("#sample-metadata").append("h5")
//                 .text(`${key}: ${value}`);
//         });
//     });
// };

// function buildBarChart(sample) {
//     d3.json(url).then(data => {
//         const sampleInfo = data.samples;
//         const valueData = sampleInfo.filter(result => result.id === sample)[0];

//         const otu_ids = valueData.otu_ids;
//         const otu_labels = valueData.otu_labels;
//         const sample_values = valueData.sample_values;

//         const yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
//         const xticks = sample_values.slice(0, 10).reverse();
//         const labels = otu_labels.slice(0, 10).reverse();

//         const trace = {
//             x: xticks,
//             y: yticks,
//             text: labels,
//             type: "bar",
//             orientation: "h"
//         };

//         const layout = {
//             title: "Top 10 OTUs Present"
//         };

//         Plotly.newPlot("bar", [trace], layout);
//     });
// };

// function buildBubbleChart(sample) {
//     d3.json(url).then(data => {
//         const sampleInfo = data.samples;
//         const valueData = sampleInfo.filter(result => result.id === sample)[0];

//         const otu_ids = valueData.otu_ids;
//         const otu_labels = valueData.otu_labels;
//         const sample_values = valueData.sample_values;

//         const trace1 = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: "markers",
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: "Earth"
//             }
//         };

//         const layout = {
//             title: "Bacteria Per Sample",
//             hovermode: "closest",
//             xaxis: {title: "OTU ID"},
//         };

//         Plotly.newPlot("bubble", [trace1], layout);
//     });
// };

function optionChanged(value) {
    createMetadata(value);
    createBarchart(value);
    createBubblechart(value);
    createGaugeChart(value);
};
init();
