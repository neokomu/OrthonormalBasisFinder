import numpy as np
import plotly.graph_objects as go
import src.orthobasis as ob
from .fig_2d import draw_2d
from .fig_3d import draw_3d

# SERVICES: extra things that arent part of the package

def create_plots(vectors : np.ndarray) -> list:
    plots = []
    # Assumptions:
    # - vectors is a 2D NumPy array of shape (k, n)
    # - rows represent what n-dimension its living in
    # - vectors in vectors are linearly independent

    # print(vectors.shape)
    # print(vectors)

    # check geometry
    is_line = True
    plane = is_plane(vectors)
    
    # project to 2d
    matrix_2d = to_2d(vectors)
    
    # project to 3d
    matrix_3d = to_3d(vectors)

    
    # draw 2d 
    fig_2d = draw_2d(matrix_2d)
    # fig_2d.show()

    # draw 3d 
    fig_3d = draw_3d(matrix_3d, plane)
    # fig_3d.show()
    
    # append
    plots.append(fig_2d)
    plots.append(fig_3d)

    return plots
    
def is_plane(vectors: np.ndarray) -> bool:
    """See if line"""
    # assumptions: linearly independent, not scalar, cols x is 1 <= x < 3;
    # if cols is 2 then its a plane
    cols = vectors.shape[1]
    if (cols == 2):
        return True
    return False

def to_3d(vectors: np.ndarray) -> np.ndarray:
    """Downscale or upscale to 3D"""
    cols = vectors.shape[1]
    rows = vectors.shape[0]

    # make base matrix
    proj_mat = np.zeros((3, cols))  # just either less than or equal to 3
    to_copy_rows = min(rows, 3)

    for i in range(to_copy_rows):
        proj_mat[i, :] = vectors[i,:]
    
    return proj_mat

def to_2d(vectors: np.ndarray) -> np.ndarray:
    """Downscale or upscale to 2D"""
    cols = vectors.shape[1]
    rows = vectors.shape[0]
    
    # make base matrix
    proj_mat = np.zeros((2, cols)) # just either less than or equal to 2
    to_copy_rows = min(rows, 2)

    for i in range(to_copy_rows):
        proj_mat[i, :] = vectors[i,:]
    
    return proj_mat
