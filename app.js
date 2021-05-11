function randomColourGenerator() {
  var colourPalette = ['black', 'blue', 'brown', 'green', 'gray', 'yellow', 'orange', 'red', 'purple', 'white', 'turquoise'];
  var randomArrayIndex = Math.floor(Math.random() * colourPalette.length);
  return colourPalette[randomArrayIndex];
}

// function renderGrid(pattern) {
//   var numberOfGridUnits = 0;
//   var bigSquares = 0;
//   var gridTemplateAreaString = '';


//   if (pattern === 'defaultPattern') {
//     numberOfGridUnits = 100;
//   }

//   if (pattern === 'smallSquareBigSquarePattern') {
//     numberOfGridUnits = 73;
//     bigSquares = 9;
//     gridTemplateAreaString =
//       `". . . . . . . . . ."
//       ". grid-unit1 grid-unit1 . grid-unit2 grid-unit2 . grid-unit3 grid-unit3 ."
//       ". grid-unit1 grid-unit1 . grid-unit2 grid-unit2 . grid-unit3 grid-unit3 ."
//       ". . . . . . . . . ."
//       ". grid-unit4 grid-unit4 . grid-unit5 grid-unit5 . grid-unit6 grid-unit6 ."
//       ". grid-unit4 grid-unit4 . grid-unit5 grid-unit5 . grid-unit6 grid-unit6 ."
//       ". . . . . . . . . ."
//       ". grid-unit7 grid-unit7 . grid-unit8 grid-unit8 . grid-unit9 grid-unit9 ."
//       ". grid-unit7 grid-unit7 . grid-unit8 grid-unit8 . grid-unit9 grid-unit9 ."
//       ". . . . . . . . . ."`;
//   }

//   if (pattern === 'funkyPattern') {
//     numberOfGridUnits = 76;
//     bigSquares = 14;
//     gridTemplateAreaString =
//       `"grid-unit1 grid-unit1 . . grid-unit14 . . grid-unit2 grid-unit2 grid-unit2"
//       ". . . . grid-unit14 . grid-unit4 . . ."
//       ". grid-unit3 grid-unit3 . . . grid-unit4 . . grid-unit8"
//       "grid-unit5 . grid-unit6 grid-unit6 . . . . . grid-unit8"
//       "grid-unit5 . . . . . grid-unit7 grid-unit7 . grid-unit8"
//       "grid-unit5 . grid-unit9 grid-unit9 . . . . . grid-unit8"
//       ". . grid-unit9 grid-unit9 . grid-unit12 grid-unit12 . . grid-unit8"
//       ". . . . . grid-unit12 grid-unit12 . . ."
//       ". grid-unit10 . . . . . . grid-unit13 ."
//       ". grid-unit10 . grid-unit11 grid-unit11 grid-unit11 . . grid-unit13 ."`;
//   }

//   if (pattern === 'testPattern') {
//     numberOfGridUnits = 30;
//     bigSquares = 1;
//     gridTemplateAreaString =
//       `"grid-unit1 grid-unit1 ."
//       "grid-unit1 grid-unit1 ."
//       ". . ."`;
//   }

//   // ******
//   // BELOW CODE SHOWS THAT YOU CAN HAVE MULTIPLE DIVS NEXT TO EACH OTHER WITH SAME gridArea will join it all up.
//   var gridContainer = document.getElementById('grid-container');
//   gridContainer.innerHTML = '';

//   for (var i = 0; i < 9; i++) {
//     var gridUnit = document.createElement('div');
//     gridUnit.classList.add('grid-unit');
//     gridUnit.setAttribute('id', 'grid-unit' + i);
//     gridContainer.appendChild(gridUnit);
//   }

//   gridContainer.childNodes[0].style.gridArea = 'grid-unit1';
//   // gridContainer.childNodes[1].style.gridArea = 'grid-unit1';
//   // gridContainer.childNodes[3].style.gridArea = 'grid-unit1';
//   // gridContainer.childNodes[4].style.gridArea = 'grid-unit1';

