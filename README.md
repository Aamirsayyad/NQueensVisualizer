# 👑 N-Queens Visualizer

A JavaScript visualization of the N-Queens backtracking problem — place queens manually and watch attack detection in real time, or let the backtracking algorithm solve it and step through every solution.

---

# Current Progress

## ✅ Completed

- Dynamic board generation (4–10 queens), with input validation
- Manual queen placement/removal by click
- Full 8-directional attack visualization (rows, columns, both diagonals) via direction-vector traversal
- Win/fail detection on manual play
- Backtracking solver — precomputes **all** valid solutions for the given N
- Animated playback of the search/backtracking process (Start button)
- Step-through navigation between precomputed solutions (Next button)
- Race-condition-safe animation: rapid clicking (Start/Next) no longer causes flashing or ghost queens — solved via an incrementing "animation token" that lets stale async animation calls detect they've been superseded and bail out cleanly
- Collapsible results side panel
- JSDoc documentation across core functions

## 🚧 In Progress

- Previous Solution button (step backward through precomputed solutions)
- UI refinement pass (visual direction TBD — leaning clean/minimal or dark "dev tool" aesthetic)

---

# Project Structure

## HTML
Input field, Start/Next(/Previous) controls, error messaging, chessboard container, results side panel.

## CSS
Board/cell coloring, queen sprite, attack-state colors (`occupiedWhite`, `occupiedBlack`, `danger`), button styling, slide-in results panel. **Not yet responsive** — fixed-width board and container currently break on narrow viewports; this is a known gap to address during UI refinement.

## JavaScript Architecture

### Board & Input
- **`validateInput()`** — validates N is within 4–10, shows errors, triggers board build on success
- **`buildBoard()`** — clears and rebuilds the NxN grid, populates `BoardMatrix` (2D array of DOM cell references), attaches listeners
- **`addCellEventListeners()`** — wires click handling to every cell

### Manual Play
- **`updateQueens(target, m, n)`** — central driver: toggles a queen, updates `CurrentQueens`, triggers attack recalculation, updates result/description UI
- **`updateBoardAttacks()` / `clearAttackIndicators()` / `expandSight(m, n)` / `markAttackedCells(i, j)`** — attack detection, using a single direction-vector loop (`DR` array of `[di, dj]` pairs) rather than 8 duplicated traversals
- **`areQueensUnderAttack()` / `calculateAndDisplayResult()` / `displayRightResult()`** — win/fail evaluation and feedback

### Solver & Animation
- **`generateSolutions()` / `buildPsuedoBoard()` / `solveNQueens(rowNo)`** — silent backtracking solver; unlike the live/manual attack check, uses a lightweight numeric `PsuedoBoard` (not DOM classes) for speed, and collects *every* full valid arrangement into `Solutions` rather than stopping at the first
- **`isSafeToPlace(m, n)`** — solver-side safety check (checks only upward/diagonal-upward, since it's used row-by-row top-down)
- **`animate()`** — plays back a chosen solution from `Solutions[currSolIdx]` onto the board, queen by queen, with delay
- **`animationToken`** — global counter incremented on every Start/Next click; each `animate()` call captures it at birth and checks it before every action, so a superseded (stale) call detects this and exits without interfering with the current one

---

# Key Variables

| Variable | Purpose |
|---|---|
| `BoardMatrix` | 2D array of DOM cell references |
| `N` | current board size |
| `CurrentQueens` | `[row, col]` pairs currently on the board (manual play state) |
| `Solutions` | all precomputed valid solutions, each as an N×N 0/1 `PsuedoBoard` snapshot |
| `currSolIdx` | index into `Solutions` for the currently displayed solution |
| `animationToken` | staleness guard for concurrent/rapid animation calls |

---

# Immediate Next Steps

1. **Previous Solution button** — mirror of Next's `(currSolIdx + 1) % Solutions.length` logic, decrementing instead; needs care around JS's negative-modulo behavior (`-1 % N` ≠ `N - 1` in JS) and should reuse the existing `animationToken` guard rather than duplicating concurrency logic.
2. **UI refinement pass** — pick and commit to one visual direction, fix non-responsive layout (fixed `50px` cells, `min-width: 400px` container), general polish.

---

# Future Features (Backlog)

## Optimization
- Reference-counted attack tracking (shared_ptr-style) instead of full-board clear-and-recompute — deprioritized; not worth it at N ≤ 10, revisit only as a stretch exercise post-completion

## Controls
- Speed slider for animation
- Pause/resume mid-search (not just mid-solution-playback)

## Stats
- Recursive call count, backtrack count, time taken — surfaced during/after solve

## Polish
- Sound effects on queen placement/removal
- Smooth queen movement transitions vs. instant class toggle
- Responsive layout (mobile-friendly board and container)

---

# Concepts Practiced
DOM manipulation, CSS Grid, event listeners, 2D arrays, recursion/backtracking, async/await, Promises, race-condition handling in async UI code, JSDoc documentation, modular function design, state-driven UI updates.

# Concepts Still to Learn
RequestAnimationFrame, localStorage, responsive CSS (media queries, flexible units), backend integration (planned as a separate full-stack project before returning here).

---

# Goal
A clean, well-documented visualization of the N-Queens backtracking algorithm — both as a portfolio piece and as practice ground for state management and async UI patterns ahead of moving into React.
