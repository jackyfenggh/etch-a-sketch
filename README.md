This is the third project in the Odin Project foundations course.

The task is to build a browser version of something between a sketchpad and an Etch-A-Sketch.

Interesting Points:

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

A few questions/topics to revisit:

1. My alternative to using .map() and .join().
2. Template literals + backtick characters.