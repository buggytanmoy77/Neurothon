document.querySelector(".submit-btn").addEventListener("click", function() {
    let userInput = document.querySelector(".userprompt").value;
    let loader = document.getElementById("loader");
    let content = document.querySelector(".Workspace");

    if (userInput.trim() === "") {
        alert("⚠️ Please enter your symptoms before submitting!");
        console.warn("User tried to submit an empty text area.");
        return;
    }

    // Show loader & blur background
    loader.style.display = "block";
    content.classList.add("blur");

    // Introduce a delay before sending the fetch request
    setTimeout(() => {
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

            // Hide loader & remove blur effect
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

            // Hide loader & remove blur effect on error
            loader.style.display = "none";
            content.classList.remove("blur");
        });
    }, 2000); // Delay of 1 second (1000ms)
});
