// Correct export for boolean flag
export let is_started = false;

import { ball } from "./ball.js";
import { startStopwatch } from "./watch.js";

// Ensure button exists before adding event listener
let button = document.getElementById('start_button');
if (button) {
    button.addEventListener('click', function () {
        startStopwatch();
        fetch_score();
        if (!is_started) ball.createBall();
        is_started = true; // Set to true instead of 1
    });
}
function fetch_score()
{
    fetch('https://backend-1-cr8v.onrender.com/lead', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json()) // Parse JSON data
    .then(data => {
        console.log(data);
        const leaderboardDiv = document.getElementById("leaderboard");
        if (leaderboardDiv) {
            const table = document.createElement("table");
            const headerRow = document.createElement("tr");
            const nameHeader = document.createElement("th");
            const scoreHeader = document.createElement("th");

            nameHeader.textContent = "Name";
            scoreHeader.textContent = "Score";

            headerRow.appendChild(nameHeader);
            headerRow.appendChild(scoreHeader);
            table.appendChild(headerRow);

            data.forEach(entry => {
                const row = document.createElement("tr");
                const nameCell = document.createElement("td");
                const scoreCell = document.createElement("td");

                nameCell.textContent = entry.name;
                scoreCell.textContent = entry.score;

                row.appendChild(nameCell);
                row.appendChild(scoreCell);
                table.appendChild(row);
            });

            leaderboardDiv.appendChild(table);
        }
    })
    .catch(error => {
        console.error('Error fetching leaderboard:', error);
    });
}

