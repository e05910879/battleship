import { Ship } from './Ship.js';

export function Gameboard() {
    const board = [];
    let length;
    for (let i = 0; i < 10; i++) {
        length = board.push([]);
        for (let j = 0; j < 10; j++) {
            board[length - 1].push(null);
        }
    }

    const ships = [];
    const missedShots = [];


    function getBoard() {
        return board;
    }

    function placeShip(x = 0, y = 0, length = 2, direction = 'right') {
        
        // if coordinates are invalid:
        if (x < 0 || x > 9) { return false; };
        if (y < 0 || y > 9) { return false; };

        // if length is invalid
        if (length < 2 || length > 5) { return false; };

        // if length relative to coordinates is invalid: 
        switch(direction) {
            case 'left':
                if (x - (length-1) < 0)
                    return false;                
                break;
            case 'right':
                if (x + (length-1) > 9)
                    return false;
                break;
            case 'up':
                if (y + (length-1) > 9)
                    return false;
                break;
            case 'down':
                if (y - (length-1) < 0)
                    return false;
                break;
        }

        // if the coordinates already contain a ship
        switch(direction) {
            case 'left':
                for (let i = x - (length-1); i <= x; i++) {
                    if (board[i][y] !== null)
                        return false;
                } 
                break;
            case 'right':
                for (let i = x; i <= x + (length-1); i++) {
                    if (board[i][y] !==  null)
                        return false;
                }
                break;
            case 'up':
                for (let i = y; i <= y + (length-1); i++) {
                    if (board[x][i] !== null)
                        return false;
                }
                break;
            case 'down':
                for (let i = y - (length-1); i <= y; i++) {
                    if (board[x][i] !== null)
                        return false;
                }
                break;
        }



        // If every condition passes: 
        const ship = Ship(length);
        ships.push(ship);

        switch(direction) {
            case 'left':
                for (let i = x - (length-1); i <= x; i++) 
                    board[i][y] = ship;
                break;
            case 'right':
                for (let i = x; i <= x + (length-1); i++) 
                    board[i][y] = ship;
                break;
            case 'up':
                for (let i = y; i <= y + (length-1); i++)
                    board[x][i] = ship;
                break;
            case 'down':
                for (let i = y - (length-1); i <= y; i++) 
                    board[x][i] = ship;
                break;
        }

        return true;
    }

    function getMissedShots() { return missedShots; };

    function receiveAttack(x = 0, y = 0) {
        if (x < 0 || x > 9) { return false; };
        if (y < 0 || y > 9) { return false; };

        if (board[x][y] === null) {
            missedShots.push([x,y]);
            return false;
        }

        board[x][y].hit();
        return true;
    }   

    function allShipsSunk() {
        for (let i = 0 ; i < ships.length; i++) {
            if (ships[i].isSunk() === false) 
                return false;
        }
        return true;
    }
    
    return { getBoard, placeShip, receiveAttack, getMissedShots, allShipsSunk };
}