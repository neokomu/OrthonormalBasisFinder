# linalg/__init__.py

from .gram_schmidt_alg import gram_schmidt
from .norms import normalize
from .validation import (
    is_scalar,
    is_linearly_independent,
    are_orthogonal,
    are_vectors_orthogonal,
    are_vectors_normalized,
    are_vectors_orthonormal,
    has_zero_vector,
    TOLERANCE
)

__all__ = ["gram_schmidt",
            "normalize",
            "is_scalar",
            "is_linearly_independent", 
            "are_orthogonal", 
            "are_vectors_orthogonal", 
            "are_vectors_normalized",
            "are_vectors_orthonormal",
            "has_zero_vector",
            "TOLERANCE"]
# config what to expose here