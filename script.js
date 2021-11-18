//Hjelpevariabler
const app = document.getElementById('app');
// Rock = 0, Paper = 1, Scissors = 2, Lizard = 3, Spock = 4
const rules = [[2, 3], [0, 4], [1, 3], [1, 4], [2, 0]],
      names = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'],
      botName = 'Sheldon';
// Keeping this for timeout
let timeout;

//Model
let playerName = 'You', playerIndex, botIndex, playerScore = 0, botScore = 0, tiedScore = 0;

//View
function render() {
    app.innerHTML= `
    <ul class="logo span-2">
        <li>The</li>
        <li>Lizard-Spock</li>
        <li>Expansion</li>
    </ul>
    <svg class="board span-2" viewBox="0 0 800 800">
		<image href="https://cdn.discordapp.com/attachments/900315139268571137/910466529164935190/rpsls.png"/>
		<circle cx="400" cy="155" r="85" onclick="play(0);"/>
        <text x="400" y="155" alignment-baseline="middle" onclick="play(0);" class="bubble-text"></text>
		<circle cx="146" cy="350" r="85" onclick="play(1);"/>
        <text x="146" y="350" alignment-baseline="middle" onclick="play(1);" class="bubble-text"></text>
        <circle cx="244" cy="641" r="85" onclick="play(2);"/>
        <text x="244" y="641" alignment-baseline="middle" onclick="play(2);" class="bubble-text"></text>
		<circle cx="654" cy="350" r="85" onclick="play(3);"/>
        <text x="654" y="350" alignment-baseline="middle" onclick="play(3);" class="bubble-text"></text>
		<circle cx="556" cy="641" r="85" onclick="play(4);"/>
        <text x="556" y="641" alignment-baseline="middle" onclick="play(4);" class="bubble-text"></text>
        <text x="400" y="380" alignment-baseline="middle" class="neutral">${playerScore}-${tiedScore}-${botScore}</text>
        <text x="400" y="420" alignment-baseline="middle" id="status" class="positive"></text>
	</svg>
    <input type="text" onchange="playerName = this.value;" placeholder="Player name" value="${playerName === 'You' ? '' : playerName}">
    <button class="d-red white-txt" onclick="reset();">Reset</button>
    <a class="button span-2" href="https://www.youtube.com/watch?v=_PUEoDYpUyQ" target="_blank">Video about the rules</a>
    `;
}
render();

//Controller
function randomBotIndex() {
    return Math.floor(Math.random() * rules.length);
}

function applyResult() {
    const circles = document.querySelectorAll('.board circle'),
          texts = document.querySelectorAll('.board .bubble-text');
    if (circles.length !== texts.length) return;
    if (playerIndex === botIndex) {
        circles[playerIndex].classList.add('tied');
        texts[playerIndex].classList.add('active');
        texts[playerIndex].textContent = 'Tied';
        return;
    }
    circles[playerIndex].classList.add('player');
    circles[botIndex].classList.add('bot');
    texts[playerIndex].classList.add('active');
    texts[botIndex].classList.add('active');
    texts[playerIndex].textContent = playerName;
    texts[botIndex].textContent = botName;
}

function clearAll() {
    document.querySelectorAll('.board circle').forEach(function(circle) {
        circle.classList.remove('player', 'bot', 'tied');
    });
    document.querySelectorAll('.board text').forEach(function(text) {
        text.classList.remove('active');
    });
    render();
}

function play(index) {
    if (index < 0 || index >= rules.length) return;
    clearTimeout(timeout);
    clearAll();
    const status = document.getElementById('status');
    status.classList.remove('positive', 'neutral', 'negative');
    playerIndex = index;
    botIndex = randomBotIndex();
    applyResult();
    console.info(`${playerName} played "${names[index]}" and ${botName} played "${names[botIndex]}".`);
    if (rules[index].includes(botIndex)) {
        console.info(`${playerName} won!`);
        status.classList.add('positive');
        status.textContent = `${playerName} won!`;
        playerScore++;
    } else if(rules[botIndex].includes(index)) {
        console.info(`${botName} won!`);
        status.classList.add('negative');
        status.textContent = `${botName} won!`;
        botScore++;
    } else {
        console.info('Tied.');
        status.classList.add('neutral');
        status.textContent = 'Tied.';
        tiedScore++;
    }
    timeout = setTimeout(clearAll, 1000);
}

function reset() {
    playerName = 'You';
    playerIndex = undefined;
    botIndex = undefined;
    playerScore = 0;
    botScore = 0;
    tiedScore = 0;
    render();
}