// Game variables
let gameMode = 'pvc'; // Default game mode: player vs computer
let currentPlayer = 1; // Track current player in PvP mode
let player1Score = 0;
let player2Score = 0;
let winThreshold = 5; // Win the game after 5 points
let gameActive = true;
let player1Name = "Player 1";
let player2Name = "Computer";
let player2DefaultName = "Computer";
let player1Choice = null; // Store player 1's choice in PvP mode

// Sound effects
const sounds = {
    click: new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'),
    win: new Audio('https://assets.mixkit.co/active_storage/sfx/1389/1389-preview.mp3'),
    lose: new Audio('https://assets.mixkit.co/active_storage/sfx/2683/2683-preview.mp3'),
    draw: new Audio('https://assets.mixkit.co/active_storage/sfx/2702/2702-preview.mp3'),
    celebration: new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'),
    roundWin: new Audio('https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3'),
    roundLose: new Audio('https://assets.mixkit.co/active_storage/sfx/2691/2691-preview.mp3')
};

// Lower volume for all sounds
Object.values(sounds).forEach(sound => {
    sound.volume = 0.5;
});

// DOM Elements
const player1ScoreElement = document.getElementById('player1-score');
const player2ScoreElement = document.getElementById('player2-score');
const player1ChoiceElement = document.getElementById('player1-choice');
const player2ChoiceElement = document.getElementById('player2-choice');
const player1Img = document.getElementById('player1-img');
const player2Img = document.getElementById('player2-img');
const playerTurn = document.getElementById('player-turn');
const resultDisplay = document.getElementById('result');
const controlButtons = document.querySelectorAll('.control-btn');
const resetButton = document.getElementById('reset-btn');
const pvcButton = document.getElementById('pvc-btn');
const pvpButton = document.getElementById('pvp-btn');
const player2Label = document.getElementById('player2-label');
const player2NameElement = document.getElementById('player2-name');
const player2Avatar = document.getElementById('player2-avatar');
const winModal = document.getElementById('win-modal');
const winMessage = document.getElementById('win-message');
const continueButton = document.getElementById('continue-btn');

// Choice images
const choiceImages = {
    rock: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f44a.svg',
    paper: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/270b.svg',
    scissors: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/270c.svg',
    thinking: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f914.svg',
    win: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f60e.svg',
    lose: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f622.svg',
    draw: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f642.svg',
    waiting: 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f550.svg'
};

// Initialize particle.js
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
    
    // Add footer
    addFooter();
    
    // Add editable names functionality
    makeNamesEditable();
});

// Add footer
function addFooter() {
    const footer = document.createElement('footer');
    footer.style.textAlign = 'center';
    footer.style.marginTop = '30px';
    footer.style.padding = '15px';
    footer.style.color = 'white';
    footer.style.background = 'rgba(0, 0, 0, 0.2)';
    footer.style.borderRadius = '10px';
    footer.style.width = '100%';
    footer.style.maxWidth = '900px';
    footer.style.backdropFilter = 'blur(5px)';
    footer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    
    const link = document.createElement('a');
    link.href = 'https://jijanurrahman.netlify.app/';
    link.textContent = 'Made By Jijanur Rahman';
    link.style.color = 'white';
    link.style.textDecoration = 'none';
    link.style.fontWeight = 'bold';
    link.style.fontSize = '1.1rem';
    link.style.display = 'inline-block';
    link.style.transition = 'all 0.3s ease';
    
    link.addEventListener('mouseover', () => {
        link.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
        link.style.transform = 'scale(1.05)';
    });
    
    link.addEventListener('mouseout', () => {
        link.style.textShadow = 'none';
        link.style.transform = 'scale(1)';
    });
    
    footer.appendChild(link);
    document.querySelector('.container').after(footer);
}

