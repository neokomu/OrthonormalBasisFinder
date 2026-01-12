/**
 * File: graph.js
 * ----------------------------------------
 * Updates based on UI Design:
 * 1. Background must blend with the dark UI (#1e1e1e approx).
 * 2. "Reset View" button is an overlay inside the graph container.
 * 3. Legend is a custom overlay in the bottom-left, not the default Plotly legend.
 */

/* =========================================
   SECTION 1: LAYOUT CONFIG
   ========================================= */

// --- Function: Get Layout Config ---
// TODO: Return Plotly layout object:
//       - paper_bgcolor: 'rgba(0,0,0,0)' (transparent to match CSS).
//       - plot_bgcolor: 'rgba(0,0,0,0)'.
//       - showlegend: false (Since we have a custom HTML legend in the UI).
//       - margin: { t: 0, b: 0, l: 0, r: 0 } (Use full space).
//       - scene: {
//             xaxis: { showgrid: false, zeroline: true, visible: false },
//             // ... hide axes labels if aiming for the clean look in the image
//         }

/* =========================================
   SECTION 2: RENDERING
   ========================================= */

// --- Function: Render Graph ---
// TODO: Receive original vectors (v1, v2) and result vectors (e1, e2).
// TODO: Add Traces:
//       - Use specific colors from the design:
//         - v1: Red, v2: Yellow
//         - e1: Green, e2: Purple
// TODO: Draw arrows (using cones or line markers).

/* =========================================
   SECTION 3: INTERACTION
   ========================================= */

// --- Function: Reset View ---
// TODO: Bind click event to the HTML "Reset View" button (id="reset-view-btn").
// TODO: Use Plotly.relayout() to restore default camera eye/center.