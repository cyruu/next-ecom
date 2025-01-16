from flask import Flask,request,jsonify # type: ignore
from flask_cors import CORS
import pandas as pd
import string
from NaiveBayesClass import NaiveBayesClass
# from TestNaiveBayesClass import TestNaiveBayesClass

app = Flask(__name__)
CORS(app)

@app.route("/calcsentiment", methods=["POST"])
def calcsentiment():
    data = request.json
    sentence = data["sentence"] # type: ignore
    if(sentence.strip() == ""):
        return jsonify({"sentiment":"neutral"})
    if all(char in string.punctuation + string.digits for char in sentence):
        return jsonify({"sentiment":"neutral"})


    tnb = NaiveBayesClass()
    sentiment = tnb.calculateSentiment(sentence)
    # return jsonify({"sentiment":"neutral"})
    return jsonify({"sentiment":sentiment})

if __name__ == "__main__":
    print("running in porrt 8001")
    app.run(debug=True, port=8001)