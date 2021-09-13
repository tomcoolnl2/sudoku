[ ] convert into a class, pref a singleton
[ ] Fix global/index stuff
[ ] Reset/New Game button
[ ] Custom hook to create a row with 9xN
[x] Refactor checkGrid -> array.flat().inlcudes(0)
[x] copyGrid -> [...grid]: would it be enough?
[x] Use Region for Block
[x] Set different color for user input
[ ] Search for algorithms that better fit this program
[ ] Use chinese characters
[ ] Add Dark/Light mode theme: https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
[ ] Add the sounds/pronounciation
[ ] 9 as a cont/variable and use it as it's calculations
[ ] Investigate a better `solve` method acc to: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
[ ] 100% test coverage
[ ] Use floodfill to animate solved rows/colums/regions/entire field
[ ] Highlight number of the same type as selected
[ ] Highlight row/column of selected
[ ] Make highlighting optional
[ ] Create a erase/clear functionality for a cell
[ ] When guessed the wrong input, show it anyway, but in error-red
[ ] When all Cells for a number are revealed, remove/disable the buttion/option from the butons
[ ] Introduce a gameover state, e.g when a user guess 3 times wrong.

-   Horizontally adjacent rows are a band, and vertically adjacent columns are a stack
-   The initially defined values are clues or givens
-   An ordinary Sudoku (i.e. a proper Sudoku) has one solution
-   Rows, columns and regions can be collectively referred to as groups, of which the grid has 27
