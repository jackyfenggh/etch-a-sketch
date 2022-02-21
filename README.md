This is the third project in the Odin Project foundations course.

The task is to build a browser version of something between a sketchpad and an Etch-A-Sketch.

Ramblings as I work on the project:

1. Generating the square divs and assigning properties with JS rather than in the html/css files. Setting the grid-template-areas property took ages because I'd forgotten about template literals and backtick characters. The issue was that I needed to assign style.gridTemplateAreas to a string with 'multiple strings' (?), e.g.:

style.gridTemplateAreas =
  ". . ."
  ". . ."
  ". . .", or "". . ." ". . ." ". . .""

At first I could only generate ". . . . . . . . ." but I eventually found a solution on stackoverflow which used .map() and .join() (the first time I've come across these methods): 

gridTemplateAreaArray = ['...', '...', '...']
gridTemplateAreaArray = gridTemplateAreaArray.map(row => `"${row}"`);
gridContainer.style.gridTemplateAreas = gridTemplateAreaArray.join(' ');

I got it working by roughly copying the code but I wanted to understand what was going on behind the two array methods. I researched the two methods + template literals + backtick characters further and was able to replicate the result of those two methods without using them! I'm not sure if I've done it in the best way possible but I'm happy that I was able to do so at all.

2. Turns out grid-template-areas wasn't needed to fulfil the assignment specs. This is because the required grid display only consists of squares that are all the same size. I'll try and find a use for that work- probably something to do with different sized squares/rectangles on the grid?

3. After building out most of what was required by the Odin Project requirements, I decided to add a few different ways of spawning the grid. For each pattern, I wrote an if statement in the renderGrid function which modified a few key values that were required to render the pattern. For example:

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

This was always intended for me to familiarise myself with the process of generating a grid with different sized squares. Once I get experience with this, I'm hoping to make the grid pattern randomly generated. Maybe I'll include the preset patterns as well as the randomly generated patterns in the final version.

4. Writing the code for randomly generated patterns was tough but rewarding! I spent way too much time debugging- it could have been a lot easier had I taken a more structured approach to checking my code. For example, since a lot of the code was based around Math.random, I didn't know whether each time I loaded the page that it would present the bug that I needed to solve, and I didn't want to step through the debugger only to find out it wasn't since there were a lot of if and for statements to step through. To get around this, I should have hardcoded some patterns that I knew were problematic and then stepped through the debugger that way. Instead, I tried to step through the code in my mind, which is a good exercise, but steps were often missed which made the whole process significantly less efficient/effective. 

The main problem with my implementation was that if a square was decided to be a special square, then remove the other unit squares that would fall in the area of the special square. For example, imagine a 3 by 3 grid:

1, 2, 3
4, 5, 6
7, 8, 9

If square 1 was decided to be a 2 by 2 special square, then remove squares 2, 4 and 5, to get something like this:

1, 1, 3
1, 1, 6
7, 8, 9

However, since the function makes use of `childNodes.length`, by removing the squares before the rest of the childNodes is iterated over, `childNodes.length` changes and things go out of order. In the above example, `childNodes.length[1]` should be square 2, but since it's removed, it's now square 3. Then all the other code that relies on i being equal to the original number of squares no longer works.

To fix this, I simply wrote the code so that it deleted the redundant squares after childNodes had been iterated from start to finish, when childNodes.length and the order of it all was no longer important.

5. Revisited this project to refactor the code. It took a while to understand what was going on in the code and I was the one that wrote it. I broke the renderGrid function into smaller functions, added explanations throughout the code and grouped similar functions together. I removed the need for a lot of the string processing required in the old renderGrid function by setting up gridTemplateAreasArray as a nested array of strings rather than one single string.

I will probably revisit this again in a few months and do more refactoring, but for now I'm pretty happy with where it is and I'd rather move on to my next project to pick up learning momentum again.

P.S. I only realised now that the README.md file gets automatically displayed on the main Git Hub page and should really be an explanation of the project rather than my ramblings. Oh well.