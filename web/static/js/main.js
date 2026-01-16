/**
 * File: main.js
 * ----------------------------------------
 * Updates based on UI Design:
 * 1. Manage TWO state variables: 'numVectors' (rows) and 'vectorSize' (cols).
 * 2. Regenerate the input grid whenever either counter changes.
 * 3. Handle the toast notifications.
 */

/* =========================================
   SECTION 1: STATE MANAGEMENT
   ========================================= */

let numVectors = 0;
let vectorSize = 0;

const numVectorsInput = document.getElementById("numVectors");
const vectorSizeInput = document.getElementById("vectorSize");
const vectorInputDiv = document.getElementById("vectorInput");
const clearBtn = document.getElementById("clearBtn");
const computeBtn = document.getElementById("computeBtn");
const toast = document.getElementById("toast");
const closeToastBtn = document.getElementById("closeToastBtn");
let toastTimeout;


/* =========================================
   SECTION 2: COUNTER LOGIC
   ========================================= */

// --- Function: Update Counters ---

// Constants
const MAX_SIZE = 7;

// Select Buttons
const btnIncVectors = document.getElementById("btnIncVectors");
const btnIncSize    = document.getElementById("btnIncSize");

function updateConstraints() {
    // Enforce Max Size of 7
    if (vectorSize > MAX_SIZE) {
        vectorSize = MAX_SIZE;
        vectorSizeInput.value = MAX_SIZE;
    }

    // Enforce Number of Vectors <= Size
    if (numVectors > vectorSize) {
        numVectors = vectorSize;
        numVectorsInput.value = vectorSize;
    }

    // Disable "Add Vector" if limit reached
    btnIncVectors.disabled = (numVectors >= vectorSize);

    // Disable "Add Size" if limit reached
    btnIncSize.disabled = (vectorSize >= MAX_SIZE);

    // Disable "Add Vector" if Size is 0
    if (vectorSize === 0) btnIncVectors.disabled = true;
}

function changeVectors(delta) {
    let current = parseInt(numVectorsInput.value) || 0;
    let newValue = Math.max(0, current + delta);

    if (delta < 0 && newValue < numVectors) {
        const vectorCols = vectorInputDiv.getElementsByClassName("vector");
        const colToRemove = vectorCols[newValue];

        if (colToRemove) {
            colToRemove.classList.add('pop-out'); // Trigger CSS animation
        }

        // Update State immediately
        numVectors = newValue;
        numVectorsInput.value = newValue;
        updateConstraints();

        // Wait for animation
        setTimeout(renderInputs, 250);
        return;
    }

    numVectors = newValue;
    numVectorsInput.value = newValue;

    updateConstraints();
    renderInputs();
}

function changeSize(delta) {
    let current = parseInt(vectorSizeInput.value) || 0;
    let newValue = Math.max(0, current + delta);

    if (delta < 0 && newValue < vectorSize) {
        const rows = vectorInputDiv.querySelectorAll('.vector');

        rows.forEach(row => {
            const inputToRemove = row.children[newValue + 1];
            if (inputToRemove) {
                inputToRemove.classList.add('pop-out');
            }
        });

        // Update State
        vectorSize = newValue;
        vectorSizeInput.value = newValue;
        updateConstraints();

        // Wait for animation
        setTimeout(renderInputs, 250);
        return;
    }

    vectorSize = newValue;
    vectorSizeInput.value = newValue;

    updateConstraints();
    renderInputs();
}

function attachCounterListeners() {
    const inputs = [numVectorsInput, vectorSizeInput];

    inputs.forEach(input => {

        input.addEventListener("keydown", (e) => {
            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
            if (allowedKeys.includes(e.key)) return;

            if (/^[0-9]$/.test(e.key)) return;

            e.preventDefault();
        });

        input.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            let val = parseInt(e.target.value);

            if (isNaN(val) || val < 0) val = 0;

            if (e.target.id === "numVectors") {
                numVectors = val;
            } else {
                vectorSize = val;
            }
            updateConstraints();
            renderInputs();
        });

        input.addEventListener("blur", (e) => {
            if (e.target.value === "") {
                e.target.value = "0";
                if (e.target.id === "numVectors") numVectors = 0;
                else vectorSize = 0;
                updateConstraints();
                renderInputs();
            }
        });
    });
}

attachCounterListeners();
updateConstraints();
renderInputs();

/* =========================================
   SECTION 3: GRID GENERATION
   ========================================= */

