from services.entry import orthonormalize_from_json
from flask import Blueprint, request, jsonify
from orthobasis.basis import orthonormalize
from orthobasis.exceptions import InvalidVectorSetError, DependentVectorSetError

api_bp = Blueprint("api", __name__)

@api_bp.route('/orthonormalize', methods=['POST'])
def get_orthonormalization():
    try:
        # Get JSON data (List of Lists)
        data = request.get_json()

        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Format Response to Transpose Back
        response_data = orthonormalize_from_json(data)

        return jsonify(response_data)

    except DependentVectorSetError as e:
        return jsonify({"error": str(e)}), 400
    except InvalidVectorSetError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": f"Server Error: {str(e)}"}), 500