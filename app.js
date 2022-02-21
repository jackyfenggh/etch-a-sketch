// Misc helper functions

function randomColourGenerator() {
  var colourPalette = ['black', 'blue', 'brown', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 'white', 'turquoise'];
  var randomArrayIndex = Math.floor(Math.random() * colourPalette.length);
  return colourPalette[randomArrayIndex];
}

function convertIndexToRow(index, dimensions) {
  var row = Math.floor(index / dimensions);
  return row;
}

function convertIndexToColumn(index, dimensions) {
  var column = index % dimensions;
  return column;
}

// Functions to determine whether a special square 
// should be setup and which one

function isSpecialSquare() {
  return Math.random() > 0.80;
}

function getSpecialSquareType() {
  var randomValue = Math.random();

  if (randomValue < 0.25) {
    return 'twoByTwoShape';
  }

  if (randomValue < 0.68) {
    return 'oneByTwoShape';
  }

  if (randomValue <= 1) {
    return 'twoByOneShape';
  }
}

// Functions to see whether the required special square
// grid units exist, are unused and do not spill over
// to the next line

function requiredGridUnitsAvailable(specialSquareType, mainGridUnitIndex, dimensions) {
  var mainGridUnitIndex = mainGridUnitIndex;
  var rightGridUnitIndex = mainGridUnitIndex + 1;
  var bottomLeftGridUnitIndex = mainGridUnitIndex + dimensions;
  var bottomRightGridUnitIndex = mainGridUnitIndex + dimensions + 1;
  var maxGridUnitIndex = dimensions * dimensions;

  function gridUnitAvailable(gridUnitIndex) {
    var gridTemplateAreaRow = convertIndexToRow(gridUnitIndex, dimensions);
    var gridTemplateAreaColumn = convertIndexToColumn(gridUnitIndex, dimensions);
    var gridUnit = `[${gridTemplateAreaRow}][${gridTemplateAreaColumn}]`;

    return (!usedGridUnits.includes(gridUnit)       // grid unit has not been used for another special square
      && gridUnitIndex < maxGridUnitIndex           // grid unit exists within the grid container
      && rightGridUnitIndex % dimensions !== 0);    // right grid unit does not spill over
  }

  // Check that the required grid units have not
  // been used already
  if (specialSquareType === 'twoByTwoShape') {
    return gridUnitAvailable(mainGridUnitIndex)
      && gridUnitAvailable(rightGridUnitIndex)
      && gridUnitAvailable(bottomLeftGridUnitIndex)
      && gridUnitAvailable(bottomRightGridUnitIndex);
  }

  if (specialSquareType === 'oneByTwoShape') {
    return gridUnitAvailable(mainGridUnitIndex)
      && gridUnitAvailable(rightGridUnitIndex);
  }

  if (specialSquareType === 'twoByOneShape') {
    return gridUnitAvailable(mainGridUnitIndex)
      && gridUnitAvailable(bottomLeftGridUnitIndex);
  }
}

// Functions to setup special square

function setupMainGridUnit(type, mainGridUnitIndex) {
  var gridTemplateAreaRow = convertIndexToRow(mainGridUnitIndex, dimensions);
  var gridTemplateAreaColumn = convertIndexToColumn(mainGridUnitIndex, dimensions);

  gridContainer.childNodes[mainGridUnitIndex].setAttribute('shape', type);
  gridContainer.childNodes[mainGridUnitIndex].style.gridArea = 'specialSquare' + mainGridUnitIndex;

  gridTemplateAreasArray[gridTemplateAreaRow][gridTemplateAreaColumn] = 'specialSquare' + mainGridUnitIndex;
}

function setupRightGridUnit(mainGridUnitIndex) {
  var rightGridUnitIndex = mainGridUnitIndex + 1;
  var gridTemplateAreaRow = convertIndexToRow(rightGridUnitIndex, dimensions);
  var gridTemplateAreaColumn = convertIndexToColumn(rightGridUnitIndex, dimensions);

  usedGridUnits.push(`[${gridTemplateAreaRow}][${gridTemplateAreaColumn}]`);

  gridTemplateAreasArray[gridTemplateAreaRow][gridTemplateAreaColumn] = 'specialSquare' + mainGridUnitIndex;
}

function setupBottomLeftGridUnit(mainGridUnitIndex) {
  var bottomLeftGridUnitIndex = mainGridUnitIndex + dimensions;
  var gridTemplateAreaRow = convertIndexToRow(bottomLeftGridUnitIndex, dimensions);
  var gridTemplateAreaColumn = convertIndexToColumn(bottomLeftGridUnitIndex, dimensions);

  usedGridUnits.push(`[${gridTemplateAreaRow}][${gridTemplateAreaColumn}]`);

  gridTemplateAreasArray[gridTemplateAreaRow][gridTemplateAreaColumn] = 'specialSquare' + mainGridUnitIndex;
}

