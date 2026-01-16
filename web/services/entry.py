import numpy as np
from src.orthobasis.basis import orthonormalize
from src.orthobasis.exceptions import (
    DependentVectorSetError,
    InvalidVectorSetError
)
from .plot import create_plots

def orthonormalize_from_json(data):
    """
    Input: List[List[float]]  (row-wise)
    Output: List[List[float]] (row-wise)
    """
    # print(f"data passed: {data}") # checks

    matrix = np.array(data, dtype=np.float64)
    
    # print(f"nparray : {matrix}") # checks
    # print(f"pre-processing shape : {matrix.shape}") # checks

    t_matrix = matrix.T
    t_result = orthonormalize(t_matrix)

    # plot it
    plots = create_plots(t_result)
    
    o_result = t_result.T # transpose back 
    o_result_list = o_result.tolist() # to list

    # compile data to list
    list_result = []
    
    list_result.append(o_result_list) # [0]
    list_result.append(plots) # [1]
    
    return list_result