// --- Function: Render Inputs ---

function renderInputs() {
    // Capture existing values before wiping
    const savedValues = [];
    const vectorDivs = vectorInputDiv.querySelectorAll(".vector");
    vectorDivs.forEach((vecDiv) => {
        const inputs = vecDiv.querySelectorAll("input");
        const colVals = [];
        inputs.forEach(inp => colVals.push(inp.value));
        savedValues.push(colVals);
    });

    // Clear the grid
    vectorInputDiv.innerHTML = "";

    if (numVectors === 0 || vectorSize === 0) {
        vectorInputDiv.classList.add("empty-state");
        vectorInputDiv.textContent = "No input detected";
        computeBtn.classList.remove("active");
        if (typeof clearBtn !== 'undefined' && clearBtn) {
            clearBtn.classList.remove("show");
        }
        return;
    }

    // Reset alignment to top when we have inputs
    vectorInputDiv.classList.remove("empty-state");

    for (let i = 0; i < numVectors; i++) {
        const row = document.createElement("div");
        row.className = "vector";

        const label = document.createElement("div");
        label.className = "vector-label";
        label.textContent = `v${i + 1}`;
        if (!savedValues[i]) {
            label.classList.add("pop-in");
        }
        row.appendChild(label);

        for (let j = 0; j < vectorSize; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.inputMode = "decimal";
            input.placeholder = "0";

            input.addEventListener("keydown", (e) => {
                // Allow Navigation Keys (Backspace, Delete, Tab, Arrows, Enter)
                const navKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter", "Home", "End"];
                if (navKeys.includes(e.key)) return;

                // Allow Control Combinations (Ctrl+C, Ctrl+V, Ctrl+A)
                if (e.ctrlKey || e.metaKey) return;

                // Predictive Validation for Input Characters
                const allowedChars = /^[0-9./-]$/;

                if (allowedChars.test(e.key)) {
                    const currentVal = input.value;
                    const start = input.selectionStart;
                    const end = input.selectionEnd;

                    // (Text before cursor) + (New Key) + (Text after cursor)
                    const nextVal = currentVal.substring(0, start) + e.key + currentVal.substring(end);

                    // Validate against the regex
                    // Allow optional negative, digits, optional dot+digits,
                    //       optional slash group (slash, optional negative, digits, optional dot+digits)
                    const regex = /^-?\d*(\.\d*)?(\/-?\d*(\.\d*)?)?$/;

                    if (regex.test(nextVal)) {
                        return;
                    }
                }
                e.preventDefault();
            });

            // Block pasting of invalid text
            input.addEventListener("paste", (e) => {
                const pasteData = (e.clipboardData || window.clipboardData).getData('text');
                // Allows negatives, decimals, and fractions
                if (!/^-?\d*\.?\d*(\/-?\d*\.?\d*)?$/.test(pasteData)) {
                    e.preventDefault();
                }
            });

            input.addEventListener("input", validateInput);

            const oldVal = savedValues[i] && savedValues[i][j];

            if (oldVal !== undefined) {
                input.value = oldVal;
            } else {
                input.classList.add("pop-in");
                input.style.animationDelay = `${j * 0.05}s`; // Slight ripple for new rows
            }

            row.appendChild(input);
        }
        vectorInputDiv.appendChild(row);
    }
    validateInput();
}


/* =========================================
   SECTION 4: API & OUTPUT
   ========================================= */

function showToast(title, message, isError = false) {
    const toastTitle = document.querySelector(".toast-title");
    const toastMessage = document.querySelector(".toast-message");

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    if (isError) {
        toast.classList.add("error");
    } else {
        toast.classList.remove("error");
    }

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

if (closeToastBtn) {
    closeToastBtn.addEventListener("click", () => {
        toast.classList.remove("show");
        clearTimeout(toastTimeout); // Stop the auto-close timer if user closed it manually
    });
}

function validateInput() {
    const inputs = vectorInputDiv.querySelectorAll("input");
    let allFilled = true;
    let hasAnyInput = false;

    inputs.forEach(input => {
        const val = input.value.trim();
        if (val === "" || val === "-" || val === "." || val === "/" || val.endsWith("/") || val.startsWith("/")) {
            allFilled = false;
        }
        if (val !== "") {
            hasAnyInput = true;
        }
    });

    if (clearBtn) {
        clearBtn.classList.toggle("show", hasAnyInput);
    }
    computeBtn.classList.toggle("active", allFilled && inputs.length > 0);
}

if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        const inputs = vectorInputDiv.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = ""; // Wipe the text
            input.style.borderColor = "#333"; // Reset any red borders
        });

        // Re-validate to update button states (disable Clear, disable Compute)
        validateInput();
    });
}

