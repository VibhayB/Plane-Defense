let totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
let initialbossremoved = 0;

let currentAudio = bgmusic;
var music = true;

updateCoinDisplay();

document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const toggleIcon = document.getElementById('toggleIcon');

    function toggleAudio() {
        if (!music) {
            currentAudio.play();
            music = true;
            toggleIcon.src = 'unmute.png'; // Set to mute icon when audio is playing
        } else {
            currentAudio.pause();
            toggleIcon.src = 'mute.png'; // Set to unmute icon when audio is paused
            music = false;
        }
    } 

    toggleIcon.src = music ? 'unmute.png' : 'mute.png';

    // Add event listener to the button
    toggleButton.addEventListener('click', toggleAudio);
});

// Function to manage audio based on visibility and focus
function manageAudio() {
    if (document.hidden || !music) {
        if (!currentAudio.paused) {
            currentAudio.pause(); // Pause the audio if the tab is hidden or music is off
        }
    } else {
        if (currentAudio.paused) {
            currentAudio.play().catch(error => {
                // Optionally, you could inform the user or prompt for interaction here
            });
        }
    }
}

// Event listener for visibility changes
document.addEventListener('visibilitychange', manageAudio);

// Optional: Listen for focus/blur events to handle cases where the tab might be visible but not focused
window.addEventListener('focus', manageAudio);
window.addEventListener('blur', manageAudio);

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevents the default action (like image dragging)
    });
});

//Update volumes: explosion, big explosion
bigexplode.volume = 0.5;
missilelaunch.volume = 0.25;
exploding.volume = 0.5;
shootsound.volume = 0.5;
teleport.volume = 0.5;


document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

    function initialize(){
        // Hide the initial screen and show the game content
        document.getElementById('initialscreen').style.display = 'none';
        if(music){
            bgmusic.play();
        }
        document.removeEventListener('click',initialize);
    } document.addEventListener('click', initialize);
    

    var storedwinned = localStorage.getItem('winned');
    var winned = storedwinned ? JSON.parse(storedwinned) : [1, 0, 0, 0, 0, 0, 0];

    var storedScheme = localStorage.getItem('coloring');
    var coloring = storedScheme ? JSON.parse(storedScheme) : [2, 1, 0, 0, 0, 0, 0, 0];

    function closelevel(){
        document.getElementById('levelScreen').style.display = 'none';
    }

    const initiallevelcolors = document.querySelectorAll('.levelbutton');
    
    let win = 0;
    let level7 = 0;

    const missileImage = new Image();
    missileImage.src = 'missile.png';

// Function to resize and replace the image 
let planes = [
    {
        id: 'monoFighter',
        name: 'Mono Fighter (1x)',
        health: 1,
        cost: 'Already Owned',
        imgSrc: 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05001234/plane_preview.png',
        bought: true,
        damage: 1,
        freezed: 'basicplanefreezed.png'
    },
    {
        id: 'miniDualShooter',
        name: 'Phantom Raider (1.5x)',
        health: 2,
        cost: ' 240',
        imgSrc: 'dualshooter.png',
        bought: false,
        damage: 1.5,
        freezed: 'dualshooterfreezed.png'
    },
    {
        id: 'fairyplane',
        name: 'Stallion (2.25x)',
        health: 3,
        cost: ' 510',
        imgSrc: 'fairy.png',
        bought: false,
        damage: 2.25,
        freezed: 'fairyfreezed.png'
    },
    {
        id: 'heavyDuty',
        name: 'SkyBlazer (3.5x)',
        health: 4,
        cost: ' 730',
        imgSrc: 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05010017/plane-animated-top-down-game-art.png',
        bought: false,
        damage: 3.5,
        freezed: 'heavyplanefreezed.png'
    },
    {
        id: 'zxiFighter',
        name: 'Kaiser\'s Wrath (5x)',
        health: 6,
        cost: ' 1250',
        imgSrc: 'zxiFighter.png',
        bought: false,
        damage: 5,
        freezed: 'zxiFighter.png'
    }
];

let currenthealth = 0;
let currentPlaneIndex = 0;
let selectedPlane = 0;
let level = 0;
levelScreen.style.display = 'none';

function saveGameState() {
    var gameState = {
        boughtPlanes: planes.map(plane => ({ id: plane.id, bought: plane.bought })),
        selectedPlane,
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

function updateStoreMenu() {
    const plane = planes[currentPlaneIndex];

    if (!plane) {
        return;
    }

    document.getElementById('planeImage').src = plane.imgSrc;
    document.getElementById('planeName').innerText = plane.name;
    document.getElementById('healthValue').innerText = plane.health;

    if (plane.bought) {
        document.getElementById('planeCost').style.display = 'none';
    } else {
        document.getElementById('planeCost').style.display = 'block';
        document.getElementById('costValue').innerText = plane.cost;
    } 

    const buyButton = document.getElementById('buyButton');
    const equipButton = document.getElementById('equipButton');

    if (plane.bought) {
        buyButton.style.display = 'none';
        equipButton.style.display = 'inline-block';
        if (planes[selectedPlane]) {
            equipButton.innerText = (planes[selectedPlane].id === plane.id) ? 'Equipped' : 'Equip';
            equipButton.className = (planes[selectedPlane].id === plane.id) ? 'equipped-button button' : 'equip-button button';
        }
    } else {
        buyButton.style.display = 'inline-block';
        equipButton.style.display = 'none';
    } 
    saveGameState();
}

function showlevelscreen(){
    initiallevelcolors.forEach((button, index) => {
        if (coloring[index] == 2) {
            button.style.backgroundColor = 'green'; // give to blue
        } else if(coloring[index] == 1){
            button.style.backgroundColor = 'blue'; // give to green
        }
    }); 
    buttonclickk.currentTime = 0.25;
    buttonclickk.play();
    levelScreen.style.display = 'flex';
}

function prevPlane() {
    if (currentPlaneIndex > 0) {
        currentPlaneIndex--;
        updateStoreMenu();
    } else{
        currentPlaneIndex = planes.length - 1;
        updateStoreMenu();
    }
}

function nextPlane() {
    if (currentPlaneIndex < planes.length - 1) {
        currentPlaneIndex++;
        updateStoreMenu();
    } else{
        currentPlaneIndex = 0;
        updateStoreMenu();
    }
}

function buyCurrentPlane() {
    const plane = planes[currentPlaneIndex];
    if (totalCoins >= plane.cost && !plane.bought) {
        buttonclickk.currentTime = 0.25;
        buttonclickk.play();
        totalCoins -= plane.cost;
        localStorage.setItem('totalCoins', totalCoins);
        plane.bought = true;
        updateCoinDisplay();
        updateStoreMenu();
    }
}

function equipCurrentPlane() {
    const plane = planes[currentPlaneIndex];
    if (plane.bought) {
        buttonclickk.currentTime = 0.25;
        buttonclickk.play();
        selectedPlane = currentPlaneIndex;
        updateStoreMenu();
    }
}

function toggleStoreMenu() {
    const storeMenu = document.getElementById('storeMenu');
    if(storeMenu.style.display === 'none'){
        storeMenu.style.display = 'flex';
        buttonclickk.currentTime = 0.25;
        buttonclickk.play();
    } else{
        storeMenu.style.display = 'none';
    }
}
function loadGameState() {
    var savedState = localStorage.getItem('gameState');
    if (savedState) {
        var gameState = JSON.parse(savedState);
        planes.forEach(plane => {
            const savedPlane = gameState.boughtPlanes.find(p => p.id === plane.id);
            if (savedPlane) {
                plane.bought = savedPlane.bought;
            }
        });
        selectedPlane = gameState.selectedPlane;

        // Ensure selectedPlane is within bounds
        if (selectedPlane < 0 || selectedPlane >= planes.length) {
            selectedPlane = 0; // Default to 0 if out of bounds
        }
        
        updateCoinDisplay();  // Make sure to update the coin display after loading the state
    }
}

loadGameState();
// Initialize the display
updateStoreMenu();

storeMenu.style.display = 'none';

let paused = false;

function showMenu() {
    document.getElementById('menuScreen').style.display = 'flex';
}

function hideMenu() {
    document.getElementById('menuScreen').style.display = 'none';
}

function showHowToPlay() {
    buttonclickk.currentTime = 0.25;
    buttonclickk.play();
    document.getElementById('howToPlayPopup').style.display = 'block';
}

function closeHowToPlay() {
    document.getElementById('howToPlayPopup').style.display = 'none';
}

        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth - 20; // Adjusted canvas width
        canvas.height = window.innerHeight - 20; // Adjusted canvas height

// Define images
const coinImage = document.getElementById('coinImage');
const immunityPillImage = document.getElementById('immunityPillImage');

let coins = [];
let immunityPill = null;
let immunityActive = false;
let freezetime = 0;
let immunityDuration = 10; // in seconds
let immunityEndTime = 0;
let missileTime = 0;
let stunTime = 0;
let shooterTime = 0;

function createCoin() {
    let coin = {
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        type: 'coin'
    };
    coins.push(coin);
}

function createImmunityPill() {
    immunityPill = {
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40,
        type: 'immunityPill'
    };
}
        let planeImage = new Image();
        planeImage.src = planes[selectedPlane].imgSrc;
        const massExplosion = new Image();
        massExplosion.src = 'massexplosion.png';
        const stoneImage = new Image();
        stoneImage.src = 'stone.png';
        const rotatorImage = new Image();
        rotatorImage.src = 'satellite.png';
        const explosionImage = new Image();
        explosionImage.src = 'explosion.png';
        const alienPlaneImage = new Image();
        alienPlaneImage.src = 'alien.png';
        const bulletImage = new Image();
        bulletImage.src = 'fireball.png';
        const advancedAlienImage = new Image();
        advancedAlienImage.src = 'advancedallie.png';
        const asteroidImage = new Image();
        asteroidImage.src = 'asteroid.png';
        const BlueArcImage = new Image();
        BlueArcImage.src = 'bluearc.png';
        const nebulaImage = new Image();
        nebulaImage.src = 'nebula.png';
        const blueflare = new Image();
        blueflare.src = 'blueflare.png';
        const defenderImage = new Image();
        defenderImage.src = 'defender.png';
        const semibossImage = new Image();
        semibossImage.src = 'semiboss.png';
        const bossinitialImage = new Image();
        bossinitialImage.src = 'bossupwards.png';
        const bluebulettImage = new Image();
        bluebulettImage.src = 'bluebullet.png';
        let bubbleImage = new Image();
        bubbleImage.src = '';
        const shooterImage = new Image();
        shooterImage.src ='missilethrower.png';
        let planetImage = new Image();        
        let bossfinalImage = new Image();
        bossfinalImage.src = 'bossdownwards.png';
        let rocketImage = new Image();
        rocketImage.src = 'missiledown.png';
        const mistImage = new Image();
        mistImage.src ='mist.png';
        

        let plane = {
            x: canvas.width / 2,
            y: canvas.height - 100,
            width: 100,
            height: 100,
            speed: 4,
            shooting: false,
            bullets: []
        }; let bubble = {
            x: canvas.width / 2,
            y: canvas.height - 100,
            width: 100,
            height: 100,
        }; 

        let stones = [];
        let nebulas = [];
        let rotators = [];
        let asteroids = [];
        let boss = [];
        let massexplosions = [];
        let planets = [];
        let explosions = [];
        let alienPlanes = [];
        let advancedAliens = [];
        let finalboss = [];
        let defenders = [];
        let blueArcs = [];
        let missiles = [];
        let shooters = [];
        let mists = [];
        let score = 0;
        let highScore = parseInt(localStorage.getItem('highScore')) || 0;
        let timePassed = 0;
        let gameRunning = true;
        let lastTime = Date.now();

        let leftButton = document.getElementById('leftButton');
        let rightButton = document.getElementById('rightButton');
        let fireButton = document.getElementById('fireButton');
        let gameOverScreen = document.getElementById('gameOverScreen');
        let playAgainButton = document.getElementById('playAgainButton');

        let fireButtonPressed = false;
        let missileButtonPressed = false;
        let shooterButtonPressed = false;
        let stunButtonPressed = false;

document.getElementById('fireButton').addEventListener('touchstart', function(event) {
    event.stopPropagation();
    fireButtonPressed = true;
    shoot();
}, false);

document.getElementById('fireButton').addEventListener('mousedown', function(event) {
    event.stopPropagation();
    fireButtonPressed = true;
    shoot();
}, false);

document.getElementById('missileButton').addEventListener('touchstart', function(event) {
    event.stopPropagation();
    missileButtonPressed = true;
    missile();
}, false);

document.getElementById('missileButton').addEventListener('mousedown', function(event) {
    event.stopPropagation();
    missileButtonPressed = true;
    missile();
}, false);

document.getElementById('shooterButton').addEventListener('touchstart', function(event) {
    event.stopPropagation();
    shooterButtonPressed = true;
    createshooter();
}, false);

document.getElementById('shooterButton').addEventListener('mousedown', function(event) {
    event.stopPropagation();
    shooterButtonPressed = true;
    createshooter();
}, false);

document.getElementById('stunButton').addEventListener('touchstart', function(event) {
    event.stopPropagation();
    stunButtonPressed = true;
    stun();
}, false);

document.getElementById('stunButton').addEventListener('mousedown', function(event) {
    event.stopPropagation();
    stunButtonPressed = true;
    stun();
}, false);

document.addEventListener('touchstart', function(event) {
    if (!isWithinFireButton(event.clientX, event.clientY) && !isWithinPauseButton(event.clientX, event.clientY)) {
        if (event.touches[0].clientX < window.innerWidth / 2) {
            startMoveLeft();
        } else {
            startMoveRight();
        }
    }
    fireButtonPressed = false;
}, false);

document.addEventListener('mousedown', function(event) {
    if (!isWithinFireButton(event.clientX, event.clientY) && !isWithinPauseButton(event.clientX, event.clientY)) {
        if (event.clientX < window.innerWidth / 2) {
            startMoveLeft();
        } else {
            startMoveRight();
        }
    }
    fireButtonPressed = false;
}, false);

document.addEventListener('touchend', function(event) {
    endMoveLeft();
    endMoveRight();
}, false);

document.addEventListener('mouseup', function(event) {
    endMoveLeft();
    endMoveRight();
}, false);

        function startMoveLeft() {
            if(freezetime <= 0 && level7 != 1 && level7 != 5 && level7 != 5.5){
                plane.moveLeft = true;
            } else{
                plane.moveLeft = false;
            }
        }

        function endMoveLeft() {
            plane.moveLeft = false;
        }

        function startMoveRight() {            
            if(freezetime <= 0 && level7 != 1 && level7 != 5 && level7 != 5.5){
                plane.moveRight = true;
            } else{
                plane.moveRight = false;
            }
        }

        function endMoveRight() {
            plane.moveRight = false;
        }

        function shoot() {
            if(freezetime <= 0 && level7 != 1  && level7 != 5 && level7 != 5.5){
                plane.shooting = true;
            } else{
                plane.shooting = false;
            }
        } function missile(){
            if(missileTime === 0 && planes[selectedPlane].id === 'zxiFighter' && level7 != 1  && level7 != 5 && level7 != 5.5){
                // Set missile reuse time
                missileButton.style.display = 'none';
                missileTime = timePassed + 20;
                missileButtonPressed = true;
            } else{
                missileButtonPressed = false;
            }
        } function createshooter(){
            if(shooterTime === 0 && planes[selectedPlane].id === 'heavyDuty' && level7 != 1  && level7 != 5 && level7 != 5.5){
                // Set shooter reuse time
                shooterButton.style.display = 'none';
                shooterTime = timePassed + 20;
                shooterButtonPressed = true;
            } else{
                shooterButtonPressed = false;
            }
        } function stun(){
            if(stunTime === 0 && planes[selectedPlane].id === 'fairyplane' && level7!= 1  && level7 != 5 && level7 != 5.5){
                // Set stun reuse time
                stunButton.style.display = 'none';
                stunTime = timePassed + 20;
                stunButtonPressed = true;
            } else{
                stunButtonPressed = false;
            }
        }
        
// Add event listeners for keyboard controls
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
let spacebarPressed = false;
function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        startMoveLeft();
    } else if (event.key === 'ArrowRight') {
        startMoveRight();
    } else if (event.key === ' ' && !spacebarPressed) { // Spacebar for firing
        shoot();
        spacebarPressed = true;
    } else if (event.key === 'ArrowUp'){
        missile();
        createshooter();
        stun();
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        endMoveLeft();
    } else if (event.key === 'ArrowRight') {
        endMoveRight();
    } else if (event.key === ' ') {
        spacebarPressed = false;
    }
}
        // Add touch event listeners for left and right sides of the screen
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