// Make player names editable
function makeNamesEditable() {
    // Create editable name for Player 1
    const player1LabelElement = document.querySelector('.player1-score h3');
    player1LabelElement.innerHTML = `<span id="player1-name-display" class="editable-name">${player1Name}</span>`;
    makeNameClickable(document.getElementById('player1-name-display'), true);
    
    // Player 2 name is already in player2Label and player2NameElement
    player2Label.innerHTML = `<span id="player2-name-display" class="editable-name">${player2Name}</span>`;
    makeNameClickable(document.getElementById('player2-name-display'), false);
    
    // Add CSS for editable names
    const style = document.createElement('style');
    style.innerHTML = `
        .editable-name {
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 2px 5px;
            border-radius: 4px;
        }
        
        .editable-name:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .editable-name:hover::after {
            content: " ✏️";
            font-size: 0.8em;
        }
        
        .name-edit-input {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            border-radius: 4px;
            color: white;
            font-size: inherit;
            font-weight: inherit;
            text-align: center;
            font-family: inherit;
            padding: 2px 5px;
            width: 100%;
            max-width: 150px;
        }
        
        .name-edit-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// Make a name element clickable for editing
function makeNameClickable(element, isPlayer1) {
    if (!element) return;
    
    element.addEventListener('click', () => {
        sounds.click.play();
        const currentName = element.textContent;
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'name-edit-input';
        input.value = currentName;
        input.maxLength = 15;
        
        element.parentNode.replaceChild(input, element);
        input.focus();
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                submitNameChange(input, isPlayer1);
            } else if (e.key === 'Escape') {
                cancelNameChange(input, currentName, isPlayer1);
            }
        });
        
        input.addEventListener('blur', () => {
            submitNameChange(input, isPlayer1);
        });
    });
}

// Submit name change
function submitNameChange(input, isPlayer1) {
    const newName = input.value.trim() || (isPlayer1 ? "Player 1" : player2DefaultName);
    const newElement = document.createElement('span');
    newElement.id = isPlayer1 ? 'player1-name-display' : 'player2-name-display';
    newElement.className = 'editable-name';
    newElement.textContent = newName;
    
    input.parentNode.replaceChild(newElement, input);
    makeNameClickable(newElement, isPlayer1);
    
    // Update player name in other places
    if (isPlayer1) {
        player1Name = newName;
        document.querySelector('.player-box:first-child h3').textContent = newName;
    } else {
        player2Name = newName;
        player2NameElement.textContent = newName;
    }
    
    // Update player turn message if needed
    updatePlayerTurnMessage();
}

// Cancel name change
function cancelNameChange(input, originalName, isPlayer1) {
    const newElement = document.createElement('span');
    newElement.id = isPlayer1 ? 'player1-name-display' : 'player2-name-display';
    newElement.className = 'editable-name';
    newElement.textContent = originalName;
    
    input.parentNode.replaceChild(newElement, input);
    makeNameClickable(newElement, isPlayer1);
}

// Game Mode Selection
pvcButton.addEventListener('click', () => {
    setGameMode('pvc');
    sounds.click.play();
});

pvpButton.addEventListener('click', () => {
    setGameMode('pvp');
    sounds.click.play();
});

function setGameMode(mode) {
    if (mode === gameMode) return;
    
    gameMode = mode;
    resetGame();
    
    // Update UI for selected mode
    if (mode === 'pvc') {
        pvcButton.classList.add('active');
        pvpButton.classList.remove('active');
        player2DefaultName = "Computer";
        player2Name = player2DefaultName;
        document.getElementById('player2-name-display').textContent = player2Name;
        player2NameElement.textContent = player2Name;
        player2Avatar.src = 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f916.svg';
        updatePlayerTurnMessage();
    } else {
        pvpButton.classList.add('active');
        pvcButton.classList.remove('active');
        player2DefaultName = "Player 2";
        player2Name = player2DefaultName;
        document.getElementById('player2-name-display').textContent = player2Name;
        player2NameElement.textContent = player2Name;
        player2Avatar.src = 'https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/svg/1f60e.svg';
        updatePlayerTurnMessage();
    }
}

// Update player turn message
function updatePlayerTurnMessage() {
    if (gameMode === 'pvc') {
        playerTurn.textContent = `${player1Name}, choose your move!`;
    } else {
        if (currentPlayer === 1) {
            playerTurn.textContent = `${player1Name}'s turn`;
        } else {
            playerTurn.textContent = `${player2Name}'s turn`;
        }
    }
}

// Reset Game
resetButton.addEventListener('click', resetGame);

function resetGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    gameActive = true;
    player1Choice = null;
    
    player1ScoreElement.textContent = '0';
    player2ScoreElement.textContent = '0';
    
    player1Img.src = choiceImages.thinking;
    player2Img.src = choiceImages.thinking;
    
    resultDisplay.textContent = '';
    resultDisplay.classList.remove('show', 'win', 'lose', 'draw');
    
    player1ChoiceElement.classList.remove('highlight', 'shake', 'bounce');
    player2ChoiceElement.classList.remove('highlight', 'shake', 'bounce');
    
    // Reset the confetti
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    
    sounds.click.play();
    
    updatePlayerTurnMessage();
}

// Game Controls
controlButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!gameActive) return;
        
        sounds.click.play();
        const choice = button.getAttribute('data-choice');
        makeChoice(choice);
    });
});