function setupBottomRightGridUnit(mainGridUnitIndex) {
  var bottomRightGridUnitIndex = mainGridUnitIndex + dimensions + 1;
  var gridTemplateAreaRow = convertIndexToRow(bottomRightGridUnitIndex, dimensions);
  var gridTemplateAreaColumn = convertIndexToColumn(bottomRightGridUnitIndex, dimensions);

  usedGridUnits.push(`[${gridTemplateAreaRow}][${gridTemplateAreaColumn}]`);

  gridTemplateAreasArray[gridTemplateAreaRow][gridTemplateAreaColumn] = 'specialSquare' + mainGridUnitIndex;
}

function setupSpecialSquare(type, mainGridUnitIndex) {
  if (type === 'twoByTwoShape') {
    setupMainGridUnit(type, mainGridUnitIndex)
    setupRightGridUnit(mainGridUnitIndex);
    setupBottomLeftGridUnit(mainGridUnitIndex);
    setupBottomRightGridUnit(mainGridUnitIndex);
    return;
  }

  if (type === 'oneByTwoShape') {
    setupMainGridUnit(type, mainGridUnitIndex)
    setupRightGridUnit(mainGridUnitIndex);
    return;
  }

  if (type === 'twoByOneShape') {
    setupMainGridUnit(type, mainGridUnitIndex)
    setupBottomLeftGridUnit(mainGridUnitIndex);
    return;
  }
}

var usedGridUnits = [];
var gridContainer = document.getElementById('grid-container');
var gridTemplateAreasArray = [];

function renderGrid(dimensions) {
  // Setup gridContainer's grid template with (dimensions * dimensions) units
  gridContainer.innerText = '';
  gridContainer.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;

  // Generate the entire string including info about the shape
  // and which square each gridUnit belongs to.
  // Use a double for loop to populate an array with arrays of strings.

  // Generate an array of arrays 

  for (var i = 0; i < dimensions; i++) {
    gridTemplateAreasArray.push([]);
    for (var j = 0; j < dimensions; j++) {
      // Setup html/css properties.
      var gridUnit = document.createElement('div');
      gridUnit.classList.add('grid-unit');
      gridUnit.setAttribute('id', `grid-unit[${i}][${j}]`);
      gridUnit.setAttribute('shape', 'oneByOneShape');
      gridContainer.appendChild(gridUnit);

      gridTemplateAreasArray[i].push('.');
    }
  }

  // Loop through all gridUnits
  for (var i = 0; i < gridContainer.childNodes.length; i++) {
    // Determine if special square
    if (!isSpecialSquare()) {
      continue;
    }

    // Determine type of special square and whether
    // the required grid units are available
    var specialSquareType = getSpecialSquareType();
    var gridUnitsAvailable = requiredGridUnitsAvailable(specialSquareType, i, dimensions);

    // Setup special square
    if (gridUnitsAvailable) {
      setupSpecialSquare(specialSquareType, i);
    }
  }

  for (var i = 0; i < usedGridUnits.length; i++) {
    var getRidOf = document.getElementById(`grid-unit${usedGridUnits[i]}`);
    getRidOf.remove();
  }

  var gridTemplateAreasString = ''

  for (var i = 0; i < gridTemplateAreasArray.length; i++) {
    gridTemplateAreasString += `"${gridTemplateAreasArray[i]}" `;
  }

  gridTemplateAreasString = gridTemplateAreasString.replaceAll(',', ' ');
  gridContainer.style.gridTemplateAreas = gridTemplateAreasString;

  // since no longer declared when function runs, need to reset otherwise running
  // renderGrid again means usedGridUnits will all be out of whack
  usedGridUnits = [];
  gridTemplateAreasArray = []
}

var dimensions = 10;

function setupButtonsAndEventListeners() {
  // add event listener to 'change grid size' button: prompt user for grid dimensions on click
  // user input must be between 10 and 30
  var changeGridSizeButton = document.getElementById('change-grid-size-button');
  changeGridSizeButton.addEventListener('click', function () {
    dimensions = parseInt(window.prompt('Changing grid size will reset the grid.\nEnter a number between 10 and 30: '));
    if (dimensions >= 10 && dimensions <= 30) {
      renderGrid(Math.round(dimensions));
    } else if (dimensions === '') {
      return;
    } else {
      window.prompt('You must enter a number between 10 and 30: ');
    }
  });

  // add event listener to 'reset' button: reset all gridUnit colours on click
  var resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function () {
    var gridUnits = Array.from(document.querySelectorAll('.grid-unit'));
    gridUnits.forEach(function (gridUnit) {
      gridUnit.style.background = 'rgb(250, 194, 194)';
    });
  });

  // add event listener to gridContainer: change gridUnit colour on mouseover
  var gridContainer = document.getElementById('grid-container');
  gridContainer.addEventListener('mouseover', function (event) {
    if (event.target.className === 'grid-unit') {
      event.target.style.background = randomColourGenerator();
    }
  });
}

function initialise() {
  setupButtonsAndEventListeners();
  renderGrid(10);
}

initialise();
