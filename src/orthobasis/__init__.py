from .basis import orthonormalize
from .linalg.validation import (
    is_linearly_independent,
    are_orthogonal,
    are_vectors_orthogonal,
    are_vectors_normalized,
    are_vectors_orthonormal,
    has_zero_vector,
)

from .exceptions import InvalidVectorSetError, DependentVectorSetError

__all__ = [
    # main function to deliver
    "orthonormalize",

    # re-exported linear algebra utilities
    "is_linearly_independent",
    "are_orthogonal",
    "are_vectors_orthogonal",
    "are_vectors_normalized",
    "are_vectors_orthonormal",
    "has_zero_vector",

    # exceptions
    "InvalidVectorSetError",
    "DependentVectorSetError",
]

# exceptions is removed at final release