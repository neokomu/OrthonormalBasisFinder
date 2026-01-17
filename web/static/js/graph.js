/**
 * File: graph.js
 * ----------------------------------------
 * Handles rendering of Plotly graphs with specific UI requirements:
 * 1. "Plotly White" Theme integration (White card look).
 * 2. Responsive resizing.
 * 3. Clean configuration.
 */

/* =========================================
   SECTION 1: LAYOUT CONFIG
   ========================================= */

function getPlotConfig() {
    return {
        responsive: true,
        scrollZoom: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: [
            'lasso2d',
            'select2d',
            'autoScale2d',
            'hoverClosestCartesian',
            'hoverCompareCartesian'
        ]
    };
}

function applyWhiteTheme(originalLayout) {
    const whiteOverrides = {
        // Set Default to Pan
        dragmode: 'pan',

        // Plotly layout
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        font: {
            color: '#2a3f5f',
            family: '"Segoe UI", sans-serif'
        },

        // Spacing
        margin: { t: 40, b: 40, l: 40, r: 40 },

        // Axes
        xaxis: {
            visible: true,
            showgrid: true,
            gridcolor: '#E1E1E1',
            zeroline: true,
            zerolinecolor: '#969696'
        },
        yaxis: {
            visible: true,
            showgrid: true,
            gridcolor: '#E1E1E1',
            zeroline: true,
            zerolinecolor: '#969696'
        },

        // Scene Specifics
        scene: {
            dragmode: 'orbit',
            aspectmode: "data",
            xaxis: {
                backgroundcolor: "#ffffff",
                gridcolor: "#E1E1E1",
                showbackground: true,
                zerolinecolor: "#969696"
            },
            yaxis: {
                backgroundcolor: "#ffffff",
                gridcolor: "#E1E1E1",
                showbackground: true,
                zerolinecolor: "#969696"
            },
            zaxis: {
                backgroundcolor: "#ffffff",
                gridcolor: "#E1E1E1",
                showbackground: true,
                zerolinecolor: "#969696"
            },
            camera: {
                eye: {x: 1.5, y: 1.5, z: 1.5}
            }
        }
    };

    // Merge
    return Object.assign({}, originalLayout, whiteOverrides);
}


/* =========================================
   SECTION 2: RENDERING
   ========================================= */

function renderGraph(figureJSON, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Graph container #${containerId} not found.`);
        return;
    }

    // Prepare layout & configure
    const finalLayout = applyWhiteTheme(figureJSON.layout);
    const config = getPlotConfig();

    // Render
    Plotly.newPlot(containerId, figureJSON.data, finalLayout, config)
        .then(() => {
            console.log("Graph rendered successfully.");
            Plotly.Plots.resize(container);
        })
        .catch((err) => {
            console.error("Error rendering graph:", err);
            container.innerHTML = '<div style="color: #777; padding: 20px;">Error rendering graph</div>';
        });
}