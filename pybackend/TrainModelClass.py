
import datetime
import pickle
import h5py
from DataClass import DataClass
from TfIdfClass import TfIdfClass
import numpy as np
import pandas as pd
from scipy.sparse import csr_matrix, save_npz, load_npz

class TrainModelClass:


    def __init__(self):
        self.dc = DataClass()
        self.tfidf = TfIdfClass()
        pass
    
    def trainPreprocessSentences(self,sentences):
        startTime = datetime.datetime.now()
        print()
        print("-----------------------------------------------------------------------------")
        print("Started Training raw sentences to preprocessed sentences...")
        preprocessedSentences = self.dc.preprocessSentences(sentences)
        print("Finished Training preprocessed sentences. Saving to cachedpreprocessedsentences.pkl")
        print("Writing result preprossed sentences into a file...")
        # Preprocess and store
        with open("cachedpreprocessedsentences.pkl", "wb") as f:
            pickle.dump(preprocessedSentences, f)
        print("Writing into file complete.")
        finishTime = datetime.datetime.now()
        totalTimeSeconds = (finishTime-startTime).total_seconds()
        print(f"Total Seconds = {totalTimeSeconds}")
        print(f"Total Minutes = {totalTimeSeconds/60}")
        
        pass



    def trainVocabulary(self):
        startTime = datetime.datetime.now()
        print()
        print("-----------------------------------------------------------------------------")
        print("Started training Vocabulary...")
        # load preprocessed sentences from file
        # loadedPreprocessedSentences = np.load("cachedpreprocessedsentences.npy")
       
        print("loading preprocessed sentences from file...")
        with open("cachedpreprocessedsentences.pkl", "rb") as f:
            loadedPreprocessedSentences = pickle.load(f)
        print("done.")

        print("Creating vocabulary array...")
        vocabulary = self.tfidf.createVocabulary(loadedPreprocessedSentences)
        print("Finished Training Vocabulary. Saving to cachedvocabulary.pkl")
        # np.save("cachedvocabulary.npy", vocabulary)
        # create vocabulary and store
        print("Writing result vocabulary array into a file...")
        with open("cachedvocabulary.pkl", "wb") as f:
            pickle.dump(vocabulary, f)
        print("Writing into file complete.")
        finishTime = datetime.datetime.now()
        totalTimeSeconds = (finishTime-startTime).total_seconds()
        print(f"Total Seconds = {totalTimeSeconds}")
        print(f"Total Minutes = {totalTimeSeconds/60}")
        

    def trainTfMatrix(self):
        startTime = datetime.datetime.now()
        print()
        print("-----------------------------------------------------------------------------")
        print("Started training TF array...")
        # loadedPreprocessedSentences = np.load("cachedpreprocessedsentences.npy")
        # load preprocessed sentences from file
        print("loading preprocessed sentences from file...")
        with open("cachedpreprocessedsentences.pkl", "rb") as f:
            loadedPreprocessedSentences = pickle.load(f)
        print("done.")

        # load Vocabulary from file
        print("loading vocabulary from file...")
        with open("cachedvocabulary.pkl", "rb") as f:
            loadedVocabulary = pickle.load(f)
        print("done.")

        print("creating tf array...")
        tfMatrix = self.tfidf.createTfMatrix(loadedPreprocessedSentences,loadedVocabulary)
        print("Done.")
        print("Converting 2d tf array to sparse matrix...")
        tfSparseMatrix = csr_matrix(tfMatrix)
        print("Finished creating Tf sparse matrix. Saving to cachedtfsparsematrix.npz")
        print("Writing result tf sparse matrix array into a file...")
        # file
        save_npz("cachedtfsparsematrix.npz", tfSparseMatrix)
        print("Writing into file complete.")
        finishTime = datetime.datetime.now()
        totalTimeSeconds = (finishTime-startTime).total_seconds()
        print(f"Total Seconds = {totalTimeSeconds}")
        print(f"Total Minutes = {totalTimeSeconds/60}")

    #     
    #     
        pass

    def trainIdfMatrix(self):
        startTime = datetime.datetime.now()
        print()
        print("-----------------------------------------------------------------------------")
        print("Started training IDF array...")
       # load preprocessed sentences from file
        print("loading preprocessed sentences from file...")
        with open("cachedpreprocessedsentences.pkl", "rb") as f:
            loadedPreprocessedSentences = pickle.load(f)
        print("done.")

        # load Vocabulary from file
        print("loading vocabulary from file...")
        with open("cachedvocabulary.pkl", "rb") as f:
            loadedVocabulary = pickle.load(f)
        print("done.")

        print("creating idf array...")
        idfMatrix = self.tfidf.createIdfMatrix(loadedPreprocessedSentences,loadedVocabulary)
        print("done.")
        
        print("Converting 2d idf array to sparse matrix...")
        idfSparseMatrix = csr_matrix(idfMatrix)
        print("Finished creating IDF sparse matrix. Saving to cachedidfsparsematrix.npz")
        print("Writing result IDF sparse matrix array into a file...")
        # file
        save_npz("cachedidfsparsematrix.npz", idfSparseMatrix)
        print("Writing into file complete.")

        finishTime = datetime.datetime.now()
        totalTimeSeconds = (finishTime-startTime).total_seconds()
        print(f"Total Seconds = {totalTimeSeconds}")
        print(f"Total Minutes = {totalTimeSeconds/60}")
        pass

    def trainTfIdfMatrix(self):
        startTime = datetime.datetime.now()
        print()
        print("-----------------------------------------------------------------------------")
        print("Started training TF-IDF array...")
         # load preprocessed sentences from file
        print("loading preprocessed sentences from file...")
        with open("cachedpreprocessedsentences.pkl", "rb") as f:
            loadedPreprocessedSentences = pickle.load(f)
        print("done.")

        # load Vocabulary from file
        print("loading vocabulary from file...")
        with open("cachedvocabulary.pkl", "rb") as f:
            loadedVocabulary = pickle.load(f)
        print("done.")

        # load Tf sparse matrix from file
        print("loading Tf sparse matrix from file...")
        loadedTfArray = load_npz("cachedtfsparsematrix.npz")
        print("done.")
        print("converting tf sparse matrix into an 2d array...")
        loadedTfArray = loadedTfArray.toarray()
        print("done.")

        # load IDF sparse matrix from file
        print("loading IDF sparse matrix from file...")
        loadedIdfArray = load_npz("cachedidfsparsematrix.npz")
        print("done.")
        print("converting IDF sparse matrix into an 2d array...")
        loadedIdfArray = loadedIdfArray.toarray()
        print("done.")
        
        print("Converting Tf array dataframe")
        loadedTfArray = np.array(loadedTfArray)
        loadedTfArray = pd.DataFrame(loadedTfArray,columns=loadedVocabulary)
        print("done.")

        print("Converting IDF array dataframe")
        loadedIdfArray = np.array(loadedIdfArray)
        loadedIdfArray = pd.DataFrame(loadedIdfArray,columns=loadedVocabulary)
        print("done.")
        print("..............................")
        print("Creating Tf-Idf array...")
        tfIdfMatrix = self.tfidf.calculateTfIdfMatrix(loadedPreprocessedSentences,loadedTfArray,loadedIdfArray,loadedVocabulary)
        print("done.")

        print("Converting 2d TF-IDF array to sparse matrix...")
        tfidfSparseMatrix = csr_matrix(tfIdfMatrix)
        print("Finished creating TF-IDF sparse matrix. Saving to cachedtfidfsparsematrix.npz")
        print("Writing result TF-IDF sparse matrix array into a file...")
        # file
        save_npz("cachedtfidfsparsematrix.npz", tfidfSparseMatrix)
        print("Writing into file complete.")
        finishTime = datetime.datetime.now()
        totalTimeSeconds = (finishTime-startTime).total_seconds()
        print(f"Total Seconds = {totalTimeSeconds}")
        print(f"Total Minutes = {totalTimeSeconds/60}")