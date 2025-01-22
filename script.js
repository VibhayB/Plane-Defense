    let totalCoins;
    try{
        totalCoins = parseInt(localStorage.getItem('totalCoins')) || 0;
    } catch(e){
        totalCoins = 0;
    }
    let initialbossremoved = 0;

    let currentAudio = bgmusic;
    var music = true;

    updateCoinDisplay();
    let gamestarted = false;
    let gameTime = -1;

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
        if(document.hidden && gamestarted){
            paused = true;
            gameRunning = false; // Stop updating the game loop
            document.getElementById('pauseScreen').style.display = 'flex';  
            document.getElementById('muteScreen').style.display = 'flex';  
            document.getElementById('feedbackScreen').style.display = 'flex'; 
        }
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
    // script.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its ID
    const button = document.getElementById('feedbackButton');

    // Define the URL you want to open
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSeMLgOVgZ-XSWj4L2odemacaHuY4tAIXpHfymN0S0IhmLnSdw/viewform?usp=sf_link';

    // Attach a click event listener to the button
    button.addEventListener('click', function() {
        // Open the URL in a new tab or window
        window.open(url, '_blank');
    });
});

    // Event listener for visibility changes
    try{

    } catch{}
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
        
        try{
            var storedwinned = localStorage.getItem('winned');
            var winned = storedwinned ? JSON.parse(storedwinned) : [1, 0, 0, 0, 0, 0, 0];
        } catch(e){
            winned = [1, 0, 0, 0, 0, 0, 0]; 
        }
        if (winned[winned.length - 1] === 1) {
            bgmusic.src = "bgtheme new.mp3"; // Change the music source
            bgmusic.load(); // Explicitly load the audio file
        }
        function initialize(){
            // Hide the initial screen and show the game content
            document.getElementById('initialscreen').style.display = 'none';
            if(music){
                bgmusic.play();
            }
            document.removeEventListener('click',initialize);
        } document.addEventListener('click', initialize);
        
        try{
            var storedScheme = localStorage.getItem('coloring');
            var coloring = storedScheme ? JSON.parse(storedScheme) : [2, 1, 0, 0, 0, 0, 0, 0];
        } catch(e){
            coloring = [2, 1, 0, 0, 0, 0, 0, 0];
        }

        function closelevel(){
            document.getElementById('levelScreen').style.display = 'none';   
            document.getElementById('muteScreen').style.display = 'flex';  
            document.getElementById('feedbackScreen').style.display = 'flex'; 
        }

        const initiallevelcolors = document.querySelectorAll('.levelbutton');
        
        let win = 0;
        let level7 = 0;
        let level4 = 0;
        let level2 = 0;
        let level6 = 0;

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
            freezed: 'basicplanefreezed.png',
            desc: 'Special: none'
        },
        {
            id: 'miniDualShooter',
            name: 'Phantom Raider (1.5x)',
            health: 2,
            cost: ' 180',
            imgSrc: 'dualshooter.png',
            bought: false,
            damage: 1.5,
            freezed: 'dualshooterfreezed.png',
            desc: 'Special: shoots 2 bullets at a time'
        },
        {
            id: 'fairyplane',
            name: 'Stallion (2.25x)',
            health: 3,
            cost: ' 410',
            imgSrc: 'fairy.png',
            bought: false,
            damage: 2.25,
            freezed: 'fairyfreezed.png',
            desc: 'Special: shoots stalling mist'
        },
        {
            id: 'heavyDuty',
            name: 'SkyBlazer (3.5x)',
            health: 4,
            cost: ' 640',
            imgSrc: 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05010017/plane-animated-top-down-game-art.png',
            bought: false,
            damage: 3.5,
            freezed: 'heavyplanefreezed.png',
            desc: 'Special: spawns shooter minions, which become powerful with time'
        },
        {
            id: 'zxiFighter',
            name: 'Kaiser\'s Wrath (5x)',
            health: 6,
            cost: ' 1000',
            imgSrc: 'zxiFighter.png',
            bought: false,
            damage: 5,
            freezed: 'zxiFighter.png',
            desc: 'Special: shoots missiles, can\'t be frozen'
        }
    ];

    let currenthealth = 0;
    let currentPlaneIndex = 0;
    let selectedPlane = 0;
    let level = 0;
    levelScreen.style.display = 'none';

    function saveGameState() {
        planes[0].bought = true;
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
        document.getElementById('planedesc').innerText = plane.desc;

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
        document.getElementById('muteScreen').style.display = 'none';  
        document.getElementById('feedbackScreen').style.display = 'none'; 
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
            document.getElementById('muteScreen').style.display = 'none';  
            document.getElementById('feedbackScreen').style.display = 'none'; 
            buttonclickk.currentTime = 0.25;
            buttonclickk.play();
        } else{
            storeMenu.style.display = 'none';   
            document.getElementById('muteScreen').style.display = 'flex';  
            document.getElementById('feedbackScreen').style.display = 'flex'; 
        }
    }

    const defaultGameState = {
        boughtPlanes: planes.map(plane => ({ id: plane.id, bought: false })),
        selectedPlane: 0,
        // Add other default values if needed
    };

    function loadGameState() {
        let gameState = defaultGameState;

        try {
            const savedState = localStorage.getItem('gameState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);

                // Validate boughtPlanes
                if (Array.isArray(parsedState.boughtPlanes)) {
                    gameState.boughtPlanes = parsedState.boughtPlanes.map(savedPlane => {
                        const plane = planes.find(p => p.id === savedPlane.id);
                        return plane ? { id: plane.id, bought: !!savedPlane.bought } : null;
                    }).filter(Boolean);
                }

                // Validate selectedPlane
                if (typeof parsedState.selectedPlane === 'number' ||
                    (typeof parsedState.selectedPlane === 'string' && !isNaN(parsedState.selectedPlane))) {
                    gameState.selectedPlane = parseInt(parsedState.selectedPlane, 10);
                    if (gameState.selectedPlane < 0 || gameState.selectedPlane >= planes.length) {
                        gameState.selectedPlane = defaultGameState.selectedPlane;
                    }
                }

                // Validate additional game state properties as needed
            }
        } catch (e) {
            // If parsing fails or any other error occurs, fall back to defaultGameState
            console.warn('Failed to load game state, using defaults:', e);
        }

        // Update planes and selected plane based on loaded state
        planes.forEach(plane => {
            const savedPlane = gameState.boughtPlanes.find(p => p.id === plane.id);
            plane.bought = savedPlane ? savedPlane.bought : false;
        });

        selectedPlane = gameState.selectedPlane;
        updateCoinDisplay(); // Ensure coin display is updated after loading the state
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
        document.getElementById('muteScreen').style.display = 'none';  
        document.getElementById('feedbackScreen').style.display = 'none'; 
    }

    function closeHowToPlay() {
        document.getElementById('howToPlayPopup').style.display = 'none';   
        document.getElementById('muteScreen').style.display = 'flex';  
        document.getElementById('feedbackScreen').style.display = 'flex'; 
    }

            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');

            canvas.width = window.innerWidth - 20; // Adjusted canvas width
            canvas.height = window.innerHeight - 20; // Adjusted canvas height

    // Define images
    const coinImage = document.getElementById('coinImage');
    const immunityPillImage = document.getElementById('immunityPillImage');
    const heartImage = new Image();
    heartImage.src = 'heart.png';

    let coins = [];
    let hearts = [];
    let immunityPill = null;
    let immunityActive = false;
    let freezetime = 0;
    let slowtime = 0;
    let immunityEndTime = 0;
    let missileTime = 0;
    let stunTime = 0;
    let shooterTime = 0;

    function createCoin() {
        let coin = {
            x: Math.random() * (canvas.width - 40),
            y: -40,
            width: 80,
            height: 60,
            type: 'coin',
            value: Math.random() > 0.12? 10: 30
        };
        coins.push(coin);
    } function createHeart() {
        let heart = {
            x: Math.random() * (canvas.width - 40),
            y: -40,
            width: 70,
            height: 70,
            type: 'heart'
        };
        hearts.push(heart);
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
            const gcoin = new Image();
            gcoin.src = 'gcoin.png';
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
            const firstbullet = new Image();
            firstbullet.src = 'firstboss_bullet.png';
            const semibullet = new Image();
            semibullet.src ='plasma.png';
            const defenderImage = new Image();
            defenderImage.src = 'defender.png';
            const semibossImage = new Image();
            semibossImage.src = 'semiboss.png';
            const bossinitialImage = new Image();
            bossinitialImage.src = 'bossupwards.png';
            const bluebulettImage = new Image();
            bluebulettImage.src = 'bluebullet.png';
            const bubbleImage = new Image();
            bubbleImage.src = 'bubble.png';
            const shooterImage = new Image();
            shooterImage.src ='missilethrower.png';
            let planetImage = new Image();        
            let bossfinalImage = new Image();
            bossfinalImage.src = 'bossdownwards.png';
            let rocketImage = new Image();
            rocketImage.src = 'missiledown.png';
            const mistImage = new Image();
            mistImage.src ='mist.png';
            const finalplanes = new Image();
            finalplanes.src = 'https://cartoonsmartstreaming.s3.amazonaws.com/wp-content/uploads/2014/12/05001234/plane_preview.png';
            let img1 = new Image();
            let img2 = new Image();
            img1.src = "lvl1theme.png";
            img2.src = "lvl1theme.png";
            const prop1 = new Image();
            prop1.src = "planetprop1.png";
            const prop2 = new Image();
            prop2.src = "planetprop2.png";
            const prop3 = new Image();
            prop3.src = "planetprop3.png";
            const spacestation = new Image();
            spacestation.src = "spacestation.png";
            const initialboss = new Image();
            initialboss.src = "semiquartboss.png";
            let quartboss = new Image();
            quartboss.src = "quartboss.png";
            
            const propimages = [prop1,prop2,prop3];

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
                y: canvas.height + 100,
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
            let lastbosses = [];
            let firstbosses = [];
            let bossdemo = [];
            let defenders = [];
            let blueArcs = [];
            let semibosses = [];
            let missiles = [];
            let shooters = [];
            let mists = [];
            let score = 0;
            let highScore = parseInt(localStorage.getItem('highScore')) || 0;
            let timePassed = 0;
            let gameRunning = true;
            let lastTime = Date.now();
            let endplanes = [];

            let leftButton = document.getElementById('leftButton');
    let rightButton = document.getElementById('rightButton');
    let fireButton = document.getElementById('fireButton');
    let missileButton = document.getElementById('missileButton');
    let shooterButton = document.getElementById('shooterButton');
    let stunButton = document.getElementById('stunButton');
    let pauseButton = document.getElementById('pauseButton');
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

    let isLeftButtonPressed = false;
    let isRightButtonPressed = false;
    let keyboard = { left: false, right: false };

    document.getElementById('leftButton').addEventListener('mousedown', function(event) {
        event.stopPropagation();
        isLeftButtonPressed = true;
    }, false);

    document.getElementById('leftButton').addEventListener('mouseup', function(event) {
        event.stopPropagation();
        isLeftButtonPressed = false;
    }, false);

    document.getElementById('rightButton').addEventListener('mousedown', function(event) {
        event.stopPropagation();
        isRightButtonPressed = true;
    }, false);

    document.getElementById('rightButton').addEventListener('mouseup', function(event) {
        event.stopPropagation();
        isRightButtonPressed = false;
    }, false);

    // Update the plane movement logic to handle both keyboard and button press

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

    document.addEventListener('mouseup', function(event) {
        endMoveLeft();
        endMoveRight();
    }, false);

    document.addEventListener('touchend', function(event) {
        endMoveLeft();
        endMoveRight();
    }, false);

    document.getElementById('leftButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        isLeftButtonPressed = true;
    });
    document.getElementById('leftButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        isLeftButtonPressed = false;
    });
    document.getElementById('rightButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        isRightButtonPressed = true;
    });
    document.getElementById('rightButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        isRightButtonPressed = false;
    });
    

    function startMoveLeft() {
        endMoveRight();
        if (freezetime == 0 && level7 != 1 && level7 != 5 && level7 != 5.5) {
            plane.moveLeft = true;
        } else {
            plane.moveLeft = false;
        }
    }

    function endMoveLeft() {
        plane.moveLeft = false;
    }

    function startMoveRight() {
        endMoveLeft();
        if (freezetime == 0 && level7 != 1 && level7 != 5 && level7 != 5.5) {
            plane.moveRight = true;
        } else {
            plane.moveRight = false;
        }
    }

    function endMoveRight() {
        plane.moveRight = false;
    }

    function shoot() {
        if (freezetime == 0 && level7 != 1 && level7 != 5 && level7 != 5.5) {
            plane.shooting = true;
        } else {
            plane.shooting = false;
        }
    }

    function missile() {
        if (missileTime === 0 && planes[selectedPlane].id === 'zxiFighter' && level7 != 1 && level7 != 5 && level7 != 5.5) {
            missileButton.style.display = 'none';
            missileTime = timePassed + 20;
            missileButtonPressed = true;
        } else {
            missileButtonPressed = false;
        }
    }

    function createshooter() {
        if (shooterTime === 0 && planes[selectedPlane].id === 'heavyDuty' && level7 != 1 && level7 != 5 && level7 != 5.5) {
            shooterButton.style.display = 'none';
            shooterTime = timePassed + 20;
            shooterButtonPressed = true;
        } else {
            shooterButtonPressed = false;
        }
    }

    function stun() {
        if (stunTime === 0 && planes[selectedPlane].id === 'fairyplane' && level7 != 1 && level7 != 5 && level7 != 5.5) {
            stunButton.style.display = 'none';
            stunTime = timePassed + 20;
            stunButtonPressed = true;
        } else {
            stunButtonPressed = false;
        }
    }

    // Add event listeners for keyboard controls
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    let spacebarPressed = false;

    // Add event listeners for keyboard controls
    document.addEventListener('mouseup', handleTouchEnd);
    document.addEventListener('touchend', handleTouchEnd);

    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            startMoveLeft();
            keyboard.left = true;
        } else if (event.key === 'ArrowRight') {
            startMoveRight();
            keyboard.right = true;
        } else if (event.key === ' ' && !spacebarPressed) { // Spacebar for firing
            shoot();
            spacebarPressed = true;
        } else if (event.key === 'ArrowUp') {
            missile();
            createshooter();
            stun();
        }
    }

    function handleTouchEnd(event) {
        event.stopPropagation();
        endMoveLeft();
        endMoveRight();
    }

    document.getElementById('leftButton').addEventListener('touchend', handleTouchEnd, false);
    document.getElementById('leftButton').addEventListener('mouseup', handleTouchEnd, false);

    document.getElementById('rightButton').addEventListener('touchend', handleTouchEnd, false);
    document.getElementById('rightButton').addEventListener('mouseup', handleTouchEnd, false);

    function handleKeyUp(event) {
        if (event.key === 'ArrowLeft') {
            endMoveLeft();
            keyboard.left = false;
        } else if (event.key === 'ArrowRight') {
            endMoveRight();
            keyboard.right = false;
        } else if (event.key === ' ') {
            spacebarPressed = false;
        }
    } document.getElementById('leftButton').addEventListener('touchcancel', function(event) {
        event.stopPropagation();
        endMoveLeft();
    }, false);

    document.getElementById('rightButton').addEventListener('touchcancel', function(event) {
        event.stopPropagation();
        endMoveRight();
    }, false);

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
                    speed: 1,
                    type: 'asteroidd'
                };
                asteroids.push(asteroidd);
            } function createbossAsteroid(){
                let asteroidd = {
                    x: canvas.width > canvas.height? Math.random() * canvas.width/2: 0,
                    y: canvas.width > canvas.height? -40: Math.random() * canvas.height/2.7,
                    width: 60,
                    height: 60,
                    speed: 5,
                    type: 'asteroidd'
                };
                asteroids.push(asteroidd);
            }function createPlanet(){
                let planet = {
                    x: -190*(canvas.width > canvas.height? 1: 2),
                    y: -40,
                    width: 2000,
                    height: 2000,
                    type: 'planet'
                }; planets.push(planet);
            } function createplanes(k){
                if(k == 1){
                    let spacex = {
                        x: canvas.width/2,
                        y: -500,
                        width: 400,
                        height: 400,
                        type: 'station'
                    }; 
                    endplanes.push(spacex);
                } else{
                    let planex = {
                        x: canvas.width*(2*endplanes.length+7)/20,
                        y: -100,
                        width: 110,
                        height: 100,
                        type: 'plane'
                    }; 
                    endplanes.push(planex);
                }
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
                    state: 0,
                    damagetime: 0
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
                    state: 0,
                    damagetime: 0
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
                    state: 0,
                    damagetime: 0
                };
                blueArcs.push(blueArc);
            } function createsemiboss(){
                let semiboss = {
                    x: canvas.width*(2*semibosses.length+1)/6 - 85,
                    y: -160,
                    width: 170,
                    height: 140,
                    bullets: [],
                    health: 300, // takes 300 bullets to destroy
                    type: 'semiBoss',
                    state: 0,
                    special: 0,
                    damagetime: 0
                };
                semibosses.push(semiboss);
            } function createfirstboss(){
                let firstboss = {
                    x: canvas.width/2 - 85,
                    y: -160,
                    width: 170,
                    height: 140,
                    bullets: [],
                    health: 300, // takes 300 bullets to destroy
                    type: 'firstBoss',
                    special: false,
                    state: 0,
                    unreg: 0,
                    timeState: 0,
                    move: '', //'' means not moving, l means left, r means right, c means center
                    damagetime: 0
                };
                firstbosses.push(firstboss);
            } function createlastboss(){
                let lastboss = {
                    x: canvas.width*(2*lastbosses.length+1)/6 -100,
                    y: -160,
                    width: 200,
                    height: 155,
                    bullets: [],
                    health: 300, // takes 300 bullets to destroy
                    type: 'lastBoss',
                    state: 0,
                    invisibility: false,
                    damagetime: 0
                };
                lastbosses.push(lastboss);
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
                    misteffect: 0,
                    type: 'defender',
                    damagetime: 0
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
                    type: 'bossFinal',
                    state: 0,
                    damagetime: 0
                };
                finalboss.push(bossfinal);
            } 
            
            function createDemoBoss(a=(canvas.width / 2),b=-200){
                let bossinitially = {
                    x: a - 100,
                    y: b,
                    width: 200,
                    height: 200,
                    type: 'bossdemo'
                }; bossdemo.push(bossinitially);
            }

            function createExplosion(x, y) {
                if(win == 0){
                    exploding.currentTime = 0.5;
                    exploding.play();
                }
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

        //Add logic for below ones especially for defender, finalboss
        semibosses.forEach(semiboss => {
            if ( x + explosionRadius > semiboss.x&& x - explosionRadius < semiboss.x + semiboss.width &&
            y + explosionRadius > semiboss.y && y - explosionRadius < semiboss.y + semiboss.height){
                semiboss.state = timePassed + 7;
                f = true;
            }
        }); lastbosses.forEach(lastboss => {
            if ( x + explosionRadius > lastboss.x && x - explosionRadius < lastboss.x + lastboss.width &&
            y + explosionRadius > lastboss.y && y - explosionRadius < lastboss.y + lastboss.height){
                lastboss.state = timePassed + 7;
                f = true;
                quartboss.src = "quartboss.png"
            }
        }); if (firstbosses.length != 0 &&  x + explosionRadius > firstbosses[0].x && x - explosionRadius < firstbosses[0].x + firstbosses[0].width &&
            y + explosionRadius > firstbosses[0].y && y - explosionRadius < firstbosses[0].y + firstbosses[0].height){
                firstbosses[0].state = timePassed + 7;
                f = true;
            }
        finalboss.forEach(bossfinal => {
                if ( x + explosionRadius > bossfinal.x && x - explosionRadius < bossfinal.x + bossfinal.width &&
                y + explosionRadius > bossfinal.y && y - explosionRadius < bossfinal.y + bossfinal.height){
                    bossfinal.state = timePassed + 7;
                    f = true;
                }
            });
            defenders.forEach(defender => {
                if ( x + explosionRadius > defender.x&& x - explosionRadius < defender.x + defender.width &&
                y + explosionRadius > defender.y && y - explosionRadius < defender.y + defender.height){
                    defender.misteffect = timePassed + 7;
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
                blueArc.damagetime = timePassed + 5;
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
                    bossfinal.damagetime = timePassed + 5;
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
        }); semibosses.forEach(semiboss => {
            if (level4 == 0.5 && x + explosionRadius > semiboss.x && x - explosionRadius < semiboss.x + semiboss.width &&
                y + explosionRadius > semiboss.y && y - explosionRadius < semiboss.y + semiboss.height){
                    semiboss.damagetime = timePassed + 5;                    
                    semiboss.health -= 20;
                    createExplosion(x, y);
                    if(semiboss.health <= 0){
                        createExplosion(semiboss.x, semiboss.y);
                        semibosses.splice(semibosses.indexOf(semiboss), 1);
                        score += 2000; // Increase score for destroying an alien plane
                        if (score > highScore) {
                            highScore = score; // Update high score
                            localStorage.setItem('highScore', highScore); // Store high score in local storage
                        }
                    }
            }
        }); bossdemo.forEach(bossfinal => {
            if (x + explosionRadius > bossfinal.x && x - explosionRadius < bossfinal.x + bossfinal.width &&
                y + explosionRadius > bossfinal.y && y - explosionRadius < bossfinal.y + bossfinal.height){
                    createExplosion(x, y);
                } 
        }); firstbosses.forEach(firstboss=>{
            if (level2 == 0.5 && x + explosionRadius > firstboss.x && x - explosionRadius < firstboss.x + firstboss.width &&
                y + explosionRadius > firstboss.y && y - explosionRadius < firstboss.y + firstboss.height){
                    if(firstboss.move == '') firstboss.unreg += 20;
                    firstboss.damagetime = timePassed + 5;
                    firstboss.health -= 20;
                    createExplosion(x, y);
            } firstboss.bullets.forEach(bullet => {
                if (x + explosionRadius > bullet.x && x - explosionRadius < bullet.x + bullet.width &&
                y + explosionRadius > bullet.y && y - explosionRadius < bullet.y + bullet.height){
                    createExplosion(x, y);
                    firstboss.bullets.splice(firstboss.bullets.indexOf(bullet), 1);
                    score += 20; // Increase score for destroying an alien plane
                    if (score > highScore) {
                        highScore = score; // Update high score
                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                    }
            }  });
        }); lastbosses.forEach(lastboss=>{
            if (level6 == 0.5 && x + explosionRadius> lastboss.x && x - explosionRadius < lastboss.x + lastboss.width &&
                y + explosionRadius > lastboss.y && y - explosionRadius < lastboss.y + lastboss.height){
                    lastboss.damagetime = timePassed + 5;
                    lastboss.health -= 20;
                    createExplosion(x, y);
                    lastboss.invisibility = false;
                    if(lastboss.health <= 0 && lastbosses.length > 1){
                        createExplosion(lastboss.x, lastboss.y);
                        lastbosses.splice(lastbosses.indexOf(lastboss), 1);
                        score += 3000; // Increase score for destroying an alien plane
                        if (score > highScore) {
                            highScore = score; // Update high score
                            localStorage.setItem('highScore', highScore); // Store high score in local storage
                        }
                    }
            }
        });

        defenders.forEach(defender => {
            if (x + explosionRadius > defender.x && x - explosionRadius < defender.x + defender.width &&
            y + explosionRadius > defender.y && y - explosionRadius < defender.y + defender.height){
                defender.health -= 20;
                defender.damagetime = timePassed + 5;
                if(defender.health <= 0){
                    defender.state = true;
                }
            }
        }); 
    }

            let stars = [];
            let props = [];
            
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
    } function createProp(propnum){
        let prop = {
            x: Math.random() < 0.5
                    ? (Math.random() * (canvas.width / 2) - ((propnum%3)+4)*40)
                    : canvas.width - Math.random() * (canvas.width / 2 - 60),
                    y: -400,
            image: propimages[propnum%3],
            width: ((propnum%3)+4)*80,
            height: ((propnum%3)+4)*80
        };
        props.push(prop);
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
    let y1 = 0;
    let y2 = -canvas.height;
    let speed = 2; // Speed of the scrolling
    let durations = [0,80,110,130,145,160,150,120];
    
            let timedisplay = durations[level];
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
            // Move the images


            ctx.drawImage(img1, 0, y1, canvas.width, canvas.height);
            ctx.drawImage(img2, 0, y2, canvas.width, canvas.height);

            stars.forEach(star => {
                ctx.fillRect(star.x, star.y, star.size, star.size);
                if(gameRunning && level7 != 1  && level7 != 5 && level7 != 5.5){
                    star.y += star.speed; // Move stars downwards
                }
                if (star.y > canvas.height && level7 != 1  && level7 != 5 && level7 != 5.5) {
                    star.y = 0; // Reset star position when it goes below canvas
                    star.x = Math.random() * canvas.width; // Randomize x position
                }
        }); props.forEach(prop=>{
            ctx.drawImage(prop.image, prop.x, prop.y, prop.width, prop.height);
        });
            boss.forEach(bossinitial => {
                ctx.drawImage(bossinitialImage, bossinitial.x, bossinitial.y, bossinitial.width, bossinitial.height);
            });
        
        planets.forEach(planet => {
                    ctx.drawImage(planetImage, planet.x, planet.y - planet.height, planet.width, planet.height);
                });

                coins.forEach(coin => {
            if(coin.value == 30) ctx.drawImage(gcoin, coin.x, coin.y, coin.width, coin.height);
            else ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);
        }); 
        hearts.forEach(heart => {
            ctx.drawImage(heartImage, heart.x, heart.y, heart.width,heart.height);
        });
        
        endplanes.forEach(plane => {
            if(plane.type === 'station')
                ctx.drawImage(spacestation, plane.x, plane.y, plane.width, plane.height);
            else
            ctx.drawImage(finalplanes, plane.x, plane.y, plane.width, plane.height);
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
                
                ctx.fillStyle = 'red';
                finalboss.forEach(bossfinal => {
                    bossfinal.rockets.forEach(rocket => {
                        ctx.drawImage(rocketImage, rocket.x, rocket.y, rocket.width, rocket.height);
                    }); bossfinal.flares.forEach(flare => {
                        ctx.drawImage(bluebulettImage, flare.x, flare.y, flare.width, flare.height);
                    }); ctx.drawImage(bossfinalImage, bossfinal.x, bossfinal.y, bossfinal.width, bossfinal.height);
                    
                    if(bossfinal.damagetime > timePassed) ctx.fillRect(bossfinal.x+bossfinal.width/3, bossfinal.y+bossfinal.height/3, bossfinal.width*bossfinal.health/1000, bossfinal.height/32);
                });

                semibosses.forEach(semiboss => {
                    ctx.drawImage(semibossImage, semiboss.x, semiboss.y, semiboss.width, semiboss.height);
                    semiboss.bullets.forEach(bullet => {
                        ctx.drawImage(semibullet, bullet.x, bullet.y - 10, 30, 30);
                    }); if(semiboss.damagetime > timePassed) ctx.fillRect(semiboss.x+semiboss.width/3, semiboss.y+semiboss.height/3, semiboss.width*semiboss.health/600, semiboss.height/32);
                }); 
                bossdemo.forEach(boss=>{
                    ctx.drawImage(bossfinalImage,boss.x,boss.y,boss.width,boss.height);
                });
                lastbosses.forEach(lastboss => {
                    ctx.drawImage(quartboss, lastboss.x, lastboss.y, lastboss.width, lastboss.height);
                    lastboss.bullets.forEach(bullet => {
                        ctx.fillStyle = bullet.color;
                        // Drawing a circle instead of a rectangle
                        ctx.beginPath();  // Begin a new path for the circle
                        ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);  // Draw a circle (x, y, radius, start angle, end angle)
                        ctx.fill();  // Fill the circle with the chosen color
                    }); 
                    ctx.fillStyle = 'red'; if(lastboss.damagetime > timePassed) ctx.fillRect(lastboss.x+lastboss.width/3, lastboss.y+lastboss.height/3, lastboss.width*lastboss.health/600, lastboss.height/32);
                }); 
                ctx.fillStyle = 'red';
                if(firstbosses.length > 0){
                    ctx.drawImage(initialboss, firstbosses[0].x, firstbosses[0].y, firstbosses[0].width, firstbosses[0].height);
                    firstbosses[0].bullets.forEach(bullet => {
                        ctx.drawImage(firstbullet, bullet.x - 20, bullet.y - 20, bullet.height, bullet.width);
                    }); if(firstbosses[0].damagetime > timePassed) ctx.fillRect(firstbosses[0].x+firstbosses[0].width/3, firstbosses[0].y+firstbosses[0].height/3, firstbosses[0].width*firstbosses[0].health/600, firstbosses[0].height/32);
                }

                asteroids.forEach(asteroidd => {
                    ctx.drawImage(asteroidImage, asteroidd.x, asteroidd.y, asteroidd.width, asteroidd.height);
                });

                massexplosions.forEach(massExplode => {
                    ctx.drawImage(massExplosion, massExplode.x, massExplode.y, massExplode.width, massExplode.height);
                });

                
                // Draw plane
                ctx.drawImage(planeImage, plane.x, plane.y, plane.width, plane.height);

                if (immunityActive) {
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
                        ctx.fillRect(bullet.x, bullet.y, 3, 10);
                    }); if(alienPlane.damagetime > timePassed) ctx.fillRect(alienPlane.x+alienPlane.width/3, alienPlane.y+alienPlane.height/3, alienPlane.width*alienPlane.health/10, alienPlane.height/16);
                });

                // Draw alien advanced planes
                advancedAliens.forEach(advancedallie => {
                    ctx.drawImage(advancedAlienImage, advancedallie.x, advancedallie.y, advancedallie.width, advancedallie.height);
                    // Draw bullets for alien plane
                    advancedallie.bullets.forEach(bullet => {
                        ctx.drawImage(bulletImage, bullet.x - 10, bullet.y - 20, 17, 95);
                    }); if(advancedallie.damagetime > timePassed) ctx.fillRect(advancedallie.x+advancedallie.width/3, advancedallie.y+advancedallie.height/3, advancedallie.width*advancedallie.health/20, advancedallie.height/16);
                }); 

                blueArcs.forEach(blueArc => {
                    ctx.drawImage(BlueArcImage, blueArc.x, blueArc.y, blueArc.width, blueArc.height);
                    // Draw bullets for alien plane
                    blueArc.bullets.forEach(bullet => {
                        ctx.drawImage(blueflare, bullet.x - 20, bullet.y - 20, 30, 30);
                    }); if(blueArc.damagetime > timePassed) ctx.fillRect(blueArc.x+blueArc.width/3, blueArc.y+blueArc.height/3, blueArc.width*blueArc.health/40, blueArc.height/16);
                }); 

                defenders.forEach(defender => {
                    ctx.drawImage(defenderImage, defender.x, defender.y, defender.width, defender.height);
                    if(defender.damagetime > timePassed) ctx.fillRect(defender.x+defender.width/3, defender.y+defender.height/3, defender.width*defender.health/70, defender.height/16);
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
                        ctx.fillStyle = '#C7A0D4';
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
                ctx.fillText('Time: ' + (timedisplay).toFixed(2), canvas.width - 100, 30);

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
                let statex = false;
                if(gameTime < timePassed){
                    gameTime = timePassed + 0.01;
                    statex = true;
                }
                let currentTime = Date.now();
                let deltaTime = (currentTime - lastTime) / 1000; // deltaTime in seconds
                lastTime = currentTime;
                timePassed += deltaTime;
                if(level == 0 || level7 >= 2 || level4 >= 0.25 || level2 >= 0.25 || level6 >= 0.25){
                    timedisplay = timePassed;
                }
                else if(timePassed <= durations[level]){
                    timedisplay = durations[level] - timePassed;
                } else{
                    timedisplay = 0.00;
                }
                
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

    if(freezetime <= timePassed || immunityActive){
        freezetime = 0;
        planeImage.src = planes[selectedPlane].imgSrc;
    } if(slowtime <= timePassed || immunityActive){
        slowtime = 0;
        plane.speed = 4;
    } 

    let immunityTimeRemaining = immunityEndTime - Date.now();
        if (immunityActive && immunityTimeRemaining > 0) {
            // Update timer display
            let secondsRemaining = Math.ceil(immunityTimeRemaining / 1000);
            let millisecondsRemaining = Math.ceil((immunityTimeRemaining % 1000) / 10);
            timerDisplay.textContent = `${secondsRemaining.toString().padStart(2, '0')}.${millisecondsRemaining.toString().padStart(2, '0')}`;
            // Calculate color
            let percentageLeft = 1 - (immunityTimeRemaining / (10000));
            // Define hue range from purple to red
        let startHue = 270; // Purple hue
        let endHue = 0;     // Red hue

        // Calculate transition hue value
        let transitionHue = startHue + (endHue - startHue) * (percentageLeft);

        // Convert hue to RGB
        let h = transitionHue % 360; // Hue angle
        let s = 1; // Full saturation
        let l = 0.5; // Lightness

        // HSL to RGB conversion
        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c * (1 - Math.abs((h / 60) % 2 - 1));
        let m = l - c / 2;

        let r1, g1, b1;
        if (0 <= h && h < 60) {
            r1 = c; g1 = x; b1 = 0;
        } else if (60 <= h && h < 120) {
            r1 = x; g1 = c; b1 = 0;
        } else if (120 <= h && h < 180) {
            r1 = 0; g1 = c; b1 = x;
        } else if (180 <= h && h < 240) {
            r1 = 0; g1 = x; b1 = c;
        } else if (240 <= h && h < 300) {
            r1 = x; g1 = 0; b1 = c;
        } else if (300 <= h && h < 360) {
            r1 = c; g1 = 0; b1 = x;
        }

        let r = Math.floor((r1 + m) * 255);
        let g = Math.floor((g1 + m) * 255);
        let b = Math.floor((b1 + m) * 255); 

        let timerColor = `rgb(${r},${g},${b})`;
        
        // Apply the color to the timer display
        timerDisplay.style.color = timerColor;

        } else {
            timerDisplay.textContent = ''; // Hide timer if immunity is not active
        }        
        
        if(statex){
            if(level7 != 1  && level7 != 5 && level7 != 5.5){
                y1 += speed/1.5;
                y2 += speed/1.5;
            
                // Reset position if the image moves off screen
                if (y1 >= canvas.height) {
                    y1 = y2 - canvas.height;
                }
                if (y2 >= canvas.height) {
                    y2 = y1 - canvas.height;
                } let propfull = false;
                props.forEach(prop => {
                    prop.y+=speed/1.5;
                    if(prop.y > canvas.height){
                        props.splice(props.indexOf(prop),1);
                    } if(prop.y < 2*canvas.height/3){
                        propfull = true;
                    }
                }); 
                if(level7 < 2 && !propfull && planets.length == 0){
                    let propno = parseInt(Math.random()*100000);
                    if(propno < 200){
                        createProp(propno);
                    }
                }
            } 
            function updatePlaneMovement() {
            if (isLeftButtonPressed && freezetime == 0) {
                plane.moveLeft = true;
                plane.moveRight = false;
            } else if (keyboard.left && freezetime == 0) {
                plane.moveLeft = true;
                plane.moveRight = false;
            } else {
                plane.moveLeft = false;
            } 
            
            if (isRightButtonPressed && freezetime == 0) {
                plane.moveRight = true;
                plane.moveLeft = false;
            } else if (keyboard.right && freezetime == 0) {
                plane.moveRight = true;
                plane.moveLeft = false;
            } else {
                plane.moveRight = false;
            }
        } updatePlaneMovement();
            // Call the updatePlaneMovement function repeatedly to update the plane movement
            setInterval(updatePlaneMovement, 16); // 16ms = 60fps

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
                    totalCoins += coin.value;
                    localStorage.setItem('totalCoins', totalCoins);
                    coins.splice(coins.indexOf(coin), 1); // Remove collected coin
                }
            }); hearts.forEach(heart => {
                heart.y += 2; // Adjust speed as needed
                if (heart.y > canvas.height) {
                    hearts.splice(hearts.indexOf(heart), 1); // Remove coins that are out of canvas 
                }
                // Check collision with player's plane
                if (heart.x < plane.x + plane.width &&
                    heart.x + heart.width > plane.x &&
                    heart.y < plane.y + plane.height &&
                    heart.y + heart.height > plane.y) {
                    // When a coin is collected
                    currenthealth ++;
                    hearts.splice(hearts.indexOf(heart), 1); // Remove collected coin
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
                bubble.y = canvas.height - 100;
                bubble.x = plane.x;
                bubble.width = plane.width;
                bubble.height = plane.height;
                immunityEndTime = Date.now() + (10000); // Set immunity end time
                immunityPill = null; // Remove collected immunity pill
            }
        } else if(level7 >= 1){
            immunityPill = null;
        }

    // Check if immunity has expired
        if ((immunityActive && Date.now() > immunityEndTime)||level7>=1) {
            immunityActive = false;
            bubble.y = canvas.height + 100;
        }

        // Create new coins and immunity pill
        if (Math.random() < 0.001  && level7 < 5) { // Adjust spawn rates as needed
            createCoin();
        } if (Math.random() < 0.0002*((planes[selectedPlane].health-currenthealth)/planes[selectedPlane].health)  && level7 < 5) { // Adjust spawn rates as needed
            createHeart();
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
                    asteroidd.y += 2*asteroidd.speed; // Asteroid falling speed
                    asteroidd.x += 2*asteroidd.speed;
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
            if(timePassed > 145 && level == 4 && advancedAliens.length <= 0){
                alienPlane.y -= 1.2; 
                if(music && level4 < 0.25){
                    towardsuranus.pause();
                    towardsuranus.currentTime = 0;                              
                    semibossmusic.play();
                    level4 = 0.25;
                    currentAudio = semibossmusic;
                }
            } else if(timePassed > 110 && level == 2){
                alienPlane.y -= 1.2; 
                if(music && level2 < 0.25){
                    towardsjupiter.pause();
                    towardsjupiter.currentTime = 0;                              
                    jupiterboss.play();
                    level2 = 0.25;
                    currentAudio = jupiterboss;
                }
            } else if(timePassed > 150 && level == 6 && advancedAliens.length <= 0){
                alienPlane.y -= 1.2; 
                if(music && level6 < 0.25){
                    towardspluto.pause();
                    towardspluto.currentTime = 0;                              
                    plutoboss.play();
                    level6 = 0.25;
                    currentAudio = plutoboss;
                }
            } 
            else if (alienPlane.y < stopY && level7 != 5 && level7 != 5.5) {
                alienPlane.y += 0.7; // Adjust the speed if needed
            }
                    if (alienPlane.y > canvas.height || (timePassed > 145 && level == 4 && (alienPlane.y <= -alienPlane.height))
                        || (timePassed > 110 && level == 2 && (alienPlane.y <= -alienPlane.height)) || (timePassed > 150 && level == 6 && (alienPlane.y <= -alienPlane.height))) {
                        alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1); // Remove alien planes that are out of canvas
                    } if(level7 == 5.5){   
                        alienPlanes.splice(alienPlanes.indexOf(alienPlane), 1);
                        createExplosion(alienPlane.x, alienPlane.y);
                    }
                    // Alien plane shooting bullets
                    if (Math.random() < 0.005 && alienPlane.state < timePassed) {
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
                    if (Math.random() < 0.005 && alienPlane.state < timePassed) {
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
            let semiheight = 0;
            let midsemi = 0;
            let semispecial = false;
            let choice = 0;
            let semiindex = 0;
            semibosses.forEach(semiboss=>{
                if(semiboss.health < 150) choice++; 
                semiindex++;                
                if(semiboss.special + 10 >= timePassed) semiindex*=10;
            });
            if(semiindex !=0) choice = (semiindex - semiindex%10)/10;
            else choice = Math.random()*choice;
            if(semibosses.length == 0 && level4 >= 0.5){
                choice = -1;
            }
            semibosses.forEach(semiboss =>{
                const stopY = 50; // Adjust this value to your desired threshold
                if (semiboss.y < stopY || ((semiboss.x + 85> canvas.width/2 -2 && semiboss.x + 85< canvas.width/2 + 2) && semiboss.y < canvas.height/3.5)) { 
                    semiboss.y += 1.5; // Adjust the speed if needed
                    
                } else {
                    if(level4 < 0.5 && bossdemo.length < 1) createDemoBoss();
                    if(level4 < 0.5 && (semiboss.x + 85> canvas.width/2 -2 && semiboss.x + 85< canvas.width/2 + 2) && bossdemo[0].y + bossdemo[0].height + 10< semiboss.y) bossdemo[0].y += 1.5;
                    else{
                        semiheight++;
                        if (semiboss.special <= timePassed && Math.random() < 0.002 && semiboss.state < timePassed) {
                            if(canvas.width>canvas.height){
                                semiboss.bullets.push({
                                    x: semiboss.x + semiboss.width / 3,
                                    y: semiboss.y + semiboss.height
                                });
                                semiboss.bullets.push({
                                    x: semiboss.x + 2*semiboss.width / 3,
                                    y: semiboss.y + semiboss.height
                                });
                            } else{
                                if(Math.random()>0.5) semiboss.bullets.push({
                                    x: semiboss.x + semiboss.width / 2,
                                    y: semiboss.y + semiboss.height
                                });
                            }
                            
                        }
                    }
                }
                if((semiboss.x + 85 < canvas.width/2 -2 || semiboss.x + 85> canvas.width/2 + 2) && semiboss.special < timePassed) midsemi++;
                if(midsemi == semibosses.length){
                    const targetX = canvas.width / 2 - 85; // Target X is the canvas center
                    const targetY = canvas.height / 3.5; // Target Y is the threshold

                    const distanceX = targetX - semiboss.x; // Horizontal distance to target
                    const distanceY = targetY - semiboss.y; // Vertical distance to target
                    const totalDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2); // Total distance using Pythagoras

                    const speed = 1.7; // Desired constant speed (adjust as needed)

                    // Calculate proportional speeds for x and y
                    const xSpeed = (distanceX / totalDistance) * speed;
                    const ySpeed = (distanceY / totalDistance) * speed;

                    if (totalDistance > 1) { // Move only if not at the target
                        semiboss.x += xSpeed; 
                        semiboss.y += ySpeed; 
                    }


                } 
                if(semiboss.health < 150 && !semispecial && semiboss.special + 10<= timePassed){
                    if(choice > 1) choice --;
                    else semiboss.special = timePassed + 10;
                }
                if(semiboss.special >= timePassed && !semispecial) {
                    semispecial = true;
                    
                    if(semiboss.special - timePassed > 5 && semiboss.y < 1.5*canvas.height/3) semiboss.y+=2.2;
                    else{
                        if (Math.random() < 0.05) {
                            for(let i = 1; i<=7; i++){
                                semiboss.bullets.push({
                                    x: semiboss.x + i*semiboss.width / 8, 
                                    y: semiboss.y + 0.7*semiboss.height,
                                    move: i - 4
                                });
                            } 
                        } 
                        let h = canvas.width > canvas.height ? 1 : 0.4;
                        semiboss.bullets.forEach(bullet=>{
                            bullet.x += 0.66*h*2*bullet.move/4;
                            bullet.y += 2;
                        })
                    };
                } else if((semiboss.y > canvas.height/3.5 || (!(semiboss.x + 85> canvas.width/2 -2 && semiboss.x + 85< canvas.width/2 + 2) && semiboss.y > stopY)) && semiboss.special < timePassed && semiboss.special + 10 > timePassed){
                    semiboss.y -= 1; // Adjust the speed if needed
                } semiboss.bullets.forEach(bullet => {
                    if (bullet.y > canvas.height) {
                        semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                    } 
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        // stalling logic
                        semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                        
                        createExplosion(bullet.x, bullet.y);
                        if(planes[selectedPlane].id != 'zxiFighter'){
                            freezetime = timePassed + 3;
                            frozen.currentTime = 0;
                            frozen.play();
                            planeImage.src = planes[selectedPlane].freezed;
                        }
                        if(currenthealth > 1){
                            semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                    
                    bullet.y += 2;
                });
                
            }); if(choice == -1 && bossdemo.length > 0 &&level == 4){
                bossdemo[0].y-=0.5;
                if(bossdemo[0].y < -bossdemo[0].height) bossdemo.splice(0,1);
            }
            if(lastbosses.length == 1 && lastbosses[0].health <= 0){
                lastbosses[0].invisbility = false;
                let enlarge = lastbosses[0].width >= 200 && lastbosses[0].height >= 200;
                if(enlarge){ //bossdemo logic
                    if(bossdemo.length == 0){
                        createDemoBoss(lastbosses[0].x,lastbosses[0].y);
                        bossdemo[0].y = lastbosses[0].y;
                        lastbosses.splice(0, 1);
                    }
                } else{
                    // Interpolate width
                    if(lastbosses[0].width < 200) lastbosses[0].width += 1/2;
                    // Interpolate height
                    if(lastbosses[0].height < 200) lastbosses[0].height += 1/2;
                }
            } if(bossdemo.length == 1 && level == 6){
                bossdemo[0].y --;
                if(bossdemo[0].y < -bossdemo[0].height) bossdemo.splice(0,1);
            }
            lastbosses.forEach(semiboss =>{
                const stopY = 50; // Adjust this value to your desired threshold
                if (level6 < 0.5 && semiboss.y < stopY) {
                    semiboss.y += 1.5; // Adjust the speed if needed
                } else if(level6 < 0.5){
                    semiheight++;
                }
                else{
                    if (!(lastbosses.length == 1 && lastbosses[0].health <= 0) && Math.random() < 0.005 && semiboss.state < timePassed) {
                        function generateRandomColor() {
                            // List of predefined colors
                            const colors = [
                                "lime", "cyan", "darkblue", "purple", "red", 
                                "white", "yellow", "orange", "darkgreen", "violet", "indigo"
                            ];
                            
                            // Select a random color from the array
                            let randomIndex = Math.floor(Math.random() * colors.length);
                            return colors[randomIndex];
                        }
                        
                        let randomColor = generateRandomColor();
                        
                        if(canvas.width < canvas.height && Math.random() > 0.5) {
                            semiboss.bullets.push({
                                x: semiboss.x + semiboss.width / 2,
                                y: semiboss.y + semiboss.height,
                                color: randomColor, // Dynamic color for the bullet
                            });
                        } else{
                            semiboss.bullets.push({
                                x: semiboss.x + semiboss.width / 3,
                                y: semiboss.y + semiboss.height,
                                color: randomColor, // Dynamic color for the bullet
                            });
                        
                            semiboss.bullets.push({
                                x: semiboss.x + 2*semiboss.width / 3,
                                y: semiboss.y + semiboss.height,
                                color: randomColor, // Dynamic color for the bullet
                            });
                        }
                    }
                } //have an if condition to check if invisbility is false but src is different from the actual source
                if(!semiboss.invisibility && quartboss.src != "quartboss.png"){
                    quartboss.src = "quartboss.png";
                }
                if(!(lastbosses.length == 1 && lastbosses[0].health <= 0) && lastbosses.length == 1 && Math.random() < 0.1 && timePassed%5 > 3 && !semiboss.invisibility){
                    semiboss.invisibility = true;
                    quartboss.src = "";
                    let randompos = Math.random() > 0.5? 0: 1;
                    if(semiboss.x + 100== canvas.width/6){
                        semiboss.x = [canvas.width/2-100,canvas.width*(5)/6-100][randompos];
                    } else if(semiboss.x + 100== canvas.width/2){
                        semiboss.x = [canvas.width/6-100,canvas.width*(5)/6-100][randompos];
                    } else{
                        semiboss.x = [canvas.width/6-100,canvas.width/2-100][randompos];
                    }
                }
                semiboss.bullets.forEach(bullet => {
                    
                    function generateRandomColor() {
                        // List of predefined colors
                        const colors = [
                            "lime", "cyan", "darkblue", "purple", "red", 
                            "white", "yellow", "orange", "darkgreen", "violet", "indigo"
                        ];
                        
                        // Select a random color from the array
                        let randomIndex = Math.floor(Math.random() * colors.length);
                        return colors[randomIndex];
                    }
                    
                    let randomColor = generateRandomColor();
                    
                    bullet.color = randomColor;
                    
                    if (bullet.y > canvas.height) {
                        semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                    } 
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        // stalling logic
                        semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                        
                        createExplosion(bullet.x, bullet.y);
                        
                        plane.speed = 1;
                        slowtime = timePassed + 6;

                        if(currenthealth > 1){
                            semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                    bullet.y += Math.random()*5;
                    bullet.x += Math.random()*4-2; // Left movement
                    
                });
            }); firstbosses.forEach(semiboss =>{
                const stopY = 50; // Adjust this value to your desired threshold
                if(semiboss.timeState === 0) semiboss.timeState = timePassed - 10;
                if(semiboss.health < 150 && (timePassed-semiboss.timeState) % 30 >= 20 && semiboss.move == ''){ //half of original health
                    if ((timePassed-semiboss.timeState) % 30 < 21) semiboss.special = true;
                    else if(semiboss.special && (timePassed-semiboss.timeState) % 30 < 26) semiboss.y -= 1.7;
                    else if(Math.random() < 0.5 && semiboss.special) createbossAsteroid();
                } else if(semiboss.health <= 0){
                    createExplosion(semiboss.x, semiboss.y);
                    firstbosses.splice(firstbosses.indexOf(semiboss), 1);
                    score += 1000; // Increase score for destroying an alien plane
                    if (score > highScore) {
                        highScore = score; // Update high score
                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                    }
                }
                else if (semiboss.y < stopY) {
                    semiboss.y += 1.7; // Adjust the speed if needed
                    semiboss.special = false;

                } else if(semiboss.move == 'l' && semiboss.x + 85> canvas.width/4){
                    semiboss.x--;
                } else if(semiboss.move == 'r' && semiboss.x + 85< 3*canvas.width/4){
                    semiboss.x++;
                } else if(semiboss.move == 'c' && semiboss.x + 85> canvas.width/2 + 2){
                    semiboss.x--;
                } else if(semiboss.move == 'c' && semiboss.x + 85< canvas.width/2 - 2){
                    semiboss.x++;
                } else{
                    if (Math.random() < 0.005 && semiboss.state < timePassed) {
                        semiboss.bullets.push({
                            x: semiboss.x + semiboss.width / 2,
                            y: semiboss.y + semiboss.height,
                            height: 30,
                            width: 30,
                            health: 1
                        });
                    } semiboss.move = '';           
                    if(semiboss.unreg >= 35){
                        semiboss.unreg = 0;
                        if(semiboss.x + 85<= canvas.width/4 || semiboss.x + 85>= 3*canvas.width/4) semiboss.move = 'c';
                        else if(Math.random() < 0.5) semiboss.move = 'l';
                        else semiboss.move = 'r';                        
                    }
                }
                if(firstbosses.length > 0) firstbosses[0].bullets.forEach(bullet => {
                    bullet.y += 2;
                    bullet.x -= 1;
                    bullet.width += 1;
                    bullet.height += 1;
                    if (bullet.y > canvas.height) {
                        firstbosses[0].bullets.splice(firstbosses[0].bullets.indexOf(bullet), 1);
                    } 
                    // Check collision with player's plane
                    if (!immunityActive && bullet.x > plane.x && bullet.x < plane.x + plane.width &&
                        bullet.y > plane.y && bullet.y < plane.y + plane.height) {
                        firstbosses[0].bullets.splice(firstbosses[0].bullets.indexOf(bullet), 1);
                        semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                        
                        createExplosion(bullet.x, bullet.y);
                        if(currenthealth > 1){
                            semiboss.bullets.splice(semiboss.bullets.indexOf(bullet), 1);
                            currenthealth--;
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                    } shooters.forEach(shooter =>{
                        if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width &&
                            bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                            createExplosion(shooter.x, shooter.y);
                            firstbosses[0].bullets.splice(firstbosses[0].bullets.indexOf(bullet), 1);
                            shooters.splice(shooters.indexOf(shooter),1);
                        }
                    });
                });
            }); 
            
            if(semiheight == 3 || (firstbosses.length > 0 && firstbosses[0].height >= 50)){
                level4 = 0.5;
                level2 = 0.5;
                level6 = 0.5;
            }
            blueArcs.forEach(blueArc => {
                    const stopY = 50; // Adjust this value to your desired threshold
                    if(timePassed > 150 && level == 6 && advancedAliens.length <= 0){
                        blueArc.y -= 1.2; 
                        if(music && level6 < 0.25){
                            towardspluto.pause();
                            towardspluto.currentTime = 0;                              
                            plutoboss.play();
                            level6 = 0.25;
                            currentAudio = plutoboss;
                        }
                    } 
                    else if (blueArc.y < stopY && level7 != 5 && level7 != 5.5) {
                        blueArc.y += 0.4; // Adjust the speed if needed
                    }
                    if (blueArc.y > canvas.height|| (timePassed > 150 && level == 6 && (blueArc.y <= -blueArc.height))) {
                        blueArcs.splice(blueArcs.indexOf(blueArc), 1); // Remove alien planes that are out of canvas
                    }
                    if(level7 == 5.5){   
                        blueArcs.splice(blueArcs.indexOf(blueArc), 1);
                        createExplosion(blueArc.x, blueArc.y);
                    }
                    // Alien plane shooting bullets
                    if (Math.random() < 0.004 && blueArc.state < timePassed) {
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
                                freezetime = timePassed + 3;
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
                    else if(defender.y >= plane.y || defender.misteffect >= timePassed && defender.health <= 0){
                        createExplosion(defender.x, defender.y);
                        defenders.splice(defenders.indexOf(defender), 1);
                        score += 400; // Increase score for destroying a defender
                        if (score > highScore) {
                            highScore = score; // Update high score
                            localStorage.setItem('highScore', highScore); // Store high score in local storage
                        }
                    } else if(defender.state && level7 != 5){
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
                    } if (bossfinal.missileTimer <= timePassed && level7 < 5 && bossfinal.state < timePassed) {
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
                    }); semibosses.forEach(semiboss => {
                        if (level4 == 0.5 && missile.x + 40> semiboss.x && missile.x < semiboss.x + semiboss.width &&
                            missile.y +20 > semiboss.y && missile.y - 20 < semiboss.y + semiboss.height) {
                            k = 1;
                            mx = missile.x;
                            my = missile.y;
                        }
                    }); lastbosses.forEach(lastboss => {
                        if (level6 == 0.5 && missile.x + 40> lastboss.x && missile.x < lastboss.x + lastboss.width &&
                            missile.y +20 > lastboss.y && missile.y - 20 < lastboss.y + lastboss.height) {
                            k = 1;
                            mx = missile.x;
                            my = missile.y;
                        }
                    }); 
                    if (level2 == 0.5 && firstbosses.length > 0 && missile.x + 40 > firstbosses[0].x && missile.x < firstbosses[0].x + firstbosses[0].width &&
                        missile.y +20 > firstbosses[0].y && missile.y - 20 < firstbosses[0].y + firstbosses[0].height) {
                        k = 1;
                        mx = missile.x;
                        my = missile.y;
                    } if(firstbosses.length > 0) firstbosses[0].bullets.forEach(bullet => {
                        if(missile.x + 40> bullet.x && missile.x < bullet.x + bullet.width &&
                            missile.y +20 > bullet.y && missile.y - 20 < bullet.y + bullet.height){
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
                    }); bossdemo.forEach(bossfinal=>{
                        if(checkBulletCollision(missile,bossfinal)){
                            k = 1;
                            mx = missile.x;
                            my = missile.y;
                        } 
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
                    bullet.y -= 5*(plane.speed/4);
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
                            alienPlane.damagetime = timePassed + 5;
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
                            alienPlane.damagetime = timePassed + 5;
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
                            blueArc.damagetime = timePassed + 5;
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

                    semibosses.forEach(semiboss => {
                        if(level4 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                            bullet.y > semiboss.y && bullet.y < semiboss.y + semiboss.height){
                            semiboss.damagetime = timePassed + 5;
                            semiboss.health -= planes[selectedPlane].damage;
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                            if(semiboss.health <= 0){
                                createExplosion(bullet.x, bullet.y);
                                semibosses.splice(semibosses.indexOf(semiboss), 1);
                                score += 2000; // Increase score for destroying a boss arc
                                if (score > highScore) {
                                    highScore = score; // Update high score
                                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                                }
                            }
                        }
                    });

                    lastbosses.forEach(semiboss => {
                        if(level6 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                            bullet.y > semiboss.y && bullet.y < semiboss.y + semiboss.height){
                            semiboss.health -= planes[selectedPlane].damage;
                            semiboss.damagetime = timePassed + 5;
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                            semiboss.invisibility = false;
                            if(semiboss.health <= 0 && lastbosses.length > 1){
                                createExplosion(bullet.x, bullet.y);
                                lastbosses.splice(lastbosses.indexOf(semiboss), 1);
                                score += 3000; // Increase score for destroying a blue arc
                                if (score > highScore) {
                                    highScore = score; // Update high score
                                    localStorage.setItem('highScore', highScore); // Store high score in local storage
                                }
                            }
                        }
                    });

                    firstbosses.forEach(semiboss => {
                        if(level2 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                            bullet.y > semiboss.y && bullet.y < semiboss.y + semiboss.height){
                            if(semiboss.move == '') semiboss.unreg += planes[selectedPlane].damage;
                            semiboss.damagetime = timePassed + 5;
                            semiboss.health -= planes[selectedPlane].damage;
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        } if(firstbosses.length > 0) firstbosses[0].bullets.forEach(bulletx => {
                            if (
                                bullet.x > bulletx.x && bullet.x < bulletx.x + bulletx.width &&
                                bullet.y > bulletx.y && bullet.y < bulletx.y + bulletx.height
                            ) {
                                // Remove the bullet from plane's bullets array
                                plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        
        
                    
                                // Apply the damage based on equipped plane's damage
                                bulletx.health -= planes[selectedPlane].damage * (30/bulletx.width);
                        
                                // Handle explosion and bullet removal if health drops below 0
                                if (bulletx.health <= 0) {
                                    createExplosion(bulletx.x, bulletx.y);
                                    firstbosses[0].bullets.splice(firstbosses[0].bullets.indexOf(bulletx), 1);
                        
                                    // Increase score
                                    score += 20;
                                    if (score > highScore) {
                                        highScore = score;
                                        localStorage.setItem('highScore', highScore);
                                    }
                                }
                            }
                        });
                        
                    });

                    defenders.forEach(defender => {
                        if(bullet.x > defender.x && bullet.x < defender.x + defender.width &&
                            bullet.y > defender.y && bullet.y < defender.y + defender.height){
                            defender.health -= planes[selectedPlane].damage;
                            defender.damagetime = timePassed + 5;
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                            if(defender.health <= 0){
                                defender.state = true;
                            }
                        }
                    }); finalboss.forEach(bossfinal =>{
                        if(checkBulletCollision(bullet, bossfinal)){
                            bossfinal.health -= planes[selectedPlane].damage;
                            bossfinal.damagetime = timePassed + 5;
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
                    }); bossdemo.forEach(bossfinal =>{
                        if(checkBulletCollision(bullet, bossfinal)){
                            plane.bullets.splice(plane.bullets.indexOf(bullet), 1);
                        }
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
                                alienPlane.damagetime = timePassed + 5;
                                alienPlane.health -= bullet.hit;
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
                                alienPlane.health -= bullet.hit;
                                advancedAliens.damagetime = timePassed + 5;
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
                                blueArc.health -= bullet.hit;
                                blueArc.damagetime = timePassed + 5;
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
                        semibosses.forEach(semiboss => {
                            if(level4 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                                bullet.y> semiboss.y && bullet.y < semiboss.y + semiboss.height){
                                semiboss.health -= bullet.hit;
                                semiboss.damagetime = timePassed + 5;
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                if(semiboss.health <= 0){
                                    createExplosion(bullet.x, bullet.y);
                                    semibosses.splice(semibosses.indexOf(semiboss), 1);
                                    score += 2000; // Increase score for destroying a blue arc
                                    if (score > highScore) {
                                        highScore = score; // Update high score
                                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                                    }
                                }
                            }
                        }); lastbosses.forEach(semiboss => {
                            if(level4 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                                bullet.y> semiboss.y && bullet.y < semiboss.y + semiboss.height){
                                semiboss.health -= bullet.hit;
                                semiboss.damagetime = timePassed + 5;
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                semiboss.invisibility = false;
                                if(semiboss.health <= 0 && lastbosses.length > 1){
                                    createExplosion(bullet.x, bullet.y);
                                    lastbosses.splice(lastbosses.indexOf(semiboss), 1);
                                    score += 3000; // Increase score for destroying a blue arc
                                    if (score > highScore) {
                                        highScore = score; // Update high score
                                        localStorage.setItem('highScore', highScore); // Store high score in local storage
                                    }
                                }
                            }
                        }); firstbosses.forEach(semiboss => {
                            if(level4 == 0.5 && bullet.x> semiboss.x && bullet.x < semiboss.x + semiboss.width &&
                                bullet.y> semiboss.y && bullet.y < semiboss.y + semiboss.height){
                                if(semiboss.move == '') semiboss.unreg += bullet.hit;
                                semiboss.damagetime = timePassed + 5;
                                semiboss.health -= bullet.hit;
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            } semiboss.bullets.forEach(bulletx =>{
                                if(bullet.x > bulletx.x && bullet.x < bulletx.x + bulletx.width &&
                                    bullet.y > bulletx.y && bullet.y < bulletx.y + bulletx.height){
                                    shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                    semiboss.bullets.splice(semiboss.bullets.indexOf(bulletx), 1);
                                    createExplosion(bulletx.x, bulletx.y);
                                }
                            });
                        });
                        defenders.forEach(defender => {
                            if(bullet.x > defender.x && bullet.x < defender.x + defender.width &&
                                bullet.y > defender.y && bullet.y < defender.y + defender.height){
                                defender.health -= bullet.hit;
                                defender.damagetime = timePassed + 5;
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                if(defender.health <= 0){
                                    defender.state = true;
                                }
                            }
                        });

                        finalboss.forEach(bossfinal =>{
                            if(checkBulletCollision(bullet, bossfinal)){
                                bossfinal.health -= bullet.hit;
                                bossfinal.damagetime = timePassed + 5;
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
                                    rocket.health -= bullet.hit;
                                    shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                                    if(rocket.health <= 0){
                                        bossfinal.rockets.splice(bossfinal.rockets.indexOf(rocket), 1);
                                        createExplosion(rocket.x, rocket.y);
                                    }
                                }
                            });
                        }); 
                        bossdemo.forEach(bossfinal =>{
                            if(checkBulletCollision(bullet, bossfinal)){
                                shooter.bullets.splice(shooter.bullets.indexOf(bullet), 1);
                            } 
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
    }); }

    if(((timePassed > 80 && level == 1) || (timePassed > 130 && level == 3) || (level2 > 1 && timePassed > level2) || (level4 > 1 && timePassed > level4) || (timePassed > 160 && level == 5)  || (level6 > 1 && timePassed > level6) || (level7 == 7 && level == 7))&&win == 0){ //timerwin 120 180 180 240 240 260 100+boss spaces
        win = 1;
        wins.currentTime = 0;
        endgame.currentTime = 0;
        if(music){
            if(level == 7){
                endgame.play();
                currentAudio = endgame;
            }else{
                wins.play();
                currentAudio = wins;  
            }
        }  
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
        semibossmusic.pause();
        semibossmusic.currentTime = 0;
        plutoboss.pause();
        plutoboss.currentTime = 0;
        jupiterboss.pause();
        jupiterboss.currentTime = 0;

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
                button.style.backgroundColor = 'green'; // give to green
            } else if(index == level + 1 && coloring[index] < 2){
                button.style.backgroundColor = 'blue'; // give to blue
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
                }); if(firstbosses.length > 0) firstbosses[0].bullets.forEach(bullet => {shooters.forEach(shooter =>{
                    if (shooter.x < bullet.x + bullet.width &&
                        shooter.x + shooter.width > bullet.x &&
                        shooter.y < bullet.y + bullet.height &&
                        shooter.y + shooter.height > bullet.y) {
                        createExplosion(shooter.x, shooter.y);
                        shooters.splice(shooters.indexOf(shooter), 1);
                    }
                });
                if (!immunityActive && plane.x < bullet.x + bullet.width &&
                    plane.x + plane.width > bullet.x &&
                    plane.y < bullet.y + bullet.height &&
                    plane.height + plane.y > bullet.y) {
                    createExplosion(plane.x, plane.y);
                    if(currenthealth > 1){
                            currenthealth--;
                            firstbosses[0].bullets.splice(firstbosses[0].bullets.indexOf(bullet), 1);
                        } else{
                            currenthealth = 0;
                            gameRunning = false;
                        }
                } });
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
                        power: 1,
                        bullets: []
                    }); 
                } if(planes[selectedPlane].id == 'heavyDuty' && level7 != 1  && level7 != 5 && level7 != 5.5){
                    shooters.forEach(shooter =>{
                        if (shooter.timespent <= timePassed) {
                            shooter.bullets.push({
                                x: shooter.x + shooter.width / 5,
                                y: shooter.y + shooter.x/20,
                                hit: shooter.power
                            }); shooter.bullets.push({
                                x: shooter.x + 4* shooter.width / 5,
                                y: shooter.y + shooter.x/20,
                                hit: shooter.power
                            }); 
                            shooter.timespent = timePassed + 6;
                            if(shooter.power <=15) shooter.power = shooter.power + 0.5;
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
                    } if (Math.random() < 0.0007 && (rotators.length < 1 || (rotators.length < 2 && rotators[0].y > 0.75*canvas.height)) && timePassed >= 127.5){
                        createRotator();
                    } if(Math.random() < 0.001 && timePassed >= 140){
                        createAsteroid();
                    } if (Math.random() < 0.004 && timePassed >= 30 && alienPlanes.length < 12 || (Math.random() < 0.004 + diffindex && timePassed >= 225)) {
                        createAlienPlane();
                    } if(Math.random() < 0.003 && timePassed >= 67.5 && advancedAliens.length < 8 || (Math.random() < 0.003 + diffindex && timePassed >= 375)){ 
                        createAdvancedAliens();
                    } if((Math.random() < 0.001 && timePassed >= 90 && blueArcs.length < 4) || (Math.random() < 0.001 + diffindex && timePassed >= 525)){
                        createBlueArcs(); 
                    } if((Math.random() < 0.007 && timePassed >= 112.5 && nebulas.length < 2) || (Math.random() < 0.001 + diffindex && timePassed >= 525 && nebulas.length < 2)){
                        createNebulas(); 
                    } if(Math.random() < 0.001 && timePassed >= 150){
                        createDefenders();
                    }
                } else if(level == 1){ //towards mars 80
                    if (Math.random() < 0.02*difactor) {
                        createStone();
                    } if (Math.random() < 0.008 && rotators.length < 2 && timePassed >= 30){
                        createRotator();
                    } if (Math.random() < 0.0008*difactor && timePassed >= 60 && alienPlanes.length < 6*difactor) {
                        createAlienPlane();
                    }
                } else if(level == 2){ //towards jupiter 110
                    if (Math.random() < 0.015) {
                        createStone();
                    } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 50){
                        createRotator();
                    } if(Math.random() < 0.007*difactor && timePassed >= 80 && asteroids.length < 3){
                        createAsteroid();
                    } if (Math.random() < 0.004*difactor && timePassed >= 25 && alienPlanes.length < 12*difactor && timePassed < 110) {
                        createAlienPlane();
                    } if(level2 < 0.5 && alienPlanes.length == 0 && timePassed > 110){ 
                        if(firstbosses.length < 1){
                            createfirstboss();
                        } if(music && currentAudio != jupiterboss){
                            towardsjupiter.pause();
                            towardsjupiter.currentTime = 0;                              
                            jupiterboss.play();
                            level2 = 0.25;
                            currentAudio = jupiterboss;
                        }
                    } if(level2 == 0.5 && firstbosses.length == 0){
                        level2 = timePassed + 10;
                    }
                } else if(level == 3){ //towards saturn 130
                    if (Math.random() < 0.01) {
                        createStone();
                    } if (Math.random() < 0.0006 && rotators.length < 2 && timePassed >= 40){
                        createRotator();
                    } if (Math.random() < 0.004 && timePassed >= 20 && alienPlanes.length < 12) {
                        createAlienPlane();
                    } if(Math.random() < 0.003 && timePassed >= 63){
                        createAsteroid();
                    } if(Math.random() < 0.005 && timePassed >= 88 && advancedAliens.length < 8){
                        createAdvancedAliens();
                    } if(Math.random() < 0.007 && timePassed >= 109 && nebulas.length < 2){
                        createNebulas();
                    } 
                } else if(level == 4){ //towards uranus 145
                    if (Math.random() < 0.01) {
                        createStone();
                    } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 37){
                        createRotator();
                    } if (Math.random() < 0.006 && timePassed >= 15 && alienPlanes.length < 15 && timePassed <= 145) {
                        createAlienPlane();
                    } if(Math.random() < 0.002 && timePassed >= 64){
                        createAsteroid();
                    } if(Math.random() < 0.007 && timePassed >= 95 && advancedAliens.length < 10 && timePassed <= 145){
                        createAdvancedAliens();
                    } if(Math.random() < 0.004 && timePassed >= 121 && nebulas.length < 2){
                        createNebulas();
                    } if(level4 < 0.5 && advancedAliens.length == 0 && alienPlanes.length == 0 && timePassed > 145){ 
                        if(semibosses.length < 3){
                            createsemiboss();
                        } if(music && currentAudio != semibossmusic){
                            towardsuranus.pause();
                            towardsuranus.currentTime = 0;                              
                            semibossmusic.play();
                            level4 = 0.25;
                            currentAudio = semibossmusic;
                        }
                    } if(level4 == 0.5 && semibosses.length == 0){
                        level4 = timePassed + 10;
                    }
                    
                    
                } else if(level == 5){ //towards neptune 160
                    if (Math.random() < 0.01) {
                        createStone();
                    } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 41){
                        createRotator();
                    } if (Math.random() < 0.005 && timePassed >= 15 && alienPlanes.length < 12) {
                        createAlienPlane();
                    } if(Math.random() < 0.002 && timePassed >= 71){
                        createAsteroid();
                    } if(Math.random() < 0.008 && timePassed >= 98 && advancedAliens.length < 12){
                        createAdvancedAliens();
                    } if(Math.random() < 0.003 && timePassed >= 122 && blueArcs.length < 6){
                        createBlueArcs();
                    }
                } else if(level == 6){ //towards pluto 150
                    if (Math.random() < 0.01) {
                        createStone();
                    } if (Math.random() < 0.0007 && rotators.length < 2 && timePassed >= 31){
                        createRotator();
                    } if (Math.random() < 0.006 && timePassed >= 10 && timePassed < 150) {
                        createAlienPlane();
                    } if(Math.random() < 0.004 && timePassed >= 52){
                        createAsteroid();
                    } if(Math.random() < 0.007 && timePassed >= 78 && timePassed < 150){
                        createAdvancedAliens();
                    }  if(Math.random() < 0.0045 && timePassed >= 127 && blueArcs.length < 12 && timePassed < 150){
                        createBlueArcs();
                    } if(Math.random() < 0.007 && timePassed >= 105 && nebulas.length < 2){
                        createNebulas();
                    } if(level2 < 0.5 && alienPlanes.length == 0 && advancedAliens.length == 0&& blueArcs.length == 0&& timePassed > 150){ 
                        if(lastbosses.length < 3){
                            createlastboss();
                            createlastboss();
                            createlastboss();
                        } if(music && currentAudio != plutoboss){
                            towardspluto.pause();
                            towardspluto.currentTime = 0;                              
                            plutoboss.play();
                            level6 = 0.25;
                            currentAudio = plutoboss;
                        }
                    } if(level6 == 0.5 && lastbosses.length == 0 && bossdemo.length  == 0){
                        level6 = timePassed + 10;
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
                        if(initialbossremoved != 0 &&level7 == 6){
                            if(planet.y >= 0.75*planet.height){
                                level7 = 7;
                            } if(planet.y >=0.5*planet.height){
                                if(endplanes.length == 0){
                                    createplanes(0);
                                    createplanes(0);
                                    createplanes(0);
                                    createplanes(0);
                                    createplanes(1);
                                } endplanes.forEach(planex =>{
                                    planex.y += 2; //planetspeed
                                });
                            }
                        }
                    }); 

                } if(((timePassed > 70 && level == 1) || (timePassed > 120 && level == 3) || (level2 > 1) || (level6 > 1) || (level4 > 1) || (timePassed > 150 && level == 5))&&win == 0){  //timerwin 120 180 180 240 240 260 100+boss spaces
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
                quartboss.src = "quartboss.png";   
                timedisplay = durations[level];
                freezetime = 0;
                slowtime = 0;
                gameTime = -1;
                props = [];
                gamestarted = true;
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
                endgame.pause();
                bigexplode.pause();
                missilelaunch.pause();
                shootsound.pause();
                teleport.pause();
                frozen.pause();
                exploding.pause();
                level7 = 0;
                level4 = 0;
                level2 = 0;
                level6 = 0;
                semibosses = [];
                lastbosses = [];
                firstbosses = [];
                
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
                endgame.pause();
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
                semibossmusic.pause();
                semibossmusic.currentTime = 0;
                plutoboss.pause();
                plutoboss.currentTime = 0;
                jupiterboss.pause();
                jupiterboss.currentTime = 0;
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
                bossdemo = [];

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
                endplanes = [];
                alienPlanes = [];
                blueArcs = [];
                advancedAliens = [];
                defenders = [];
                explosions = [];
                coins = [];
                hearts = [];
                immunityPill = null;
                bubble.y = canvas.height + 100;
                score = 0;
                gameRunning = true;
                gameOverScreen.style.display = 'none';            
                document.getElementById('pauseScreen').style.display = 'none';            
                lastTime = Date.now();
                document.getElementById('muteScreen').style.display = 'none';              
                document.getElementById('feedbackScreen').style.display = 'none'; 
            }
            function returnToMenu() {
                quartboss.src = "quartboss.png";
                timedisplay = 0;
                freezetime = 0;
                slowtime = 0;
                gameTime = -1;
                props = [];
                gamestarted = false;
                flash.pause();
                mistray.pause();
                document.getElementById('muteScreen').style.display = 'flex';      
                document.getElementById('feedbackScreen').style.display = 'flex';            
                finalboss = [];
                bossdemo = [];
                bossfinalImage.src = 'bossdownwards.png';
                initialbossremoved = 0;
                buttonclickk.currentTime = 0.25;
                buttonclickk.play();
                wins.pause();
                endgame.pause();
                bigexplode.pause();
                bubble.y = canvas.height + 100;
                missilelaunch.pause();
                shootsound.pause();
                teleport.pause();
                frozen.pause();
                laser.pause();
                exploding.pause();
                level7 = 0;
                level4 = 0;
                level2 = 0;
                level6 = 0;
                
                semibosses = [];
                lastbosses = [];
                firstbosses = [];
                timePassed = 0;
                boss = [];
                if (winned[winned.length - 1] === 1 && bgmusic.src != "bgtheme new.mp3") {
                    bgmusic.src = "bgtheme new.mp3"; // Change the music source
                    bgmusic.load(); // Explicitly load the audio file
                }
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
                    jupiterboss.pause();
                    jupiterboss.currentTime = 0;
                } else if(level == 3){
                    towardssaturn.pause();
                    towardssaturn.currentTime = 0;
                } else if(level == 4){
                    towardsuranus.pause();
                    towardsuranus.currentTime = 0;
                    semibossmusic.pause();
                    semibossmusic.currentTime = 0;
                } else if(level == 5){
                    towardsneptune.pause();
                    towardsneptune.currentTime = 0;
                } else if(level == 6){
                    towardspluto.pause();
                    towardspluto.currentTime = 0;
                    plutoboss.pause();
                    plutoboss.currentTime = 0;
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
                endplanes = [];
                shooters = [];
                stones = [];
                nebulas = [];
                alienPlanes = [];
                blueArcs = [];
                advancedAliens = [];
                defenders = [];
                explosions = [];
                coins = [];
                hearts = [];
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
                document.getElementById('feedbackScreen').style.display = 'flex'; 
            }

            function resumeGame() {
                paused = !paused;
                gameRunning = true; // Resume updating the game loop
                document.getElementById('pauseScreen').style.display = 'none';
                lastTime = Date.now(); // Reset lastTime to avoid a large delta time
                document.getElementById('muteScreen').style.display = 'none';                         
                document.getElementById('feedbackScreen').style.display = 'none'; 
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
