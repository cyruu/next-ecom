import joblib
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk

# Load the model and vectorizer
model = joblib.load("sentiment_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Download NLTK data if not already downloaded
nltk.download('vader_lexicon')

# Function to predict sentiment
def predict_sentiment(sentence):
    tfidf_vector = vectorizer.transform([sentence])
    prediction = model.predict(tfidf_vector)
    if prediction == 1:
        return "Positive"
    elif prediction == 0:
        # Further check for neutrality using NLTK
        sia = SentimentIntensityAnalyzer()
        sentiment_score = sia.polarity_scores(sentence)
        if sentiment_score['compound'] > 0.05:
            return "Positive"
        elif sentiment_score['compound'] < -0.05:
            return "Negative"
        else:
            return "Neutral"

# Interactive user input
while True:
    user_input = input("Enter a sentence to analyze sentiment (or 'exit' to quit): ")
    if user_input.lower() == 'exit':
        break
    sentiment = predict_sentiment(user_input)
    print(f"Predicted Sentiment: {sentiment}")
