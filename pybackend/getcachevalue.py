import h5py
import numpy as np
import pandas as pd

print("loaded from cache")

# cached preprocessed sentences array
# print("Cached Preprocessed sentences Array")
# loadedPreprocessedSentences = np.load("cachedpreprocessedsentences.npy")
# import  h5py

# Cached preprocessed sentences
# print("Cached preprocessed sentences Array")
# with h5py.File('cachedpreprocessedsentences.h5', 'r') as f:
#     if 'cachedpreprocessedsentences' in f:
#         loadedPreprocessedSentences = f['cachedpreprocessedsentences'][:] # type: ignore
#         loadedPreprocessedSentences = [bs.decode('utf-8') for bs in loadedPreprocessedSentences] # type: ignore
#         print(loadedPreprocessedSentences,len(loadedPreprocessedSentences))

    # else:
    #     print("Dataset 'cachedpreprocessedsentences' not found.")

# # cached vocabulary
# print("Cached Vocabulary Array")
# with h5py.File('cachedvocabulary.h5', 'r') as f:
#     if 'cachedvocabulary' in f:
#         loadedVocabulary = f['cachedvocabulary'][:] # type: ignore
#         loadedVocabulary = [bs.decode('utf-8') for bs in loadedVocabulary] # type: ignore
#         print(loadedVocabulary,len(loadedVocabulary))
#     else:
#         print("Dataset 'cachedpreprocessedsentences' not found.")

# cached vocabulary
# print("Cached Vocabulary Array")
# with h5py.File('cachedvocabulary.h5', 'r') as f:
#     if 'cachedvocabulary' in f:
#         loadedVocabulary = f['cachedvocabulary'][:] # type: ignore
#         loadedVocabulary = [bs.decode('utf-8') for bs in loadedVocabulary] # type: ignore
#         print(loadedVocabulary,len(loadedVocabulary))
#     else:
#         print("Dataset 'cachedvocabulary' not found.")


# cached Tf array
# print("Cached Tf Matrix")
# with h5py.File('cachedtfarray.h5', 'r') as f:
#     if 'cachedtfarray' in f:
#         loadedTfArray = f['cachedtfarray'][:] # type: ignore
#         # loadedTfArray = [bs.decode('utf-8') for bs in loadedTfArray] # type: ignore
#         print(loadedTfArray)
#     else:
#         print("Dataset 'cachedtfarray' not found.")


# # cached IDF array
# print("Cached IDF Matrix")
# with h5py.File('cachedidfarray.h5', 'r') as f:
#     if 'cachedidfarray' in f:
#         loadedIdfArray = f['cachedidfarray'][:] # type: ignore
#         # loadedIdfArray = [bs.decode('utf-8') for bs in loadedIdfArray] # type: ignore
#         print(loadedIdfArray)
#     else:
#         print("Dataset 'cachedidfarray' not found.")

# # cached Tf-IDF array
# print("Cached Tf-IDF Matrix")
# with h5py.File('cachedtfidfarray.h5', 'r') as f:
#     if 'cachedtfidfarray' in f:
#         loadedIdfArray = f['cachedtfidfarray'][:] # type: ignore
#         # loadedIdfArray = [bs.decode('utf-8') for bs in loadedIdfArray] # type: ignore
#         print(loadedIdfArray)
#     else:
#         print("Dataset 'cachedtfidfarray' not found.")



