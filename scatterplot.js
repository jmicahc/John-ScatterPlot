//Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

//Define Color
var colors = d3.scale.category20();

//Define SVG
  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Define Scales   
var xScale = d3.scale.linear()
    .domain([0,16]) //Need to redefine this after loading the data
    .range([0, width]);

var yScale = d3.scale.linear()
    .domain([-10,400]) //Need to redfine this after loading the data
    .range([height, 0]);

//Define Tooltip here

  
   //Define Axis
var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);

//Get Data
// Define domain for xScale and yScale
d3.csv("scatterdata.csv", function(d) {
    return {country: d.country,
            gdp: +d.gdp,
            population: +d.population,
            epc: +d.epc,
            total: +d.total
        };
}, 
function(data) { 
    console.log(data);
    //Draw Scatterplot
        svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", function(d) { return Math.sqrt(d.total)/.2; })
        .attr("cx", function(d) {return xScale(d.gdp);})
        .attr("cy", function(d) {return yScale(d.epc);})
        .style("fill", function (d) { return colors(d.country); })
        .on("mouseover", function (d) {
            "use strict";
            
            var xPosition = parseFloat(d3.select(this).attr("x"));
            var yPosition = parseFloat(d3.select(this).attr("y"));

            //Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", event.pageX + "px")
                .style("top", event.pageY + "px")
                .select("#value")
                .text(d.country + "\nPopulation:" + d.population + "Million\n" + "GDP:" + d.gdp + "Trillion\n" + "EPC:" + d.epc + "Million BTUs\n" + "TEC:" + d.total + "Trillion BTUs");
                
            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);

        })
        .on("mouseout", function () {

            //Hide the tooltip
            d3.select("#tooltip").classed("hidden", true);

            });
    //Add .on("mouseover", .....
    //Add Tooltip.html with transition and style
    //Then Add .on("mouseout", ....

    //Scale Changes as we Zoom
    // Call the function d3.behavior.zoom to Add zoom

    //Draw Country Names
        svg.selectAll(".text")
        .data(data)
        .enter().append("text")
        .attr("class","text")
        .style("text-anchor", "start")
        .attr("x", function(d) {return xScale(d.gdp);})
        .attr("y", function(d) {return yScale(d.epc);})
        .style("fill", "black")
        .text(function (d) {return d.name; });

    //x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("y", 50)
        .attr("x", width/2)
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("GDP (in Trillion US Dollars) in 2010");


    //Y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50)
        .attr("x", -50)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("font-size", "16px")
        .text("Energy Consumption per Capita (in Million BTUs per person)");


     // draw legend colored rectangles
    svg.append("rect")
        .attr("x", width-250)
        .attr("y", height-190)
        .attr("width", 220)
        .attr("height", 180)
        .attr("fill", "lightgrey")
        .style("stroke-size", "1px");

    svg.append("circle")
        .attr("r", 5)
        .attr("cx", width-100)
        .attr("cy", height-175)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 15.8)
        .attr("cx", width-100)
        .attr("cy", height-150)
        .style("fill", "white");

    svg.append("circle")
        .attr("r", 50)
        .attr("cx", width-100)
        .attr("cy", height-80)
        .style("fill", "white");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-172)
        .style("text-anchor", "end")
        .text(" 1 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-147)
        .style("text-anchor", "end")
        .text(" 10 Trillion BTUs");

    svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-77)
        .style("text-anchor", "end")
        .text(" 100 Trillion BTUs");

     svg.append("text")
        .attr("class", "label")
        .attr("x", width -150)
        .attr("y", height-15)
        .style("text-anchor", "middle")
        .style("fill", "Green") 
        .attr("font-size", "20px")
        .text("Total Energy Consumption");     
});