import json
import pickle
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from getSingular import getSingular
import re


class DataClass:

    def __init__(self):
        # load lemma dictionary file
        with open('lemmas.txt', 'r',encoding="utf-8") as f:
            self.wordLemmaDictionary = json.load(f)

        #load plural to singular dictionary
        with open('plurals.txt', 'r',encoding="utf-8") as f:
            self.pluralsDictionary = json.load(f)

        #load contradiction dictionary
        with open('contradiction.txt', 'r',encoding="utf-8") as f:
            self.contradictionDictionary = json.load(f)

        #load littiotes dictionary
        with open('littiotes.txt', 'r',encoding="utf-8") as f:
            self.littiotesDictionary = json.load(f)
            
        #import getSingular function
        self.nlp = spacy.load("en_core_web_sm")

    
        self.myStopWords = [
            "a","i","m" "about", "above", "after", "again", "all", "am", "an", "and", "any", "are", "as", "at", "be", "because", 
            "been", "before", "being", "below", "between", "both", "by", "could", "did", "do", "does", "doing", "during", 
            "each", "few", "for", "from", "further", "had", "has", "have", "he", "her", "here", "hers", "herself", "him", 
            "himself", "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just", "me", "more", "most", 
            "my", "myself", "nor", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", 
            "out", "over", "own", "same", "she", "should", "so", "some", "such", "than", "that", "the", "their", "theirs", 
            "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to", "under", "until", 
            "up", "very", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "with", 
            "you", "your", "yours", "yourself", "yourselves","is"
        ]
        
    # lemmatize function
    def lemmatize(self,token,partOfSpeech):
        # check if word is present in wordLemmaDictonary along with pos for that word
        if token.text in self.wordLemmaDictionary and partOfSpeech in self.wordLemmaDictionary[token.text]:
            return self.wordLemmaDictionary[token.text][partOfSpeech]
        # return token as it is
        else:
            return token.text


    # PREPROCESSING STEPS
    # 1. convert to lowercase
    # 2. remove punctuations and numbers

    def preprocessSentences(self,sentences):
        # sentences is an array of strings
        lemmatizedWordsArray = []
        lemmatizedSentences = []
        i = 1
        print("Started Sentences preprocessing stage...")
        # iterate through each sentence
        for sentence in sentences:

            # 1. convert to lowercase
            sentence = sentence.lower()
            # 2. Tokenization (into each words)
            words = sentence.split()

            # replace don't with do not
            sentence = [self.contradictionDictionary.get(word,word) for word in words]
            sentence = ' '.join(sentence)
            # 3. remove punctuations and numbers
            sentence = re.sub(r"[^a-z\s]", '', sentence)
            # replace multiple spaces with a single space
            sentence = re.sub(r'\s+', ' ', sentence)
            
            words = sentence.split()
            # 4. Remove stop words
            words = [word for word in words if word not in self.myStopWords]

            tempwords = []
            for word in words:
                response = getSingular(word)
                if isinstance(response,dict) and "NOUN" in response:
                    tempwords.append(response["NOUN"])
                else:
                    tempwords.append(response)

            words = tempwords
            sentence = ' '.join(words)
            
         

            doc = self.nlp(sentence)
    
            lemmatizedWordsArray = []
            for token in doc:
                partOfSpeech = token.pos_
                
                lemma = self.lemmatize(token,partOfSpeech)

                lemmatizedWordsArray.append(lemma)

            # lemmatizedWordsArray
            # ['read', 'complex', 'bus']
            # ['buy', 'ongoing', 'product']
            # ['sam', 'go', 'abroad', 'saturday', 'fly', 'emergency', 'flight']
            
            lemmatizedSentence = ' '.join(lemmatizedWordsArray)
            lemmatizedSentences.append(lemmatizedSentence)
            print(f"Preprocess sentence {i} complete.")
            i += 1
        # outside loop
        print("preprocessing step done.")
        return lemmatizedSentences

    def replaceLitiotes(self,sentence):
        for key, value in self.littiotesDictionary.items():
            # Use re.sub to ensure exact match of phrases
            sentence = re.sub(rf'\b{re.escape(key)}\b', value, sentence)
        return sentence
        pass