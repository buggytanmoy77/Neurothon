document.querySelector(".submit-btn").addEventListener("click", function() {
    let userInput = document.querySelector(".userprompt").value;
    if (userInput === "") {
        alert("⚠️ Please enter your symptoms before submitting!");
        return; 
    }

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
        document.querySelector(".initial-content").style.display = "none";
        document.querySelector(".prediction-heading").style.display = "block";
        predictionsContainer.style.display = "flex";
        document.querySelector(".access-akinator-btn").style.display = "block";
        document.querySelector(".akinator-info").style.display = "flex";
        document.querySelector(".userprompt").style.display = "none";
        document.querySelector(".submit-btn").style.display = "none";
        document.querySelector(".Predictions").style.gap = "4vh";
    })
    .catch(error => console.error("Error:", error));
});