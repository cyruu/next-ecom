import spacy
import nltk
import pickle
from nltk.corpus import words
nltk.download('words')
nlp = spacy.load("en_core_web_sm")
english_words = set(words.words())
with open("cachedvocabulary.pkl", "rb") as f:
    cachedvocabulary = pickle.load(f)
meaningful_words = [word for word in cachedvocabulary if word.lower() in english_words]

# print(meaningful_words, len(meaningful_words))  # Output: ['hello', 'world', 'this']
print(cachedvocabulary,len(cachedvocabulary))
# with open("cachedvocabulary.pkl", "wb") as f:
#     pickle.dump(meaningful_words, f)
