let scoreElem = document.querySelector("#score")
let speedElem = document.querySelector("#speed")
let gameArea = document.querySelector("#gameArea")
let player = document.querySelector("#player")
let gameOverText = document.querySelector("#gameOver")

let playerX = 175;
let playerY = 530;
let score = 0;
let speed = 5;
let gameOver = false;

//!Player Movement
document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
            playerX = playerX - 20;
      }

      if (event.key === "ArrowRight") {
            playerX = playerX + 20;
      }

      if (playerX < 0) {
            playerX = 0;
      }

      if (playerX > 350) {
            playerX = 350;
      }

      player.style.left = playerX + "px";

});

//! Restart
document.addEventListener("keydown", function (event) {
      if (event.key === " " && gameOver === true) {
            location.reload();
      }
});

//! Create Enemy
function createEnemy() {
      if (gameOver === true) {
            return;
      }

      let enemy = document.createElement("div");
      enemy.classList.add("enemy");

      let enemyX = Math.floor(Math.random() * 350);
      let enemyY = -50;

      enemy.style.left = enemyX + "px";
      enemy.style.top = enemyY + "px";

      gameArea.appendChild(enemy);

      //? Move Enemy
      let enemyMove = setInterval(function () {
            if (gameOver === true) {
                  clearInterval(enemyMove);
                  return;
            }

            enemyY = enemyY + speed;
            enemy.style.top = enemyY + "px";

            //? Colision
            if (
                  enemyX < playerX + 50 &&
                  enemyX + 50 > playerX &&
                  enemyY < playerY + 50 &&
                  enemyY + 50 > playerY
            ) {
                  endGame();
                  clearInterval(enemyMove);
            }

            //? Enemy Passed Player
            if (enemyY > 600) {
                  score = score + 1;
                  scoreElem.innerHTML = score;

                  enemy.remove();
                  clearInterval(enemyMove);
            }
      }, 20);
}

function endGame() {
      gameOver = true;
      gameOverText.style.display = "block";
}

//!Enemy Comes
setInterval(function () {
      if (gameOver === false) {
            createEnemy();
      }
}, 1000);


//! Increse Speed
setInterval(function () {
      if (gameOver === false) {
            if (speed < 15) {
                  speed = speed + 1;
                  speedElem.innerHTML = speed
            }
      }
}, 3000);