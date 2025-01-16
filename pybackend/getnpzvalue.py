import pickle
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix, save_npz, load_npz

loaded_sparse_matrix = load_npz("tf_matrix.npz")
print("loaded sparse matrix from file")
loaded_sparse_matrix=loaded_sparse_matrix.toarray()
a = pd.DataFrame(loaded_sparse_matrix)
print(a)
# # Convert back to dense format
# dense_loaded_matrix = loaded_sparse_matrix.toarray()
print("pickle preprocessed value")
with open("preprocessed_sentences.pkl", "rb") as f:
    loaded_sentences = pickle.load(f)
print(loaded_sentences)