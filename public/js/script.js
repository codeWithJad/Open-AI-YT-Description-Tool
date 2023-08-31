const btn = document.getElementById("generate");
const resultBox = document.getElementById("results");

btn.addEventListener("click", async () => {
  const title = document.getElementById("titleInput").value;

  try {
    const response = await fetch("/api/description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      const result = await response.json();
      resultBox.innerText = result.result["message"]["content"];
    } else {
      console.error("Failed to send API request");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
