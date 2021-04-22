var colourPalette = ['black', 'blue', 'brown', 'green', 'gray', 'yellow', 'pink', 'orange', 'red', 'purple', 'white', 'teal', 'turquoise'];

function randomColourGenerator() {
  var randomArrayIndex = Math.floor(Math.random() * colourPalette.length);
  return colourPalette[randomArrayIndex];
}

function renderGrid(dimensions) {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';

  for (var i = 0; i < dimensions * dimensions; i++) {
    var squareDiv = document.createElement('div');
    squareDiv.classList.add('grid-unit');
    gridContainer.appendChild(squareDiv);
  }

  gridContainer.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;
}

function setupEventListeners() {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.addEventListener('mouseover', function(event) {
    event.target.style.background = randomColourGenerator();
  });

  var resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    var gridUnits = Array.from(document.querySelectorAll('.grid-unit'));
    gridUnits.forEach(function(gridUnit) {
      gridUnit.style.background = 'white';
    });
  });
}

function initialise() {
  setupEventListeners();
  renderGrid(16);
}

initialise();



// add 
// next what I want to do: take user input and save as dimensions.

// bonus
// fix overlapping borders




// code for grid-template-areas for later:
  // // create an array with the values to be joined
  // var gridTemplateAreasArray = [];
  // var gridTemplateAreasString = '';
  // // for loop to create each row/string for grid-template-areas value
  // for (var i = 0; i < dimensions; i++) {
  //   var gridTemplateAreasArrayItem = '';
  //   // for loop to populate the length of each row/string according to dimensions input by user
  //   for (var j = 0; j < dimensions; j++) {
  //       gridTemplateAreasArrayItem += 'grid-unit ';
  //   }
  //   gridTemplateAreasArray.push(gridTemplateAreasArrayItem);
  // }
  // // wrap each value from the array above in "" (quotes) and join with a space in between each and wrap the final value in `` (backtick characters)
  // var gridTemplateAreasStringGenerator = function() {
  //   for (var i = 0; i < gridTemplateAreasArray.length; i++) {
  //     gridTemplateAreasString += `"${gridTemplateAreasArray[i]}" `;
  //   }
  //   gridTemplateAreasString = gridTemplateAreasString.trim();
  //   gridContainer.style.gridTemplateAreas = gridTemplateAreasString;
  // }();
  // // the code block directly above replaces the need to use .map() and .join():
  // // gridTemplateAreasArray = gridTemplateAreasArray.map(i => `"${i}"`);
  // // gridContainer.style.gridTemplateAreas = gridTemplateAreasArray.join(' ');