function makeChoice(choice) {
    if (gameMode === 'pvc') {
        playerVsComputer(choice);
    } else {
        playerVsPlayer(choice);
    }
}

// Player vs Computer
function playerVsComputer(playerChoice) {
    // Animate player choice
    player1Img.src = choiceImages[playerChoice];
    player1ChoiceElement.classList.add('spin');
    
    // Computer chooses after a delay
    playerTurn.textContent = 'Computer is thinking...';
    
    setTimeout(() => {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        player2Img.src = choiceImages[computerChoice];
        player2ChoiceElement.classList.add('spin');
        
        // Determine winner
        const result = determineWinner(playerChoice, computerChoice);
        showResult(result, playerChoice, computerChoice);
        
        // Update score
        updateScore(result);
        
        // Check for game win
        checkForWin();
    }, 1000);
}

// Player vs Player
function playerVsPlayer(choice) {
    if (currentPlayer === 1) {
        // Store Player 1's choice
        player1Choice = choice;
        player1Img.src = choiceImages.waiting;
        player1ChoiceElement.classList.add('spin');
        
        // Switch to player 2
        currentPlayer = 2;
        playerTurn.textContent = `${player2Name}'s turn`;
    } else {
        // Show both players' choices simultaneously
        player1Img.src = choiceImages[player1Choice];
        player2Img.src = choiceImages[choice];
        player2ChoiceElement.classList.add('spin');
        
        // Determine winner
        const result = determineWinner(player1Choice, choice);
        
        // Show result
        showResult(result, player1Choice, choice);
        
        // Update score
        updateScore(result);
        
        // Switch back to player 1
        currentPlayer = 1;
        player1Choice = null;
        
        // Check for game win
        checkForWin();
        
        if (gameActive) {
            setTimeout(() => {
                playerTurn.textContent = `${player1Name}'s turn`;
            }, 2000);
        }
    }
}

// Determine Winner
function determineWinner(choice1, choice2) {
    if (choice1 === choice2) {
        return 'draw';
    }
    
    if (
        (choice1 === 'rock' && choice2 === 'scissors') ||
        (choice1 === 'paper' && choice2 === 'rock') ||
        (choice1 === 'scissors' && choice2 === 'paper')
    ) {
        return 'player1';
    } else {
        return 'player2';
    }
}

// Show Result
function showResult(result, choice1, choice2) {
    resultDisplay.classList.add('show');
    
    // Reset animations
    player1ChoiceElement.classList.remove('spin', 'highlight', 'shake', 'bounce');
    player2ChoiceElement.classList.remove('spin', 'highlight', 'shake', 'bounce');
    
    // Reapply to trigger animation
    setTimeout(() => {
        if (result === 'player1') {
            resultDisplay.textContent = `${player1Name} wins this round!`;
            resultDisplay.className = 'result show win';
            player1ChoiceElement.classList.add('highlight');
            player2ChoiceElement.classList.add('shake');
            sounds.roundWin.play();
            
            // Update emotions
            setTimeout(() => {
                player1Img.src = choiceImages.win;
                player2Img.src = choiceImages.lose;
            }, 500);
        } else if (result === 'player2') {
            resultDisplay.textContent = gameMode === 'pvc' ? 
                `${player2Name} wins this round!` : 
                `${player2Name} wins this round!`;
            resultDisplay.className = 'result show lose';
            player2ChoiceElement.classList.add('highlight');
            player1ChoiceElement.classList.add('shake');
            sounds.roundLose.play();
            
            // Update emotions
            setTimeout(() => {
                player1Img.src = choiceImages.lose;
                player2Img.src = choiceImages.win;
            }, 500);
        } else {
            resultDisplay.textContent = 'It\'s a draw!';
            resultDisplay.className = 'result show draw';
            player1ChoiceElement.classList.add('bounce');
            player2ChoiceElement.classList.add('bounce');
            sounds.draw.play();
            
            // Update emotions
            setTimeout(() => {
                player1Img.src = choiceImages.draw;
                player2Img.src = choiceImages.draw;
            }, 500);
        }
    }, 10);
    
    // Reset images after a while if we're continuing the game
    if (gameMode === 'pvp' && gameActive) {
        setTimeout(() => {
            if (currentPlayer === 1) {
                player1Img.src = choiceImages.thinking;
                player2Img.src = choiceImages.thinking;
            }
        }, 2500);
    }
}

// Update Score
function updateScore(result) {
    if (result === 'player1') {
        player1Score++;
        player1ScoreElement.textContent = player1Score;
    } else if (result === 'player2') {
        player2Score++;
        player2ScoreElement.textContent = player2Score;
    }
}

