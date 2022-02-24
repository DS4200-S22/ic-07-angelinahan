/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file

// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = { left: 50, right: 50, bottom: 50, top: 50 };
const yTooltipOffset = 15;

// Selects the div with ID hard-coded-bar and adds an SVG with the specified width, height, and viewBox
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  { name: "A", score: 92 },
  { name: "B", score: 15 },
  { name: "C", score: 67 },
  { name: "D", score: 89 },
  { name: "E", score: 53 },
  { name: "F", score: 91 },
  { name: "G", score: 18 },
];

/*

  Axes

*/

// This code returns the max score in data1
let maxY1 = d3.max(data1, function (d) {
  return d.score;
});

// This transforms the y-axis data values to pixel values
let yScale1 = d3
  .scaleLinear() //creates a continuous scale
  .domain([0, maxY1]) // specifies the range of the data
  .range([height - margin.bottom, margin.top]); //specifies the range of pixel values we want the data to map to

// This transforms the x-axis data values to pixel values
let xScale1 = d3
  .scaleBand() //creates a band scale which divides the space into discrete bands
  .domain(d3.range(data1.length)) // specifies how many data points there are
  .range([margin.left, width - margin.right]) //specifies the range of pixel values we want
  .padding(0.1); //specifies the inner and outer padding around each band

// Creates a y-axis using the yScale1 function written above
svg1
  .append("g") //appends a g element to svg1, created above
  .attr("transform", `translate(${margin.left}, 0)`) //translates the g element by margin.left px to the right
  .call(d3.axisLeft(yScale1)) // calls d3.axisLeft(yScale1) with g, creating a left axis using the yScale1 function defined above
  .attr("font-size", "20px"); // sets the font size of g to 20px

// Creates an x-axis using the xScale1 function above
svg1
  .append("g") //appends a g element to the svg1 element that was created above
  .attr("transform", `translate(0,${height - margin.bottom})`) //translates the g element by margin.bottom px upwards
  .call(d3.axisBottom(xScale1).tickFormat((i) => data1[i].name)) // creates an x-axis using the xScale1 function.
  // tickFormat sets the labels for each tick on the axis to the name of the data point
  .attr("font-size", "20px"); // sets the font size of g to 20px

/* 

  Tooltip Set-up  

*/

// Adds a tooltip div to the graph
const tooltip1 = d3
  .select("#hard-coded-bar") //selects the element with ID hard-coded-bar
  .append("div") // appends a div in the selected div
  .attr("id", "tooltip1") // gives the appended div an id of "tooltip1"
  .style("opacity", 0) // sets the opacity of this div to 0
  .attr("class", "tooltip"); // gives the div a class of "tooltip"

// Displays data in tooltip when you mouseover on a bar
const mouseover1 = function (event, d) {
  tooltip1 // uses tooltip (defined above)
    .html("Name: " + d.name + "<br> Score: " + d.score + "<br>") //adds html to tooltip element with d.name and d.score
    .style("opacity", 1); //makes tooltip visible by setting opacity to 1
};

// Moves the tooltip with the mouse
const mousemove1 = function (event, d) {
  tooltip1 // uses tooltip (defined above)
    .style("left", event.x + "px") // sets the left attribute of the tooltip div to the mouse's current x position
    .style("top", event.y + yTooltipOffset + "px"); // sets the top attribute of the tooltip div to the mouse's current y position + an offset defined above
};

// This code hides the tooltip when the mouse leaves the elements
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
};

/* 

  Bars 

*/

// Adds barchart from CSV
d3.csv("data/barchart.csv").then((data) => {
  console.log(data);

  const maxY2 = d3.max(data, (d) => {
    return d.score;
  });

  let yScale2 = d3
    .scaleLinear() //creates a continuous scale
    .domain([0, maxY2]) // specifies the range of the data
    .range([height - margin.bottom, margin.top]);

  let xScale2 = d3
    .scaleBand()
    .domain(d3.range(data1.length)) // specifies how many data points there are
    .range([margin.left, width - margin.right]) //specifies the range of pixel values we want
    .padding(0.1); //specifies the inner and outer padding around each band

  svg2
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale2)) // calls d3.axisLeft(yScale1) with g, creating a left axis using the yScale1 function defined above
    .attr("font-size", "20px"); // sets the font size of g to 20px

  svg2
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale1).tickFormat((i) => data1[i].name)) // calls d3.axisLeft(yScale1) with g, creating a left axis using the yScale1 function defined above
    .attr("font-size", "20px"); // sets the font size of g to 20px

  svg2
    .selectAll(".bar2")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar2") // sets the element's class to bar
    .attr("x", (d, i) => xScale2(i)) // sets the element's x position in pixels using the data and xScale1 function
    .attr("y", (d) => yScale2(d.score)) // sets the element's y position in pixels using the d.score and yScale1 function
    .attr("height", (d) => height - margin.bottom - yScale2(d.score)) //sets the element's height using d.score
    .attr("width", xScale2.bandwidth()) // sets the width to a bandwidth based on xScale1
    .on("mouseover", mouseover1) // add an event listener for mouseover to call the function mousover1
    .on("mousemove", mousemove1) // add an event listener for mousemove to call the function mousemove1
    .on("mouseleave", mouseleave1); // add an event listener for mouseleave to call the function mouseleave1
});

svg1
  .selectAll(".bar") // selects elements with class of bar
  .data(data1) // binds the select to data1
  .enter() // enters the data and does the following for each data point in data1
  .append("rect") // appends a rect element
  .attr("class", "bar") // sets the element's class to bar
  .attr("x", (d, i) => xScale1(i)) // sets the element's x position in pixels using the data and xScale1 function
  .attr("y", (d) => yScale1(d.score)) // sets the element's y position in pixels using the d.score and yScale1 function
  .attr("height", (d) => height - margin.bottom - yScale1(d.score)) //sets the element's height using d.score
  .attr("width", xScale1.bandwidth()) // sets the width to a bandwidth based on xScale1
  .on("mouseover", mouseover1) // add an event listener for mouseover to call the function mousover1
  .on("mousemove", mousemove1) // add an event listener for mousemove to call the function mousemove1
  .on("mouseleave", mouseleave1); // add an event listener for mouseleave to call the function mouseleave1