function handleTouchStart(event) {
    if(isWithinFireButton(event.clientX, event.clientY) || isWithinPauseButton(event.clientX, event.clientY)){
        return;
    }
    if (event.touches[0].clientX < window.innerWidth / 2) {
        startMoveLeft();
    } else {
        startMoveRight();
    }
}

function handleTouchEnd(event) {
    endMoveLeft();
    endMoveRight();
}

function isWithinFireButton(x, y) {
    let rect = fireButton.getBoundingClientRect();
    return x >= rect.left && x <= rect.right &&
           y >= rect.top && y <= rect.bottom;
}

function isWithinPauseButton(x, y) {
    let rect = pauseButton.getBoundingClientRect();
    return x >= rect.left && x <= rect.right &&
           y >= rect.top && y <= rect.bottom;
}

        function createStone() {
            let stone = {
                x: Math.random() * (canvas.width - 40),
                y: -40,
                width: 40,
                height: 40,
                type: 'stone'
            };
            stones.push(stone);
        } function createNebulas(){
            let nebula = {
                x: Math.random() * (canvas.width - 40),
                y: -40,
                width: 50,
                height: 50,
                type: 'nebula'
            }; 
            nebulas.push(nebula);
        }        
        function createRotator() {
            let rotator = {
                x: Math.random() < 0.5
                ? Math.random() * (canvas.width / 2 - 40)
                : canvas.width - Math.random() * (canvas.width / 2 - 40),
                y: -40,
                width: 100,
                height: 100,
                tyPe: 'rotator'
            };
            rotators.push(rotator);
        } function createAsteroid(){
            let asteroidd = {
                x: Math.random() * (canvas.width - 40),
                y: -40,
                width: 60,
                height: 60,
                type: 'asteroidd'
            };
            asteroids.push(asteroidd);
        } function createPlanet(){
            let planet = {
                x: -190,
                y: -40,
                width: 2000,
                height: 2000,
                type: 'planet'
            }; planets.push(planet);
        } function createMassExplode(ax,ay){
            let massExplode = {
                x: ax-40,
                y: ay-100,
                time: timePassed,
                width: 120,
                height: 120,
                type:'massExplode'
            };
            massexplosions.push(massExplode);
        } function createBoss(){
            let bossinitial = {
                x: canvas.width / 2 - 140,
                y: canvas.height - 10,
                width: 280,
                height: 280,
                type: 'bosss'
            };
            boss.push(bossinitial);
        } 

        function createAlienPlane() {
            let alienPlane = {
                x: Math.random() * (canvas.width - 60),
                y: -60,
                width: 60,
                height: 60,
                bullets: [],
                health: 5, // takes 5 bullets to destroy
                type: 'alien',
                state: 0
            };
            alienPlanes.push(alienPlane);
        } function createAdvancedAliens(){
            let advancedAlien = {
                x: Math.random() * (canvas.width - 60),
                y: -60,
                width: 60,
                height: 60,
                bullets: [],
                health: 10, // takes 10 bullets to destroy
                type: 'advancedAlien',
                state: 0
            };
            advancedAliens.push(advancedAlien);
        } function createBlueArcs(){
            let blueArc = {
                x: Math.random() * (canvas.width - 60),
                y: -60,
                width: 60,
                height: 60,
                bullets: [],
                health: 20, // takes 20 bullets to destroy
                type: 'blueArc',
                state: 0
            };
            blueArcs.push(blueArc);
        } function createDefenders(){
            let intersects = false;

            let defender = {
                x: level === 7 ? canvas.width / 2 - 160 + Math.random() * 240 : Math.random() * (canvas.width - 60),
                y: -60,
                width: 60,
                height: 60,
                bullets: [],
                health: 35, // takes 35 bullets to destroy
                state: false,
                type: 'defender'
            };

            for (let existingDefender of defenders) {
                let intersectionWidth = Math.min(defender.x + defender.width, existingDefender.x + existingDefender.width) - Math.max(defender.x, existingDefender.x);

                if (intersectionWidth > Math.min(defender.width, existingDefender.width) / 2) {
                    intersects = true;
                }
            } if(!intersects){
                defenders.push(defender);
                return true;
            } else{
                return false;
            }
        } function createFinalBoss(){
            let bossfinal = {
                x: canvas.width / 2 - 140,
                y: -200,
                width: 280,
                height: 280,
                health: 500,
                missileTimer: 0,
                rockets: [],
                flareInterval: 0,
                flares: [],
                type: 'bossFinal'
            };
            finalboss.push(bossfinal);
        }

        function createExplosion(x, y) {
            exploding.currentTime = 0.5;
            exploding.play();
    explosions.push({ x: x, y: y, frame: 0});
} 

function Mistcheck(x,y){
    const explosionRadius = 85;
    let f = false;

    // Check collision with alien planes
    alienPlanes.forEach(alienPlane => {
        if (x + explosionRadius > alienPlane.x && x - explosionRadius < alienPlane.x + alienPlane.width &&
            y + explosionRadius > alienPlane.y && y - explosionRadius < alienPlane.y + alienPlane.height) {
            alienPlane.state = timePassed + 7;
            f = true;            
        }
    }); advancedAliens.forEach(advancedAlienplane => {
        if (x + explosionRadius > advancedAlienplane.x && x - explosionRadius < advancedAlienplane.x + advancedAlienplane.width &&
            y + explosionRadius > advancedAlienplane.y && y - explosionRadius < advancedAlienplane.y + advancedAlienplane.height) {
            advancedAlienplane.state = timePassed + 7;      
            f = true;      
        }
    }); blueArcs.forEach(blueArc => {
        if (x + explosionRadius > blueArc.x && x - explosionRadius < blueArc.x + blueArc.width &&
        y + explosionRadius > blueArc.y && y - explosionRadius < blueArc.y + blueArc.height){
            blueArc.state = timePassed + 7;
            f = true;
        }
    });
    if(f){
        flash.currentTime = 0;
        flash.play();    
    }
}