// Check for Win
function checkForWin() {
    if (player1Score >= winThreshold || player2Score >= winThreshold) {
        gameActive = false;
        
        // Determine winner
        const winner = player1Score >= winThreshold ? player1Name : player2Name;
        winMessage.textContent = `Congratulations! ${winner} Wins The Game!`;
        
        // Show confetti for player win
        createConfetti();
        
        // Play celebration sound
        sounds.celebration.play();
        
        // Create video-like effect with animated background
        createCelebrationEffect(winner === player1Name ? 'player1' : 'player2');
        
        // Show win modal
        setTimeout(() => {
            winModal.classList.add('show');
            if (winner === player1Name) {
                sounds.win.play();
            } else {
                sounds.lose.play();
            }
        }, 1500);
    }
}

// Continue button
continueButton.addEventListener('click', () => {
    winModal.classList.remove('show');
    resetGame();
    
    // Remove celebration effect
    const celebrationEffect = document.getElementById('celebration-effect');
    if (celebrationEffect) {
        celebrationEffect.remove();
    }
});

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = ''; // Clear previous confetti
    
    const colors = ['#fd79a8', '#6c5ce7', '#00b894', '#fdcb6e', '#0984e3'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Create celebration effect with flowers and animations
function createCelebrationEffect(winner) {
    // Remove any existing celebration effect
    const existingEffect = document.getElementById('celebration-effect');
    if (existingEffect) {
        existingEffect.remove();
    }
    
    // Create celebration container
    const celebrationEffect = document.createElement('div');
    celebrationEffect.id = 'celebration-effect';
    celebrationEffect.style.position = 'fixed';
    celebrationEffect.style.top = '0';
    celebrationEffect.style.left = '0';
    celebrationEffect.style.width = '100%';
    celebrationEffect.style.height = '100%';
    celebrationEffect.style.pointerEvents = 'none';
    celebrationEffect.style.zIndex = '99';
    celebrationEffect.style.overflow = 'hidden';
    document.body.appendChild(celebrationEffect);
    
    // Add flower petals falling
    const flowerTypes = [
        '🌸', '🌺', '🌼', '🌻', '🌹', '🏆', '👑', '✨', '🎉', '🎊'
    ];
    
    for (let i = 0; i < 60; i++) {
        const flower = document.createElement('div');
        flower.textContent = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flower.style.position = 'absolute';
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.top = -50 + 'px';
        flower.style.fontSize = (Math.random() * 30 + 20) + 'px';
        flower.style.opacity = Math.random() * 0.7 + 0.3;
        flower.style.transform = `rotate(${Math.random() * 360}deg)`;
        flower.style.animation = `flower-fall ${Math.random() * 6 + 6}s linear forwards`;
        celebrationEffect.appendChild(flower);
        
        // Create animation for flower falling
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes flower-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: ${Math.random() * 0.7 + 0.3};
                }
                50% {
                    opacity: ${Math.random() * 0.7 + 0.3};
                }
                100% {
                    transform: translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg);
                    opacity: 0;
                }
            }
            
            @keyframes glow {
                0%, 100% {
                    text-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.5);
                }
                50% {
                    text-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add trophy emoji near winning player
    const playerChoice = winner === 'player1' ? player1ChoiceElement : player2ChoiceElement;
    const rect = playerChoice.getBoundingClientRect();
    
    const trophy = document.createElement('div');
    trophy.textContent = '🏆';
    trophy.style.position = 'absolute';
    trophy.style.left = (rect.left + rect.width / 2) + 'px';
    trophy.style.top = (rect.top - 50) + 'px';
    trophy.style.fontSize = '50px';
    trophy.style.transform = 'translateX(-50%)';
    trophy.style.animation = 'float 3s infinite, glow 2s infinite';
    trophy.style.zIndex = '100';
    celebrationEffect.appendChild(trophy);
    
    // Remove celebration effect after some time
    setTimeout(() => {
        celebrationEffect.style.transition = 'opacity 1s';
        celebrationEffect.style.opacity = '0';
        setTimeout(() => {
            celebrationEffect.remove();
        }, 1000);
    }, 7000);
}

// Remove animation classes after animations complete
player1ChoiceElement.addEventListener('animationend', () => {
    player1ChoiceElement.classList.remove('spin', 'bounce');
});

player2ChoiceElement.addEventListener('animationend', () => {
    player2ChoiceElement.classList.remove('spin', 'bounce');
});

// Initialize the game
resetGame();