//   gridContainer.style.gridTemplateColumns = `repeat(3, 1fr)`;
//   gridContainer.style.gridTemplateRows = `repeat(3, 1fr)`;
//   gridContainer.style.gridTemplateAreas = gridTemplateAreaString;

//   // ******

//   // var gridContainer = document.getElementById('grid-container');
//   // gridContainer.innerHTML = '';

//   // for (var i = 0; i < numberOfGridUnits; i++) {
//   //   var gridUnit = document.createElement('div');
//   //   gridUnit.classList.add('grid-unit');
//   //   gridUnit.setAttribute('id', 'grid-unit' + i);
//   //   gridContainer.appendChild(gridUnit);

//   //   if (i < bigSquares) {
//   //     gridUnit.style.gridArea = 'grid-unit' + (i + 1);
//   //   }
//   // }

//   // gridContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
//   // gridContainer.style.gridTemplateRows = `repeat(10, 1fr)`;
//   // gridContainer.style.gridTemplateAreas = gridTemplateAreaString;
// }

function renderGrid(dimensions) {
  var gridContainer = document.getElementById('grid-container');
  gridContainer.innerText = '';

  gridContainer.style.gridTemplateColumns = `repeat(${dimensions}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${dimensions}, 1fr)`;

  var gridTemplateAreasArrayUnformatted = [];
  var gridTemplateAreasArrayFormatted = [];

  for (var i = 0; i < dimensions * dimensions; i++) {
    var gridUnit = document.createElement('div');
    gridUnit.classList.add('grid-unit');
    gridUnit.setAttribute('id', 'grid-unit' + i);
    gridUnit.setAttribute('shape', 'oneByOneShape');
    gridContainer.appendChild(gridUnit);
    gridTemplateAreasArrayUnformatted.push('.');
  }
  var usedGridUnits = [];
  // loop through all the gridUnits and determine whether each one is a specialSquare or not
  // if yes, decide which special square, set the gridArea, delete the other squares that would fall into its area
  // then add to array string.
  for (var i = 0; i < gridContainer.childNodes.length; i++) {
    var decideIfSpecialSquare = Math.random();
    if (decideIfSpecialSquare > 0.80) {
      var decideSpecialSquareType = Math.random();
      // if (decideSpecialSquareType < 0.10) {
      if (decideSpecialSquareType < 0.25) {
        // only proceed if required gridUnits have not been used yet
        if (usedGridUnits.includes(i) === false && usedGridUnits.includes(i + 1) === false && usedGridUnits.includes(i + dimensions) === false && usedGridUnits.includes(i + dimensions + 1) === false) {
          // only proceed if required gridUnits exist
          if (i + 1 < dimensions * dimensions && i + dimensions < dimensions * dimensions && i + dimensions + 1 < dimensions * dimensions) {
            // only proceed if required gridUnits does not go over to next line
            if ((i + 1) % dimensions != 0) {
              gridContainer.childNodes[i].setAttribute('shape', 'twoByTwoShape');
              gridContainer.childNodes[i].style.gridArea = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i] = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i + 1] = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i + dimensions] = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i + dimensions + 1] = 'specialSquare' + i;
              usedGridUnits.push(i + 1);
              usedGridUnits.push(i + dimensions);
              usedGridUnits.push(i + dimensions + 1);
            }
          }
        }
      } else if (decideSpecialSquareType < 0.68) {
        if (usedGridUnits.includes(i) === false && usedGridUnits.includes(i + dimensions) === false) {
           if (i + dimensions < dimensions * dimensions) {
              if ((i + 1) % dimensions != 0) {
              gridContainer.childNodes[i].setAttribute('shape', 'oneByTwoShape');
              gridContainer.childNodes[i].style.gridArea = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i] = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i + dimensions] = 'specialSquare' + i;
              usedGridUnits.push(i + dimensions);
            }
          }
        }
      } else if (decideSpecialSquareType < 1) {
        if (usedGridUnits.includes(i) === false && usedGridUnits.includes(i + 1) === false) {
          if (i + 1 < dimensions * dimensions) {
             if ((i + 1) % dimensions != 0) {
              gridContainer.childNodes[i].setAttribute('shape', 'twoByOneShape');
              gridContainer.childNodes[i].style.gridArea = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i] = 'specialSquare' + i;
              gridTemplateAreasArrayUnformatted[i + 1] = 'specialSquare' + i;
              usedGridUnits.push(i + 1);
           }
         }
        }
      }
    } 
  }

  for (var i = 0; i < usedGridUnits.length; i++) {
    var getRidOf = document.getElementById(`grid-unit${usedGridUnits[i]}`);
    getRidOf.remove();
  }

  var gridTemplateAreasRowArray = [];
  do {
    for (var i = 0; i < dimensions; i++) {
      gridTemplateAreasRowArray.push(gridTemplateAreasArrayUnformatted[i]);
    }
    var gridTemplateAreasRowArrayToString = gridTemplateAreasRowArray.join(' ')
    gridTemplateAreasArrayFormatted.push(gridTemplateAreasRowArrayToString);
    gridTemplateAreasRowArray = [];


    for (var j = 0; j < dimensions; j++) {
      gridTemplateAreasArrayUnformatted.shift();
    }
  } while (gridTemplateAreasArrayUnformatted.length > 0);

  var gridTemplateAreasString = ''

  for (var i = 0; i < gridTemplateAreasArrayFormatted.length; i++) {
    gridTemplateAreasString += `"${gridTemplateAreasArrayFormatted[i]}" `;
  }

  gridContainer.style.gridTemplateAreas = gridTemplateAreasString;
}



