document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.querySelector(".submit-btn");
    const userPrompt = document.querySelector(".userprompt");
    const loader = document.getElementById("loader");
    const content = document.querySelector(".Workspace");
    const initialContent = document.querySelector(".initial-content");
    const predictionHeading = document.querySelector(".prediction-heading");
    const topPredictions = document.querySelector(".top-predictions");
    const akinatorInfo = document.querySelector(".akinator-info");
    const accessAkinatorBtn = document.querySelector(".access-akinator-btn");
    const questionSetup = document.querySelector(".question-setup");
    const questionText = document.querySelector(".question");
    const yesBtn = document.querySelector(".yes");
    const noBtn = document.querySelector(".no");
    const Predictions = document.querySelector(".Predictions");
    const final = document.querySelector(".final-answer-section");
    const finalanswer = document.querySelector(".final-answer");

    predictionHeading.style.display = "none";
    topPredictions.style.display = "none";
    akinatorInfo.style.display = "none";
    accessAkinatorBtn.style.display = "none";
    questionSetup.style.display = "none";
    loader.style.display = "none";
    final.style.display = "none";

    submitBtn.addEventListener("click", function() {
        let userInput = userPrompt.value;

        if (userInput.trim() === "") {
            alert("⚠️ Please enter your symptoms before submitting!");
            console.warn("User tried to submit an empty text area.");
            return;
        }

        loader.style.display = "block";
        content.classList.add("blur");

        setTimeout(() => {
            fetch("/predict", {
                method: "POST",
                body: JSON.stringify({ symptoms: userInput }),
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.warn("Server response not OK:", response.status);
                    return response.text().then(text => {
                        console.error("Response text:", text);
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(predictions => {
                console.log("Received predictions:", predictions);
                topPredictions.innerHTML = "";

                predictions.forEach(prediction => {
                    let diseaseDiv = document.createElement("div");
                    diseaseDiv.classList.add("disease");

                    let name = document.createElement("h3");
                    name.classList.add("name");
                    name.textContent = prediction.disease;

                    let probability = document.createElement("h3");
                    probability.classList.add("probability");
                    probability.textContent = prediction.probability;

                    diseaseDiv.appendChild(name);
                    diseaseDiv.appendChild(probability);
                    topPredictions.appendChild(diseaseDiv);
                });

                loader.style.display = "none";
                content.classList.remove("blur");
                initialContent.style.display = "none";
                predictionHeading.style.display = "block";
                topPredictions.style.display = "flex";
                accessAkinatorBtn.style.display = "block";
                akinatorInfo.style.display = "flex";
                userPrompt.style.display = "none";
                submitBtn.style.display = "none";
                Predictions.style.gap = "4vh";
            })
            .catch(error => {
                console.error("Error during prediction:", error);
                loader.style.display = "none";
                content.classList.remove("blur");
            });
        }, 500);
    });

    accessAkinatorBtn.addEventListener("click", function () {
        content.classList.add("blur");
        loader.style.display = "block";

        const elementsToHide = document.querySelectorAll(".prediction-heading, .top-predictions, .akinator-info, .access-akinator-btn, .Input");
        elementsToHide.forEach(element => {
            element.style.display = "none";
        });

        setTimeout(() => {
            content.classList.remove("blur");
            loader.style.display = "none";
            questionSetup.style.display = "flex";
            Predictions.style.width = "40vw";
            Predictions.style.height = "65vh";
            fetchNextQuestion(); 
        }, 1000);
    });

    function fetchNextQuestion(answer = null) {
        loader.style.display = "block";

        fetch("/next_question", {
            method: "POST",
            body: JSON.stringify({ answer: answer }),
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                console.warn("Server response not OK:", response.status);
                return response.text().then(text => {
                    console.error("Response text:", text);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            console.log("Received question data:", data);
            loader.style.display = "none";

            if (data.question) {
             
                questionText.textContent = data.question;
            } else {
              
                questionSetup.style.display = "none";
                final.style.display = "flex";
                finalanswer.textContent = data.final_disease;
            }
        })
        .catch(error => {
            console.error("Error during questioning:", error);
            alert("Something went wrong. Please try again!");
            loader.style.display = "none";
        });
    }

   
    yesBtn.addEventListener("click", function () {
        fetchNextQuestion("yes");
    });

    noBtn.addEventListener("click", function () {
        fetchNextQuestion("no");
    });
});