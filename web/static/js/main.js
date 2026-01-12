/**
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

let numVectors = 0;
let vectorSize = 0;

const numVectorsSpan = document.getElementById("numVectors");
const vectorSizeSpan = document.getElementById("vectorSize");
const vectorInputDiv = document.getElementById("vectorInput");
const computeBtn = document.getElementById("computeBtn");
const toast = document.getElementById("toast");


/* =========================================
   SECTION 2: COUNTER LOGIC
   ========================================= */

// --- Function: Update Counters ---

function changeVectors(delta) {
    numVectors = Math.max(0, numVectors + delta);
    numVectorsSpan.textContent = numVectors;
    renderInputs();
}

function changeSize(delta) {
    vectorSize = Math.max(0, vectorSize + delta);
    vectorSizeSpan.textContent = vectorSize;
    renderInputs();
}


/* =========================================
   SECTION 3: GRID GENERATION
   ========================================= */

// --- Function: Render Inputs (The Grid) ---

function renderInputs() {
    vectorInputDiv.innerHTML = "";

    if (numVectors === 0 || vectorSize === 0) {
        vectorInputDiv.textContent = "No input detected";
        computeBtn.classList.remove("active");
        return;
    }

    for (let i = 0; i < numVectors; i++) {
        const row = document.createElement("div");
        row.className = "vector";

        for (let j = 0; j < vectorSize; j++) {
            const input = document.createElement("input");
            input.type = "number";
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

function validateInput() {
    const inputs = vectorInputDiv.querySelectorAll("input");
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value === "") allFilled = false;
    });

    computeBtn.classList.toggle("active", allFilled && inputs.length > 0);
}

computeBtn.addEventListener("click", () => {
    if (!computeBtn.classList.contains("active")) return;

    document.querySelector(".output").style.display = "block";

    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
});

function resetView() {
    document.querySelector(".output").style.display = "none";
    document.getElementById("graphArea").textContent = "graph here";
}