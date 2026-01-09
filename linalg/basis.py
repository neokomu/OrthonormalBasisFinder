import numpy as np
from .exceptions import (
    InvalidVectorSetError,
    DependentVectorSetError
)

from .orthobasis import (
    gram_schmidt,
    normalize,
    is_linearly_independent,
    are_orthogonal,
    are_vectors_orthogonal,
    are_vectors_normalized,
    are_vectors_orthonormal,
    has_zero_vector,
    TOLERANCE
) # for public api 

# Input normalization
# Input : list, tuples, numpy arrays
# Dtype:  float64

def orthonormalize(vectors, *, method="gram-schmidt", tol=TOLERANCE) -> np.ndarray:
    """
    Compute an orthonormal basis from a set of vectors.

    Parameters
    ----------
    vectors : array-like
        Collection of vectors.
    method : str
        Algorithm to use.
    tol : float
        Numerical tolerance. Constant.

    Returns
    -------
    np.ndarray
        Orthonormal basis vectors.
    """

    vectors = np.asarray(vectors, dtype=np.float64) # make np.ndarray by column axis, set dtype = float64

    _validate_input(vectors)

    algo = _select_algorithm(method)
    v_orthogonalized = algo(vectors)
    v_orthonormalized = normalize(v_orthogonalized)

    # _postcheck(basis, tol)
    return v_orthonormalized


def _validate_input(vectors):
    if has_zero_vector(vectors):
        raise InvalidVectorSetError("This set contains a zero vector")
    if not is_linearly_independent(vectors):
        raise DependentVectorSetError("This set is not linearly independent")
    # raise InvalidVectorSetError, DependentVectorSetError

def _select_algorithm(function_name):
    if function_name == "gram-schmidt":
        return gram_schmidt
    raise ValueError(f"Unknown function call: {function_name}")

# def _postcheck(basis, tol):
#     # check normalization
#     pass



