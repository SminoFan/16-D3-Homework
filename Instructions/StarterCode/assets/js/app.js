// Brandon Coleman
// Data Analytics Bootcamp
// D3 Homework
// 8 - 12 - 2019

// @TODO: YOUR CODE HERE!

// Step 1: Set up our chart
//= ================================

var svgWidth = 960;
var svgHeight = 500;
var margin = {
    top: 20,
    right: 40,
    bottom: 100,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);


// Step 3:
// Import data from the data.csv file
// =================================

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData) {

    // Step 4: Parse the data
    // Format the data and convert to numerical values
    // =================================

    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Step 5: Create the scales for the chart
    // =================================

    var yLinearScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.healthcare))
        .range([height, 0]);

    var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(healthData, d => d.poverty))
        .range([0, width]);


    // Step 6: Create the axes
    // =================================

    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Step 7: Append the axes to the chartGroup
    // ==============================================
    // Add x-axis

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    // Add y-axis

    chartGroup.append("g")
        .call(yAxis);

    // Step 8: Create Circles
    // ==============================

    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .classed("stateCircle", true)
        .attr("r", "12")
        .attr("stroke-width", "0.5")


    // Step 9: Add State Abbrevations
    // to scatter plot circles
    // ==============================

    chartGroup.append("text")
        .classed("stateText", true)
        .selectAll("tspan")
        .data(healthData)
        .enter()
        .append("tspan")
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare - 0.2))
        .text(d => d.abbr)

    // Step 10: Create axes labels
    // ==============================
    // y-axis

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 10)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("aText", true)
        .text("Lacks Healthcare (%)");

    // x-axis

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .classed("aText", true)
        .text("In Poverty (%)");

});