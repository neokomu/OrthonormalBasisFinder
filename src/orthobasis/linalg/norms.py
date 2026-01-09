import numpy as np

# notes
# all computations should be float64
# input: S = a set Orthogonal vectors
# output: Normalized S

def normalize(vectors: np.ndarray) -> np.ndarray:
    cols = vectors.shape[1]
    v_normalized = []
    for i in range(cols): 
        col = vectors[:,i]
        col_norm = np.linalg.norm(vectors[:, i])
        col_normalized = col / col_norm
        v_normalized.append(col_normalized)
    
    return np.stack(v_normalized, axis=1)
