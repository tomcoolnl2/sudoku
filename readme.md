[ ] convert into a class, pref a singleton
[ ] Fix global/index stuff
[ ] Refactor checkGrid -> array.flat().inlcudes(0)
[x] copyGrid -> [...grid]: would it be enough?
[x] Use Region for Block
[ ] Search for algorithms that better fit this program
[ ] Use chinese characters
[ ] Add the sounds/pronounciation
[ ] 9 as a cont/variable and use it as it's calculations
[ ] Investigate a better `solve` method acc to: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms
[ ] 100% test coverage

-   Horizontally adjacent rows are a band, and vertically adjacent columns are a stack
-   The initially defined values are clues or givens
-   An ordinary Sudoku (i.e. a proper Sudoku) has one solution
-   Rows, columns and regions can be collectively referred to as groups, of which the grid has 27
