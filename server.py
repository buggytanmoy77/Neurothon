from flask import Flask, request, jsonify, render_template
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

df = pd.read_csv('Database/diseases_with_symptoms.csv')
df.dropna(subset=['Symptoms'], inplace=True)  

vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
X = vectorizer.fit_transform(df['Symptoms'])

def predict_diseases(user_input, top_n=5):
    user_vec = vectorizer.transform([user_input])
    cos_sim = cosine_similarity(user_vec, X).flatten()
    top_indices = cos_sim.argsort()[-top_n:][::-1]
    results = []
    for idx in top_indices:
        disease = df.iloc[idx]['Disease Name']
        prob = cos_sim[idx]
        results.append({"disease": disease, "probability": f"{prob:.2f}"})
    return results

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    user_symptoms = data.get("symptoms", "")
    predictions = predict_diseases(user_symptoms)
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True)
