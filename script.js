const searchInput = document.querySelector('[data-testid="autocomplete-input"]');
const doctorCards = document.querySelectorAll('[data-testid="doctor-card"]');
const suggestionContainer = document.createElement('div');
suggestionContainer.classList.add('autocomplete-suggestions');
searchInput.parentNode.appendChild(suggestionContainer);

function getDoctorNames() {
  return Array.from(doctorCards).map(card => 
    card.querySelector('[data-testid="doctor-name"]').textContent.trim()
  );
}

function filterDoctorsByName(name) {
  doctorCards.forEach(card => {
    const docName = card.querySelector('[data-testid="doctor-name"]').textContent.toLowerCase();
    card.style.display = docName.includes(name.toLowerCase()) ? 'flex' : 'none';
  });
}

function generateSuggestions(value) {
  const allNames = getDoctorNames();
  const filtered = allNames.filter(name => name.toLowerCase().includes(value.toLowerCase())).slice(0, 3);
  suggestionContainer.innerHTML = '';
  filtered.forEach(name => {
    const item = document.createElement('div');
    item.textContent = name;
    item.setAttribute('data-testid', 'suggestion-item');
    item.className = 'suggestion-item';
    item.onclick = () => {
      searchInput.value = name;
      suggestionContainer.innerHTML = '';
      filterDoctorsByName(name);
    };
    suggestionContainer.appendChild(item);
  });
}

searchInput.addEventListener('input', (e) => {
  const val = e.target.value.trim();
  if (val === '') {
    suggestionContainer.innerHTML = '';
    doctorCards.forEach(card => card.style.display = 'flex');
    return;
  }
  generateSuggestions(val);
  filterDoctorsByName(val);
});

// Optional: Close suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target)) {
    suggestionContainer.innerHTML = '';
  }
});
