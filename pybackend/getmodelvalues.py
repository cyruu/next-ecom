# Load preprocessed sentences
import pickle
from scipy.sparse import csr_matrix, save_npz, load_npz
import pandas as pd

# # total sentences
# with open("cachedtotalsentences.pkl", "rb") as f:
#     cachedtotalsentences = pickle.load(f)
# print("cachedtotalsentences")
# print(cachedtotalsentences)


# # total pos sentences
# with open("cachedtotalpositivesentences.pkl", "rb") as f:
#     cachedtotalpositivesentences = pickle.load(f)
# print("cachedtotalpositivesentences")
# print(cachedtotalpositivesentences)


# # total neg sentences
# with open("cachedtotalnegativesentences.pkl", "rb") as f:
#     cachedtotalnegativesentences = pickle.load(f)
# print("cachedtotalnegativesentences")
# print(cachedtotalnegativesentences)

# # label array
# with open("cachedlabels.pkl", "rb") as f:
#     cachedlabels = pickle.load(f)
# print("cachedlabels")
# print(cachedlabels,len(cachedlabels))

# # preprocessed sentences
# with open("cachedpreprocessedsentences.pkl", "rb") as f:
#     cachedpreprocessedsentences = pickle.load(f)
# print("cachedpreprocessedsentences")
# print(cachedpreprocessedsentences,len(cachedpreprocessedsentences))

# # vocabulary
# with open("cachedvocabulary.pkl", "rb") as f:
#     cachedvocabulary = pickle.load(f)
# print("cachedvocabulary")

# print(cachedvocabulary,len(cachedvocabulary))


# tf sparse matrix
# print("cachedtfsparsematrix")
# tfSparseMatrix = load_npz("cachedtfsparsematrix.npz")
# tfSparseMatrix = tfSparseMatrix.toarray()
# df = pd.DataFrame(tfSparseMatrix,columns=cachedvocabulary)
# print(df)

# # idf sparse matrix
# print("cachedidfsparsematrix")
# idfSparseMatrix = load_npz("cachedidfsparsematrix.npz")
# idfSparseMatrix = idfSparseMatrix.toarray()
# df = pd.DataFrame(idfSparseMatrix,columns=cachedvocabulary)
# print(df)

# # tfidf sparse matrix
# print("cachedtfidfsparsematrix")
# tfidfSparseMatrix = load_npz("cachedtfidfsparsematrix.npz")
# tfidfSparseMatrix = tfidfSparseMatrix.toarray()
# df = pd.DataFrame(tfidfSparseMatrix,columns=cachedvocabulary)
# print(df)

# # positive tfidf sparse matrix
# print("cachedpositivetfidfsparsematrix")
# cachedpositivetfidfsparsematrix = load_npz("cachedpositivetfidfsparsematrix.npz")
# cachedpositivetfidfsparsematrix = cachedpositivetfidfsparsematrix.toarray()
# df = pd.DataFrame(cachedpositivetfidfsparsematrix,columns=cachedvocabulary)
# print(df)

# # positive tfidf sparse matrix
# print("cachedpositivetfidfsparsematrix")
# cachedpositivetfidfsparsematrix = load_npz("cachedpositivetfidfsparsematrix.npz")
# cachedpositivetfidfsparsematrix = cachedpositivetfidfsparsematrix.toarray()
# df = pd.DataFrame(cachedpositivetfidfsparsematrix,columns=cachedvocabulary)
# print(df)

# # negative tfidf sparse matrix
# print("cachednegativetfidfsparsematrix")
# cachednegativetfidfsparsematrix = load_npz("cachednegativetfidfsparsematrix.npz")
# cachednegativetfidfsparsematrix = cachednegativetfidfsparsematrix.toarray()
# df = pd.DataFrame(cachednegativetfidfsparsematrix,columns=cachedvocabulary)
# print(df)