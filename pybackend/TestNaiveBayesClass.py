import datetime
import pandas as pd
import numpy as np
from TfIdfClass import TfIdfClass
from DataClass import DataClass

class TestNaiveBayesClass:

    def __init__(self):
        # create TfIdfClass instance
        # self.tfidf = TfIdfClass()
        # df = pd.read_csv("writtentest.csv")
        # self.sentences = df["review"].to_numpy()
        # self.label = df["label"].to_numpy()
        # sample dataset for testing
        # self.sentences = [
        #     "i love food",
        #     "great service",
        #     "i hate ambiance",
            
        # ]
        # self.label = [1,1,0]
        # for preprocessing DataClass
        # self.dc = DataClass()
        # for TF-IDF
        # self.vocabulary = set()
        # self.finalTfMatrix= []
        # self.finalIdfMatrix = []
        # self.finalTfIdfMartix = []

        # for Naive Bayes
        self.totalSentences = len(self.label)
        self.totalPositiveSentence = np.count_nonzero(self.label == 1)
        self.totalNegativeSentence = np.count_nonzero(self.label == 0)
        # self.totalPositiveSentence = self.label.count(1)
        # self.totalNegativeSentence = self.label.count(0)
        # print("pos sent = ",self.totalPositiveSentence,self.totalNegativeSentence)


    # main function
    def calculateSentiment(self,sentence):
        #DATA CLASS
        # preprocess the sentences
        self.sentences = self.dc.preprocessSentences(self.sentences)
        # create a vocabulary array
        self.vocabulary = self.tfidf.createVocabulary(self.sentences)

        # TFIDF CLASS
        # create tf matrix
        self.finalTfMatrix = self.tfidf.createTfMatrix(self.sentences,self.vocabulary)
        self.finalTfMatrix = pd.DataFrame(self.finalTfMatrix,columns=self.vocabulary)
        print("Term Frequency Matrix: TF(t,d)")
        print(self.finalTfMatrix)
        #create IDF matrix
        self.finalIdfMatrix = self.tfidf.createIdfMatrix(self.sentences,self.vocabulary)
        self.finalIdfMatrix = pd.DataFrame(self.finalIdfMatrix,columns=self.vocabulary)
        print("IDF Matrix: TDF(t)")
        print(self.finalIdfMatrix)
        #create TF-IDF matrix
        self.finalTfIdfMartix = self.tfidf.calculateTfIdfMatrix(self.sentences,self.finalTfMatrix,self.finalIdfMatrix,self.vocabulary)
        self.finalTfIdfMartix = pd.DataFrame(self.finalTfIdfMartix,columns=self.vocabulary)
        print("TF-IDF Matrix:")
        print(self.finalTfIdfMartix)

        # NAIVE BAYES
        # calculate prior probablity
        # for the given intput sentence
        sentence = [sentence]
        # convert to list to use the same method
        sentence = self.dc.preprocessSentences(sentence)
        sentence = sentence[0]

        [priorPositiveProbability,priorNegativeProbability] = self.calculatePriorProbability()
        # split given sentence into tokens
        sentenceTokenized = sentence.split()
        #calculate likelihood
        likelihoodPositive = self.calculateLikelihood(sentenceTokenized,1)
        likelihoodNegative = self.calculateLikelihood(sentenceTokenized,0)
        # calculate Posterior Probablility
        posteriorPositiveProbablility = priorPositiveProbability * likelihoodPositive 
        posteriorNegativeProbablility = priorNegativeProbability * likelihoodNegative 

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
        # for unseen words
        # likelihood =  1/total count of tokens in class C
        # total value in token?
        totalTokenInGivenClass = 0

        for i in range(self.totalSentences):
            if(self.label[i]==classLabel):
                for token in self.vocabulary:
                    totalTokenInGivenClass += self.finalTfIdfMartix[token][i]
        # print(totalTokenInGivenClass)
        for token in sentenceTokenized:
            likelihoodOfGivenClass = 0
            totalTokenPosOnGivenClass = 0

            # check if token is the feature of the voacb in dataset
            if(token in self.vocabulary):
                totalNoOfToken = sum(self.finalTfIdfMartix[token])

                for i in range (self.totalSentences):
                    if(self.finalTfIdfMartix[token][i] > 0 and self.label[i]==classLabel):
                        totalTokenPosOnGivenClass += self.finalTfIdfMartix[token][i]
                # if the token not in given class in all dataset
                # zero probability problem
                if(totalTokenPosOnGivenClass == 0):
                    likelihoodOfGivenClass = 1 / (totalNoOfToken + len(self.vocabulary))
                else:
                    likelihoodOfGivenClass = totalTokenPosOnGivenClass / totalNoOfToken
            # if the token not in dataset features
            # new word not known to daset (zero prob problem) 
            # likelihood =  1/total count of tokens in class C + len(vocab)
            else:
                likelihoodOfGivenClass = 1 / (totalTokenInGivenClass + len(self.vocabulary))

            finalLikelihood *= likelihoodOfGivenClass

        return finalLikelihood


    # display sentiment based on posteriror probability
    def displaySentiment(self,posteriorPositiveProbablility,posteriorNegativeProbablility,sentence):
        print("positive posterior: ",posteriorPositiveProbablility)
        print("negative posterior: ",posteriorNegativeProbablility)
        threshold = 0.05
        print(sentence, " :")
        if(abs(posteriorPositiveProbablility - posteriorNegativeProbablility) <= threshold):
            print("neutral")
            return "neutral"

        else:
            if posteriorPositiveProbablility > posteriorNegativeProbablility:
                print("positive")
                return "positive"
            elif posteriorNegativeProbablility > posteriorPositiveProbablility:
                print("negative")
                return "negative"

