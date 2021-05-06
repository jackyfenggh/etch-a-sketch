function randomColourGenerator() {
  var colourPalette = ['black', 'blue', 'brown', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 'white', 'turquoise'];
  var randomArrayIndex = Math.floor(Math.random() * colourPalette.length);
  return colourPalette[randomArrayIndex];
}

function renderGrid(pattern) {
  var numberOfGridUnits = 0;
  var bigSquares = 0;
  var gridTemplateAreaString = '';


  if (pattern === 'defaultPattern') {
    numberOfGridUnits = 100;
  }

  if (pattern === 'smallSquareBigSquarePattern') {
    numberOfGridUnits = 73;
    bigSquares = 9;
    gridTemplateAreaString =
      `". . . . . . . . . ."
      ". grid-unit1 grid-unit1 . grid-unit2 grid-unit2 . grid-unit3 grid-unit3 ."
      ". grid-unit1 grid-unit1 . grid-unit2 grid-unit2 . grid-unit3 grid-unit3 ."
      ". . . . . . . . . ."
      ". grid-unit4 grid-unit4 . grid-unit5 grid-unit5 . grid-unit6 grid-unit6 ."
      ". grid-unit4 grid-unit4 . grid-unit5 grid-unit5 . grid-unit6 grid-unit6 ."
      ". . . . . . . . . ."
      ". grid-unit7 grid-unit7 . grid-unit8 grid-unit8 . grid-unit9 grid-unit9 ."
      ". grid-unit7 grid-unit7 . grid-unit8 grid-unit8 . grid-unit9 grid-unit9 ."
      ". . . . . . . . . ."`;
  }

  if (pattern === 'bigSquareSmallSquarePattern') {
    numberOfGridUnits = 73;
    bigSquares = 9;
    gridTemplateAreaString =
    "grid-unit1 grid-unit1 . . grid-unit2 grid-unit2 . . grid-unit3 grid-unit3"
    "grid-unit1 grid-unit1 . . grid-unit2 grid-unit2 . . grid-unit3 grid-unit3"
    ". . . . . . . . . ."
    "grid-unit4 grid-unit4 . . grid-unit5 grid-unit5 . . grid-unit6 grid-unit6"
    "grid-unit4 grid-unit4 . . grid-unit5 grid-unit5 . . grid-unit6 grid-unit6"
    ". . . . . . . . . ."
    "grid-unit7 grid-unit7 . . grid-unit8 grid-unit8 . . grid-unit9 grid-unit9"
    "grid-unit7 grid-unit7 . . grid-unit8 grid-unit8 . . grid-unit9 grid-unit9"
  }
  
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerHTML = '';

  for (var i = 0; i < numberOfGridUnits; i++) {
    var gridUnit = document.createElement('div');
    gridUnit.classList.add('grid-unit');
    gridUnit.setAttribute('id', 'grid-unit' + i);
    gridContainer.appendChild(gridUnit);

    if (i + 1 <= bigSquares) {
      gridUnit.style.gridArea = 'grid-unit' + (i + 1);
    }
  }

  gridContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(10, 1fr)`;
  gridContainer.style.gridTemplateAreas = gridTemplateAreaString;

}

function setupButtonsAndEventListeners() {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.addEventListener('mouseover', function(event) {
    if (event.target.className === 'grid-unit') {
      event.target.style.background = randomColourGenerator();
    }
  });

  var changeGridSizeButton = document.getElementById('change-grid-size-button');
  changeGridSizeButton.addEventListener('click', function() {
    var dimensions = window.prompt('Changing grid size will reset the grid.\nEnter a number between 10 and 30: ');
    if (dimensions >= 10 && dimensions <= 30) {
      renderGrid(Math.round(dimensions));
    } else if (dimensions === null) {
      return;
    } else {
      window.prompt('You must enter a number between 10 and 30: ');
    }
  });

  var resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    var gridUnits = Array.from(document.querySelectorAll('.grid-unit'));
    gridUnits.forEach(function(gridUnit) {
      gridUnit.style.background = 'rgb(250, 194, 194)';
    });
  });
}

function initialise() {
  setupButtonsAndEventListeners();
  renderGrid('defaultPattern');
}

initialise();



// add 
// next what I want to do: take user input and save as dimensions.

// bonus
// fix overlapping borders




// // code for grid-template-areas for later:
//   // create an array with the values to be joined
//   var gridTemplateAreasArray = [];
//   var gridTemplateAreasString = '';
//   // var pattern = 'squaresAndRectangles';
//   // for loop to create each row/string for grid-template-areas value
//   for (var i = 0; i < dimensions; i++) {
//     var gridTemplateAreasArrayItem = '';
//     // for loop to populate the length of each row/string according to dimensions input by user
//     for (var j = 0; j < dimensions; j++) {
//         gridTemplateAreasArrayItem += 'grid-unit ';
//     }
//     gridTemplateAreasArray.push(gridTemplateAreasArrayItem);
//   }
//   // wrap each value from the array above in "" (quotes) and join with a space in between each and wrap the final value in `` (backtick characters)
//   var gridTemplateAreasStringGenerator = function() {
//     for (var i = 0; i < gridTemplateAreasArray.length; i++) {
//       gridTemplateAreasString += `"${gridTemplateAreasArray[i]}" `;
//     }
//     gridTemplateAreasString = gridTemplateAreasString.trim();
//     gridContainer.style.gridTemplateAreas = gridTemplateAreasString;
//   }();
//   // the code block directly above replaces the need to use .map() and .join():
//   // gridTemplateAreasArray = gridTemplateAreasArray.map(i => `"${i}"`);
//   // gridContainer.style.gridTemplateAreas = gridTemplateAreasArray.join(' ');

  // `"'. . . . . . . . . .'"`,
  // `"'. bigSquare1 bigSquare1 . bigSquare2 bigSquare2 . bigSquare3 bigSquare3 .'"`,
  // `"'. bigSquare1 bigSquare1 . bigSquare2 bigSquare2 . bigSquare3 bigSquare3 .'"`,
  // `"'. . . . . . . . . .'"`,
  // `"'. bigSquare4 bigSquare4 . bigSquare5 bigSquare5 . bigSquare6 bigSquare6 .'"`,
  // `"'. bigSquare4 bigSquare4 . bigSquare5 bigSquare5 . bigSquare6 bigSquare6 .'"`,
  // `"'. . . . . . . . . .'"`,
  // `"'. bigSquare7 bigSquare7 . bigSquare8 bigSquare8 . bigSquare9 bigSquare9 .'"`,
  // `"'. bigSquare7 bigSquare7 . bigSquare8 bigSquare8 . bigSquare9 bigSquare9 .'"`,
  // `"'. . . . . . . . . .'"`