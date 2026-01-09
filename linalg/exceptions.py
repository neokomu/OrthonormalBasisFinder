class InvalidVectorSetError(Exception):
    """Raised when a vector set is invalid (e.g., contains zero vectors)"""
    pass

class DependentVectorSetError(Exception):
    """Raised when vectors are linearly dependent"""
    pass