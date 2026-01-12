/**
 * File: main.js
 * ----------------------------------------
 * Updates based on UI Design:
 * 1. Manage TWO state variables: 'numVectors' (rows) and 'vectorDim' (cols).
 * 2. Regenerate the input grid whenever either counter changes.
 * 3. Handle the toast notifications.
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
const closeToastBtn = document.getElementById("closeToastBtn");
let toastTimeout;


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

// --- Function: Render Inputs ---

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

    toast.style.display = "block";

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.style.display = "none";
    }, 3000);
}

if (closeToastBtn) {
    closeToastBtn.addEventListener("click", () => {
        toast.style.display = "none";
        clearTimeout(toastTimeout); // Stop the auto-close timer if user closed it manually
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

        if (!response.ok) {
            throw new Error(data.error || "Computation failed");
        }

        // Clear previous results
        const resultsContainer = document.getElementById("results-container");
        resultsContainer.innerHTML = "";

        // Loop through the result vectors and display
        data.forEach((vector, index) => {
            // Format numbers to 4 decimal places
            const formattedVector = vector.map(num => num.toFixed(4)).join(", ");

            const vectorLine = document.createElement("div");
            vectorLine.style.color = "#eaeaea";
            vectorLine.style.marginBottom = "5px";
            vectorLine.innerHTML = `<strong>u<sub>${index + 1}</sub>:</strong> (${formattedVector})`;

            resultsContainer.appendChild(vectorLine);
        });

        // Success Handling
        const outputDiv = document.querySelector(".output");
        outputDiv.style.display = "block";
        outputDiv.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("Computation complete", "The graph output can be seen below.", false);
        toast.style.display = "block";

    } catch (error) {
        console.error("Error:", error);
    }
});

function resetView() {
    document.querySelector(".output").style.display = "none";
    document.getElementById("graphArea").textContent = "graph here";
}