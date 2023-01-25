
// <button onclick="zoomIn()">Zoom in</button>
// <button onclick="zoomOut()">Zoom out</button>
// <button onclick="resetZoom()">Reset zoom</button>
// <button onclick="panLeft()">Pan left</button>
// <button onclick="panRight()">Pan right</button>
// <button onclick="center()">Center</button>

// function handleZoom(e) {
//     d3.select('svg')
//         .attr('transform', e.transform);
// }

// let zoom = d3.zoom()
//     .on('zoom', handleZoom);

// d3.select('svg')
//     .call(zoom);

// 

// svg.call(d3.zoom().on('zoom', () => {
//     console.log("zoomed");
//     g.attr('transform', d3.event.transform);
// }));

// // Zoom
// g.transition()
//     .duration(750)
//     .attr('transform', 'translate(' + w / 2 + ',' + h / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');

// 

const buttonsEvents = [
    ["zoomIn()", "Zoom in"],
    ["zoomOut()", "Zoom out"],
    ["resetZoom()", "Reset zoom"],
    ["panLeft()", "Pan left"],
    ["panRight()", "Pan right"],
    ["center()", "Center"]
]

// //
// const svgContainer = document.getElementById("svg-container");

// for (let event of buttonsEvents) {
//     const button = document.createElement("button");
//     button.innerText = event[1];
//     button.setAttribute("onClick", event[0]);
//     svgContainer.appendChild(button);
// }


// let data = [], width = 600, height = 400, numPoints = 100;

// let zoom = d3.behavior.zoom()
//     .scaleExtent([0.25, 10])
//     .on('zoom', handleZoom);

// function updateData() {
//     data = [];
//     for (let i = 0; i < numPoints; i++) {
//         data.push({
//             id: i,
//             x: Math.random() * width,
//             y: Math.random() * height
//         });
//     }
// }

// function initZoom() {
//     d3.select('svg')
//         .call(zoom);
// }

// function handleZoom(e) {
//     d3.select('svg g')
//         .attr('transform', e.transform);
// }

// function zoomIn() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.scaleBy, 2);
// }

// function zoomOut() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.scaleBy, 0.5);
// }

// function resetZoom() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.scaleTo, 1);
// }

// function center() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.translateTo, 0.5 * width, 0.5 * height);
// }

// function panLeft() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.translateBy, -50, 0);
// }

// function panRight() {
//     d3.select('svg')
//         .transition()
//         .call(zoom.translateBy, 50, 0);
// }

// function update() {
//     d3.select('svg g')
//         .selectAll('circle')
//         .data(data)
//         .join('circle')
//         .attr('cx', function (d) { return d.x; })
//         .attr('cy', function (d) { return d.y; })
//         .attr('r', 3);
// }

// initZoom();
// updateData();
// update();
