let gameworking = 0;
    function initialize(){
        // Hide the initial screen and show the game content
        document.getElementById('initialscreen').style.display = 'none';
        bgmusic.play();
        document.removeEventListener('click',initialize);
    } document.addEventListener('click', initialize);
    
    winned = [1,0,0,0,0,0,0];
    function closelevel(){
        document.getElementById('levelScreen').style.display = 'none';
    }

    const initiallevelcolors = document.querySelectorAll('.levelbutton');

    // Update button colors based on the level variable
    initiallevelcolors.forEach((button, index) => {
        if (index == 0) {
            button.style.backgroundColor = 'green'; // give to blue
        } if(index == 1){
            button.style.backgroundColor = 'blue'; // give to green
        }
    }); 

    let totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    totalCoins = 0;
    let win = 0;

    const missileImage = new Image();
    missileImage.src = 'missile.png';

// Function to resize and replace the image
const planes = [
    {
        id: 'monoFighter',
        name: 'Mono Fighter (1x)',
        health: 1,
        cost: 'Already Owned',
        imgSrc: 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05001234/plane_preview.png',
        bought: true
    },
    {
        id: 'miniDualShooter',
        name: 'Dual Shooter Phantom (2x)',
        health: 2,
        cost: ' 230',
        imgSrc: 'dualshooter.png',
        bought: false
    },
    {
        id: 'heavyDuty',
        name: 'Heavy Duty Fighter (4x)',
        health: 4,
        cost: ' 510',
        imgSrc: 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05010017/plane-animated-top-down-game-art.png',
        bought: false
    },
    {
        id: 'zxiFighter',
        name: 'ZXI SpaceShip (8x)',
        health: 6,
        cost: ' 980',
        imgSrc: 'zxiFighter.png',
        bought: false
    }
];

let firststart = false;
let currenthealth = 0;
let equippeddamage = 1;
let currentPlaneIndex = 0;
let equippedPlane = 'monoFighter';
let equippedImage = 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05001234/plane_preview.png';
let equippedhealth = 1;
let level = 0;
let levelup = false;
levelScreen.style.display = 'none';
function updateStoreMenu() {
    const plane = planes[currentPlaneIndex];
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
        equipButton.innerText = (equippedPlane === plane.id) ? 'Equipped' : 'Equip';
        equipButton.className = (equippedPlane === plane.id) ? 'equipped-button button' : 'equip-button button';
    } else {
        buyButton.style.display = 'inline-block';
        equipButton.style.display = 'none';
    }
}

function showlevelscreen(){
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
        totalCoins -= plane.cost;
        plane.bought = true;
        updateCoinDisplay();
        updateStoreMenu();
    }
}

function equipCurrentPlane() {
    const plane = planes[currentPlaneIndex];
    if (plane.bought) {
        equippedPlane = plane.id;
        if(currentPlaneIndex === 0){
            equippedImage = 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05001234/plane_preview.png';
            equippedhealth = 1;
            equippeddamage = 1;
        } else if(currentPlaneIndex === 1){
            equippedImage = 'dualshooter.png';
            equippedhealth = 2;
            equippeddamage = 2;
        } else if(currentPlaneIndex === 2){
            equippedImage = 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05010017/plane-animated-top-down-game-art.png';
            equippedhealth = 4;
            equippeddamage = 5;
        } else{
            equippedImage = 'zxiFighter.png';
            equippedhealth = 6;
            equippeddamage = 8;
        }
        updateStoreMenu();
    }
}

