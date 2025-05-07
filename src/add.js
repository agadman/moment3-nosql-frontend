import API_URL from './config';

document.getElementById("workForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    companyname: document.getElementById("companyname").value,
    jobtitle: document.getElementById("jobtitle").value,
    location: document.getElementById("location").value,
    startdate: document.getElementById("startdate").value,
    enddate: document.getElementById("enddate").value,
    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = "Något gick fel vid sparandet!";
      
      if (data.errors && typeof data.errors === "object") {
        const messages = Object.values(data.errors).map(err => err.message);
        errorMessage = messages.join("\n");
      } else if (data.error) {
        errorMessage = data.error;
      }
    
      throw new Error(errorMessage);
    }

    document.getElementById("message").textContent = "Erfarenhet tillagd!";
    document.getElementById("workForm").reset();
  } catch (error) {
    const messageElement = document.getElementById("message");
    messageElement.innerHTML = ""; 
  
    if (error.message.includes("\n")) {
      error.message.split("\n").forEach(msg => {
        const p = document.createElement("p");
        p.textContent = msg;
        messageElement.appendChild(p);
      });
    } else {
      messageElement.textContent = error.message;
    }
  }
});