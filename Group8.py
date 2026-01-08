import numpy as np

def main():
    print("\n\n")

    while True: # loop to get the user input vectors
        try:
            n = int(input("\nEnter the dimension of R (n): "))
            if n <= 0:
                print("\tInvalid input. Enter a positive integer.")
                continue
            break
        except ValueError:
            print("\tInvalid input. Enter a positive integer.")

    matrix = np.zeros((n, n)) # creates an array of size n where the vectors will be stored

    print(f"\nEnter a linearly independent set of vectors, with fractions as their decimal values.")

    for i in range(n): # loop through the array column by column for the user input
        print(f"\n--- Vector {i+1} ---")
        
        for j in range(n):
            while True:
                try:
                    value = float(input(f"Value {j+1}: "))
                    matrix[j, i] = value 
                    break
                except ValueError:
                    print("\tInvalid input. Please enter a decimal or integer.\n")

#    flag = checkLinearIndependence(matrix, n)
#    if flag == True:
#        [insert Gram-Schmidt process here and Normalization]
#    else
#        print(f"These vectors are linearly dependent and do not form a basis for R^{n}."))

main()

# determines the independence of the given input using matrix_rank
def checkLinearIndependence(matrix, n):
    rank = np.linalg.matrix_rank(matrix)

    if rank == n:
        return True
    else:
        return False

# checks if the given input are already orthogonal / used inside the gramSchmidtProcess method
def checkOrthogonality(matrix, n):
    for i in range(n):
        for j in range(i + 1, n):
            vectorOne = matrix[:, i]
            vectorTwo = matrix[:, j]
            dotProduct = np.dot(vectorOne, vectorTwo)
            
            if not np.isclose(dotProduct, 0, atol=1e-12): # used to catch rounding errors
                return False

    return True

# checks if the given input are already orthonormal / used inside the gramSchmidtProcess method
def checkOrthonormality(matrix, n):
    for i in range(n):
        vectorOne = matrix[:, i]
        length = np.linalg.norm(vectorOne)
        
        if not np.isclose(length, 1, atol=1e-12):
            return False

    return True

# def gramSchmidtProcess

# def normalization