function toggleStoreMenu() {
    const storeMenu = document.getElementById('storeMenu');
    storeMenu.style.display = storeMenu.style.display === 'none' ? 'flex' : 'none';
}

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
        planeImage.src = equippedImage;
        const massExplosion = new Image();
        massExplosion.src = 'massexplosion.png';
        const stoneImage = new Image();
        stoneImage.src = 'stone.png';
        const rotatorImage = new Image();
        rotatorImage.src = 'rotator.png';
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
        const bossfinalImage = new Image();
        bossfinalImage.src = 'bossdownwards.png';
        const bluebulettImage = new Image();
        bluebulettImage.src = 'bluebullet.png';
        let planetImage = new Image();

        let plane = {
            x: canvas.width / 2,
            y: canvas.height - 100,
            width: 100,
            height: 100,
            speed: 4,
            shooting: false,
            bullets: []
        };

        let stones = [];
        let nebulas = [];
        let rotators = [];
        let asteroids = [];
        let planets = [];
        let explosions = [];
        let alienPlanes = [];
        let advancedAliens = [];
        let blueArcs = [];
        let missiles = [];
        let score = 0;
        let highScore = 0;
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
            if(freezetime <= 0){
                plane.moveLeft = true;
            } else{
                plane.moveLeft = false;
            }
        }

        function endMoveLeft() {
            plane.moveLeft = false;
        }

        function startMoveRight() {
            if(freezetime <= 0){
                plane.moveRight = true;
            } else{
                plane.moveRight = false;
            }
        }

        function endMoveRight() {
            plane.moveRight = false;
        }

        function shoot() {
            if(freezetime <= 0){
                plane.shooting = true;
            } else{
                plane.shooting = false;
            }
        } function missile(){
            if(missileTime === 0 && equippedPlane === 'zxiFighter' && freezetime <= 0){
                // Set missile reuse time
                missileButton.style.display = 'none';
                missileButtonPressed = true;
            } else{
                missileButtonPressed = false;
            }
        }
        
// Add event listeners for keyboard controls
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        startMoveLeft();
    } else if (event.key === 'ArrowRight') {
        startMoveRight();
    } else if (event.key === ' ') { // Spacebar for firing
        shoot();
    } else if (event.key === 'ArrowUp'){
        missile();
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        endMoveLeft();
    } else if (event.key === 'ArrowRight') {
        endMoveRight();
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
                type: 'rotator'
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
            };
            planets.push(planet);
        }

        function createAlienPlane() {
            let alienPlane = {
                x: Math.random() * (canvas.width - 60),
                y: -60,
                width: 60,
                height: 60,
                bullets: [],
                health: 5, // takes 5 bullets to destroy
                type: 'alien'
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
                type: 'advancedAlien'
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
                type: 'blueArc'
            };
            blueArcs.push(blueArc);
        }

        function createExplosion(x, y) {
    explosions.push({ x: x, y: y, frame: 0});
} 

