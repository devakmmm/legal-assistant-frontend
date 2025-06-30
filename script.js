
const submitBtn = document.getElementById("submit-btn");
const userInput = document.getElementById("user-input");
const responseOutput = document.getElementById("response-output");
const loading = document.getElementById("loading");

submitBtn.addEventListener("click", async () => {
  const question = userInput.value.trim();
  if (!question) return;

  responseOutput.innerHTML = "";
  loading.classList.remove("hidden");

  try {
    const fetchResponse = async () => {
      return await fetch("https://legal-assistant-backend-la97.onrender.com/api/legal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
    };

    let res = await fetchResponse();

    // Retry once if failed (Render cold start)
    if (!res.ok) {
      await new Promise(resolve => setTimeout(resolve, 4000)); // wait 4 seconds
      res = await fetchResponse();
    }

    if (!res.ok) throw new Error("Backend still failed after retry");

    const data = await res.json();
    responseOutput.innerHTML = data.response.replace(/\n/g, "<br>");
  } catch (error) {
    responseOutput.innerHTML = "Something went wrong. Please try again.";
    console.error("Error:", error);
  } finally {
    loading.classList.add("hidden");
  }
});