function MissileExplosion(x,y){
    createMassExplode(x,y);
    bigexplode.currentTime = 1;
    bigexplode.play();    
    missilelaunch.pause();
    const explosionRadius = 65;

    // Check collision with stones
    stones.forEach(stone => {
        if (x + explosionRadius > stone.x && x - explosionRadius < stone.x + stone.width &&
            y + explosionRadius > stone.y && y - explosionRadius < stone.y + stone.height) {
            createExplosion(stone.x, stone.y);
            stones.splice(stones.indexOf(stone), 1);
            score += 10; // Increase score for destroying a stone
            if (score > highScore) {
                highScore = score; // Update high score
                localStorage.setItem('highScore', highScore); // Store high score in local storage
            }
        }
    }); 

    rotators.forEach(rotator => {
        if (x + explosionRadius > rotator.x && x - explosionRadius < rotator.x + rotator.width &&
            y + explosionRadius > rotator.y && y - explosionRadius < rotator.y + rotator.height) {
            createExplosion(rotator.x, rotator.y);
            rotators.splice(rotators.indexOf(rotator), 1);
            score += 20; // Increase score for destroying a rotator
            if (score > highScore) {
                highScore = score; // Update high score
                localStorage.setItem('highScore', highScore); // Store high score in local storage
            }
        }
    }); 

    // Check collision with alien planes
    alienPlanes.forEach(alienPlane => {
        if (x + explosionRadius > alienPlane.x && x - explosionRadius < alienPlane.x + alienPlane.width &&
            y + explosionRadius > alienPlane.y && y - explosionRadius < alienPlane.y + alienPlane.height) {
            alienPlane.health = 0;
            createExplosion(alienPlane.x, alienPlane.y);
            alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
            score += 50; // Increase score for destroying an alien plane
            if (score > highScore) {
                highScore = score; // Update high score
                localStorage.setItem('highScore', highScore); // Store high score in local storage
            }
        }
    }); advancedAliens.forEach(advancedAlienplane => {
        if (x + explosionRadius > advancedAlienplane.x && x - explosionRadius < advancedAlienplane.x + advancedAlienplane.width &&
            y + explosionRadius > advancedAlienplane.y && y - explosionRadius < advancedAlienplane.y + advancedAlienplane.height) {
                advancedAlienplane.health = 0;
            createExplosion(advancedAlienplane.x, advancedAlienplane.y);
            advancedAliens.splice(advancedAliens.indexOf(advancedAlienplane), 1);
            score += 100; // Increase score for destroying an alien plane
            if (score > highScore) {
                highScore = score; // Update high score
                localStorage.setItem('highScore', highScore); // Store high score in local storage
            }
        }
    }); blueArcs.forEach(blueArc => {
        if (x + explosionRadius > blueArc.x && x - explosionRadius < blueArc.x + blueArc.width &&
        y + explosionRadius > blueArc.y && y - explosionRadius < blueArc.y + blueArc.height){
            blueArc.health -= 20;
            if(blueArc.health <= 0){
                createExplosion(blueArc.x, blueArc.y);
                blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                score += 200; // Increase score for destroying an alien plane
                if (score > highScore) {
                    highScore = score; // Update high score
                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                }
            }
        }
    }); finalboss.forEach(bossfinal => {
        if (x + explosionRadius > bossfinal.x && x - explosionRadius < bossfinal.x + bossfinal.width &&
            y + explosionRadius > bossfinal.y && y - explosionRadius < bossfinal.y + bossfinal.height){
                bossfinal.health -= 20;
                createExplosion(x, y);
                if(bossfinal.health <= 0){
                    level7 = 5;
                } else if(bossfinal.health <= 166){
                    level7 = 4;
                } else if(bossfinal.health <= 333){
                    level7 = 3;
                }
        } bossfinal.rockets.forEach(rocket => {
            if (x + explosionRadius > rocket.x && x - explosionRadius < rocket.x + rocket &&
                y + explosionRadius > rocket.y && y - explosionRadius < rocket.y + rocket.height){
                    bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                    createExplosion(rocket.x, rocket.y);
                }
        });
    });

    defenders.forEach(defender => {
        if (x + explosionRadius > defender.x && x - explosionRadius < defender.x + defender.width &&
        y + explosionRadius > defender.y && y - explosionRadius < defender.y + defender.height){
            defender.health -= 20;
            if(defender.health <= 0){
                defender.state = true;
            }
        }
    }); 
}

        let stars = [];

function createStars() {
    for (let i = 0; i < 50; i++) { // Adjust the number of stars as needed
        let star = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1, // Random size between 1 and 4
            speed: Math.random() * 2 + 1 // Random speed between 1 and 3
        };
        stars.push(star);
    }
} 

createStars(); // Call this function to initialize stars

