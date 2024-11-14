document.getElementById("check-button").addEventListener("click", async () => {
    const nameInput = document.getElementById("name-input").value.trim();

    if (nameInput === "") {
        document.getElementById("result").innerText = "Please enter a name.";
        return;
    }

    document.getElementById("result").innerText = "Checking name popularity...";

    try {
        const response = await fetch(`https://api.nationalize.io/?name=${nameInput}`);
        const data = await response.json();

        if (data.country && data.country.length > 0) {
            const topCountry = data.country[0];
            const probability = topCountry.probability;

            let popularityText = "";

            if (probability > 0.6) {
                popularityText = "This name is very common!";
            } else if (probability > 0.3) {
                popularityText = "This name is somewhat common.";
            } else {
                popularityText = "This name is quite unique!";
            }

            document.getElementById("result").innerHTML = `
                <p>${popularityText}</p>
                <p><strong>Most likely origin:</strong> ${topCountry.country_id}</p>
                <p><strong>Popularity score:</strong> ${(probability * 100).toFixed(2)}%</p>
            `;
        } else {
            document.getElementById("result").innerText = "This name appears to be unique!";
        }
    } catch (error) {
        document.getElementById("result").innerText = "Error fetching data. Please try again.";
        console.error(error);
    }
});
