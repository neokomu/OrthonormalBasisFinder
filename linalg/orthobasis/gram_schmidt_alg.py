import numpy as np

# notes
# input: B = Basis, dtype= float64
# output: Orthogonalized B

def gram_schmidt(vectors : np.ndarray) -> np.ndarray:
    """Turn vectors orthogonal to each other"""
    cols = vectors.shape[1]
    s_1 = np.asarray(vectors[:,0])
    output_basis = [s_1] # init S' with first column of S

    # find S_i, 1 > i > cols
    for i in range(cols-1):
        ith_vector = vectors[:,i+1]
        sum_of_proj = np.zeros_like(s_1, dtype=np.float64)

        for j in range(len(output_basis)):
            sum_of_proj += project(output_basis[j], ith_vector)
    
        ith_basis = ith_vector - sum_of_proj
        output_basis.append(ith_basis)
    
    return np.stack(output_basis, axis=1)

def project(u: np.ndarray, v: np.ndarray) -> np.ndarray: 
    """project v at u"""
    u_norm = np.linalg.norm(u) # check normalized first

    if u_norm == 0: # handle div by zero(really small numbers)
        return np.zeros_like(v)
    
    u_normalized = u / u_norm 
    proj_uv  = np.dot(v, u_normalized) * u_normalized  
    return proj_uv 

def orthogonal_to_v(v: np.ndarray, proj_uv: np.ndarray) -> np.ndarray:
    """get a vector orthogonal of projection(u, v)"""
    return v - proj_uv
