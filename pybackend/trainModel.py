
import pickle
from TrainModelClass import TrainModelClass
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix, save_npz, load_npz

# trainModel = TrainModelClass()

# working with test sentences (correct)
# sentences = [
#     "i love food",
#     "great service",
#     "i hate ambiance"

# ]

# df = pd.read_csv("test.csv")
# # sentences = df["review"].to_numpy()
# label = df["label"].to_numpy()

# # 1. train preprocess sentences
# # 2. train create vocabulary
# # 3. train TF Matrix
# # 4. train IDF Matrix
# # 5. train TF-IDF Matrix

# # trainModel.trainPreprocessSentences(sentences)

# # trainModel.trainVocabulary()

# trainModel.trainTfMatrix()

# # trainModel.trainIdfMatrix()

# trainModel.trainTfIdfMatrix()


# -----------------------------------------------------------------------------
# # training length of vocabulary
# # vocabulary
# with open("cachedvocabulary.pkl", "rb") as f:
#     cachedvocabulary = pickle.load(f)
# vocabularyLength = len(cachedvocabulary)
# print("Writing result vocabularyLength into a file cachedvocabularylength.pkl...")
# with open("cachedvocabularylength.pkl", "wb") as f:
#     pickle.dump(vocabularyLength, f)
# print("done.")


# -----------------------------------------------------------------------------
# training total sentence,total pos sentence, total neg sentenec and label array

# print("Calculating  total sentences, total neg and pos")
# totalSentences = len(label)
# totalPositiveSentence = np.count_nonzero(label == 1)
# totalNegativeSentence = np.count_nonzero(label == 0)
# print("done")

# print(totalSentences,totalPositiveSentence,totalNegativeSentence)
# print("Writing result totalSentences into a file...")
# # Preprocess and store
# with open("cachedtotalsentences.pkl", "wb") as f:
#     pickle.dump(totalSentences, f)
# print("Writing into file complete.")

# print("Writing result totalPositiveSentence into a file...")
# # Preprocess and store
# with open("cachedtotalpositivesentences.pkl", "wb") as f:
#     pickle.dump(totalPositiveSentence, f)
# print("Writing into file complete.")

# print("Writing result totalNegativeSentence into a file...")
# # Preprocess and store
# with open("cachedtotalnegativesentences.pkl", "wb") as f:
#     pickle.dump(totalNegativeSentence, f)
# print("Writing into file complete.")

# print(label,len(label))
# print("training label of csv file and writing in cachedlabels.pkl...")
# with open("cachedlabels.pkl", "wb") as f:
#     pickle.dump(label, f)
# print("done")

#-----------------------------------------------------------------------------------
# training tfidf sparse matrix for positive and negative class

# # label array
# with open("cachedlabels.pkl", "rb") as f:
#     cachedlabels = pickle.load(f)

# # vocabulary
# with open("cachedvocabulary.pkl", "rb") as f:
#     cachedvocabulary = pickle.load(f)

# # tfidf sparse matrix
# print("Loading tfidf sparse matrix from a file and converting toarray()...")
# tfidfSparseMatrix = load_npz("cachedtfidfsparsematrix.npz")
# tfidfSparseMatrix = tfidfSparseMatrix.toarray()
# print("done")
# # df = pd.DataFrame(tfidfSparseMatrix,columns=cachedvocabulary)
# # print(df)

# # positive tfidf values
# print("Extracting tfidf array rows with label==1 (positive)...")
# positive_tfidf_array = tfidfSparseMatrix[cachedlabels == 1]
# print("done.")
# print("Converting 2d (positive) TF-IDF array to sparse matrix...")
# positiveTfIdfSparseMatrix = csr_matrix(positive_tfidf_array)
# print("Finished creating (positive) Tf-IDF sparse matrix. Saving to cachedpositivetfidfsparsematrix.npz")
# print("Writing result (positive) Tf-IDF sparse matrix array into a file...")
# # file
# save_npz("cachedpositivetfidfsparsematrix.npz", positiveTfIdfSparseMatrix)
# print("Writing into file complete.")


# # negative tfidf values
# print("Extracting tfidf array rows with label==0 (negative)...")
# negative_tfidf_array = tfidfSparseMatrix[cachedlabels == 0]
# print("done.")
# print("Converting 2d (negative) TF-IDF array to sparse matrix...")
# negativeTfIdfSparseMatrix = csr_matrix(negative_tfidf_array)
# print("Finished creating (negative) Tf-IDF sparse matrix. Saving to cachednegativetfidfsparsematrix.npz")
# print("Writing result (negative) Tf-IDF sparse matrix array into a file...")
# # file
# save_npz("cachednegativetfidfsparsematrix.npz", negativeTfIdfSparseMatrix)
# print("Writing into file complete.")

# # -------------------------------------

# training sum of all values in positive and negative tfidf array

#positive tfidf sparse matrix

# print("Loading positive tfidf sparse matrix from a file and converting toarray()...")
# positivetfidfSparseMatrix = load_npz("cachedpositivetfidfsparsematrix.npz")
# positivetfidfSparseMatrix = positivetfidfSparseMatrix.toarray()
# print("done.")
# totalSumValueOfPositiveTfidfArray = positivetfidfSparseMatrix.sum()
# print("calculated totalSumValueOfPositiveTfidfArray, writng into a file cachedtotalsumvalueofpositivetfidfarray.pkl")
# with open("cachedtotalsumvalueofpositivetfidfarray.pkl", "wb") as f:
#     pickle.dump(totalSumValueOfPositiveTfidfArray, f)
# print("Writing into file complete.")

# negativ tfidf sparse matrix
print("Loading negative tfidf sparse matrix from a file and converting toarray()...")
negativetfidfSparseMatrix = load_npz("cachednegativetfidfsparsematrix.npz")
negativetfidfSparseMatrix = negativetfidfSparseMatrix.toarray()
print("done.")
totalSumValueOfNegativeTfidfArray = negativetfidfSparseMatrix.sum()
print("calculated totalSumValueOfNegativeTfidfArray, writng into a file cachedtotalsumvalueofnegativetfidfarray.pkl")
with open("cachedtotalsumvalueofnegativetfidfarray.pkl", "wb") as f:
    pickle.dump(totalSumValueOfNegativeTfidfArray, f)
print("Writing into file complete.")
