import { Ship } from '../Ship.js';
import { Gameboard } from '../Gameboard.js';
import { Player } from '../Player.js';

export function Gamecontroller() {
    // Initialization: 
    const players = [Player(), Player()];
    const gameBoards = [Gameboard(), Gameboard()];

    gameBoards.forEach(gameboard => {
        gameboard.placeShip(2, 6, 2, 'right');
        gameboard.placeShip(3, 4, 3, 'down');
        // gameboard.placeShip(6, 3, 3, 'up');
        // gameboard.placeShip(9, 0, 4, 'up');
        // gameboard.placeShip(8, 8, 5, 'left');
    })

   let gameOver = false;
   let currentPlayer = players[0];
   let winner;
   let playerMove;
   let x, y;
   let hitStatus;
   let playerChoice, playerChoiceArray;

    while (!gameOver) {
        // Computer play
        if (currentPlayer === players[1]) {
            console.log("Computer's turn:");
            // have computer select valid x,y coordinates that it has not selected before.
            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
            } while (gameBoards[0].getAllShots().includes([x,y]));

            console.log(`Computer targets: [${x}, ${y}]`);

            hitStatus = gameBoards[0].receiveAttack(x, y);
            if (hitStatus === false) {
                console.log('Computer attack status: FAILURE');
            } else {
                console.log('Computer attack status: SUCCESS');
            }

            if (gameBoards[0].allShipsSunk()) {
                winner = 'Computer';
                gameOver = true;
            }
        }

        else {
            console.log("Player's turn:");
            printEnemyBoard(players[0]);
            printPlayerBoard(gameBoards[0]);

            do {
                playerChoice = prompt("Please enter valid x, y coordinates for attack: ");
                playerChoiceArray = playerChoice.split(' ');
                x = Number(playerChoiceArray[0]);
                y = Number(playerChoiceArray[1]);
            } while (((x < 0 || x > 9) || (y < 0 || y > 9)) || (gameBoards[1].getAllShots().includes([x,y])));

            console.clear();
            console.log(`Player targets [${x}, ${y}]`);

            hitStatus = gameBoards[1].receiveAttack(x, y);
            if (hitStatus === false) {
                players[0].setMiss([x,y]);
                console.log('Player attack status: FAILURE');
            } else {
                players[0].setHit([x,y]);
                console.log('Player attack status: SUCCESS');
            }

            if (gameBoards[1].allShipsSunk()) {
                winner = 'Player';
                gameOver = true;
            }
        }
        
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
   }

   console.log('Game over!');
   console.log(`${winner} wins!`);
}

function printEnemyBoard(player) {
    const attacks = player.getAttacks();

    console.log('   0  1  2  3  4  5  6  7  8  9');
    let rowValues;
    for (let i = attacks.length - 1; i >= 0; i--) {
        rowValues = `${i}`;
        for (let j = 0; j < attacks[i].length; j++) {
            switch(attacks[j][i]) {
                case null: 
                    rowValues += '  .';
                    break;
                case 'hit':
                    rowValues += '  O';
                    break;
                case 'miss':
                    rowValues += '  X';
                    break;
            }
        }
        console.log(rowValues);
    }
}

function printPlayerBoard(gameBoard) {
    const grid = gameBoard.getBoard();

    console.log('   0  1  2  3  4  5  6  7  8  9');
    let rowValues;
    for (let i = grid.length - 1; i >= 0; i--) {
        rowValues = `${i}`;
        for (let j = 0; j < grid[i].length; j++) {
            switch(grid[j][i]) {
                case null: 
                    rowValues += '  .';
                    break;
                case 'H':
                    rowValues += '  H';
                    break;
                case 'M':
                    rowValues += '  M';
                    break;
                default:
                    rowValues += '  O';
            }
        }
        console.log(rowValues);
    }

}

Gamecontroller();

// const gameboard = Gameboard();
// gameboard.placeShip(2, 6, 2, 'right');
// gameboard.placeShip(3, 4, 3, 'down');
// gameboard.placeShip(6, 3, 3, 'up');
// gameboard.placeShip(9, 0, 4, 'up');
// gameboard.placeShip(8, 8, 5, 'left');

// printPlayerBoard(gameboard);

// console.log('');

// const player = Player();
// player.setHit([0,0]);
// player.setMiss([1,1]);
// player.setHit([0,1]);
// player.setHit([2,0]);
// player.setMiss([6,5]);
// printEnemyBoard(player);