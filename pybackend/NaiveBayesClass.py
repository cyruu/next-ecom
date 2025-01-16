import datetime
import pickle
import string
import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix, save_npz, load_npz
from TfIdfClass import TfIdfClass
from DataClass import DataClass

class NaiveBayesClass:

    def __init__(self):
        # create TfIdfClass instance
        # self.tfidf = TfIdfClass()
        print("NAVIe bayes class constructor start")
        self.dc = DataClass()
        
        # vocabulary
        with open("cachedvocabulary.pkl", "rb") as f:
            self.vocabulary = pickle.load(f)
        
        # tfidf sparse matrix
        loadedTfIdfSaprseMatrix = load_npz("cachedtfidfsparsematrix.npz")
        loadedTfIdfArray = loadedTfIdfSaprseMatrix.toarray()
        self.finalTfIdfMartix = pd.DataFrame(loadedTfIdfArray,columns=self.vocabulary)

        # positive tfidf sparse matrix
        loadedPositiveTfIdfSaprseMatrix = load_npz("cachedpositivetfidfsparsematrix.npz")
        loadedPositiveTfIdfArray = loadedPositiveTfIdfSaprseMatrix.toarray()
        self.finalPositiveTfIdfMartix = pd.DataFrame(loadedPositiveTfIdfArray,columns=self.vocabulary)

        # positive tfidf sparse matrix
        loadedNegativeTfIdfSaprseMatrix = load_npz("cachednegativetfidfsparsematrix.npz")
        loadedNegativeTfIdfArray = loadedNegativeTfIdfSaprseMatrix.toarray()
        self.finalNegativeTfIdfMartix = pd.DataFrame(loadedNegativeTfIdfArray,columns=self.vocabulary)

        # for Naive Bayes
        # total sentences
        with open("cachedtotalsentences.pkl", "rb") as f:
            self.totalSentences = pickle.load(f)

            
        # total positive sentences
        with open("cachedtotalpositivesentences.pkl", "rb") as f:
            self.totalPositiveSentence = pickle.load(f)

        # total negative sentences
        with open("cachedtotalnegativesentences.pkl", "rb") as f:
            self.totalNegativeSentence = pickle.load(f)

        # label array
        with open("cachedlabels.pkl", "rb") as f:
            self.label = pickle.load(f)

        # vocabulary length
        with open("cachedvocabularylength.pkl", "rb") as f:
            self.vocabularyLength = pickle.load(f)

        # total sum value of positive tfidf array
        with open("cachedtotalsumvalueofpositivetfidfarray.pkl", "rb") as f:
            self.totalSumValueOfPositiveTfidfArray = pickle.load(f)

        # total sum value of negative tfidf array
        with open("cachedtotalsumvalueofnegativetfidfarray.pkl", "rb") as f:
            self.totalSumValueOfNegativeTfidfArray = pickle.load(f)

        print("NAVIe bayes class constructor end")


    # main function
    def calculateSentiment(self,sentence):
        # #DATA CLASS
        # # preprocess the sentences
        # self.sentences = self.dc.preprocessSentences(self.sentences)
        # # create a vocabulary array
        # self.vocabulary = self.tfidf.createVocabulary(self.sentences)

        # # TFIDF CLASS
        # # create tf matrix
        # self.finalTfMatrix = self.tfidf.createTfMatrix(self.sentences,self.vocabulary)
        # self.finalTfMatrix = pd.DataFrame(self.finalTfMatrix,columns=self.vocabulary)
        # print("Term Frequency Matrix: TF(t,d)")
        # print(self.finalTfMatrix)
        # #create IDF matrix
        # self.finalIdfMatrix = self.tfidf.createIdfMatrix(self.sentences,self.vocabulary)
        # self.finalIdfMatrix = pd.DataFrame(self.finalIdfMatrix,columns=self.vocabulary)
        # print("IDF Matrix: TDF(t)")
        # print(self.finalIdfMatrix)
        # #create TF-IDF matrix
        # self.finalTfIdfMartix = self.tfidf.calculateTfIdfMatrix(self.sentences,self.finalTfMatrix,self.finalIdfMatrix,self.vocabulary)
        # self.finalTfIdfMartix = pd.DataFrame(self.finalTfIdfMartix,columns=self.vocabulary)
        # print("TF-IDF Matrix:")
        # print(self.finalTfIdfMartix)

        # NAIVE BAYES
        # calculate prior probablity
        # for the given intput sentence
        sentence = [sentence]
        # convert to list to use the same method
        sentence = self.dc.preprocessSentences(sentence)
        sentence = sentence[0]
        sentence = self.dc.replaceLitiotes(sentence)
        # check and return
        print("preprocessed sentence = ",sentence)
        if(sentence.strip() == ""):
            return "neutral"
        if all(char in string.punctuation + string.digits for char in sentence):
            return "neutral"
        
        print("Calculating prior probabilities for both pos and neg...")
        [priorPositiveProbability,priorNegativeProbability] = self.calculatePriorProbability()
        print('Done.')
        print("Converting sentence into tokens...")
        # split given sentence into tokens
        sentenceTokenized = sentence.split()
        print('Done.')
        #calculate likelihood
        print("calculating positive likelihood...")
        likelihoodPositive = self.calculateLikelihood(sentenceTokenized,1)
        print('Done.')
        print("calculating negative likelihood...")
        likelihoodNegative = self.calculateLikelihood(sentenceTokenized,0)
        print('Done.')
        # calculate Posterior Probablility
        print("calculating positive posterior(main) value...")
        posteriorPositiveProbablility = priorPositiveProbability * likelihoodPositive 
        posteriorNegativeProbablility = priorNegativeProbability * likelihoodNegative 
        print('Done.')
        print("positive posterior value: ",posteriorPositiveProbablility)
        print("negative posterior value: ",posteriorNegativeProbablility)
        # display sentiiment
        return self.displaySentiment(posteriorPositiveProbablility,posteriorNegativeProbablility,sentence)
        # likelihoodPositive = self.calculateLikelihood(sentenceTokenized,1)
        # likelihoodNegative = self.calculateLikelihood(sentenceTokenized,0)
        # print(priorPositiveProbability,priorNegativeProbability)
        # print(likelihoodPositive,likelihoodNegative)
        
    # prior probability calculation
    def calculatePriorProbability(self):
        # prior probability for Positive
        priorPositiveProbability = self.totalPositiveSentence/self.totalSentences
        # prior probability for Negative
        priorNegativeProbability = self.totalNegativeSentence/self.totalSentences
        return [priorPositiveProbability,priorNegativeProbability]


    # likelihood calculation
    def calculateLikelihood(self,sentenceTokenized,classLabel):
        finalLikelihood = 1
        for token in sentenceTokenized:
            likelihoodOfGivenClass = 0
            totalValueOfTokenInGivenClass = 0
            # check if token is the feature of the vocab in dataset
            if(token in self.vocabulary):
                totalValueOfTokenInBothClass = sum(self.finalTfIdfMartix[token])
                # positive case
                if(classLabel == 1):
                    totalValueOfTokenInGivenClass = sum(self.finalPositiveTfIdfMartix[token])
                # negative case
                elif(classLabel == 0):
                    totalValueOfTokenInGivenClass = sum(self.finalNegativeTfIdfMartix[token])
                # zero probability problem
                if(totalValueOfTokenInGivenClass == 0):
                    likelihoodOfGivenClass = 1 / (totalValueOfTokenInBothClass + self.vocabularyLength)
                else:
                    likelihoodOfGivenClass = totalValueOfTokenInGivenClass / totalValueOfTokenInBothClass
            else:
                if(classLabel == 1):
                    likelihoodOfGivenClass = 1 / (self.totalSumValueOfPositiveTfidfArray + len(self.vocabulary))
                elif(classLabel == 0):
                    likelihoodOfGivenClass = 1 / (self.totalSumValueOfNegativeTfidfArray + len(self.vocabulary))
            finalLikelihood *= likelihoodOfGivenClass
        return finalLikelihood


    # display sentiment based on posteriror probability
    def displaySentiment(self,posteriorPositiveProbablility,posteriorNegativeProbablility,sentence):
        threshold = 0.05
        if(abs(posteriorPositiveProbablility - posteriorNegativeProbablility) <= threshold):
            return "neutral"
        else:
            if posteriorPositiveProbablility > posteriorNegativeProbablility:
                return "positive"
            elif posteriorNegativeProbablility > posteriorPositiveProbablility:
                return "negative"

