// --- DATA FOR ALL RACES ---
// To add more races or edit predictions, just modify this object.
const raceData = {
  singapore: {
    // This is NOT a sprint weekend
    isSprintWeekend: false,
    header: "My Predictions for the Singapore GP:",
    predictionTitle: "My Predictions For The Upcoming Singapore Grand Prix",
    poorly: "Kimi Antonelli",
    surprise: "Lewis Hamilton",
    pole: "Lando Norris",
    p3: "Lando Norris",
    p2: "Max Verstappen",
    p1: "Oscar Piastri",
    edited: "16-10-2025 7:36PM IST",
    winnerName: "George Russell",
    winnerTeam: "Mercedes",
    winnerPhoto: "https://pbs.twimg.com/media/F9o5yEkXwAEEolE.jpg", 
    actualPole: "G. Russell",
    actualP2: "M. Verstappen",
    actualP3: "L. Norris",
  },
  usa: {
    // This IS a sprint weekend
    isSprintWeekend: true, 
    header: "My Predictions for the United States GP:",
    predictionTitle: "My Predictions For The Upcoming United States Grand Prix",
    // New Sprint Predictions
    sprintPole: "Max Verstappen",
    sprintWinner: "Max Verstappen",
    // Regular Predictions
    poorly: "Hadjar",
    surprise: "Charles Leclerc",
    pole: "Max Verstappen",
    p3: "Oscar Piastri",
    p2: "George Russell",
    p1: "Max Verstappen",
    edited: "16-10-2025 7:36PM IST",
    winnerName: "Max Verstappen",
    winnerTeam: "Red Bull",
    winnerPhoto: "https://i.pinimg.com/originals/78/b5/ac/78b5ac107f5734193cb8c9c3e0d5b86a.jpg",
    actualPole: "M. Verstappen",
    actualP2: "L. Norris",
    actualP3: "C. Leclerc",
      // New property for actual sprint winner
    actualSprintWinner: "Max Verstappen",
  },
  mexico: {
      // This is NOT a sprint weekend
    isSprintWeekend: false,
    header: "My Predictions for the Mexican GP:",
    predictionTitle: "My Predictions For The Upcoming Mexican Grand Prix",
    poorly: "George Russell",
    surprise: "Oscar Piastri",
    pole: "Max Verstappen",
    p3: "Charles Leclerc",
    p2: "Oscar Piastri",
    p1: "Max Verstappen",
    edited: "24-10-2025 7:21PM IST",
    winnerName: "Lando Norris",
    winnerTeam: "Mclaren",
    winnerPhoto: "https://pbs.twimg.com/media/EUlYIJCUcAA0LDA.jpg", 
    actualPole: "L. Norris",
    actualP2: "C. Leclerc",
    actualP3: "M. Verstappen",
  }
};

// --- FUNCTION TO UPDATE THE PAGE CONTENT FOR RACES ---
function updateRacePage(raceKey) {
  const data = raceData[raceKey];
  if (!data) {
    console.error("No data found for race:", raceKey);
    return;
  }

  // --- Get references to the sprint prediction containers ---
  const sprintPoleContainer = document.getElementById('sprint-pole-container');
  const sprintWinnerContainer = document.getElementById('sprint-winner-container');
  const actualSprintContainer = document.getElementById('actual-sprint-container');

  // --- Conditional logic for sprint races ---
  if (data.isSprintWeekend) {
    // It's a sprint race, so fill the data and show the elements
    document.getElementById('prediction-sprint-pole').textContent = data.sprintPole;
    document.getElementById('prediction-sprint-winner').textContent = data.sprintWinner;
    sprintPoleContainer.classList.remove('hidden');
    sprintWinnerContainer.classList.remove('hidden');
    // Show and fill actual result element
    document.getElementById('actual-sprint-winner').textContent = data.actualSprintWinner;
    actualSprintContainer.classList.remove('hidden');
  } else {
    // It's a normal race, so make sure the sprint elements are hidden
    sprintPoleContainer.classList.add('hidden');
    sprintWinnerContainer.classList.add('hidden');
    actualSprintContainer.classList.add('hidden');
  }

  // Update Header
  document.getElementById('main-header').textContent = data.header;
  
  // Update Predictions
  document.getElementById('prediction-header').textContent = data.predictionTitle;
  document.getElementById('prediction-poorly').textContent = data.poorly;
  document.getElementById('prediction-surprise').textContent = data.surprise;
  document.getElementById('prediction-pole').textContent = data.pole;
  document.getElementById('prediction-p3').textContent = data.p3;
  document.getElementById('prediction-p2').textContent = data.p2;
  document.getElementById('prediction-p1').textContent = data.p1;
  document.getElementById('last-edited').textContent = `Last Edited ${data.edited}`;

  // Update Actual Winner section
  document.getElementById('winner-photo').src = data.winnerPhoto;
  document.getElementById('winner-photo').alt = `${data.winnerName} - Photo`;
  document.getElementById('winner-name').textContent = data.winnerName;
  document.getElementById('winner-team').textContent = data.winnerTeam;
  document.getElementById('actual-pole').textContent = data.actualPole;
  document.getElementById('actual-p2').textContent = data.actualP2;
  document.getElementById('actual-p3').textContent = data.actualP3;
}

// --- EVENT LISTENERS FOR NAVIGATION ---
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const predictionsSection = document.getElementById('predictions-section');
  const winnerSection = document.getElementById('winner-section');
  const picturesSection = document.getElementById('pictures-section');
  const mainHeader = document.getElementById('main-header');

  navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); 

      // Update active link styling
      navLinks.forEach(l => {
        l.classList.remove('active');
        l.previousElementSibling.classList.remove('text-gold');
        l.previousElementSibling.classList.add('text-white');
      });

      const clickedLink = event.currentTarget;
      clickedLink.classList.add('active');
      clickedLink.previousElementSibling.classList.add('text-gold');
      clickedLink.previousElementSibling.classList.remove('text-white');

      const section = clickedLink.dataset.section;
      const raceKey = clickedLink.dataset.race;

      // Show/Hide sections
      if (section === 'pictures') {
        mainHeader.textContent = "my driver ratings (2025 singapore-).";
        picturesSection.classList.remove('hidden');
        predictionsSection.classList.add('hidden');
        winnerSection.classList.add('hidden');
      } else if (raceKey) {
        picturesSection.classList.add('hidden');
        predictionsSection.classList.remove('hidden');
        winnerSection.classList.remove('hidden');
        updateRacePage(raceKey);
      }
    });
  });

  // --- INITIAL PAGE LOAD ---
  // Load the first race by default
  updateRacePage('singapore');
});