function setupButtonsAndEventListeners() {
  var changeGridSizeButton = document.getElementById('change-grid-size-button');
  changeGridSizeButton.addEventListener('click', function () {
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
  resetButton.addEventListener('click', function () {
    var gridUnits = Array.from(document.querySelectorAll('.grid-unit'));
    gridUnits.forEach(function (gridUnit) {
      gridUnit.style.background = 'rgb(250, 194, 194)';
    });
  });
}

var gridContainer = document.getElementById('grid-container');
gridContainer.addEventListener('mouseover', function (event) {
  if (event.target.className === 'grid-unit') {
    event.target.style.background = randomColourGenerator();
  }
});

function initialise() {
  setupButtonsAndEventListeners();
  renderGrid(10);
}

initialise();

// // code for grid-template-areas for later:
//   // create an array with the values to be joined
//   var gridTemplateAreasArrayUnformatted = [];
//   var gridTemplateAreasString = '';
//   // var pattern = 'squaresAndRectangles';
//   // for loop to create each row/string for grid-template-areas value
//   for (var i = 0; i < dimensions; i++) {
//     var gridTemplateAreasArrayUnformattedItem = '';
//     // for loop to populate the length of each row/string according to dimensions input by user
//     for (var j = 0; j < dimensions; j++) {
//         gridTemplateAreasArrayUnformattedItem += 'grid-unit ';
//     }
//     gridTemplateAreasArrayUnformatted.push(gridTemplateAreasArrayUnformattedItem);
//   }
//   // wrap each value from the array above in "" (quotes) and join with a space in between each and wrap the final value in `` (backtick characters)
//   var gridTemplateAreasStringGenerator = function() {
//     for (var i = 0; i < gridTemplateAreasArrayUnformatted.length; i++) {
//       gridTemplateAreasString += `"${gridTemplateAreasArrayUnformatted[i]}" `;
//     }
//     gridTemplateAreasString = gridTemplateAreasString.trim();
//     gridContainer.style.gridTemplateAreas = gridTemplateAreasString;
//   }();
//   // the code block directly above replaces the need to use .map() and .join():
//   // gridTemplateAreasArrayUnformatted = gridTemplateAreasArrayUnformatted.map(i => `"${i}"`);
//   // gridContainer.style.gridTemplateAreas = gridTemplateAreasArrayUnformatted.join(' ');