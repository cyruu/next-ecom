import nltk
from nltk.corpus import words

# Download the word corpus
nltk.download('words')

# List of English words
english_words = set(words.words())

# Your array of words
input_words = ["aaaaaaaaaaaa", "feafasfe", "helooooooooooooooooooo", "hello", "world", "this","afaefes","rfsbfhrjsbfjs","helo","i","hi","heloooooo"]

# Filter out invalid words
meaningful_words = [word for word in input_words if word.lower() in english_words]

print(meaningful_words)  # Output: ['hello', 'world', 'this']
