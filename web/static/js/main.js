/**
 * MEMBER A: LOGIC & INTEGRATION
 * File: main.js
 * ----------------------------------------
 * Updates based on UI Design:
 * 1. Manage TWO state variables: 'numVectors' (rows) and 'vectorDim' (cols).
 * 2. Regenerate the input grid whenever either counter changes.
 * 3. Handle the "Computation Complete" toast notification.
 */

/* =========================================
   SECTION 1: STATE MANAGEMENT
   ========================================= */
// TODO: Initialize State
// let state = {
//    numVectors: 2,  // Default as seen in UI
//    vectorDim: 3    // Default as seen in UI
// };

// TODO: Define Limits
// const MAX_VECTORS = 7;
// const MAX_DIM = 7;
// const MIN_VAL = 1;

/* =========================================
   SECTION 2: COUNTER LOGIC
   ========================================= */

// --- Function: Update Counters ---
// TODO: Select elements: 
//    - "Number of Vectors" (+) and (-) buttons and display span.
//    - "Size of Vectors" (+) and (-) buttons and display span.

// TODO: Add Event Listeners for "Number of Vectors":
//    - On (+): Increment state.numVectors (if < MAX). Update display. Call renderInputs().
//    - On (-): Decrement state.numVectors (if > MIN). Update display. Call renderInputs().

// TODO: Add Event Listeners for "Size of Vectors":
//    - On (+): Increment state.vectorDim (if < MAX). Update display. Call renderInputs().
//    - On (-): Decrement state.vectorDim (if > MIN). Update display. Call renderInputs().

/* =========================================
   SECTION 3: GRID GENERATION
   ========================================= */

// --- Function: Render Inputs (The Grid) ---
// TODO: Clear the current #vector-input-container.
// TODO: Loop from i = 0 to state.numVectors (Rows):
//       - Create a Row container (flexbox).
//       - Add label "v{i+1}".
//       - Loop from j = 0 to state.vectorDim (Cols):
//             - Create <input type="number">.
//             - Set placeholder or default value.
//             - Append input to Row.
//       - Append Row to Container.

/* =========================================
   SECTION 4: API & OUTPUT
   ========================================= */

// --- Function: Collect Data ---
// TODO: Iterate through rows and cols to build the matrix: [[x,y,z], [x,y,z]...]

// --- Function: Handle Response ---
// TODO: On success:
//       1. Populate the "Result Vectors" display area (text boxes above graph).
//       2. Call Member B's graph rendering function.
//       3. Show the "Computation Complete" green toast.
//          - Remove/Hide toast after 3 seconds or on click 'x'.