computeBtn.addEventListener("click", async () => {
    if (!computeBtn.classList.contains("active")) return;

    // Gather Data
    const vectorRows = vectorInputDiv.querySelectorAll(".vector");
    const payload = [];

    // Loop to 'return' (stop) immediately on error
    for (const row of vectorRows) {
        const inputs = row.querySelectorAll("input");
        const vectorValues = [];

        for (const input of inputs) {
            const val = input.value;
            let numberValue;

            if (val.includes("/")) {
                const parts = val.split("/");
                const numerator = parseFloat(parts[0]); // Handles "1" in "1/0"
                const denominator = parseFloat(parts[1]); // Handles "0"

                if (denominator === 0) {
                    document.querySelector(".output").style.display = "none";
                    showToast("Invalid input", "Division by zero is not valid input.", true);
                    input.focus(); // Highlight the bad input
                    return;
                }
                numberValue = numerator / denominator;
            } else {
                numberValue = parseFloat(val);
            }
            vectorValues.push(numberValue);
        }
        // Add the finished row to the payload
        payload.push(vectorValues);
    }

    // Send Request to Flask
    try {
        const response = await fetch('/api/orthonormalize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) { throw new Error(data.error || "Computation failed"); }

        // Clear previous results
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";

        // Render Results
        data.vectors.forEach((vector, index) => {
            const row = document.createElement("div");
            row.className = "vector";

            const label = document.createElement("div");
            label.className = "vector-label";
            label.textContent = `u${index + 1}`;
            row.appendChild(label);

            vector.forEach(num => {
                const box = document.createElement("div");
                box.className = "result-box";
                const span = document.createElement("span");
                span.style.fontFamily = "'Computer Modern Serif', serif";
                const valueStr = num.toFixed(8);
                span.textContent = valueStr;
                box.appendChild(span);
                box.title = valueStr; // note
                row.appendChild(box);
            });
            resultsContainer.appendChild(row);
        });

        // Render the Graph
        const graphDiv = document.getElementById('graphPlot');

        // Choose 2D or 3D based on vector size
        let figureJSON = null;
        if (vectorSize === 2) {
            figureJSON = JSON.parse(data.fig2d);
        } else if (vectorSize === 3) {
            figureJSON = JSON.parse(data.fig3d);
        }

        if (figureJSON) {
            // Plotly layout adjustments (temporary to test)
            figureJSON.layout.paper_bgcolor = '#111'; // Match var(--panel)
            figureJSON.layout.plot_bgcolor = '#111';
            figureJSON.layout.font = { color: '#eaeaea' }; // Match var(--text)

            // Render the plot
            Plotly.newPlot(graphDiv, figureJSON.data, figureJSON.layout, {responsive: true});
        }

        // Show Output
        const outputDiv = document.querySelector(".output");
        outputDiv.style.display = "block";

        const rect = outputDiv.getBoundingClientRect();
        if (rect.top > 150) {
            outputDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        showToast("Computation complete", "The graph output can be seen below.", false);

    } catch (error) {
        console.error("Error:", error);
        document.querySelector(".output").style.display = "none";
        showToast("Invalid input", "The vectors are linearly dependent.", true);
    }
});

/* =========================================
   SECTION 5: VIEW SWITCHING LOGIC
   ========================================= */

function switchView(viewName) {
    const mainView = document.getElementById('view-main');
    const howtoView = document.getElementById('view-howto');

    if (viewName === 'main') {
        mainView.style.display = 'block';
        howtoView.style.display = 'none';
    } else {
        mainView.style.display = 'none';
        howtoView.style.display = 'block';
    }
}

/* =========================================
   SECTION 6: PAGE LOAD RESET
   ========================================= */

window.addEventListener("load", () => {
    // Overriding browser cache
    numVectorsInput.value = 0;
    vectorSizeInput.value = 0;

    // Reset internal JavaScript state
    numVectors = 0;
    vectorSize = 0;

    // Reset the UI
    updateConstraints();
    renderInputs();

    // Ensure output is hidden
    document.querySelector(".output").style.display = "none";

    // Force reset to the main view
    switchView('main');
});