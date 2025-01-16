import h5py
import pandas as pd
import math




class TfIdfClass:

    def __init__(self):
        pass
    
    # create vocabulary array
    def createVocabulary(self,sentences):
        vocabulary = set()
        for sentence in sentences:
            tokenizedSentence = sentence.split()
            for token in tokenizedSentence:
                vocabulary.add(token)
        
        return sorted(vocabulary)
    
    # create Term Frequency Matrix
    def createTfMatrix(self,sentences,vocabulary):
        finalTfMatrix = []
        # each sentence (doc)
        i=1
        for sentence in sentences:
            eachRowTfMatrix = []
            tokenAppearedInDocCount = {}
            tokenizedSentence = sentence.split()
            # create count dictionary for each sentence
            for token in tokenizedSentence:
                totalTokenApperedInDoc = tokenizedSentence.count(token)
                if (token in tokenAppearedInDocCount):
                    continue
                tokenAppearedInDocCount[token] = totalTokenApperedInDoc
            # calculate each tf matrix
            # iterate all token in vocabulary list
            for token in vocabulary:
                # check if token in dictionary count in that doc
                if(token in tokenAppearedInDocCount):

                    tfOfTokenInDoc = tokenAppearedInDocCount[token] / len(tokenizedSentence)
                    eachRowTfMatrix.append(round(tfOfTokenInDoc, 3))
                else:
                    eachRowTfMatrix.append(0)
                
            finalTfMatrix.append(eachRowTfMatrix)
            print(f"Creating TF array of row {i} complele.")
            i += 1
        # ouside loop
        return finalTfMatrix

    # create a IDF matrix
    def createIdfMatrix(self,sentences,vocabulary):
        finalIdfMatrix = []
        totalNoOfDoc = len(sentences)
        totalDocContainingTokenCount = {}
        i = 1
        # initial doc with that token count to 0
        print("Setting initial totalDocContainingTokenCount to 0")
        for token in vocabulary:
            totalDocContainingTokenCount[token] = 0
        print("done")
        print("calculating totalDocContainingTokenCount values")
        # check for all token in vocab
        # iterate through all token in vocab
        i=1
        for token in vocabulary:
            # check for every sentence
            print("counting for token ",token,i)
            i+=1
            for sentence in sentences:
                tokenizedSentence = sentence.split()
                # if token in sentence add one to dict for that token
                if token in tokenizedSentence:
                    totalDocContainingTokenCount[token] += 1
        print("done")

        # calulate idf for all token in vocab
        print("calculating idf values")
        eachIdfValue = []
        for token in vocabulary:
            tokenIdfValue = math.log10(totalNoOfDoc / totalDocContainingTokenCount[token])
            eachIdfValue.append(round(tokenIdfValue, 3))
            print(f"Creating IDF value of token no [{i}] '{token}'  complete.")
            i += 1
        finalIdfMatrix.append(eachIdfValue)
        print("done")

        return finalIdfMatrix
    
    # create TF-IDF Matrix
    def calculateTfIdfMatrix(self,sentences,finalTfMatrix,finalIdfMatrix,vocabulary):

        finalIfIdfMatirx = []
        i=1
        for i in range(len(sentences)):
            eachTfIdfMatrix = []
            for token in vocabulary:
                tfIdfValue = finalTfMatrix[token][i] * finalIdfMatrix[token][0]
                # print(token, "=>", finalTfMatrix[token][i] ,"*", finalIdfMatrix[token][0] , "=",tfIdfValue)
                eachTfIdfMatrix.append(round(tfIdfValue, 3))
            finalIfIdfMatirx.append(eachTfIdfMatrix)
            print(f"Creating TF-IDF array of row {i} complele.")
            i += 1
        return finalIfIdfMatirx
    


tfidf = TfIdfClass()
sentences = [
    "i love food",
    "great service",
    "i hate ambiance",
    "the food was amazing",
    "i dislike the noise",
    "fantastic experience",
    "not a good time",
    "the staff was friendly",
    "hate terrible meal",
    "everything was perfect"
]
# vocabulary = tfidf.createVocabulary(sentences)
