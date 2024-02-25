const moon = document.getElementById('moon');
const orbit = document.getElementById('orbit');
const dateSlider = document.getElementById('dateSlider');
const dateBar = document.getElementById('dateBar');
const dateNumbers = document.getElementById('dateNumbers');
const moonPhases = document.getElementById('moonPhases');

const orbitRadius = 200; // Radius of the orbit
let currentDate = parseInt(dateSlider.value);

dateSlider.addEventListener('input', () => {
    updateMoonPhase(dateSlider.value);
});

function updateMoonPhase(day) {
    currentDate = parseInt(day);
    const phase = calculateMoonPhase(currentDate);
    moon.style.backgroundImage = `url('moon_phase_${phase}.png')`; // Adjust image naming convention if needed
    updateMoonPosition();
    updateDateBar();
    updateDayNumbers();
    updateMoonPhases(phase);
}

function calculateMoonPhase(day) {
    // Assuming a lunar cycle of 30 days
    const phase = Math.floor(((day - 1) % 30) / 3); // Dividing the lunar cycle into 8 phases
    return phase < 7 ? phase : phase % 7; // Repeat phases after reaching phase 7
}

function updateMoonPosition() {
    const angle = ((currentDate - 1) / 30) * 360;
    const x = orbitRadius * Math.cos(degreesToRadians(angle));
    const y = orbitRadius * Math.sin(degreesToRadians(angle));
    moon.style.left = `${770 + x}px`;
    moon.style.top = `${400 + y}px`;
}


function updateDateBar() {
    dateBar.textContent = `Day ${currentDate}`;
}

function updateDayNumbers() {
    dateNumbers.textContent = ''; // Clear previous numbers
    for (let i = 1; i <= 30; i++) {
        const dayNumber = document.createElement('span');
        dayNumber.textContent = i;
        dateNumbers.appendChild(dayNumber);
    }
}

function updateMoonPhases(phase) {
    const phases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    moonPhases.textContent = phases[phase];
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

updateMoonPhase(dateSlider.value); // Initial moon phase update based on slider value