// Function to check collision between a bullet and the downward equilateral triangular boss
function checkBulletCollision(bullet, boss) {
    // Define the vertices of the equilateral triangle
    let bottomLeft = { x: boss.x, y: boss.y };
    let bottomRight = { x: boss.x + boss.width, y: boss.y };
    let top = { x: boss.x + 140, y: boss.y + 280};

    // Calculate the slopes of the triangle's sides
    let leftSlope = (top.y - bottomLeft.y) / (top.x - bottomLeft.x);
    let rightSlope = (top.y - bottomRight.y) / (top.x - bottomRight.x);

    // Calculate the y-intercepts of the triangle's sides
    let leftIntercept = top.y - (leftSlope * top.x);
    let rightIntercept = top.y - (rightSlope * top.x);

    // Check if the bullet is within the y-bounds of the triangle
    if (bullet.y >= boss.y && bullet.y <= top.y) {
        // Check the left and right bounds at the bullet's y level
        let leftBound = (bullet.y - leftIntercept) / leftSlope;
        let rightBound = (bullet.y - rightIntercept) / rightSlope;

        // Check if the bullet's x-coordinate is within the bounds
        return bullet.x >= leftBound && bullet.x <= rightBound;
    }

    return false;
}


        function draw() {
            if(planes[selectedPlane].id === 'zxiFighter'){
                plane.height = 117;
                plane.width = 90;
                plane.y = canvas.height - 120;
            }
            if (paused) {
                // Show pause screen or message if needed
                // For simplicity, we can just return here for paused state
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);

           ctx.fillStyle = 'white';
        stars.forEach(star => {
            ctx.fillRect(star.x, star.y, star.size, star.size);
            if(gameRunning && level7 != 1  && level7 != 5 && level7 != 5.5){
                star.y += star.speed; // Move stars downwards
            }
            if (star.y > canvas.height && level7 != 1  && level7 != 5 && level7 != 5.5) {
                star.y = 0; // Reset star position when it goes below canvas
                star.x = Math.random() * canvas.width; // Randomize x position
            }
    }); 
        boss.forEach(bossinitial => {
            ctx.drawImage(bossinitialImage, bossinitial.x, bossinitial.y, bossinitial.width, bossinitial.height);
        });
    
    planets.forEach(planet => {
                ctx.drawImage(planetImage, planet.x, planet.y - planet.height, planet.width, planet.height);
            });

            coins.forEach(coin => {
        ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
    });

    shooters.forEach(shooter=>{
        ctx.drawImage(shooterImage, shooter.x, shooter.y, shooter.width, shooter.height);
    }); 

    // Draw immunity pill
    if (immunityPill) {
        ctx.drawImage(immunityPillImage, immunityPill.x, immunityPill.y, immunityPill.width, immunityPill.height);
    } 
            // Draw stones
            stones.forEach(stone => {
                ctx.drawImage(stoneImage, stone.x, stone.y, stone.width, stone.height);
            });

            nebulas.forEach(nebula => {
                ctx.drawImage(nebulaImage, nebula.x, nebula.y, nebula.width, nebula.height);
            });

            rotators.forEach(rotator => {
                ctx.drawImage(rotatorImage, rotator.x, rotator.y, rotator.width, rotator.height);
            });

            finalboss.forEach(bossfinal => {
                bossfinal.rockets.forEach(rocket => {
                    ctx.drawImage(rocketImage, rocket.x, rocket.y, rocket.width, rocket.height);
                }); bossfinal.flares.forEach(flare => {
                    ctx.drawImage(bluebulettImage, flare.x, flare.y, flare.width, flare.height);
                }); ctx.drawImage(bossfinalImage, bossfinal.x, bossfinal.y, bossfinal.width, bossfinal.height);
            });

            asteroids.forEach(asteroidd => {
                ctx.drawImage(asteroidImage, asteroidd.x, asteroidd.y, asteroidd.width, asteroidd.height);
            });

            massexplosions.forEach(massExplode => {
                ctx.drawImage(massExplosion, massExplode.x, massExplode.y, massExplode.width, massExplode.height);
            });

            
            // Draw plane
            ctx.drawImage(planeImage, plane.x, plane.y, plane.width, plane.height);

            if (immunityActive) {
                bubbleImage.src = 'bubble.png';
                ctx.drawImage(bubbleImage, bubble.x, bubble.y, bubble.width, bubble.height);
            } 

            // Draw explosions
            explosions.forEach(explosion => {
                ctx.drawImage(explosionImage, explosion.x, explosion.y, 60, 40);
                explosion.frame++;
                if (explosion.frame > 20) { // Remove explosion after 1 second
                    explosions.splice(explosions.indexOf(explosion), 1);
                }
            }); 


            // Draw alien planes
            alienPlanes.forEach(alienPlane => {
                ctx.drawImage(alienPlaneImage, alienPlane.x, alienPlane.y, alienPlane.width, alienPlane.height);
                // Draw bullets for alien plane
                alienPlane.bullets.forEach(bullet => {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                });
            });

            // Draw alien advanced planes
            advancedAliens.forEach(advancedallie => {
                ctx.drawImage(advancedAlienImage, advancedallie.x, advancedallie.y, advancedallie.width, advancedallie.height);
                // Draw bullets for alien plane
                advancedallie.bullets.forEach(bullet => {
                    ctx.drawImage(bulletImage, bullet.x - 10, bullet.y - 20, 17, 95);
                });
            }); 

            blueArcs.forEach(blueArc => {
                ctx.drawImage(BlueArcImage, blueArc.x, blueArc.y, blueArc.width, blueArc.height);
                // Draw bullets for alien plane
                blueArc.bullets.forEach(bullet => {
                    ctx.drawImage(blueflare, bullet.x - 20, bullet.y - 20, 30, 30);
                });
            }); 

            defenders.forEach(defender => {
                ctx.drawImage(defenderImage, defender.x, defender.y, defender.width, defender.height);
            });

            // Inside your drawing function (e.g., drawMissiles()), replace the ctx.fillRect() calls with:
            missiles.forEach(missile => {
                ctx.drawImage(missileImage, missile.x, missile.y, missile.width, missile.height);
            }); mists.forEach(mist => {
                ctx.drawImage(mistImage, mist.x, mist.y, mist.width, mist.height);
            });
            
            
            // Draw bullets for our plane
            plane.bullets.forEach(bullet => {
                if(planes[selectedPlane].id === 'monoFighter'){
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                } else if(planes[selectedPlane].id === 'miniDualShooter'){
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                } else if(planes[selectedPlane].id === 'heavyDuty'){
                    ctx.fillStyle = 'violet';
                    ctx.fillRect(bullet.x, bullet.y, 4, 8);
                } else if(planes[selectedPlane].id === 'zxiFighter'){
                    ctx.fillStyle = 'purple';
                    ctx.fillRect(bullet.x, bullet.y, 2, 18);
                } else if(planes[selectedPlane].id === 'fairyplane'){
                    ctx.fillStyle = 'pink';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                }
                
            }); //Draw bullets for shooters

            if(planes[selectedPlane].id === 'heavyDuty'){
                shooters.forEach(shooter => {
                    shooter.bullets.forEach(bullet => {
                        ctx.fillStyle = 'pink';
                        ctx.fillRect(bullet.x, bullet.y, 2, 8);
                    });
                });
            }
            

            // Clear and Draw score
            // Draw score
            ctx.fillStyle = 'rgba(255, 255, 255, 1)'; // White with full opacity
            ctx.font = '16px Arial';
            ctx.fillText('Score: ' + score, 10, 30);

            // Draw high score
            ctx.fillText('Highest Score: ' + highScore, 10, 50);

            // Draw health left
            ctx.fillText('❤️ ' + currenthealth, 10, 80);

            // Draw time passed
            ctx.fillText('Time: ' + timePassed.toFixed(2), canvas.width - 100, 30);

            // Check for game over
            if (!gameRunning) {
                gameOverScreen.style.display = 'flex';
                if(win == 0){
                    gameOverText.textContent = 'Game Over!';
                    playAgainButton.textContent = 'Play Again';
                } else{
                    gameOverText.textContent = 'You Won!';
                    if(level != 7){
                        playAgainButton.textContent = 'Next Level';
                    } 
                }
                return;
            } 

            update();
        }
        let immunityTimerElement = document.getElementById('timerDisplay');

        function update() {
            let currentTime = Date.now();
            let deltaTime = (currentTime - lastTime) / 1000; // deltaTime in seconds
            lastTime = currentTime;
            timePassed += deltaTime;
            
if(missileTime <= timePassed && planes[selectedPlane].id == 'zxiFighter'){
    missileButton.style.display = 'flex';
    missileTime = 0;
} if(shooterTime <= timePassed && planes[selectedPlane].id == 'heavyDuty'){
    shooterButton.style.display = 'flex';
    shooterTime = 0;
} if(stunTime <= timePassed && planes[selectedPlane].id == 'fairyplane'){
    stunButton.style.display = 'flex';
    stunTime = 0;
}

if(freezetime - Date.now() <= 0 || immunityActive){
    freezetime = 0;
    planeImage.src = planes[selectedPlane].imgSrc;
}

let immunityTimeRemaining = immunityEndTime - Date.now();
    if (immunityActive && immunityTimeRemaining > 0) {
        // Update timer display
        let secondsRemaining = Math.ceil(immunityTimeRemaining / 1000);
        let millisecondsRemaining = Math.ceil((immunityTimeRemaining % 1000) / 10);
        timerDisplay.textContent = `${secondsRemaining.toString().padStart(2, '0')}.${millisecondsRemaining.toString().padStart(2, '0')}`;

        // Adjust color based on remaining time
        let percentageLeft = immunityTimeRemaining / (immunityDuration * 1000);
        let r = Math.floor(255 * percentageLeft); // Red component increases as time decreases
        let g = Math.floor(128 * (1 - percentageLeft)); // Green component decreases as time decreases
        let b = 0; // Blue component can be adjusted as needed
        timerColor = `rgb(${r},${g},${b})`;
    } else {
        timerDisplay.textContent = ''; // Hide timer if immunity is not active
    }

            if (plane.moveLeft && plane.x > 0  && level7 != 1 && level7 != 5 && level7 != 5.5) {
                plane.x -= plane.speed;
            }
            if (plane.moveRight && plane.x < canvas.width - plane.width  &&level7 != 1 && level7 != 5 && level7 != 5.5) {
                plane.x += plane.speed;
            } bubble.x = plane.x;
    if(level7 != 1  && level7 != 5 && level7 != 5.5){
        coins.forEach(coin => {
            coin.y += 2; // Adjust speed as needed
            if (coin.y > canvas.height) {
                coins.splice(coins.indexOf(coin), 1); // Remove coins that are out of canvas 
            }
            // Check collision with player's plane
            if (coin.x < plane.x + plane.width &&
                coin.x + coin.width > plane.x &&
                coin.y < plane.y + plane.height &&
                coin.y + coin.height > plane.y) {
                // When a coin is collected
                totalCoins += 10;
                localStorage.setItem('totalCoins', totalCoins);
                coins.splice(coins.indexOf(coin), 1); // Remove collected coin
            }
        });
    }

    // Move immunity pill
    if (immunityPill && level7 < 1) {
        immunityPill.y += 2; // Adjust speed as needed
        if (immunityPill.y > canvas.height) {
            immunityPill = null; // Remove immunity pill if it goes out of canvas
        }
        // Check collision with player's plane
        if (immunityPill &&
            immunityPill.x < plane.x + plane.width &&
            immunityPill.x + immunityPill.width > plane.x &&
            immunityPill.y < plane.y + plane.height &&
            immunityPill.y + immunityPill.height > plane.y) {
            immunityActive = true;
            bubbleImage.src = "bubble.png";
            bubble.x = plane.x;
            bubble.y = plane.y;
            bubble.width = plane.width;
            bubble.height = plane.height;
            immunityEndTime = Date.now() + (immunityDuration * 1000); // Set immunity end time
            immunityPill = null; // Remove collected immunity pill
        }
    } else if(level7 >= 1){
        immunityPill = null;
    }

// Check if immunity has expired
    if ((immunityActive && Date.now() > immunityEndTime)||level7>=1) {
        immunityActive = false;
        bubbleImage.src = "";
    }

    // Create new coins and immunity pill
    if (Math.random() < 0.002  && level7 < 5) { // Adjust spawn rates as needed
        createCoin();
    }
    if (Math.random() < 0.0003 && level7 < 1) { // Adjust spawn rates as needed abx
        createImmunityPill();
    }
        if(level7 != 5 && level7 != 5.5){
            stones.forEach(stone => {
                stone.y += 2; // Stone falling speed
                if (stone.y > canvas.height) {
                    stones.splice(stones.indexOf(stone), 1); // Remove stones that are out of canvas
                }
            }); 

            nebulas.forEach(nebula => {
                nebula.y += 2; // Nebula falling speed
                if (nebula.y > canvas.height) {
                    nebulas.splice(nebulas.indexOf(nebula), 1); // Remove nebulas that are out of canvas
                }
            });

            rotators.forEach(rotator => {
                rotator.y += 1; // Rotator falling speed
                if (rotator.y > canvas.height) {
                    rotators.splice(rotators.indexOf(rotator), 1); // Remove rotators that are out of canvas
                }
            });

            asteroids.forEach(asteroidd =>{
                asteroidd.y += 2; // Asteroid falling speed
                asteroidd.x += 2;
                if (asteroidd.y > canvas.height) {
                    asteroids.splice(asteroids.indexOf(asteroidd), 1); // Remove asteroids that are out of canvas
                }
            }); boss.forEach(bossinitial => {
                bossinitial.y -= 5.5; // Boss initial going speed
            });

            massexplosions.forEach(massExplode => {
                if(timePassed - massExplode.time > 1){
                    massexplosions.splice(massexplosions.indexOf(massExplode), 1); // Remove mass explosions that are out of canvas
                }
            });
            
            planets.forEach(planet =>{
                if(level7 != 1){
                    planet.y += 2; // Planet falling speed
                }
                if (planet.y > 4*canvas.height) {
                    planets.splice(planets.indexOf(planet), 1); // Remove planet that are out of canvas
                }
            });
        }
            alienPlanes.forEach(alienPlane => {
                const stopY = 50; // Adjust this value to your desired threshold
        if (alienPlane.y < stopY && level7 != 5 && level7 != 5.5) {
            alienPlane.y += 0.7; // Adjust the speed if needed
        }
                if (alienPlane.y > canvas.height) {
                    alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1); // Remove alien planes that are out of canvas
                } if(level7 == 5.5){   
                    alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                    createExplosion(alienPlane.x, alienPlane.y);
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.005 && alienPlane.state <= timePassed) {
                    alienPlane.bullets.push({
                        x: alienPlane.x + alienPlane.width / 2,
                        y: alienPlane.y + alienPlane.height
                    });
                }
                // Move alien bullets
                alienPlane.bullets.forEach(bullet => {
                    if(level7 != 5){
                        bullet.y += 4;
                    }
                    if (bullet.y > canvas.height) {
                        alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                    }
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        createExplosion(plane.x, plane.y);
                        if(currenthealth > 1){
                            alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                });
            });

            advancedAliens.forEach(alienPlane => {
                if(level7 != 5 && level7 != 5.5){
                    alienPlane.y += 0.5; // Adjust the speed if needed
                }
                if (alienPlane.y > canvas.height) {
                    advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1); // Remove alien planes that are out of canvas
                } if(level7 == 5.5){   
                    advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);
                    createExplosion(alienPlane.x, alienPlane.y);
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.005 && alienPlane.state <= timePassed) {
                    alienPlane.bullets.push({
                        x: alienPlane.x + alienPlane.width / 2,
                        y: alienPlane.y + alienPlane.height
                    });
                }
                // Move alien bullets
                alienPlane.bullets.forEach(bullet => {
                    if(level7 != 5){
                        bullet.y += 2;
                    }
                    if (bullet.y > canvas.height) {
                        alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                    }
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        createExplosion(plane.x, plane.y);
                        if(currenthealth > 1){
                            alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            alienPlane.bullets.splice(alienPlane.bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                });
            });

        blueArcs.forEach(blueArc => {
                const stopY = 50; // Adjust this value to your desired threshold
        if (blueArc.y < stopY && level7 != 5 && level7 != 5.5) {
            blueArc.y += 0.4; // Adjust the speed if needed
        }
                if (blueArc.y > canvas.height) {
                    blueArcs.splice(blueArcs.indexOf(blueArc), 1); // Remove alien planes that are out of canvas
                }
                if(level7 == 5.5){   
                    blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                    createExplosion(blueArc.x, blueArc.y);
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.004 && blueArc.state <= timePassed) {
                    blueArc.bullets.push({
                        x: blueArc.x + blueArc.width / 2,
                        y: blueArc.y + blueArc.height
                    });
                }
                // Move alien bullets
                blueArc.bullets.forEach(bullet => {
                    if(level7 != 5){
                        bullet.y += 3;
                    }
                    if (bullet.y > canvas.height) {
                        blueArc.bullets.splice(blueArc.bullets.indexOf(bullet), 1);
                    }
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        // stalling logic
                        blueArc.bullets.splice(blueArc.bullets.indexOf(bullet), 1);
                        if(planes[selectedPlane].id != 'zxiFighter'){
                            freezetime = Date.now() + (3000);
                            frozen.currentTime = 0;
                            frozen.play();
                            planeImage.src = planes[selectedPlane].freezed; // Apply a blue filter to the plane's image
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            blueArc.bullets.splice(blueArc.bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                });
            });

            defenders.forEach(defender => {
                const stopY = 100; // Adjust this value to your desired threshold
                
                if ((defender.y < stopY || (finalboss.length>=1&&checkBulletCollision(defender, finalboss[0]))) && level7 != 5 && level7 != 5.5) {
                    defender.y += 1; // Adjust the speed if needed
                } if(level7 == 5.5){   
                    defenders.splice(defenders.indexOf(defender), 1);
                    createExplosion(defender.x, defender.y);
                }                
                else if(defender.y >= plane.y){
                    createExplosion(defender.x, defender.y);
                    defenders.splice(defenders.indexOf(defender), 1);
                    score += 400; // Increase score for destroying a defender
                    if (score > highScore) {
                        highScore = score; // Update high score
                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                    }
                } else if(defender.state){
                    defender.y += 3;
                } if (defender.y > canvas.height) {
                    defenders.splice(defenders.indexOf(defender), 1); // Remove alien planes that are out of canvas
                }
            });

            finalboss.forEach(bossfinal => {
                const stopY = 40; // Adjust this value to your desired threshold
        if (bossfinal.y < stopY) {
            bossfinal.y += 0.7; // Adjust the speed if needed
        }
                if(level7 == 3 || level7 == 4){
                    // Boss plane shooting bullets
                    if (timePassed >= bossfinal.flareInterval) {
                        bossfinal.flareInterval = timePassed + 12;
                        bossfinal.flares = [];
                    } 
                    else if (bossfinal.flareInterval - timePassed <= 5) {
                        // Boss shoots bullets only when flareShiner equals timePassed                        
                        bossfinal.flares = [];                        
                        bossfinalImage.src = 'bossdownwards.png';  
                    } else if (bossfinal.flareInterval - timePassed <= 10 && bossfinal.flares.length == 0) {
                        bossfinal.flares.push({
                            x: bossfinal.x + bossfinal.width / 6.8,
                            y: bossfinal.y + 34, 
                            height: 45,
                            width: 45
                        });                      
                        bossfinal.flares.push({
                            x: bossfinal.x + 2* bossfinal.width / 3,
                            y: bossfinal.y + 34,
                            height: 45,
                            width: 45
                        });  
                    } else if (bossfinal.flareInterval - timePassed <= 10) {
                        // Switch image to downwards position
                        bossfinal.flares.forEach(flare => {
                            if(level7 != 5){
                                flare.height += 8;
                            } 
                            // Check collision with player's plane
                            if (plane.x> flare.x && plane.x < flare.x + flare.width &&
                                plane.y> flare.y && plane.y < flare.y + flare.height) {
                                createExplosion(flare.x, flare.y);
                                if(currenthealth > 1){
                                    bossfinal.flares.splice(bossfinal.flares.indexOf(flare), 1);
                                    currenthealth--;
                                } else{
                                    currenthealth = 0;
                                    gameRunning = false;
                                }
                            } shooters.forEach(shooter =>{
                                if (shooter.x> flare.x && shooter.x < flare.x + flare.width &&
                                    shooter.y> flare.y && shooter.y < flare.y + flare.height) {
                                    createExplosion(shooter.x, shooter.y);
                                    shooters.splice(shooters.indexOf(shooter),1);
                                }
                            });
                        });                                      
                    } else if(bossfinal.flareInterval - timePassed <= 12){
                        bossfinalImage.src = 'shootingboss.png'; 
                        laser.play();
                        laser.currentTime = 1;
                    }
                } if (bossfinal.missileTimer <= timePassed && level7 < 5) {
                    bossfinal.missileTimer = timePassed + 10;
                    bossfinal.rockets.push({
                        x: bossfinal.x + bossfinal.width / 3,
                        y: bossfinal.y, 
                        height: 124,
                        width: 60,
                        health: 2
                    });
                    bossfinal.rockets.push({
                        x: bossfinal.x + 2* bossfinal.width / 3,
                        y: bossfinal.y,
                        height: 124,
                        width: 60,
                        health: 2
                    });
                } // Alien plane shooting bullets
            
                // Move rockets
                bossfinal.rockets.forEach(rocket => {
                    if (level7 < 5) {
                        rocket.y += 3;
                    } else{   
                        bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                        createExplosion(rocket.x, rocket.y);
                    }
                    if(Math.abs(rocket.x - plane.x) <= plane.width/3){
                        rocketImage.src ='missiledown.png';
                    } else if(rocket.x < plane.x){
                        rocketImage.src = 'missileright.png';
                        rocket.x += 1;
                    } else if(rocket.x > plane.x){
                        rocketImage.src = 'missileleft.png';
                        rocket.x -= 1;
                    }
                    if (rocket.y > canvas.height) {
                        bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                    }
                    // Check collision with player's plane
                    if (rocket.x + 10 > plane.x && rocket.x < plane.x + plane.width + 10 &&
                        rocket.y + 10> plane.y && rocket.y < plane.y + plane.height + 10) {
                        createExplosion(rocket.x, rocket.y);
                        if(currenthealth > 1){
                            bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (rocket.x > shooter.x && rocket.x < shooter.x + shooter.width &&
                            rocket.y > shooter.y && rocket.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                });
            });

            let k = 0;
            let mx;
            let my;
            missiles.forEach(missile => {
                missile.y -= 3;
                if (missile.y < 0) {
                    missiles.splice(missiles.indexOf(missile), 1);
                }
                // Check collision with stones
                stones.forEach(stone => {
                    if (missile.x + 40> stone.x && missile.x < stone.x + stone.width &&
                    missile.y + 40 > stone.y && missile.y - 40 < stone.y + stone.height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                }); 
                
                rotators.forEach(rotator => {
                    if (missile.x + 40> rotator.x && missile.x < rotator.x + rotator.width &&
                    missile.y + 40 > rotator.y && missile.y - 40 < rotator.y + rotator.height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                });

                // Check collision with alien planes
                alienPlanes.forEach(alienPlane => {
                    if (missile.x + 40> alienPlane.x && missile.x < alienPlane.x + alienPlane.width &&
                    missile.y +20 > alienPlane.y && missile.y - 20 < alienPlane.y + alienPlane.height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                });

                // Check collision with alien planes
                advancedAliens.forEach(alienPlane => {
                    if (missile.x + 40> alienPlane.x && missile.x < alienPlane.x + alienPlane.width &&
                    missile.y +20 > alienPlane.y && missile.y - 20 < alienPlane.y + alienPlane.height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                });

                blueArcs.forEach(blueArc => {
                    if (missile.x + 40> blueArc.x && missile.x < blueArc.x + blueArc.width &&
                    missile.y +20 > blueArc.y && missile.y - 20 < blueArc.y + blueArc.height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                });

                defenders.forEach(defender => {
                    if(missile.x + 40> defender.x && missile.x < defender.x + defender.width &&
                        missile.y +20 > defender.y && missile.y - 20 < defender.y + defender.height){
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    }
                }); finalboss.forEach(bossfinal =>{
                    if(missile.x + 40> bossfinal.x && missile.x < bossfinal.x + bossfinal.width &&
                        missile.y +20 > bossfinal.y && missile.y - 20 < bossfinal.y + bossfinal.height){
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    } bossfinal.rockets.forEach(rocket => {
                        if(missile.x + 40> rocket.x && missile.x < rocket.x + rocket.width &&
                            missile.y +20 > rocket.y && missile.y - 20 < rocket.y + rocket.height){
                            k = 1;
                            mx = missile.x;
                            my = missile.y;
                        } 
                    });
                });
            });
                
            
            if(k === 1){
                MissileExplosion(mx,my);                
                missiles.splice(missiles.indexOf(missile), 1);                 
                k = 0;
            }
            
            mists.forEach(mist => {
                mist.y -= 5;
                if (mist.y < 0) {
                    mists.splice(mists.indexOf(mist), 1);
                } Mistcheck(mist.x,mist.y);             
            });

            // Move player's bullets
            plane.bullets.forEach(bullet => {
                bullet.y -= 5;
                if (bullet.y < 0) {
                    plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                }

                // Check collision with stones
                stones.forEach(stone => {
                    if (bullet.x > stone.x && bullet.x < stone.x + stone.width &&
                        bullet.y > stone.y && bullet.y < stone.y + stone.height) {
                        createExplosion(stone.x, stone.y);
                        stones.splice(stones.indexOf(stone), 1);
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        score += 10; // Increase score for destroying a stone
                        if (score > highScore) {
                            highScore = score; // Update high score
                            localStorage.setItem('highScore', highScore); // Store high score in local storage
                        }
                    }
                }); rotators.forEach(rotator => {
                    if (bullet.x > rotator.x && bullet.x < rotator.x + rotator.width &&
                        bullet.y > rotator.y && bullet.y < rotator.y + rotator.height) {
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                    }
                });

                // Check collision with alien planes
                alienPlanes.forEach(alienPlane => {
                    if (bullet.x > alienPlane.x && bullet.x < alienPlane.x + alienPlane.width &&
                        bullet.y > alienPlane.y && bullet.y < alienPlane.y + alienPlane.height) {
                        alienPlane.health -= planes[selectedPlane].damage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if (alienPlane.health <= 0) {
                            createExplosion(alienPlane.x, alienPlane.y);
                            alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                            score += 50; // Increase score for destroying an alien plane
                            if (score > highScore) {
                                highScore = score; // Update high score
                                localStorage.setItem('highScore', highScore); // Store high score in local storage
                            }
                        }
                    }
                });

                advancedAliens.forEach(alienPlane => {
                    if (bullet.x > alienPlane.x && bullet.x < alienPlane.x + alienPlane.width &&
                        bullet.y > alienPlane.y && bullet.y < alienPlane.y + alienPlane.height) {
                        alienPlane.health -= planes[selectedPlane].damage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if (alienPlane.health <= 0) {
                            createExplosion(alienPlane.x, alienPlane.y);
                            advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);
                            score += 100; // Increase score for destroying an alien plane
                            if (score > highScore) {
                                highScore = score; // Update high score
                                localStorage.setItem('highScore', highScore); // Store high score in local storage
                            }
                        }
                    }
                });

                blueArcs.forEach(blueArc => {
                    if (bullet.x > blueArc.x && bullet.x < blueArc.x + blueArc.width &&
                    bullet.y > blueArc.y && bullet.y < blueArc.y + blueArc.height) {
                        blueArc.health -= planes[selectedPlane].damage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if(blueArc.health <= 0){
                            createExplosion(blueArc.x, blueArc.y);
                            blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                            score += 200; // Increase score for destroying a blue arc
                            if (score > highScore) {
                                highScore = score; // Update high score
                                localStorage.setItem('highScore', highScore); // Store high score in local storage
                            }
                        }
                    }
                });

                defenders.forEach(defender => {
                    if(bullet.x > defender.x && bullet.x < defender.x + defender.width &&
                        bullet.y > defender.y && bullet.y < defender.y + defender.height){
                        defender.health -= planes[selectedPlane].damage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if(defender.health <= 0){
                            defender.state = true;
                        }
                    }
                }); finalboss.forEach(bossfinal =>{
                    if(checkBulletCollision(bullet, bossfinal)){
                        bossfinal.health -= planes[selectedPlane].damage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        createExplosion(bullet.x, bullet.y);
                        if(bossfinal.health <= 0 && level7 < 5){
                            level7 = 5;
                        } else if(bossfinal.health <= 166  && level7 < 5){
                            level7 = 4;
                        } else if(bossfinal.health <= 333  && level7 < 5){
                            level7 = 3;
                        }
                    } bossfinal.rockets.forEach(rocket =>{
                        if(bullet.x > rocket.x && bullet.x < rocket.x + rocket.width &&
                            bullet.y > rocket.y && bullet.y < rocket.y + rocket.height){
                            rocket.health -= planes[selectedPlane].damage;
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                            if(rocket.health <= 0){
                                bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                                createExplosion(rocket.x, rocket.y);
                            }
                        }
                    });
                });

            }); // Move player's bullets
            shooters.forEach(shooter => {
                shooter.bullets.forEach(bullet => {
                    bullet.y -= 5;
                    if (bullet.y < 0) {
                        shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                    }

                    // Check collision with stones
                    stones.forEach(stone => {
                        if (bullet.x > stone.x && bullet.x < stone.x + stone.width &&
                            bullet.y > stone.y && bullet.y < stone.y + stone.height) {
                            createExplosion(stone.x, stone.y);
                            stones.splice(stones.indexOf(stone), 1);
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            score += 10; // Increase score for destroying a stone
                            if (score > highScore) {
                                highScore = score; // Update high score
                                localStorage.setItem('highScore', highScore); // Store high score in local storage
                            }
                        }
                    }); rotators.forEach(rotator => {
                        if (bullet.x > rotator.x && bullet.x < rotator.x + rotator.width &&
                            bullet.y > rotator.y && bullet.y < rotator.y + rotator.height) {
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                        }
                    });

                    // Check collision with alien planes
                    alienPlanes.forEach(alienPlane => {
                        if (bullet.x > alienPlane.x && bullet.x < alienPlane.x + alienPlane.width &&
                            bullet.y > alienPlane.y && bullet.y < alienPlane.y + alienPlane.height) {
                            alienPlane.health -= 1;
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            if (alienPlane.health <= 0) {
                                createExplosion(alienPlane.x, alienPlane.y);
                                alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                                score += 50; // Increase score for destroying an alien plane
                                if (score > highScore) {
                                    highScore = score; // Update high score
                                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                                }
                            }
                        }
                    });

                    advancedAliens.forEach(alienPlane => {
                        if (bullet.x > alienPlane.x && bullet.x < alienPlane.x + alienPlane.width &&
                            bullet.y > alienPlane.y && bullet.y < alienPlane.y + alienPlane.height) {
                            alienPlane.health -= 1;
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            if (alienPlane.health <= 0) {
                                createExplosion(alienPlane.x, alienPlane.y);
                                advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);
                                score += 100; // Increase score for destroying an alien plane
                                if (score > highScore) {
                                    highScore = score; // Update high score
                                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                                }
                            }
                        }
                    });

                    blueArcs.forEach(blueArc => {
                        if (bullet.x > blueArc.x && bullet.x < blueArc.x + blueArc.width &&
                        bullet.y > blueArc.y && bullet.y < blueArc.y + blueArc.height) {
                            blueArc.health -= 1;
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            if(blueArc.health <= 0){
                                createExplosion(blueArc.x, blueArc.y);
                                blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                                score += 200; // Increase score for destroying a blue arc
                                if (score > highScore) {
                                    highScore = score; // Update high score
                                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                                }
                            }
                        }
                    });

                    defenders.forEach(defender => {
                        if(bullet.x > defender.x && bullet.x < defender.x + defender.width &&
                            bullet.y > defender.y && bullet.y < defender.y + defender.height){
                            defender.health -= 1;
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            if(defender.health <= 0){
                                defender.state = true;
                            }
                        }
                    });

                    finalboss.forEach(bossfinal =>{
                        if(checkBulletCollision(bullet, bossfinal)){
                            bossfinal.health -= planes[selectedPlane].damage;
                            shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            createExplosion(bullet.x, bullet.y);
                            if(bossfinal.health <= 0  && level7 < 5){
                                level7 = 5;
                            } else if(bossfinal.health <= 166  && level7 < 5){
                                level7 = 4;
                            } else if(bossfinal.health <= 333  && level7 < 5){
                                level7 = 3;
                            }
                        } bossfinal.rockets.forEach(rocket =>{
                            if(bullet.x > rocket.x && bullet.x < rocket.x + rocket.width &&
                                bullet.y > rocket.y && bullet.y < rocket.y + rocket.height){
                                rocket.health -= planes[selectedPlane].damage;
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                if(rocket.health <= 0){
                                    bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                                    createExplosion(rocket.x, rocket.y);
                                }
                            }
                        });
                    });

                });
            
            });

            // Check collision between player's plane and nebulas
            nebulas.forEach(nebula => {
    // Calculate smaller bounding box for collision detection
    let playerLeft = plane.x + 20; // Adjust as needed
    let playerRight = plane.x + plane.width - 20; // Adjust as needed
    let playerTop = plane.y + 20; // Adjust as needed
    let playerBottom = plane.y + plane.height - 20; // Adjust as needed

    if (!immunityActive && playerLeft < nebula.x + nebula.width &&
        playerRight > nebula.x &&
        playerTop < nebula.y + nebula.height &&
        playerBottom > nebula.y) {
            nebulas.splice(nebulas.indexOf(nebula), 1);
            plane.x = Math.random()*(canvas.width-40);
            teleport.currentTime = 0;
            teleport.play();
    } shooters.forEach(shooter =>{
        if (shooter.x < nebula.x + nebula.width &&
            shooter.x + shooter.width > nebula.x &&
            shooter.y < nebula.y + nebula.height &&
            shooter.y + shooter.height > nebula.y) {
            createExplosion(shooter.x, shooter.y);
            shooters.splice(shooters.indexOf(shooter), 1);
        }
    });
}); stones.forEach(stone => {
    // Calculate smaller bounding box for collision detection
    let playerLeft = plane.x + 20; // Adjust as needed
    let playerRight = plane.x + plane.width - 20; // Adjust as needed
    let playerTop = plane.y + 20; // Adjust as needed
    let playerBottom = plane.y + plane.height - 20; // Adjust as needed

    if (!immunityActive && playerLeft < stone.x + stone.width &&
        playerRight > stone.x &&
        playerTop < stone.y + stone.height &&
        playerBottom > stone.y) {
        createExplosion(plane.x, plane.y);
        if(currenthealth > 1){
            stones.splice(stones.indexOf(stone), 1);
            currenthealth--;
        } else{
            currenthealth = 0;
            gameRunning = false;
        }
    } 
    shooters.forEach(shooter =>{
        if (shooter.x < stone.x + stone.width &&
            shooter.x + shooter.width > stone.x &&
            shooter.y < stone.y + stone.height &&
            shooter.y + shooter.height > stone.y) {
            createExplosion(shooter.x, shooter.y);
            shooters.splice(shooters.indexOf(shooter), 1);
        }
    });
    
}); 

rotators.forEach(rotator => {
    // Calculate smaller bounding box for collision detection
    let playerLeft = plane.x + 20; // Adjust as needed
    let playerRight = plane.x + plane.width - 20; // Adjust as needed
    let playerTop = plane.y + 20; // Adjust as needed
    let playerBottom = plane.y + plane.height - 20; // Adjust as needed

    if (!immunityActive && playerLeft < rotator.x + rotator.width &&
        playerRight > rotator.x &&
        playerTop < rotator.y + rotator.height &&
        playerBottom > rotator.y) {
        createExplosion(plane.x, plane.y);
        if(currenthealth > 1){
            rotators.splice(rotators.indexOf(rotator), 1);
            currenthealth--;
        } else{
            currenthealth = 0;
            gameRunning = false;
        }
    } shooters.forEach(shooter =>{
        if (shooter.x < rotator.x + rotator.width &&
            shooter.x + shooter.width > rotator.x &&
            shooter.y < rotator.y + rotator.height &&
            shooter.y + shooter.height > rotator.y) {
            createExplosion(shooter.x, shooter.y);
            shooters.splice(shooters.indexOf(shooter), 1);
        }
    });
}); 
    finalboss.forEach( bossfinal => {
    bossfinal.rockets.forEach(rocket => {
        // Calculate smaller bounding box for collision detection
        let playerLeft = plane.x + 20; // Adjust as needed
        let playerRight = plane.x + plane.width - 20; // Adjust as needed
        let playerTop = plane.y + 20; // Adjust as needed
        let playerBottom = plane.y + plane.height - 20; // Adjust as needed

        if (playerLeft < rocket.x + rocket.width &&
            playerRight > rocket.x &&
            playerTop < rocket.y + rocket.height &&
            playerBottom > rocket.y) {
            createExplosion(plane.x, plane.y);
            if(currenthealth > 1){
                bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                createExplosion(rocket.x, rocket.y);
                currenthealth--;
            } else{
                currenthealth = 0;
                gameRunning = false;
            }
        } shooters.forEach(shooter =>{
            if (shooter.x < rocket.x + rocket.width &&
                shooter.x + shooter.width > rocket.x &&
                shooter.y < rocket.y + rocket.height &&
                shooter.y + shooter.height > rocket.y) {
                createExplosion(shooter.x, shooter.y);
                shooters.splice(shooters.indexOf(shooter), 1);
            }
        });
    }); 
});

if(((timePassed > 130 && level == 1) || (timePassed > 190 && (level == 2 || level == 3)) || (timePassed > 210 && (level == 4 || level == 5))  || (timePassed > 230 && level == 6) || (level7 == 7 && level == 7))&&win == 0){ //timerwin 120 180 180 240 240 260 100+boss spaces
    win = 1;
    wins.currentTime = 0;
    
    if(music){
        wins.play();
    }
    currentAudio = wins;    
    towardsmars.pause();
    towardsmars.currentTime = 0;
    towardsjupiter.pause();
    towardsjupiter.currentTime = 0;
    towardssaturn.pause();
    towardssaturn.currentTime = 0;
    towardsuranus.pause();
    towardsuranus.currentTime = 0;
    towardsneptune.pause();
    towardsneptune.currentTime = 0;
    towardspluto.pause();            
    towardspluto.currentTime = 0;
    towardsalpha.pause();            
    towardsalpha.currentTime = 0;
    nearalpha.pause();            
    nearalpha.currentTime = 0;

    coloring[level] = 2;
    if(level != 7){
        winned[level] = 1;
        coloring[level+1] = 1;
    }
    
    localStorage.setItem('coloring', JSON.stringify(coloring));
    localStorage.setItem('winned', JSON.stringify(winned));
    const levelButtons = document.querySelectorAll('.levelbutton');

    // Update button colors based on the level variable
    levelButtons.forEach((button, index) => {
        if (index < level + 1) {
            button.style.backgroundColor = 'green'; // give to blue
        } if(index == level + 1){
            button.style.backgroundColor = 'blue'; // give to green
        }
    }); 

    createExplosion(2*canvas.width, 2*canvas.height);
    gameRunning = false;
}

asteroids.forEach(asteroidd =>{
    // Calculate smaller bounding box for collision detection
    let playerLeft = plane.x + 20; // Adjust as needed
    let playerRight = plane.x + plane.width - 20; // Adjust as needed
    let playerTop = plane.y + 20; // Adjust as needed
    let playerBottom = plane.y + plane.height - 20; // Adjust as needed

    if (!immunityActive && playerLeft < asteroidd.x + asteroidd.width &&
        playerRight > asteroidd.x &&
        playerTop < asteroidd.y + asteroidd.height &&
        playerBottom > asteroidd.y) {
        createExplosion(plane.x, plane.y);
        if(currenthealth > 1){
            asteroids.splice(asteroids.indexOf(asteroidd), 1);
            currenthealth--;
        } else{
            currenthealth = 0;
            gameRunning = false;
        }
    } shooters.forEach(shooter =>{
        if (shooter.x < asteroidd.x + asteroidd.width &&
            shooter.x + shooter.width > asteroidd.x &&
            shooter.y < asteroidd.y + asteroidd.height &&
            shooter.y + shooter.height > asteroidd.y) {
            createExplosion(shooter.x, shooter.y);
            shooters.splice(shooters.indexOf(shooter), 1);
        }
    });
});

            // Check collision between player's plane and alien planes
            alienPlanes.forEach(alienPlane => {
                if (!immunityActive && plane.x < alienPlane.x + alienPlane.width &&
                    plane.x + plane.width > alienPlane.x &&
                    plane.y < alienPlane.y + alienPlane.height &&
                    plane.height + plane.y > alienPlane.y) {
                    createExplosion(plane.x, plane.y);
                    if(currenthealth > 1){
                            currenthealth--;
                            alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                } shooters.forEach(shooter =>{
                    if (shooter.x < alienPlane.x + alienPlane.width &&
                        shooter.x + shooter.width > alienPlane.x &&
                        shooter.y < alienPlane.y + alienPlane.height &&
                        shooter.y + shooter.height > alienPlane.y) {
                        createExplosion(shooter.x, shooter.y);
                        shooters.splice(shooters.indexOf(shooter), 1);
                    }
                });
            });

            // Check collision between player's plane and alien planes
            advancedAliens.forEach(alienPlane => {
                if (!immunityActive && plane.x < alienPlane.x + alienPlane.width &&
                    plane.x + plane.width > alienPlane.x &&
                    plane.y < alienPlane.y + alienPlane.height &&
                    plane.height + plane.y > alienPlane.y) {
                    createExplosion(plane.x, plane.y);
                    if(currenthealth > 1){
                            currenthealth--;
                            advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                } shooters.forEach(shooter =>{
                    if (shooter.x < alienPlane.x + alienPlane.width &&
                        shooter.x + shooter.width > alienPlane.x &&
                        shooter.y < alienPlane.y + alienPlane.height &&
                        shooter.y + shooter.height > alienPlane.y) {
                        createExplosion(shooter.x, shooter.y);
                        shooters.splice(shooters.indexOf(shooter), 1);
                    }
                });
            }); defenders.forEach(defender => {
                shooters.forEach(shooter =>{
                    if (shooter.x < defender.x + defender.width &&
                        shooter.x + shooter.width > defender.x &&
                        shooter.y < defender.y + defender.height &&
                        shooter.y + shooter.height > defender.y) {
                        createExplosion(shooter.x, shooter.y);
                        shooters.splice(shooters.indexOf(shooter), 1);
                    }
                });
                if (!immunityActive && plane.x < defender.x + defender.width + 10 &&
                    plane.x + plane.width + 10> defender.x &&
                    plane.y < defender.y + defender.height + 10 &&
                    plane.height + plane.y + 10> defender.y) {
                    createExplosion(plane.x, plane.y);
                    defenders.splice(defenders.indexOf(defender), 1);
                    if(currenthealth > 1){
                        currenthealth--;
                        score += 400; // Increase score for destroying a defender
                        if (score > highScore) {
                            highScore = score; // Update high score
                            localStorage.setItem('highScore', highScore); // Store high score in local storage
                        }
                    } else{
                        currenthealth = 0;
                        gameRunning = false;
                    }
                } else if(defenders.y >= plane.y){
                    createExplosion(defender.x, defender.y);
                    defenders.splice(defenders.indexOf(defender), 1);
                    score += 400; // Increase score for destroying a defender
                    if (score > highScore) {
                        highScore = score; // Update high score
                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                    }
                }
            });

            // Check collision between player's plane and blue arcs
            blueArcs.forEach(blueArc => {
                shooters.forEach(shooter =>{
                    if (shooter.x < blueArc.x + blueArc.width &&
                        shooter.x + shooter.width > blueArc.x &&
                        shooter.y < blueArc.y + blueArc.height &&
                        shooter.y + shooter.height > blueArc.y) {
                        createExplosion(shooter.x, shooter.y);
                        shooters.splice(shooters.indexOf(shooter), 1);
                    }
                });
                if (!immunityActive && plane.x < blueArc.x + blueArc.width &&
                    plane.x + plane.width > blueArc.x &&
                    plane.y < blueArc.y + blueArc.height &&
                    plane.height + plane.y > blueArc.y) {
                    createExplosion(plane.x, plane.y);
                    if(currenthealth > 1){
                            currenthealth--;
                            blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                }
            });
            if(stunButtonPressed && level7 != 1  && level7 != 5 && level7 != 5.5){
                stunButtonPressed = false;
                mistray.currentTime = 1;
                mistray.play();
                mists.push({
                    x: plane.x + plane.x/200,
                    y: plane.y + plane.x/16,
                    width:80, // Width of the mist
                    height: 60 // Height of the mist
                });
            }
            if(missileButtonPressed && level7 != 1  && level7 != 5 && level7 != 5.5){
                missileButtonPressed = false;
                missilelaunch.currentTime = 0;
                missilelaunch.play();
                missiles.push({
                    x: plane.x + plane.x/200,
                    y: plane.y + plane.x/16,
                    width:80, // Width of the missile
                    height: 60 // Height of the missile
                });
            } if(shooterButtonPressed && level7 != 1  && level7 != 5 && level7 != 5.5){
                shooterButtonPressed = false;
                shooters.push({
                    x: plane.x,
                    y: plane.y+20,
                    width: 50, // Width of the shooter
                    height: 50, // Height of the shooter
                    timespent: timePassed + 6,
                    bullets: []
                }); 
            } if(planes[selectedPlane].id == 'heavyDuty' && level7 != 1  && level7 != 5 && level7 != 5.5){
                shooters.forEach(shooter =>{
                    if (shooter.timespent <= timePassed) {
                        shooter.bullets.push({
                            x: shooter.x + shooter.width / 5,
                            y: shooter.y + shooter.x/20
                        }); shooter.bullets.push({
                            x: shooter.x + 4* shooter.width / 5,
                            y: shooter.y + shooter.x/20
                        }); 
                        shooter.timespent = timePassed + 6;
                    }
                });
            }
            if (plane.shooting && level7 != 1  && level7 != 5 && level7 != 5.5) {
                shootsound.currentTime = 0; // Reset sound effect
                shootsound.play();
                if(planes[selectedPlane].id === 'miniDualShooter'){
                    plane.bullets.push({
                        x: plane.x + plane.width / 5,
                        y: plane.y + plane.x/20
                    });
                    plane.bullets.push({
                        x: plane.x + 3*plane.width / 4,
                        y: plane.y + plane.x/20
                    });
                } else if(planes[selectedPlane].id === 'zxiFighter'){
                    plane.bullets.push({
                        x: plane.x + plane.width / 6,
                        y: plane.y + plane.x/16
                    });
                    plane.bullets.push({
                        x: plane.x + 4*plane.width / 5,
                        y: plane.y + plane.x/16
                    });
                } else{
                    plane.bullets.push({
                        x: plane.x + plane.width / 2,
                        y: plane.y
                    });
                }
                plane.shooting = false; // Reset shooting flag
            }

            // Create new stones and alien planes
            let diffindex;
            let difactor = (canvas.width>canvas.height)?2:1;
            if(level == 0){ //endless
                diffindex = timePassed/300000;
                if ((Math.random() < 0.03 && timePassed <= 20) || (Math.random() < 0.01 && timePassed > 20)) {
                    createStone();
                } if (Math.random() < 0.0007 && (rotators.length < 1 || (rotators.length < 2 && rotators[0].y > 0.75*canvas.height)) && timePassed >= 170){
                    createRotator();
                } if(Math.random() < 0.001 && timePassed >= 140){
                    createAsteroid();
                } if (Math.random() < 0.004 && timePassed >= 40 && alienPlanes.length < 12 || (Math.random() < 0.004 + diffindex && timePassed >= 300)) {
                    createAlienPlane();
                } if(Math.random() < 0.003 && timePassed >= 90 && advancedAliens.length < 8 || (Math.random() < 0.003 + diffindex && timePassed >= 500)){
                    createAdvancedAliens();
                } if((Math.random() < 0.001 && timePassed >= 120 && blueArcs.length < 4) || (Math.random() < 0.001 + diffindex && timePassed >= 700)){
                    createBlueArcs(); 
                } if((Math.random() < 0.007 && timePassed >= 150 && nebulas.length < 2) || (Math.random() < 0.001 + diffindex && timePassed >= 700 && nebulas.length < 2)){
                    createNebulas(); 
                } if(Math.random() < 0.001 && timePassed >= 200){
                    createDefenders();
                }
            } else if(level == 1){ //towards mars 120
                if (Math.random() < 0.02*difactor) {
                    createStone();
                } if (Math.random() < 0.008 && rotators.length < 2 && timePassed >= 50){
                    createRotator();
                } if (Math.random() < 0.0008*difactor && timePassed >= 90 && alienPlanes.length < 6*difactor) {
                    createAlienPlane();
                }
            } else if(level == 2){ //towards jupiter 180
                if (Math.random() < 0.015) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 60){
                    createRotator();
                } if(Math.random() < 0.007*difactor && timePassed >= 110 && asteroids.length < 3){
                    createAsteroid();
                } if (Math.random() < 0.004*difactor && timePassed >= 20 && alienPlanes.length < 12*difactor) {
                    createAlienPlane();
                } if(Math.random() < 0.007 && timePassed >= 150 && nebulas.length < 2){
                    createNebulas();
                } 
            } else if(level == 3){ //towards saturn 180
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0006 && rotators.length < 2 && timePassed >= 50){
                    createRotator();
                } if (Math.random() < 0.004 && timePassed >= 20 && alienPlanes.length < 12) {
                    createAlienPlane();
                } if(Math.random() < 0.003 && timePassed >= 90){
                    createAsteroid();
                } if(Math.random() < 0.005 && timePassed >= 125 && advancedAliens.length < 8){
                    createAdvancedAliens();
                }
            } else if(level == 4){ //towards uranus 200
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 85){
                    createRotator();
                } if (Math.random() < 0.006 && timePassed >= 15 && alienPlanes.length < 15) {
                    createAlienPlane();
                } if(Math.random() < 0.002 && timePassed >= 40){
                    createAsteroid();
                } if(Math.random() < 0.007 && timePassed >= 120 && advancedAliens.length < 10){
                    createAdvancedAliens();
                } if(Math.random() < 0.004 && timePassed >= 160 && nebulas.length < 2){
                    createNebulas();
                } 
            } else if(level == 5){ //towards neptune 200
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 40){
                    createRotator();
                } if (Math.random() < 0.005 && timePassed >= 10 && alienPlanes.length < 12) {
                    createAlienPlane();
                } if(Math.random() < 0.002 && timePassed >= 125){
                    createAsteroid();
                } if(Math.random() < 0.008 && timePassed >= 85 && advancedAliens.length < 12){
                    createAdvancedAliens();
                } if(Math.random() < 0.003 && timePassed >= 160 && blueArcs.length < 6){
                    createBlueArcs();
                }
            } else if(level == 6){ //towards pluto 220
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 230){
                    createRotator();
                } if (Math.random() < 0.006 && timePassed >= 15) {
                    createAlienPlane();
                } if(Math.random() < 0.004 && timePassed >= 85){
                    createAsteroid();
                } if(Math.random() < 0.007 && timePassed >= 45){
                    createAdvancedAliens();
                }  if(Math.random() < 0.0045 && timePassed >= 138 && blueArcs.length < 12){
                    createBlueArcs();
                } if(Math.random() < 0.007 && timePassed >= 165 && nebulas.length < 2){
                    createNebulas();
                } 
            } else if(level == 7){ // boss fight and alpha centauri
                //boss fight level7
                if(level7 == 0){
                    if (Math.random() < 0.01 && timePassed <120) {
                        createStone();
                    } if (Math.random() < 0.006 && timePassed >= 10 && timePassed <120) {
                        createAlienPlane();
                    } if(Math.random() < 0.004 && timePassed >= 50 && timePassed <120){
                        createAsteroid();
                    } if(Math.random() < 0.007 && timePassed >= 30 && timePassed <120){
                        createAdvancedAliens();
                    } if(Math.random() < 0.0045 && timePassed >= 70 && timePassed <120){
                        createBlueArcs();
                    } if(Math.random() < 0.007 && timePassed >= 90 && nebulas.length < 2 && timePassed <120){
                        createNebulas();
                    } 
                    if(stones.length == 0 && alienPlanes.length == 0 && advancedAliens.length == 0 && asteroids.length == 0 && blueArcs.length == 0 && nebulas.length == 0 && planets.length == 0 && timePassed >= 120 && initialbossremoved == 0){
                        planetImage.src = 'eris.png';
                        createPlanet();
                        initialbossremoved = 1;
                    } planets.forEach(planet => {
                        if(initialbossremoved != 0 && planet.y >= planet.height + 3.5*plane.height){
                            level7 = 1;
                            initialbossremoved = timePassed + 4;
                            createBoss();
                        } 
                    });                    
                } 
                
                if(level7 == 1 && initialbossremoved <= timePassed){                    
                    nearalpha.currentTime = 0;
                    if(music){
                        nearalpha.play();
                    }currentAudio = nearalpha;
                    towardsalpha.pause();
                    towardsalpha.currentTime = 0;
                    level7 = 2;
                    initialbossremoved = timePassed + 4;
                    boss.splice(0,1);
                } else if(level7 == 2){
                    if((Math.random() < 0.1 && finalboss.length == 0) || Math.random() < 0.05){
                        let k = 200;
                        while(!createDefenders()&&k-->0);
                    } //also add logic for boss spawning 
                    if(finalboss.length == 0 && initialbossremoved <= timePassed){                        
                        createFinalBoss(); 
                        initialbossremoved = 0;
                    } if(Math.random() < 0.002){
                        createBlueArcs();
                    } if (Math.random() < 0.0007 && rotators.length < 1){
                        createRotator();
                    } 
                } else if(level7 == 3){
                    //boss 1st layer destroyed
                    if(Math.random() < 0.032 && defenders.length < 30){
                        let k = 200;
                        while(!createDefenders()&&k-->0);
                    } if(Math.random() < 0.007 && nebulas.length < 2){
                        createNebulas();
                    } if(Math.random() < 0.0035){
                        createAsteroid();
                    }  if(Math.random() < 0.002){
                        createBlueArcs();
                    } if (Math.random() < 0.0007 && rotators.length < 1){
                        createRotator();
                    } 
                } else if(level7 == 4){
                    //boss 2nd layer destroyed
                    if(Math.random() < 0.025 && defenders.length < 30){
                        let k = 200;
                        while(!createDefenders()&&k-->0);
                    } if(Math.random() < 0.007 && nebulas.length < 2){
                        createNebulas();
                    } if(Math.random() < 0.004){
                        createAsteroid();
                    } if (Math.random() < 0.0007 && rotators.length < 1){
                        createRotator();
                    } if(Math.random() < 0.002){
                        createBlueArcs();
                    } if (Math.random() < 0.004) {
                        createAlienPlane();
                    } if(Math.random() < 0.0025){
                        createAdvancedAliens();
                    } 
                } else if(level7 == 5 && initialbossremoved ==0){ 
                    nearalpha.pause();
                    nearalpha.currentTime = 0;
                    //remove after animation     finalboss.splice(0,1);
                    initialbossremoved = timePassed+2;

                } else if(level7 == 5 && initialbossremoved <= timePassed){
                    createExplosion(finalboss[0].x,finalboss[0].y);                                     
                    bossfinalImage.src = 'bossexplosion.png';
                    bigexplode.currentTime = 1;
                    bigexplode.play();
                    level7 = 5.5;
                    initialbossremoved = timePassed+2;
                } else if(level7 == 5.5 && initialbossremoved <= timePassed){  
                    level7 = 6;
                    finalboss = [];
                    score += 10000;
                    if(score >= highScore){
                        highScore = score;
                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                    }
                    initialbossremoved = 0;
                } else if(level7 == 6 &&initialbossremoved==0){
                    //won                    
                    planetImage.src = 'haumea.png';
                    createPlanet();
                    initialbossremoved = 1; 
                } planets.forEach(planet => {
                    if(initialbossremoved != 0 && planet.y >= 0.75*planet.height&&level7 == 6){
                        level7 = 7;
                    }
                }); 

            } if(((timePassed > 120 && level == 1) || (timePassed > 180 && (level == 2 || level == 3)) || (timePassed > 200 && (level == 4 || level == 5))  || (timePassed > 220 && level == 6))&&win == 0){  //timerwin 120 180 180 240 240 260 100+boss spaces
                if(planets.length < 1){
                    createPlanet();
                }
            } 
        }

        function gameLoop() { // Reset game variables and start timers, etc.
            draw();
            requestAnimationFrame(gameLoop);
        }
        function restartGame(lvl) {      
            mistray.pause();
            flash.pause();
            initialbossremoved = 0;
            bossfinalImage.src = 'bossdownwards.png';
            if(lvl < 0){
                lvl = level;
            } 
            
            level = lvl;
            
            if(level != 0 && winned[level-1] == 0){
                return;
            } 
            buttonclickk.currentTime = 0.25;
            buttonclickk.play();
            wins.pause();
            bigexplode.pause();
            missilelaunch.pause();
            shootsound.pause();
            teleport.pause();
            frozen.pause();
            exploding.pause();
            level7 = 0;
            
            hideMenu();
            levelScreen.style.display = 'none';
            
            timePassed = 0;
            if(win == 1 && level != 7){
                win = 0;
                restartGame(level+1);
                return;
            }
            win = 0; 
            wins.pause();
            towardsmars.pause();
            towardsmars.currentTime = 0;
            towardsjupiter.pause();
            towardsjupiter.currentTime = 0;
            towardssaturn.pause();
            towardssaturn.currentTime = 0;
            towardsuranus.pause();
            towardsuranus.currentTime = 0;
            towardsneptune.pause();
            towardsneptune.currentTime = 0;
            towardspluto.pause();            
            towardspluto.currentTime = 0;
            towardsalpha.pause();            
            towardsalpha.currentTime = 0;
            nearalpha.pause();            
            nearalpha.currentTime = 0;
            laser.pause();
            bgmusic.pause();
            bgmusic.currentTime = 0;

            if(level == 0){   
                survivormusic.currentTime = 0;                
                if(music){
                    survivormusic.play();
                }currentAudio = survivormusic;
            } else if(level == 1){
                planetImage.src = "mars.png";                
                if(music){
                    towardsmars.play();
                }currentAudio = towardsmars;
            } else if(level == 2){
                planetImage.src = "jupiter.png";
                if(music){
                    towardsjupiter.play();
                }
                currentAudio = towardsjupiter;
            } else if(level == 3){
                planetImage.src = "titan.png";
                if(music){
                    towardssaturn.play();
                }
                currentAudio = towardssaturn;
            } else if(level == 4){
                planetImage.src = "uranus.png";
                if(music){
                    towardsuranus.play();
                }
                currentAudio = towardsuranus;
            } else if(level == 5){
                planetImage.src = "neptune.png";
                if(music){
                    towardsneptune.play();
                }
                currentAudio = towardsneptune;
            } else if(level == 6){
                planetImage.src = "pluto.png";
                if(music){
                    towardspluto.play();
                }
                currentAudio = towardspluto;
            } else if(level == 7){
                planetImage.src = "haumea.png";
                if(music){
                    towardsalpha.play();
                }
                currentAudio = towardsalpha;
            }
            missileTime = 0;
            shooterTime = 0;
            stunTime = 0;
            if(planes[selectedPlane].id != 'zxiFighter'){
                missileButton.style.display = 'none';
            } else{
                missileButton.style.display = 'flex';
            } if(planes[selectedPlane].id != 'heavyDuty'){
                shooterButton.style.display = 'none';
            } else{
                shooterButton.style.display = 'flex';
            } if(planes[selectedPlane].id != 'fairyplane'){
                stunButton.style.display = 'none';
            } else{
                stunButton.style.display = 'flex';
            } 
            missiles = [];
            shooters = [];
            currenthealth = planes[selectedPlane].health;
            planeImage.src = planes[selectedPlane].imgSrc;
            fireButtonPressed = false;
            
            finalboss = [];

            plane.moveLeft = false;
            plane.moveRight = false;
            plane.x = canvas.width / 2;
            plane.y = canvas.height - 100;
            plane.bullets = [];
            shooters = [];
            stones = [];
            nebulas = [];
            rotators = [];
            asteroids = [];
            boss = [];
            mists = [];
            massexplosions = [];
            planets = [];
            alienPlanes = [];
            blueArcs = [];
            advancedAliens = [];
            defenders = [];
            explosions = [];
	        coins = [];
            immunityPill = null;
            bubbleImage.src = '';
            score = 0;
            gameRunning = true;
            gameOverScreen.style.display = 'none';            
            document.getElementById('pauseScreen').style.display = 'none';            
            lastTime = Date.now();
            document.getElementById('muteScreen').style.display = 'none';              
        }
        function returnToMenu() {
            flash.pause();
            mistray.pause();
            document.getElementById('muteScreen').style.display = 'flex';              
            finalboss = [];
            bossfinalImage.src = 'bossdownwards.png';
            initialbossremoved = 0;
            buttonclickk.currentTime = 0.25;
            buttonclickk.play();
            wins.pause();
            bigexplode.pause();
            bubbleImage.src = '';
            missilelaunch.pause();
            shootsound.pause();
            teleport.pause();
            frozen.pause();
            laser.pause();
            exploding.pause();
            level7 = 0;
            timePassed = 0;
            boss = [];
            if(music){
                bgmusic.play();
            }
            currentAudio = bgmusic;

            win = 0;
            if(level == 0){   
                survivormusic.pause();
                survivormusic.currentTime = 0;
            } else if(level == 1){                
                towardsmars.pause();
                towardsmars.currentTime = 0;
            } else if(level == 2){
                towardsjupiter.pause();
                towardsjupiter.currentTime = 0;
            } else if(level == 3){
                towardssaturn.pause();
                towardssaturn.currentTime = 0;
            } else if(level == 4){
                towardsuranus.pause();
                towardsuranus.currentTime = 0;
            } else if(level == 5){
                towardsneptune.pause();
                towardsneptune.currentTime = 0;
            } else if(level == 6){
                towardspluto.pause();
                towardspluto.currentTime = 0;
            } else if(level == 7){
                towardsalpha.pause();
                towardsalpha.currentTime = 0;
                nearalpha.pause();
                nearalpha.currentTime = 0;
            }
            missiles = [];
            shooters = [];
            plane.x = canvas.width / 2;
            plane.y = canvas.height - 100;
            plane.bullets = [];
            rotators = [];
            asteroids = [];
            massexplosions = [];
            mists = [];
            planets = [];
            shooters = [];
            stones = [];
            nebulas = [];
            alienPlanes = [];
            blueArcs = [];
            advancedAliens = [];
            defenders = [];
            explosions = [];
	        coins = [];
            immunityPill = null;
            score = 0;
            gameRunning = false;
            gameOverScreen.style.display = 'none';
            lastTime = Date.now();
            showMenu();            
            updateCoinDisplay();
        }   

        function togglePause() {
            buttonclickk.currentTime = 0.25;
            buttonclickk.play();
            paused = !paused;
            gameRunning = false; // Stop updating the game loop
            document.getElementById('pauseScreen').style.display = 'flex';
            
            document.getElementById('muteScreen').style.display = 'flex';  
        }

        function resumeGame() {
            paused = !paused;
            gameRunning = true; // Resume updating the game loop
            document.getElementById('pauseScreen').style.display = 'none';
            lastTime = Date.now(); // Reset lastTime to avoid a large delta time
            
            document.getElementById('muteScreen').style.display = 'none';  
            requestAnimationFrame(draw); // Restart the draw loop
        } function restarttheGame(){
            resumeGame();
            restartGame(level);
        } function returntowardsmenu(){       
            resumeGame();
            returnToMenu();
        }
        gameRunning = false;
        gameLoop();
        function updateCoinDisplay() {
            document.getElementById('coinCount').textContent = totalCoins;
        }   
