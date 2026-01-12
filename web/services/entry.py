import numpy as np
from orthobasis.basis import orthonormalize
from orthobasis.exceptions import (
    DependentVectorSetError,
    InvalidVectorSetError
)

def orthonormalize_from_json(data):
    """
    Input: List[List[float]]  (row-wise)
    Output: List[List[float]] (row-wise)
    """

    matrix = np.array(data, dtype=np.float64)
    t_matrix = matrix.T

    t_result = orthonormalize(t_matrix)

    result = t_result.T

    return result.tolist()