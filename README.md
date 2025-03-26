Overview:
This project utilizes cosine similarity search to match user input with a dataset containing symptom lists. 
Based on the similarity scores, it predicts the top 5 most probable diseases. To further refine the prediction, 
an Akinator-style adaptive questioning model is employed. By dynamically narrowing down options through 
strategic questioning, the system enhances the accuracy of the disease prediction.

Features
Cosine Similarity Search: Compares user symptoms with a predefined dataset to identify potential diseases.
Top 5 Disease Prediction: Provides the most probable diseases based on initial input.
Adaptive Questioning (Akinator Model): Uses a decision-based questioning mechanism to refine and improve the prediction.
High Accuracy: Adaptive questioning significantly enhances diagnostic accuracy.

How It Works
User Input: The user enters symptoms.
Cosine Similarity Matching: The system finds the closest matches in the dataset and suggests the top 5 probable diseases.
Akinator Model Activation: The model asks a series of questions based on initial predictions to filter out incorrect diseases.
Final Prediction: Based on the user's answers, the system provides the most accurate disease prediction.
