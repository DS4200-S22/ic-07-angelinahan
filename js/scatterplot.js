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
    .selectAll(".point")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "point")
    .attr("cx", (d, i) => xScale(i))
    .attr("cy", (d) => yScale(d.score))
    .attr("r", "10px");
});
