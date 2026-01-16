import numpy as np
import orthobasis as ob

def main():
    vectors = [np.array([1,4,2]), np.array([-4,7,21])]
    
    v_result = ob.orthonormalize(vectors)
    print(v_result)
    to_list = v_result.tolist()
    to_array = np.asarray(to_list)
    print(to_list)
    print(to_array)
    print(ob.are_vectors_orthonormal(v_result))

if __name__ == "__main__":
    main()
