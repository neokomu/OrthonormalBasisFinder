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

    numVectors = newValue;
    numVectorsInput.value = newValue;

    updateConstraints();
    renderInputs();
}

function changeSize(delta) {
    let current = parseInt(vectorSizeInput.value) || 0;
    let newValue = Math.max(0, current + delta);

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
    vectorInputDiv.innerHTML = "";

    if (numVectors === 0 || vectorSize === 0) {
        vectorInputDiv.classList.add("empty-state");
        vectorInputDiv.textContent = "No input detected";
        computeBtn.classList.remove("active");
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
        row.appendChild(label);

        for (let j = 0; j < vectorSize; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.inputMode = "decimal";

            input.addEventListener("keydown", (e) => {
                // Allow Navigation Keys (Backspace, Delete, Tab, Arrows, Enter)
                const navKeys = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Enter", "Home", "End"];
                if (navKeys.includes(e.key)) return;

                // Allow Control Combinations (Ctrl+C, Ctrl+V, Ctrl+A)
                if (e.ctrlKey || e.metaKey) return;

                // Allow Numbers (0-9)
                if (/^[0-9]$/.test(e.key)) return;

                // Allow Single Decimal Point
                if (e.key === "." && !input.value.includes(".")) return;

                // Allow Single Negative Sign (Only at the start)
                if (e.key === "-") {
                    if (!input.value.includes("-") && input.selectionStart === 0) {
                        return;
                    }
                }
                e.preventDefault();
            });

            // Block pasting of invalid text
            input.addEventListener("paste", (e) => {
                const pasteData = (e.clipboardData || window.clipboardData).getData('text');
                if (!/^-?\d*\.?\d*$/.test(pasteData)) {
                    e.preventDefault();
                }
            });

            input.addEventListener("input", validateInput);
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
        if (val === "" || val === "-" || val === ".") {
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

    // Gather Data from HTML Inputs
    const vectorRows = vectorInputDiv.querySelectorAll(".vector");
    const payload = [];
    vectorRows.forEach(row => {
        const inputs = row.querySelectorAll("input");
        const vectorValues = [];
        inputs.forEach(input => {
            // Convert string input to Float
            vectorValues.push(parseFloat(input.value));
        });
        payload.push(vectorValues);
    });

    // Send Request to Flask
    try {
        const response = await fetch('/api/orthonormalize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {throw new Error(data.error || "Computation failed");}

        // Clear previous results
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";

        // Loop through the result vectors and display
        data.forEach((vector, index) => {
            const row = document.createElement("div");
            row.className = "vector";

            const label = document.createElement("div");
            label.className = "vector-label";
            label.textContent = `u${index + 1}`;
            row.appendChild(label);

            vector.forEach(num => {
                const input = document.createElement("input");
                input.type = "text";
                input.value = num.toFixed(8);
                input.readOnly = true;
                input.tabIndex = -1;
                row.appendChild(input);
            });
            resultsContainer.appendChild(row);
        });

        // Success Handling
        const outputDiv = document.querySelector(".output");
        outputDiv.style.display = "block";
        // Smart scrolling
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

function resetView() {
    // Testing if button works
    console.log("Resetting graph view...");

    // Placeholder here to reset view of the graph (camera reset code)
}

/* =========================================
   SECTION 5: TAB SWITCHING LOGIC
   ========================================= */

function showTab(tabId) {
    // Hide both tabs
    document.getElementById('content1').style.display = 'none';
    document.getElementById('content2').style.display = 'none';

    // Show the selected tab
    if (tabId === 'tab1') {
        document.getElementById('content1').style.display = 'block';
    } else if (tabId === 'tab2') {
        document.getElementById('content2').style.display = 'block';
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
});
