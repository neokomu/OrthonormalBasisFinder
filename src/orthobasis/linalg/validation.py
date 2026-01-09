import numpy as np

# notes
# all computations should be float64
# input: S = Spanning set of vectors in R^n, where |S| =  n

TOLERANCE = 1e-10

def is_linearly_independent(vectors: np.ndarray) -> bool:
    """Check linear independence of a matrix"""
    rank = np.linalg.matrix_rank(vectors)
    return rank == vectors.shape[1]
    
def are_orthogonal(v_1: np.ndarray, v_2: np.ndarray) -> bool:
    """check if two vectors are orthogonal"""
    dot_product = np.dot(v_1, v_2)
    return abs(dot_product) < TOLERANCE

def are_vectors_orthogonal(vectors: np.ndarray) -> bool:
    """check if all vectors are orthogonal to each other"""
    for i in range(vectors.shape[1]):
        for j in range(i + 1, vectors.shape[1]):
            if abs(np.dot(vectors[:,i], vectors[:,j])) > TOLERANCE:
                return False
    return True

def are_vectors_normalized(vectors: np.ndarray) -> bool:
    """check if all vectors are normalized"""
    for i in range(vectors.shape[1]):
        if abs(np.linalg.norm(vectors[:,i]) - 1) > 1e-12:
            return False
    return True

def are_vectors_orthonormal(vectors: np.ndarray) -> bool:
    """check if all vectors are orthogonal, and normalized"""
    if not are_vectors_normalized(vectors) or not are_vectors_orthogonal(vectors):
        return False
    return True

def has_zero_vector(vectors: np.ndarray) -> bool:
    """checks if a vector set has a zero vector column"""
    for i in range(vectors.shape[1]):
        if np.linalg.norm(vectors[:,i]) < TOLERANCE:
            return True
    return False
            