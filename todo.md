# Backlog

## Bugs / Urgent

-   [x] Snapshot test fail in watch for grid.test.tsx because the generated classnames keep updating somehow
    -   :+1: It blocks me from running a watch on jest when developing
-   [ ] Upping the difficulty causes the backtracking to look like infinite. Add a tracker to reset the calculation if exceeding an amount of recursion attempts? Or use fixed clues/numbers to limit back tracking?
-   [ ] App.tsx: Weird validation error causes the app to crash, but it works fine when disabling tslint

## Game play

-   [x] Convert into a class, (singleton?)
-   [x] Fix and cover proficient testing with Jest
-   [x] Reset/New Game button
-   [x] Create better method, incl generic for creating grid/rows 9xN
-   [x] Refactor checkGrid -> array.flat().inlcudes(0)
-   [x] copyGrid -> [...grid]: would it be enough?
-   [x] Use Region for Block
-   [x] Set different color for user input
-   [x] Register serviceworker to enable PWA/Offline support
-   [x] Create a persistence between reloads/tabs
-   [x] Add favicon.ico
-   [x] Write test for compareArrays
-   [x] Add snapshot/DOM tests for any react component
-   [x] 9 as a const/variable and use it as it's calculations
-   [x] Add Jest VSCode debugging
-   [x] Create custom hooks for keyboard events
-   [x] Fix global/index stuff
-   [x] Fix persitence bug for user input
-   [x] Add TSDocs and ESLint to make Intellisence happy
    -   https://github.com/microsoft/tsdoc/tree/master/eslint-plugin
-   [x] Highlight row/column of selected
-   [x] Add Dark/Light mode theme
    -   https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/
-   [x] Disable numbers-button when 9 selections of that nmber are present within the grid
-   [x] Select the first empty cell as default
-   [x] When selecting a number on the grid, select all cells with that number
-   [x] When guessed the wrong input, show it anyway, but in error-red.
    -   [x] It should be overwritable with either the solution or another next mistake (but not the same)
    -   [x] A cell can contain only one error value
    -   [x] Once a cell contains the solution, it can not be overwritten
    -   [x] A mistake will be removed from the state when overwritten (by either the solution or another mistake)
-   [x] Create a 'erase all mistakes' button
    -   [x] All mistake will be removed from the state when when the eraser is used
    -   [x] It will only be active if a mistake is made
-   [x] Convert the 'erase all' into a 'erase current'
    -   [x] When the selection event is fired, check if it contains a mistake
    -   [x] If so: enable button
    -   [x] Erase when pressed
-   [x] Investigate if High Order Reducers (HOR) are what we can use for the FILL_CELL action
    -   :no_entry: Nice to have, not really usefull for this situation
-   [x] Introduce React router to easily add screens for e.g. Game Over, Settings and initial.
    -   [x] Splash screen: Simple start button
    -   [x] Playing game screen
    -   [x] Settings screen
    -   [x] Simple navigation
-   [x] Write Readme.md
-   [x] Introduce a game-over state, e.g when a user guess 3 times wrong.
    -   [x] Alert when someone lost
-   [x] Add game settings to redux flow
-   [x] Make highlighting duplicates a setting
-   [x] Move HOCs specially made for snapshots into a test/ directory
-   [x] Make darkmode part of game settings
-   [x] When Game Over, move back to the splash screen after a notification/confirmation
-   [x] Create a snapshot test for App.tsx
-   [x] Create a snapshot test for DarkThemeProvider
-   [x] Add React Suspense/Lazy to promote async components and pages
-   [x] When selecting a number on the grid, highlight all cells within the current region
-   [x] Add number of mistakes input to splash screen and settings screen. Default to 3.
-   [x] Output ALL snapshots in /test/
    -   :no_entry: Not possibke with CRA
-   [ ] Add timer to track duration
-   [ ] Add pauze option
    -   [ ] When pauzed, block ui/screen
    -   [ ] Stop the timer
-   [ ] Log (and store) best time
-   [ ] Add difficulty levels Easy, Medium, Hard
    -   Does the current algorithm support that?
    -   Or are we going to introduce hard numbers/clues for that?
    -   [ ] reflect within settings
-   [ ] When we have connected a database, a Save option would save the redux state.

## Algorithms & performance

-   [ ] Analize performance of reset functionality
-   [ ] Backtrack Recursion icw generators/iterators https://leetcode.com/problems/permutations/discuss/790116/javascript-backtracking-using-generator-functions
-   [ ] Search for algorithms that better fit this program
    -   https://lisperator.net/blog/javascript-sudoku-solver/
    -   https://github.com/robatron/sudoku.js/
    -   https://codepen.io/pavlovsk/pen/XmjPOE
-   [ ] Investigate a better `solve` method acc to: https://en.wikipedia.org/wiki/Sudoku_solving_algorithms

## Testing

-   [ ] Test for checkbox toggling and button clicks
-   [ ] Test for disabled buttons with https://github.com/testing-library/jest-dom#tobedisabled
-   [ ] Test persistence with https://create-react-app.dev/docs/running-tests/#srcsetuptestsjs
-   [ ] Improve test coverage
-   [ ] Add Unit tests for the Redux Reducer: https://betterprogramming.pub/unit-testing-react-redux-hooks-ce7d69e1e834
-   [ ] Add cypress e2e testing

## Design & Animation

-   [ ] Add Styled Component for dropdown element
-   [ ] Add Styled Component for checkbox element
-   [ ] Create a nice loader as Suspense fallback
-   [ ] Choose a icon set for consistency
    -   https://www.flaticon.com/packs/miscellaneous-elements
    -   https://www.flaticon.com/packs/multimedia-collection
-   [ ] Use floodfill-algorithm to animate
    -   [ ] rows
    -   [ ] colums
    -   [ ] regions :grey_question:
    -   [ ] entire grid
-   [ ] Use hexagons as icon backgrounds
-   [ ] Icon navigation to the left

## Nice to haves

-   [ ] Dashboard with statistics for user?
-   [ ] Build a microservice in Node/NestJS that connects to a (headless) Database to store persistance/state.
    -   [ ] It should return a url/hash so when we open it, the redux state is restored to this state.
-   [ ] Docker for local development and testing
-   [ ] Create a button to show and add hints for empty cells
    -   [ ] Set a limit on the amount of hints
    -   [ ] make the limit dependant on the easy - medium - hard settings
-   [ ] Use hexagons icw icons https://www.npmjs.com/package/react-svg-hexagon-grid
-   [ ] Create a nice hexagon background (animation) with React/CSS? https://css-tricks.com/hexagons-and-beyond-flexible-responsive-grid-patterns-sans-media-queries/
-   [ ] Use chinese characters. Add switch for Cinese/Arabic numbers.
-   [ ] Manage content in Contentful
-   [ ] Move from Redux to RxJS https://dev.t-matix.com/blog/platform/why-we-migrated-our-state-management-system-from-redux-to-rxjs/
-   [ ] Monorepo with NX
-   [ ] NestJS Backend - for Mongoose? GraphQl?
-   [ ] Introduce React Native components
-   [ ] Introduce desktop version by Electron
-   [ ] CI/CD (CircleCI)
-   [ ] Deployment(s) on Azure/AWS
