function generateSquareDivs(dimensions) {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';
  
  for (var i = 0; i < dimensions * dimensions; i++) {
    var squareDiv = document.createElement('div');
    squareDiv.style.border = "1px solid black";
    gridContainer.appendChild(squareDiv);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
  
  // create an array with the values to be joined
  var gridTemplateAreasArray = [];
  var gridTemplateAreasString = '';
  // for loop to create each row/string for grid-template-areas value
  for (var i = 0; i < dimensions; i++) {
    var gridTemplateAreasArrayItem = '';
    // for loop to populate the length of each row/string according to dimensions input by user
    for (var j = 0; j < dimensions; j++) {
        gridTemplateAreasArrayItem += '. ';
    }
    gridTemplateAreasArray.push(gridTemplateAreasArrayItem);
  }
  // wrap each value from the array above in "" (quotes) and join with a space in between each and wrap the final value in `` (backtick characters)
  var gridTemplateAreasStringGenerator = function() {
    for (var i = 0; i < gridTemplateAreasArray.length; i++) {
      gridTemplateAreasString += `"${gridTemplateAreasArray[i]}" `;
    }
    gridTemplateAreasString = gridTemplateAreasString.trim();
    gridContainer.style.gridTemplateAreas = gridTemplateAreasString;
  }();
  // lines 28-34 replace the need to use .map() and .join():
  // gridTemplateAreasArray = gridTemplateAreasArray.map(i => `"${i}"`);
  // gridContainer.style.gridTemplateAreas = gridTemplateAreasArray.join(' ');
}
generateSquareDivs(3);