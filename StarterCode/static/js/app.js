// //Define Url in a let varible
// let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//     console.log(data);
// })

// // Define a function to initialize the dashboard
// function init () {
//     //Get a reference to the dropdown menu
//     let dropdown = d3.select("#selDataset");

//     // Load the data from the JSON file
//     d3.json(url).then((data) {
//         console.log(data);
//         // Get the sampleNames from the data
//         let menusampleNames= data.sampleNames;
//         // Add the sampleNames to the dropdown menu
//         menusampleNames.forEach((sample) =>{
//             dropdown.append("option")
//                     .text(sample)
//                     .property("value",sample);
//         });
//             // Get the first sample ID
//         let firstSample = menusampleNames[0];   
//         console.log(firstSample);
//             // Call the functions to create the bar chart and metadata display
//         createBarChart(firstSample);
//     });
// }
// init();

//Define Url in a let varible
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

        // Log the value of firstSample
        console.log(firstSample);

        // Build the initial plots
        // buildMetadata(firstSample);
        // buildBarChart(firstSample);
        // buildBubbleChart(firstSample);
        // buildGaugeChart(firstSample);
        // Call the functions to create the bar chart and metadata display
        createBarChart(firstSample);

    });
}

// Define a function to create the bar chart
function createBarchart(sample) {
    d3.json(url).then((data) => {
        console.log(data);

        // Get the sample data for the selected sample

}
// Function that builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Get the sample data for the selected sample
        let sampleData = data.samples.filter(result => result.id===sample)[0];

        // Get the otu_ids, lables, and sample values
        let otuIds = sampleData.otu_ids.slice(0, 10).reverse();
        let otuLabels = sampleData.otu_labels.slice(0, 10).reverse();
        let sampleValues = sampleData.sample_values.slice(0, 10).reverse();
    

        // Set up the trace for the bar chart
        let trace = {
            x: sampleValues,
            y: otuIds.map(d => `OTU ${d}`),
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
}

// Function that populates metadata info
function buildMetadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let sampleData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(sampleData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};


// Function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {
        
        // Retrieve all sample data
        let sampleData = data.samples;

        // Filter based on the value of the sample
        let value = sampleData.filter(result => result.id == sample);

        // Get the first index from the array
        let sampleData = value[0];

        // Get the otu_ids, lables, and sample values
        let otu_ids = sampleData.otu_ids;
        let otu_labels = sampleData.otu_labels;
        let sample_values = sampleData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Set up the trace for bubble chart
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function that updates dashboard when sample is changed
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialize function
init();