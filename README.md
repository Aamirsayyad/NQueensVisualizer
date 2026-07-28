# 👑 N-Queens Visualizer

A JavaScript visualization of the famous N-Queens Backtracking problem.

The goal is to allow users to generate an NxN chessboard, place queens, visualize attacked cells, and eventually animate the complete backtracking algorithm.

---

# Current Progress

## ✅ Completed

- Dynamic board generation (4-10 Queens)
- Input validation
- Chessboard generation
- Dynamic CSS Grid creation
- Queen placement by clicking
- Queen removal
- Diagonal attack visualization
- Previous architecture refactoring
- Modular functions

---

# Project Structure

## HTML

Responsible for:

- Input field
- Submit button
- Start button
- Error message
- Chessboard container

---

## CSS

Responsible for:

- Page styling
- Chessboard colors
- Queen image
- Occupied cell colors
- Responsive container

Main classes:

- `.white`
- `.black`
- `.queen`
- `.occupiedWhite`
- `.occupiedBlack`
- `.hide`

---

## JavaScript Architecture

### validateInput()

Purpose:

- Validates user input.
- Allows only values between 4 and 10.
- Displays proper error messages.
- Builds board on success.

---

### buildBoard()

Purpose:

- Clears previous board.
- Creates new NxN board.
- Creates BoardMatrix (2D Array).
- Applies chessboard colors.
- Stores every DOM cell inside BoardMatrix.
- Attaches click listeners.

---

### addCellEventListeners()

Purpose:

Loops through every cell and attaches click listeners.

---

### addQueenToggleListener()

Purpose:

Attaches the click event to a single board cell.

When clicked:

- toggles queen
- updates attacked cells

---

### queenSight()

Purpose:

Determines whether a queen was added or removed.

Calls:

isOccupied(true)

or

isOccupied(false)

---

### isOccupied(flag,m,n)

Purpose:

Expands in all four diagonal directions.

Directions:

- ↖ Top Left
- ↗ Top Right
- ↙ Bottom Left
- ↘ Bottom Right

Each valid square calls

validateFlag()

---

### validateFlag()

Purpose:

Adds or removes occupied classes depending upon:

- flag
- square color

---

# Variables

## BoardMatrix

2D array storing every board cell.

Example

BoardMatrix[2][5] 

returns the DOM element of row 2 column 5.

---

## N

Stores board size.

---

# Future Features

## High Priority

- Horizontal attack visualization
- Vertical attack visualization
- Prevent invalid queen placement
- Count queens placed

---

## Animation

- Start button
- Backtracking visualization
- Recursive animation
- Delay between moves
- Current recursion highlighting

---

## Controls

- Pause
- Resume
- Speed Slider
- Reset

---

## Statistics

Display

- Recursive Calls
- Backtracks
- Queens Placed
- Time Taken

---

## UI Improvements

- Dark Mode
- Better animations
- Smooth queen movement
- Cell highlighting
- Responsive layout

---

# Concepts Practiced

- DOM Manipulation
- CSS Grid
- Event Listeners
- Arrays
- 2D Arrays
- Nested Loops
- Functions
- Modular Code
- ClassList
- Dynamic Elements
- State Management

---

# Concepts Still To Learn

- Async / Await animation
- Promise delays
- Backtracking visualization
- RequestAnimationFrame
- Local Storage
- Backend integration (optional)

---

# Goal

Build a professional visualization of the N-Queens Backtracking Algorithm that demonstrates both the algorithm and clean JavaScript architecture.