function MissileExplosion(x,y){
    const explosionRadius = 50;

    // Check collision with stones
    stones.forEach(stone => {
        if (x + explosionRadius > stone.x && x - explosionRadius < stone.x + stone.width &&
            y + explosionRadius > stone.y && y - explosionRadius < stone.y + stone.height) {
            createExplosion(stone.x, stone.y);
            stones.splice(stones.indexOf(stone), 1);
            score += 10; // Increase score for destroying a stone
            if (score > highScore) {
                highScore = score; // Update high score
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
            }
        }
    }); blueArcs.forEach(blueArc => {
        if (x + explosionRadius > blueArc.x && x - explosionRadius < blueArc.x + blueArc.width &&
        y + explosionRadius > blueArc.y && y - explosionRadius < blueArc.y + blueArc.height){
            blueArc.health -= 10;
            if(blueArc.health <= 0){
                createExplosion(blueArc.x, blueArc.y);
                blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                score += 200; // Increase score for destroying an alien plane
                if (score > highScore) {
                    highScore = score; // Update high score
                }
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

        function draw() {
            if(equippedPlane === 'zxiFighter'){
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
        if(gameRunning){
            star.y += star.speed; // Move stars downwards
        }
        if (star.y > canvas.height) {
            star.y = 0; // Reset star position when it goes below canvas
            star.x = Math.random() * canvas.width; // Randomize x position
        }
    }); 
    
    planets.forEach(planet => {
                ctx.drawImage(planetImage, planet.x, planet.y - planet.height, planet.width, planet.height);
            });

            coins.forEach(coin => {
        ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
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

            asteroids.forEach(asteroidd => {
                ctx.drawImage(asteroidImage, asteroidd.x, asteroidd.y, asteroidd.width, asteroidd.height);
            });

            

            if (immunityActive) {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3;
        ctx.strokeRect(plane.x, plane.y, plane.width, plane.height);
    } 

            // Draw explosions
            explosions.forEach(explosion => {
                ctx.drawImage(explosionImage, explosion.x, explosion.y, 60, 40);
                explosion.frame++;
                if (explosion.frame > 20) { // Remove explosion after 1 second
                    explosions.splice(explosions.indexOf(explosion), 1);
                }
            });

            // Draw plane
            ctx.drawImage(planeImage, plane.x, plane.y, plane.width, plane.height);

            // Handle blinking effect when immunity is about to expire
    if (immunityActive && immunityEndTime - Date.now() < 3000) { // 3000 milliseconds = 3 seconds
        if (Date.now() % 1000 < 500) { // Toggle every half second
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.strokeRect(plane.x, plane.y, plane.width, plane.height);
        }
    }

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
                    ctx.drawImage(bulletImage, bullet.x - 10, bullet.y - 20, 15, 60);
                });
            }); 

            blueArcs.forEach(blueArc => {
                ctx.drawImage(BlueArcImage, blueArc.x, blueArc.y, blueArc.width, blueArc.height);
                // Draw bullets for alien plane
                blueArc.bullets.forEach(bullet => {
                    ctx.drawImage(blueflare, bullet.x - 20, bullet.y - 20, 30, 30);
                });
            })

            // Inside your drawing function (e.g., drawMissiles()), replace the ctx.fillRect() calls with:
            missiles.forEach(missile => {
                ctx.drawImage(missileImage, missile.x, missile.y, missile.width, missile.height);
            });

            
            // Draw bullets for our plane
            plane.bullets.forEach(bullet => {
                if(equippedPlane === 'monoFighter'){
                    ctx.fillStyle = 'yellow';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                } else if(equippedPlane === 'miniDualShooter'){
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(bullet.x, bullet.y, 2, 8);
                } else if(equippedPlane === 'heavyDuty'){
                    ctx.fillStyle = 'violet';
                    ctx.fillRect(bullet.x, bullet.y, 4, 8);
                } else{
                    ctx.fillStyle = 'purple';
                    ctx.fillRect(bullet.x, bullet.y, 2, 18);
                }
                
            }); 

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
                    if(levelup){
                        totalCoins += 70;
                        levelup = false;
                    }
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
            if(true){
                let currentTime = Date.now();
                let deltaTime = (currentTime - lastTime) / 1000; // deltaTime in seconds
                lastTime = currentTime;
                timePassed += deltaTime;
            } else{
                timePassed = 0;
            }
let missileTimeRemaining = missileTime - Date.now();
if((missileButton.style.display === 'none' && missileTimeRemaining > 0)||(equippedPlane !== 'zxiFighter')){
    
} else{
    missileButton.style.display = 'flex';
    missileTime = 0;
} 

if(freezetime - Date.now() <= 0){
    freezetime = 0;
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

            if (plane.moveLeft && plane.x > 0) {
                plane.x -= plane.speed;
            }
            if (plane.moveRight && plane.x < canvas.width - plane.width) {
                plane.x += plane.speed;
            }

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

    // Move immunity pill
    if (immunityPill) {
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
            immunityEndTime = Date.now() + (immunityDuration * 1000); // Set immunity end time
            immunityPill = null; // Remove collected immunity pill
        }
    }

// Check if immunity has expired
    if (immunityActive && Date.now() > immunityEndTime) {
        immunityActive = false;
    }

    // Create new coins and immunity pill
    if (Math.random() < 0.002) { // Adjust spawn rates as needed
        createCoin();
    }
    if (Math.random() < 0.0003) { // Adjust spawn rates as needed
        createImmunityPill();
    }

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
            })

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
            });

            planets.forEach(planet =>{
                planet.y += 2; // Asteroid falling speed
                if (planet.y > 2*canvas.height) {
                    planets.splice(planets.indexOf(planet), 1); // Remove asteroids that are out of canvas
                }
            });

            alienPlanes.forEach(alienPlane => {
                const stopY = 50; // Adjust this value to your desired threshold
        if (alienPlane.y < stopY) {
            alienPlane.y += 0.7; // Adjust the speed if needed
        }
                if (alienPlane.y > canvas.height) {
                    alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1); // Remove alien planes that are out of canvas
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.005) {
                    alienPlane.bullets.push({
                        x: alienPlane.x + alienPlane.width / 2,
                        y: alienPlane.y + alienPlane.height
                    });
                }
                // Move alien bullets
                alienPlane.bullets.forEach(bullet => {
                    bullet.y += 4;
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
                    }
                });
            });

            advancedAliens.forEach(alienPlane => {
                alienPlane.y += 0.5; // Adjust the speed if needed
                if (alienPlane.y > canvas.height) {
                    advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1); // Remove alien planes that are out of canvas
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.005) {
                    alienPlane.bullets.push({
                        x: alienPlane.x + alienPlane.width / 2,
                        y: alienPlane.y + alienPlane.height
                    });
                }
                // Move alien bullets
                alienPlane.bullets.forEach(bullet => {
                    bullet.y += 2;
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
                    }
                });
            });

        blueArcs.forEach(blueArc => {
                const stopY = 50; // Adjust this value to your desired threshold
        if (blueArc.y < stopY) {
            blueArc.y += 0.4; // Adjust the speed if needed
        }
                if (blueArc.y > canvas.height) {
                    blueArcs.splice(blueArcs.indexOf(blueArc), 1); // Remove alien planes that are out of canvas
                }
                // Alien plane shooting bullets
                if (Math.random() < 0.004) {
                    blueArc.bullets.push({
                        x: blueArc.x + blueArc.width / 2,
                        y: blueArc.y + blueArc.height
                    });
                }
                // Move alien bullets
                blueArc.bullets.forEach(bullet => {
                    bullet.y += 3;
                    if (bullet.y > canvas.height) {
                        blueArc.bullets.splice(blueArc.bullets.indexOf(bullet), 1);
                    }
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        // stalling logic
                        blueArc.bullets.splice(blueArc.bullets.indexOf(bullet), 1);
                        freezetime = Date.now() + (3000);
                    }
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
                        createExplosion(stone.x, stone.y);
                        stones.splice(stones.indexOf(stone), 1);
                        missiles.splice(missiles.indexOf(missile), 1); 
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                        score += 10; // Increase score for destroying a stone
                        if (score > highScore) {
                            highScore = score; // Update high score
                        }
                    }
                }); 
                
                rotators.forEach(rotator => {
                    if (missile.x + 40> rotator.x && missile.x < rotator.x + rotator.width &&
                    missile.y + 40 > rotator.y && missile.y - 40 < rotator.y + rotator.height) {
                        createExplosion(rotator.x, rotator.y);
                        rotators.splice(rotators.indexOf(rotator), 1);
                        missiles.splice(missiles.indexOf(missile), 1); 
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                        score += 20; // Increase score for destroying a rotator
                        if (score > highScore) {
                            highScore = score; // Update high score
                        }
                    }
                });

                // Check collision with alien planes
                alienPlanes.forEach(alienPlane => {
                    if (missile.x + 40> alienPlane.x && missile.x < alienPlane.x + alienPlane.width &&
                    missile.y +20 > alienPlane.y && missile.y - 20 < alienPlane.y + alienPlane.height) {
                        alienPlane.health = 0;
                        missiles.splice(missiles.indexOf(missile), 1);
                        createExplosion(alienPlane.x, alienPlane.y);
                        alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);      
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                        score += 50; // Increase score for destroying an alien plane
                        if (score > highScore) {
                            highScore = score; // Update high score
                        }
                    }
                });

                // Check collision with alien planes
                advancedAliens.forEach(alienPlane => {
                    if (missile.x + 40> alienPlane.x && missile.x < alienPlane.x + alienPlane.width &&
                    missile.y +20 > alienPlane.y && missile.y - 20 < alienPlane.y + alienPlane.height) {
                        alienPlane.health = 0;
                        missiles.splice(missiles.indexOf(missile), 1);
                        createExplosion(alienPlane.x, alienPlane.y);
                        advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);      
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                        score += 100; // Increase score for destroying an alien plane
                        if (score > highScore) {
                            highScore = score; // Update high score
                        }
                    }
                });

                blueArcs.forEach(blueArc => {
                    if (missile.x + 40> blueArc.x && missile.x < blueArc.x + blueArc.width &&
                    missile.y +20 > blueArc.y && missile.y - 20 < blueArc.y + blueArc.height) {
                        bluearc.health -= 10;
                        missiles.splice(missiles.indexOf(missile), 1);
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                        if(blueArc.health <= 0){
                            createExplosion(blueArc.x, blueArc.y);
                            blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                            score += 200; // Increase score for destroying a blue arc
                            if (score > highScore) {
                            highScore = score; // Update high score
                            }
                        }
                    }
                });
            });
                
            if(k === 1){
                MissileExplosion(mx,my);
                k = 0;
            }
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
                        alienPlane.health -= equippeddamage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if (alienPlane.health <= 0) {
                            createExplosion(alienPlane.x, alienPlane.y);
                            alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                            score += 50; // Increase score for destroying an alien plane
                            if (score > highScore) {
                                highScore = score; // Update high score
                            }
                        }
                    }
                });

                advancedAliens.forEach(alienPlane => {
                    if (bullet.x > alienPlane.x && bullet.x < alienPlane.x + alienPlane.width &&
                        bullet.y > alienPlane.y && bullet.y < alienPlane.y + alienPlane.height) {
                        alienPlane.health -= equippeddamage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if (alienPlane.health <= 0) {
                            createExplosion(alienPlane.x, alienPlane.y);
                            advancedAliens.splice(advancedAliens.indexOf(alienPlane), 1);
                            score += 100; // Increase score for destroying an alien plane
                            if (score > highScore) {
                                highScore = score; // Update high score
                            }
                        }
                    }
                });

                blueArcs.forEach(blueArc => {
                    if (bullet.x > blueArc.x && bullet.x < blueArc.x + blueArc.width &&
                    bullet.y > blueArc.y && bullet.y < blueArc.y + blueArc.height) {
                        blueArc.health -= equippeddamage;
                        plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        if(blueArc.health <= 0){
                            createExplosion(blueArc.x, blueArc.y);
                            blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                            score += 200; // Increase score for destroying a blue arc
                            if (score > highScore) {
                                highScore = score; // Update high score
                            }
                        }
                    }
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
    }
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
    }
}); if(((timePassed > 130 && level == 1) || (timePassed > 190 && (level == 2 || level == 3)) || (timePassed > 250 && (level == 4 || level == 5))  || (timePassed > 270 && level == 6))&&win == 0){ //timerwin 120 180 180 240 240 260 100+boss spaces
    levelup = true;
    win = 1;
    if(level != 7){
        winned[level] = 1;
    }
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
    }
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
                }
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
                }
            });

            // Check collision between player's plane and blue arcs
            blueArcs.forEach(blueArc => {
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

            if(missileButtonPressed){
                missileButtonPressed = false;
                missiles.push({
                    x: plane.x + plane.x/200,
                    y: plane.y + plane.x/16,
                    width:80, // Width of the missile
                    height: 60 // Height of the missile
                });
            }
            if (plane.shooting) {
                if(equippedPlane === 'miniDualShooter'){
                    plane.bullets.push({
                        x: plane.x + plane.width / 5,
                        y: plane.y + plane.x/20
                    });
                    plane.bullets.push({
                        x: plane.x + 3*plane.width / 4,
                        y: plane.y + plane.x/20
                    });
                } else if(equippedPlane === 'zxiFighter'){
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
                } 
            } else if(level == 1){ //towards mars 120
                if (Math.random() < 0.02) {
                    createStone();
                } if (Math.random() < 0.008 && rotators.length < 2 && timePassed >= 50){
                    createRotator();
                } if (Math.random() < 0.0008 && timePassed >= 90 && alienPlanes.length < 6) {
                    createAlienPlane();
                }
            } else if(level == 2){ //towards jupiter 180
                if (Math.random() < 0.015) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 60){
                    createRotator();
                } if(Math.random() < 0.007 && timePassed >= 110 && asteroids.length < 3){
                    createAsteroid();
                } if (Math.random() < 0.004 && timePassed >= 20 && alienPlanes.length < 12) {
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
            } else if(level == 4){ //towards uranus 240
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 90){
                    createRotator();
                } if (Math.random() < 0.006 && timePassed >= 15 && alienPlanes.length < 12) {
                    createAlienPlane();
                } if(Math.random() < 0.002 && timePassed >= 50){
                    createAsteroid();
                } if(Math.random() < 0.007 && timePassed >= 120 && advancedAliens.length < 10){
                    createAdvancedAliens();
                } if(Math.random() < 0.004 && timePassed >= 160 && nebulas.length < 2){
                    createNebulas();
                } 
            } else if(level == 5){ //towards neptune 240
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 40){
                    createRotator();
                } if (Math.random() < 0.005 && timePassed >= 10 && alienPlanes.length < 15) {
                    createAlienPlane();
                } if(Math.random() < 0.002 && timePassed >= 70){
                    createAsteroid();
                } if(Math.random() < 0.008 && timePassed >= 110 && advancedAliens.length < 12){
                    createAdvancedAliens();
                } if(Math.random() < 0.003 && timePassed >= 160 && blueArcs.length < 6){
                    createBlueArcs();
                }
            } else if(level == 6){ //towards pluto 260
                if (Math.random() < 0.01) {
                    createStone();
                } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 230){
                    createRotator();
                } if (Math.random() < 0.006 && timePassed >= 15) {
                    createAlienPlane();
                } if(Math.random() < 0.004 && timePassed >= 100){
                    createAsteroid();
                } if(Math.random() < 0.007 && timePassed >= 55){
                    createAdvancedAliens();
                }  if(Math.random() < 0.0045 && timePassed >= 160 && blueArcs.length < 12){
                    createBlueArcs();
                } if(Math.random() < 0.007 && timePassed >= 200 && nebulas.length < 2){
                    createNebulas();
                } 
            } else if(level == 7){ // boss fight and alpha centauri
                //boss fight
            } if(((timePassed > 120 && level == 1) || (timePassed > 180 && (level == 2 || level == 3)) || (timePassed > 240 && (level == 4 || level == 5))  || (timePassed > 260 && level == 6))&&win == 0){  //timerwin 120 180 180 240 240 260 100+boss spaces
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
            levelup = false;
            if(lvl < 0){
                lvl = level;
            }
            hideMenu();
            levelScreen.style.display = 'none';
            if(lvl != 0 && winned[lvl-1] == 0){
                return;
            }
            timePassed = 0;
            if(win == 1 && level != 7){
                win = 0;
                restartGame(level+1);
                return;
            }
            win = 0; 
            level = lvl;
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
            bgmusic.pause();
            bgmusic.currentTime = 0;

            if(level == 0){   
                survivormusic.currentTime = 0;
                survivormusic.play();
            } else if(level == 1){
                towardsmars.play();
                planetImage.src = "mars.png";
            } else if(level == 2){
                towardsjupiter.play();
                planetImage.src = "jupiter.png";
            } else if(level == 3){
                towardssaturn.play();
                planetImage.src = "titan.png";
            } else if(level == 4){
                towardsuranus.play();
                planetImage.src = "uranus.png";
            } else if(level == 5){
                towardsneptune.play();
                planetImage.src = "neptune.png";
            } else if(level == 6){
                towardspluto.play();
                planetImage.src = "pluto.png";
            } else if(level == 7){
                towardsalpha.play();
                planetImage.src = "haumea.png";
            }
            missileTime = 0;
            if(equippedPlane != 'zxiFighter'){
                missileButton.style.display = 'none';
            } else{
                missileButton.style.display = 'flex';
            }
            missiles = [];
            currenthealth = equippedhealth;
            planeImage.src = equippedImage;
            fireButtonPressed = false;

            plane.moveLeft = false;
            plane.moveRight = false;
            plane.x = canvas.width / 2;
            plane.y = canvas.height - 100;
            plane.bullets = [];
            stones = [];
            nebulas = [];
            rotators = [];
            asteroids = [];
            planets = [];
            alienPlanes = [];
            blueArcs = [];
            advancedAliens = [];
            explosions = [];
	        coins = [];
            immunityPill = null;
            score = 0;
            gameRunning = true;
            gameOverScreen.style.display = 'none';            
            document.getElementById('pauseScreen').style.display = 'none';            
            lastTime = Date.now();
        }
        function returnToMenu() {
            levelup = false;
            timePassed = 0;
            bgmusic.play();
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
            plane.x = canvas.width / 2;
            plane.y = canvas.height - 100;
            plane.bullets = [];
            rotators = [];
            asteroids = [];
            planets = [];
            stones = [];
            nebulas = [];
            alienPlanes = [];
            blueArcs = [];
            advancedAliens = [];
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
            paused = !paused;
            gameRunning = false; // Stop updating the game loop
            document.getElementById('pauseScreen').style.display = 'flex';
        }

        function resumeGame() {
            paused = !paused;
            gameRunning = true; // Resume updating the game loop
            document.getElementById('pauseScreen').style.display = 'none';
            lastTime = Date.now(); // Reset lastTime to avoid a large delta time
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
