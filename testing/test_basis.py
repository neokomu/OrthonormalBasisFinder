import numpy as np
import linalg.basis as ob

def main():
    vectors = np.array([
                        [1, 3, 2],
                        [2, 9, 2],
                        [7, 3, 4]
                        ], dtype = np.float64)
    
    v_result = ob.orthonormalize(vectors)
    print(v_result)
    print(ob.are_vectors_orthonormal(v_result))

if __name__ == "__main__":
    main()

# to run, get into your env, choose root folder as ORTHONORMALBASISFINDER and paste this in terminal:
# python -m testing.test_gram