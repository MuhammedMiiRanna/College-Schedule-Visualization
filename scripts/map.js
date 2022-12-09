//
//

//Width and height
var w = 900;
var h = 700;

// Define map projection
var proj = d3.geo.mercator().translate([0, 0]).scale([1]);

// Define path generator
var path = d3.geo.path().projection(proj);

var svg = d3
  .select("#main-container")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

d3.json("/MapVisExp/USTHB map/usthbBrut2.geojson", function (json) {
  var b = path.bounds(json);
  //   console.log(b);
  s = 0.99 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
  t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
  //   console.log(s, t);
  proj.translate(t).scale(s);

  var map = svg.selectAll("path").data(json.features);
  map
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "cl1")
    .attr("id", (d) => d.properties.name);
  //   console.log(json);
});
