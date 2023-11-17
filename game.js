
const gamebody = document.getElementById("game-body");
var seconds = document.getElementById("timer").textContent; 
const lives = document.getElementById("lives");
let zombieId = 0;
const img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",
];


const shotgunSound = new Audio("./assets/shotgun.wav");

gamebody.onclick = () => {
    shotgunSound.pause();
    shotgunSound.currentTime = 0;
    shotgunSound.play();
};

const backgroundSound = new Audio("./assets/bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;

const maxlives = 4;
let nooflives = 4;


function makeZombie(zombieId) {
    let randomImage = img[getRandomInt(0, img.length)];
    gamebody.innerHTML += `<img src="./assets/${randomImage}" class="zombie-image" id="zombie${zombieId}">`;
    let zombie = document.getElementById("zombie" + zombieId);
    zombie.style.transform = `translateX(${getRandomInt(20, 70)}vw)`;
    zombie.style.animationDuration = `${getRandomInt(2, 6)}s`;
    zombie.onclick = () => {
        zombieDestroy(zombie);
    };
}

function checkCollision(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
        nooflives--;
        return true;
    }
    return false;
}

function zombieDestroy(zombie) {
    zombie.style.display = "none";
    zombieId++;
    makeZombie(zombieId); 
}

var timer = setInterval(() => {
    seconds--
    document.getElementById("timer").textContent=seconds;
    let zombie = document.getElementById("zombie" + zombieId);
    if (checkCollision(zombie) == true) {
        zombieDestroy(zombie);
        if (nooflives == 0) {
            location.href = "./game-over.html";
        }
    }
    if (seconds == 0) {
        location.href = "./win.html";
    }
}, 1000);

makeZombie(zombieId);

function getRandomInt(min, max) {
    min = Math.ceil(min); 
    max = Math.floor(max); 
    return Math.floor(Math.random() * (max - min)) + min;
}
