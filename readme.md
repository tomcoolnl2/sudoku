# Sudoku

-   Horizontally adjacent rows are a band, and vertically adjacent columns are a stack
-   The initially defined values are clues or givens
-   An ordinary Sudoku (i.e. a proper Sudoku) has one solution
-   Rows, columns and regions can be collectively referred to as groups, of which the grid has 27

## Development

Run `yarn` and then `yarn start` to start a local development environment at [localhost:8080](http://localhost:8080).

## Production build

To create an optimized production build, run `yarn build`; ready for deployment.
To run and test it locally with a browser, run `npx http-server build/`.

## Test locally

Run `yarn lint` to lint all TypeScript code.
To run unit- and DOM/Snapshot tests, run `yarn test`. There is also a configuration for debugging Jest in VSCOde. This will also include coverage.
