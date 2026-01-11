from flask import Blueprint, request, jsonify
from orthobasis.basis import orthonormalize
from orthobasis.exceptions import InvalidVectorSetError, DependentVectorSetError

api_bp = Blueprint("api", __name__)

@api_bp.route('/orthonormalize', methods=['POST'])
def get_orthonormalization():
    data = request.get_json()
    return data