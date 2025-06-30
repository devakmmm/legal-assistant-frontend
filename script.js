
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
    const res = await fetch("https://your-backend-url.onrender.com/api/legal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    responseOutput.innerHTML = data.response.replace(/\n/g, "<br>");
  } catch (error) {
    responseOutput.innerHTML = "Something went wrong. Please try again.";
  } finally {
    loading.classList.add("hidden");
  }
});
