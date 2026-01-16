from services.entry import orthonormalize_from_json
from flask import Blueprint, request, jsonify
from orthobasis.exceptions import InvalidVectorSetError, DependentVectorSetError

api_bp = Blueprint("api", __name__)

@api_bp.route('/orthonormalize', methods=['POST'])
def get_orthonormalization():
    try:
        # Get JSON data (List of Lists)
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Service entry point from the main repo
        # This handles the math and generates the Plotly figures
        result = orthonormalize_from_json(data)

        # unpack list
        # resulting basis
        vectors = result[0]

        # figures
        figs = result[1]
        fig_2d = figs[0]
        fig_3d = figs[1]

        # Return a structured JSON response
        return jsonify({
            "vectors": vectors,         # For result boxes
            "fig2d": fig_2d.to_json(),  # For the graph
            "fig3d": fig_3d.to_json()   # For the graph
        })

    except DependentVectorSetError as e:
        return jsonify({"error": str(e)}), 400
    except InvalidVectorSetError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server Error: {str(e)}"}), 500