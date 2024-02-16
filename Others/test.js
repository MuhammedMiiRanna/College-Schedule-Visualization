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

// scale 1
// Reset Zoom: zoomTo([305.07681305610026, 165.2429846466185], 1)

let coord = [
  [387.4870918658562, 373.96591397956945],
  [392.3217460216838, 370.64760663989],
  [391.4012616496475, 369.3308172591496],
  [388.4371330755239, 362.4835055747535],
  [381.1281493692077, 367.32929658028297],
  [386.58771952069947, 372.5437825957779],
];

coord = [
  [494.8417485576647, 95.06058638356626],
  [498.71791669310187, 97.79969345475547],
  [500.1408673049009, 95.85071361367591],
  [500.7320040575578, 96.21943960129283],
  [502.04094972423627, 97.06224173353985],
  [503.29078171559377, 97.69434321671724],
  [504.5279464908526, 97.48364273225889],
  [505.32175870161154, 96.85154121601954],
  [507.1247257972427, 98.06306903623044],
  [510.9628922842676, 92.63752858387306],
  [501.34847524252837, 85.78974869847298],
];
// coord = [[3.180923130640224, 36.71239204594566]];
// zoomTo(centroid(coord), 5);
// console.log(centroid(coord));

// scale 1
// Reset Zoom: zoomTo([305.07681305610026, 165.2429846466185], 1)
coord = [
  [387.4870918658562, 373.96591397956945],
  [392.3217460216838, 370.64760663989],
  [391.4012616496475, 369.3308172591496],
  [388.4371330755239, 362.4835055747535],
  [381.1281493692077, 367.32929658028297],
  [386.58771952069947, 372.5437825957779],
];
coord = [
  [494.8417485576647, 95.06058638356626],
  [498.71791669310187, 97.79969345475547],
  [500.1408673049009, 95.85071361367591],
  [500.7320040575578, 96.21943960129283],
  [502.04094972423627, 97.06224173353985],
  [503.29078171559377, 97.69434321671724],
  [504.5279464908526, 97.48364273225889],
  [505.32175870161154, 96.85154121601954],
  [507.1247257972427, 98.06306903623044],
  [510.9628922842676, 92.63752858387306],
  [501.34847524252837, 85.78974869847298],
];
coord = [[3.180923130640224, 36.71239204594566]];
// zoomTo(centroid(coord), 9);
// console.log(centroid(coord));

// Get the "d" attribute value
const pathData =
  "M494.8417485576647,95.06058638356626L498.71791669310187,97.79969345475547L500.1408673049009,95.85071361367591L500.7320040575578,96.21943960129283L502.04094972423627,97.06224173353985L503.29078171559377,97.69434321671724L504.5279464908526,97.48364273225889L505.32175870161154,96.85154121601954L507.1247257972427,98.06306903623044L510.9628922842676,92.63752858387306L501.34847524252837,85.78974869847298Z";

// // Extract the points from the path data (assuming it follows the 'M' and 'L' commands)
// const pointRegex = /([ML]\d+(\.\d+)?,\d+(\.\d+)?)/g;
// const points = pathData.match(pointRegex);
// console.log("Extracted Points:", points); // 'L501.34847524252837,85.78974869847298'

function pathToNumerical(pathData) {
  const numericRegex = /[-+]?\d*\.?\d+/g;
  const alphaNumValues = pathData.match(numericRegex);
  let numericValues = [];
  for (let index = 0; index < numericValues.length; index += 2) {
    numericValues.push([alphaNumValues[index], alphaNumValues[index + 1]]);
  }
  return numericValues;
}
// Extract the numerical values from the path data

console.log("Extracted Numeric Values:", pathToNumerical(pathData));

//

// /////////////////////////////////////////////////////////////////////////
// Zoom test
// scale 1
// Reset Zoom: zoomTo([305.07681305610026, 165.2429846466185], 1)

function zoomTo(points, scale) {
  const zoom = d3
    .zoom()
    .scaleExtent([1, 25])
    .translateExtent([
      [-100, -100],
      [1000, 900],
    ])
    .on("zoom", zoomed);

  function zoomed() {
    svg.selectAll("path").attr("transform", d3.event.transform);
    //console.log(d3.event.transform)
  }

  let point = centroid(points);
  //convert long lat to cartesian coordinates
  console.log("cartesian point is:", point);
  svg
    .transition()
    .duration(2500)
    .call(
      zoom.transform,
      d3.zoomIdentity
        .translate(W / 2 - point[0] * scale, H / 2 - point[1] * scale)
        .scale(scale)
    );
}

// /////////////////////////////////////////////////////////////////////////

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

// test
// let coord = [[3.180923130640224, 36.71239204594566]];
// zoomTo(coord, 5);
// console.log(centroid(coord));
