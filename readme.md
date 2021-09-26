[x] Convert into a class, (singleton?)
[x] Fix and cover proficient testing with Jest
[x] Reset/New Game button
[x] Create better method, incl generic for creating grid/rows 9xN
[x] Refactor checkGrid -> array.flat().inlcudes(0)
[x] copyGrid -> [...grid]: would it be enough?
[x] Use Region for Block
[x] Set different color for user input
[x] Register serviceworker to enable PWA/Offline support
[x] Create a persistence between reloads/tabs
[x] Add favicon.ico
[x] Write test for compareArrays
[x] Add snapshot/DOM tests for any react component
[x] 9 as a const/variable and use it as it's calculations
[x] Add Jest VSCode debugging
[x] Create custom hooks for keyboard events
[x] Fix global/index stuff
[x] Fix persitence bug for user input
[x] Add TSDocs and ESLint to make Intellisence happy: https://github.com/microsoft/tsdoc/tree/master/eslint-plugin
[x] Highlight row/column of selected (flood-fill?)
[x] Add Dark/Light mode theme: https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
[ ] Analize performance of reset functionality
[ ] Disable numbers-button when 9 selections of that number are present within the grid
[ ] Test for disabled buttons with https://github.com/testing-library/jest-dom#tobedisabled
[ ] Add Unit tests for the Redux Reducer: https://betterprogramming.pub/unit-testing-react-redux-hooks-ce7d69e1e834
[ ] Test persistence with https://create-react-app.dev/docs/running-tests/#srcsetuptestsjs
[ ] Toggle theme with a custom hook: https://fettblog.eu/typescript-react-typeing-custom-hooks/
[ ] Investigate a better `solve` method acc to: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
[ ] Use chinese characters
[ ] Use floodfill-algorithm to animate solved rows/colums/regions/entire field
[ ] Highlight number of the same type as selected (flood-fill?)
[ ] Add difficulty levels Easy, Medium, Hard
[ ] Create a erase/clear functionality for a cell, when wrong value is put in
[ ] When guessed the wrong input, show it anyway, but in error-red. It should be deletable
[ ] When all Cells for a number are revealed, remove/disable the button/option from the butons
[ ] Introduce a gameover state, e.g when a user guess 3 times wrong.
[ ] Add cypress e2e testing
[ ] Create a button to show and add hints for empty cells
[ ] Add timer to track duration
[ ] Search for algorithms that better fit this program
[ ] Log best time
[ ] Make highlighting optional
[ ] 100% test coverage

-   Horizontally adjacent rows are a band, and vertically adjacent columns are a stack
-   The initially defined values are clues or givens
-   An ordinary Sudoku (i.e. a proper Sudoku) has one solution
-   Rows, columns and regions can be collectively referred to as groups, of which the grid has 27
