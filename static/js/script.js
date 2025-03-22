document.querySelector(".submit-btn").addEventListener("click", function() {
    let userInput = document.querySelector(".userprompt").value;

    fetch("/predict", {
        method: "POST",
        body: JSON.stringify({ symptoms: userInput }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(predictions => {
        let predictionsContainer = document.querySelector(".top-predictions");
        predictionsContainer.innerHTML = ""; // Clear previous results

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

        document.querySelector(".userprompt").style.display = "none";
        document.querySelector(".submit-btn").style.display = "none";
        document.querySelector(".access-akinator-btn").style.display = "block";
        document.querySelector(".akinator-info").style.display = "flex";
        document.querySelector(".Predictions").style.height = "60";
    });
});
