// Width and height
const W = 740;
const H = W;

// Define map projection
var proj = d3.geo.mercator().translate([0, 0]).scale([1]);

// Define path generator
var path = d3.geo.path().projection(proj);

var svg = d3
  .select("#svg-container")
  .append("svg")
  .attr("width", W)
  .attr("height", H)
  .call(
    d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform);
    })
  )
  .append("g");

// d3.json("Map/USTHB_V11.geojson", function (json) {
// d3.json("Map/usthbBrut2.geojson", function (json) {
d3.json("Map/usthb-f.geojson", function (json) {
  var b = path.bounds(json);
  s = 0.99 / Math.max((b[1][0] - b[0][0]) / W, (b[1][1] - b[0][1]) / H);
  t = [(W - s * (b[1][0] + b[0][0])) / 2, (H - s * (b[1][1] + b[0][1])) / 2];

  proj.translate(t).scale(s);
  //   console.log(b);
  //   console.log(s, t);

  var map = svg
    .selectAll("path")
    .data(json.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "cl1")
    .attr("id", (data) => {
      return data.properties.name ? data.properties.name : "";
    })
    .on("mouseover", function (d) {
      if (d.properties.name != "") {
        var locLabel = "<b>Name: " + d.properties.name + " </b>";
        d3.select("#loc-label")
          .attr("class", "map-tooltip")
          .html(locLabel)
          .style("color", "black")
          .style("visibility", "visible")
          .style("top", event.pageY - 35 + "px")
          .style("left", event.pageX + 35 + "px");
      }
    })
    .on("mouseout", function () {
      d3.select("#loc-label").html("").style("visibility", "hidden");
    });
});

// for the zoom feature
function centroid(coord) {
  // Initialize sum of coordinates
  let sumX = 0;
  let sumY = 0;

  // Iterate through each set of coordinates
  for (let i = 0; i < coord.length; i++) {
    // Accumulate sum of x and y coordinates
    sumX += coord[i][0];
    sumY += coord[i][1];
  }

  // Calculate average of x and y coordinates
  const avgX = sumX / coord.length;
  const avgY = sumY / coord.length;

  // Return the center as an array [avgX, avgY]
  return [avgX, avgY];
}
