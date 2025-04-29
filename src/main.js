import './style.css';
import API_URL from './config';

const list = document.getElementById('experienceList');

// Hämtar alla erfarenheter
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    // Tömmer listan först
    list.innerHTML = '';

    data.forEach(exp => {
      const li = document.createElement('li');

      li.innerHTML = `
        <strong>${exp.jobtitle}</strong> på ${exp.companyname} (${exp.startdate} – ${exp.enddate})<br>
        <em>${exp.location}</em><br>
        ${exp.description}<br>
        <button class="delete-button" data-id="${exp._id}">Ta bort</button>
      `;

      list.appendChild(li);
    });

    // Lägger till eventlyssnare för alla delete-knappar
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;

        if (confirm("Vill du verkligen ta bort den här erfarenheten?")) {
          try {
            const res = await fetch(`${API_URL}/${id}`, {
              method: 'DELETE'
            });

            if (res.ok) {
              e.target.parentElement.remove(); 
            } else {
              const errorData = await res.json();
              alert("Fel vid borttagning: " + (errorData.message || "Okänt fel"));
            }
          } catch (err) {
            console.error("Fel vid borttagning:", err);
          }
        }
      });
    });
  })
  .catch(err => {
    list.innerHTML = `<li>Något gick fel: ${err.message}</li>`;
  });