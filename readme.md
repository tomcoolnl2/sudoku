[ ] Convert into a class, (singleton?)
[x] Reset/New Game button
[ ] Create better method, incl generic for creating grid/rows 9xN
[x] Refactor checkGrid -> array.flat().inlcudes(0)
[x] copyGrid -> [...grid]: would it be enough?
[x] Use Region for Block
[x] Set different color for user input
[ ] Add favicon.ico
[ ] Add proper JSDocs to make Intellisence happy
[ ] Analize performance of reset functionality
[ ] Add Unit tests for the Redux Reducer: https://betterprogramming.pub/unit-testing-react-redux-hooks-ce7d69e1e834
[ ] Add snapshot/DOM tests for any react component
[ ] Add Dark/Light mode theme: https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
[ ] 9 as a cont/variable and use it as it's calculations
[ ] Investigate a better `solve` method acc to: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
[ ] 100% test coverage
[ ] Search for algorithms that better fit this program
[ ] Use chinese characters
[ ] Fix global/index stuff
[ ] Use floodfill-algorithm to animate solved rows/colums/regions/entire field
[ ] Highlight number of the same type as selected
[ ] Highlight row/column of selected
[ ] Make highlighting optional
[ ] Create a erase/clear functionality for a cell
[ ] When guessed the wrong input, show it anyway, but in error-red. It should be deletable
[ ] When all Cells for a number are revealed, remove/disable the button/option from the butons
[ ] Introduce a gameover state, e.g when a user guess 3 times wrong.
[ ] Add cypress e2e testing
[ ] Create a button to show hints for empty cells
[ ] Create options to allow and reveal a max amount of cells

-   Horizontally adjacent rows are a band, and vertically adjacent columns are a stack
-   The initially defined values are clues or givens
-   An ordinary Sudoku (i.e. a proper Sudoku) has one solution
-   Rows, columns and regions can be collectively referred to as groups, of which the grid has 27
