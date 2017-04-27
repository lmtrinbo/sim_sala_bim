var circles = document.getElementsByTagName("circle");

var svg = document.getElementsByTagName("svg")[0],
    svgNS = "http://www.w3.org/2000/svg";

var circlesPerRowInput = document.getElementById("circlesPerRow"),
    rowsInput = document.getElementById("rows"),
    circleRadiusInput = document.getElementById("circleRadius"),
    spaceBetweenInput = document.getElementById("spaceBetween"),
    connectorThicknessInput = document.getElementById("connectorThickness"),
    connectorColorInput = document.getElementById("connectorColor"),
    textarea = document.getElementsByTagName("textarea")[0],
    outputDivs = document.querySelectorAll("#output > div"),
    btnSave = document.getElementById("btnSave");

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

btnSave.onclick = function() {
  download("board.svg", textarea.value);
};

function genSVG(circlesPerRow, rows, circleRadius, spaceBetween) {
  svg.innerHTML = "";

  var totalCircleWidth = circlesPerRow * circleRadius * 2,
      totalCircleHeight = rows * circleRadius * 2,
      totalSpacingX = spaceBetween * (circlesPerRow+1),
      totalSpacingY = spaceBetween * (rows+1),
      width = totalCircleWidth + totalSpacingX,
      height = totalCircleHeight + totalSpacingY;
 
  svg.setAttribute("viewBox", "0 0 " + width + " " + height);

  for (var i = 0; i < rows; i++) {
    var hline = document.createElementNS(svgNS, "line"),
        vline = document.createElementNS(svgNS, "line");

    var farCircleX = totalCircleWidth+spaceBetween*(circlesPerRow-1)-circleRadius;

    // horizontal line positions
    var h_x1 = circleRadius,
        h_y1 = circleRadius+(spaceBetween+circleRadius*2)*i,
        h_x2 = farCircleX,
        h_y2 = h_y1;

    var isLeft = (rows % 2 == 0 && i % 2 != 0)
        || (rows % 2 == 1 && i % 2 != 1);
    var v_x1 = isLeft ? h_x1 : h_x2,
        v_y1 = h_y1,
        v_x2 = isLeft ? h_x1 : h_x2,
        v_y2 = v_y1 + (spaceBetween+circleRadius*2);
    hline.setAttributeNS(null, "x1", h_x1);
    hline.setAttributeNS(null, "y1", h_y1);
    hline.setAttributeNS(null, "x2", h_x2);
    hline.setAttributeNS(null, "y2", h_y2);
    hline.setAttributeNS(null, "stroke", connectorColorInput.value);
    hline.setAttributeNS(null, "stroke-width", connectorThicknessInput.value);
    vline.setAttributeNS(null, "x1", v_x1);
    vline.setAttributeNS(null, "y1", v_y1);
    vline.setAttributeNS(null, "x2", v_x2);
    vline.setAttributeNS(null, "y2", v_y2);
    vline.setAttributeNS(null, "stroke", connectorColorInput.value);
    vline.setAttributeNS(null, "stroke-width", connectorThicknessInput.value);

    svg.appendChild(hline);
    if (i < rows-1) {
      svg.appendChild(vline);
    }
    for (var j = 0; j < circlesPerRow; j++) {
      var x = circleRadius + (circleRadius*2*j) + spaceBetween*j,
          y = circleRadius + (circleRadius*2*i) + spaceBetween*i;
      var circle = document.createElementNS(svgNS, "circle");
      circle.setAttributeNS(null, "cx", x);
      circle.setAttributeNS(null, "cy", y);
      circle.setAttributeNS(null, "r", circleRadius);
      circle.setAttributeNS(null, "fill", "yellow");
      circle.onmouseenter = function() {
        this.setAttribute("fill", "blue");
      };
      circle.onmouseleave = function() {
        this.setAttribute("fill", "yellow");
      };
      circle.onclick = function() {
        alert("CLICKED!");
      };
      svg.appendChild(circle);
    }
  }

  textarea.value = '<?xml version="1.0" encoding="UTF-8" ?>' + outputDivs[0].innerHTML.trim();
}

function onChange() {
  var perRow = parseInt(circlesPerRowInput.value),
      rows = parseInt(rowsInput.value),
      radius = parseInt(circleRadiusInput.value),
      space = parseInt(spaceBetweenInput.value);
  genSVG(perRow,
         rows,
         radius,
         space);
  console.log("Yo!");
}

circlesPerRowInput.onkeyup = onChange;
circlesPerRowInput.onchange = onChange;
rowsInput.onkeyup = onChange;
rowsInput.onchange = onChange;
circleRadiusInput.onkeyup = onChange;
circleRadiusInput.onchange = onChange;
spaceBetweenInput.onkeyup = onChange; 
spaceBetweenInput.onchange = onChange; 
connectorThicknessInput.onkeyup = onChange;
connectorColorInput.onchange = onChange;
onChange();
