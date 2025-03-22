document.querySelector(".submit-btn").addEventListener("click", function() {
    let userInput = document.querySelector(".userprompt").value;
    let loader = document.getElementById("loader");
    let content = document.querySelector(".Workspace");

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
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(predictions => {
            let predictionsContainer = document.querySelector(".top-predictions");
            predictionsContainer.innerHTML = ""; 

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
                predictionsContainer.appendChild(diseaseDiv);
            });

            loader.style.display = "none";
            content.classList.remove("blur");

            document.querySelector(".initial-content").style.display = "none";
            document.querySelector(".prediction-heading").style.display = "block";
            predictionsContainer.style.display = "flex";
            document.querySelector(".access-akinator-btn").style.display = "block";
            document.querySelector(".akinator-info").style.display = "flex";
            document.querySelector(".userprompt").style.display = "none";
            document.querySelector(".submit-btn").style.display = "none";
            document.querySelector(".Predictions").style.gap = "4vh";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Something went wrong. Please try again!");

            loader.style.display = "none";
            content.classList.remove("blur");
        });
    }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
    const accessAkinatorBtn = document.querySelector(".access-akinator-btn");
    const predictionheading = document.querySelector(".prediction-heading");
    const topprediction = document.querySelector(".top-predictions");
    const akinatorinfo = document.querySelector(".akinator-info");
    const questionSetup = document.querySelector(".question-setup");
    const Input = document.querySelector(".Input");
    const loader = document.getElementById("loader");
    const allElementsToBlur = document.querySelectorAll(".prediction-heading, .top-predictions, .akinator-info, .access-akinator-btn, .Input");

    // Initially hide the question setup
    questionSetup.style.display = "none";
    loader.style.display = "none";

    accessAkinatorBtn.addEventListener("click", function () {
        // Apply blur effect
        allElementsToBlur.forEach(element => {
            element.classList.add("blur");
        });

        // Show loader effect
        loader.style.display = "block";

        setTimeout(() => {
            // Hide blurred elements
            allElementsToBlur.forEach(element => {
                element.style.display = "none";
                element.classList.remove("blur"); // Remove blur after hiding
            });

            // Hide loader and show question setup
            loader.style.display = "none";
            questionSetup.style.display = "flex";
        }, 2000);
    });
});
