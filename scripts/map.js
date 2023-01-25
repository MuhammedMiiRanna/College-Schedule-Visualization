//Width and height
var w = 740;
var h = w;

// Define map projection
var proj = d3.geo.mercator().translate([0, 0]).scale([1]);

// Define path generator
var path = d3.geo.path().projection(proj);

var svg = d3
  .select("#svg-container")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .call(d3.zoom().on("zoom", function () {
    svg.attr("transform", d3.event.transform)
  }))
  .append("g");

// d3.json("/MapVisExp/USTHB map/usthbBrut2.geojson", function (json) {
d3.json("MapVisExp/USTHB map/USTHB_V11.geojson", function (json) {
  var b = path.bounds(json);
  //   console.log(b);
  s = 0.99 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h);
  t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
  //   console.log(s, t);
  proj.translate(t).scale(s);

  var map = svg
    .selectAll("path")
    .data(json.features);

  map.enter()
    .append("path")
    .attr("d", path)
    .attr("class", "cl1")
    .attr("id", (d) => d.properties.name);
});


// svg.call(d3.behavior.zoom().on('zoom', () => {
//   console.log("zoomed");
//   g.attr('transform', d3.event.transform);
// }));

// // Zoom
// g.transition()
//   .duration(750)
//   .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');


// var zoom = d3.behavior.zoom().on('zoom', function() {
//   g.attr('transform', 'translate(' + d3.event.translate.join(',') + ') scale(' + d3.event.scale + ')');
//   //g.selectAll('path').attr('d', path.projection(projection));
// });