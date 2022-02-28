/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file

const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width - margin.left - margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/scatter.csv").then((data) => {
  console.log(data);

  const maxY = d3.max(data, (d) => d.score);

  const mouseover3 = function (event, d) {
    tooltip1
      .html("Day: " + d.day + "<br> Score: " + d.score + "<br>") //adds html to tooltip element with d.name and d.score
      .style("opacity", 1); //makes tooltip visible by setting opacity to 1
  };

  // Moves the tooltip with the mouse
  const mousemove3 = function (event, d) {
    tooltip1
      .style("left", event.pageX + "px") // sets the left attribute of the tooltip div to the mouse's current x position
      .style("top", event.pageY + yTooltipOffset + "px"); // sets the top attribute of the tooltip div to the mouse's current y position + an offset defined above
  };

  // This code hides the tooltip when the mouse leaves the elements
  const mouseleave3 = function (event, d) {
    tooltip1.style("opacity", 0);
  };

  let yScale = d3
    .scaleLinear() //creates a continuous scale
    .domain([0, maxY]) // specifies the range of the data
    .range([height - margin.bottom, margin.top]);

  let xScale = d3
    .scaleBand()
    .domain(d3.range(data.length)) // specifies how many data points there are
    .range([margin.left, width - margin.right]) //specifies the range of pixel values we want
    .padding(0.1); //specifies the inner and outer padding around each band

  svg3
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(yScale)) // calls d3.axisLeft(yScale1) with g, creating a left axis using the yScale1 function defined above
    .attr("font-size", "20px"); // sets the font size of g to 20px

  svg3
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).tickFormat((i) => data[i].day)) // calls d3.axisLeft(yScale1) with g, creating a left axis using the yScale1 function defined above
    .attr("font-size", "20px");

  svg3
    .selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d, i) => xScale(i) + margin.right)
    .attr("cy", (d) => yScale(d.score))
    .attr("r", "20px")
    .on("mouseover", mouseover3)
    .on("mousemove", mousemove3)
    .on("mouseleave", mouseleave3);
});
