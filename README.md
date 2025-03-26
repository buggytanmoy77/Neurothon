# 🏥 DaiGNO 🤖

## 🔍 Overview
**DaiGNO** is an AI-driven medical diagnosis system that mimics the famous "Akinator" but focuses on medical diagnosis. The system first predicts the top 5 most probable medical conditions by using **cosine similarity search** to match the user's input symptoms with a dataset of symptoms. It then refines the diagnosis by leveraging an **Akinator-style adaptive questioning model**, which dynamically narrows down the possible diseases, leading to an accurate prediction.

## 🌟 Features
- 🏥 **Cosine Similarity-Based Prediction**: Matches user symptoms with a medical database to predict top 5 probable diseases.
- ❓ **Adaptive Questioning Model**: Uses a decision tree-like approach to refine the diagnosis dynamically.
- 🖥️ **User-Friendly Interface**: Simple and intuitive way for users to enter symptoms and get results.
- 🤖 **Machine Learning Integration**: Implements advanced similarity search techniques for enhanced accuracy.
- 📚 **Medical Conditions Database**: Curated dataset of diseases and symptoms for reliable predictions.

## 🛠️ Technologies Used
- 🐍 **Python** (for backend logic and AI model)
- 🌐 **Flask/Django** (for web-based deployment)
- 📊 **Scikit-Learn** (for machine learning algorithms)
- 🔢 **Pandas & NumPy** (for data processing)
- 📝 **NLTK/SpaCy** (for natural language processing)
- 🎨 **HTML/CSS/JavaScript** (for frontend UI)
- 🗄️ **SQLite/PostgreSQL** (for storing medical conditions and symptoms)

## 🚀 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/buggytanmoy77/Neurothon.git
   cd Neurothon
   ```

## 🏃 Usage
1. Start the application and enter your symptoms.
2. The system matches the symptoms with a dataset using **cosine similarity search** to predict the top 5 most likely diseases.
3. The **Akinator model** then asks a series of yes/no questions to refine the diagnosis.
4. The system provides the most probable medical condition based on responses.
5. (Optional) The system may provide medical recommendations or direct users to professional advice.

## 📂 Dataset
The system uses a dataset of diseases and symptoms curated from publicly available medical sources. The datasets were **collected from the Mayo Clinic website using web scraping methods**. It applies **cosine similarity search** to identify potential matches and then utilizes **adaptive questioning** to narrow down the diagnosis.

## 🔮 Future Enhancements
- 🧠 **Deep Learning Integration**: Improve accuracy using neural networks.
- 🎙️ **Speech Recognition**: Enable voice-based interaction.
- 👨‍⚕️ **Doctor Consultation Feature**: Provide links to professional medical advice.
- 📱 **Mobile App Version**: Extend accessibility to mobile platforms.

## ⚠️ Disclaimer
This system is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider for accurate diagnosis and treatment.

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 👥 Contributors
- **[Tanmoy](https://github.com/buggytanmoy77)**
- **[Hrishikesh](https://github.com/wardayX)**
- **[Faruk](https://github.com/Faruk0713)**

