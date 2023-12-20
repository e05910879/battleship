import { Ship } from './Ship.js';
import { Gameboard } from './Gameboard.js';
import { Player } from './Player.js';

// Ship: { getLength, getHitCount, hit, isSunk }
test('Ship: function returns an object.', () => {
    expect(Ship()).toBeTruthy();
});

test('Ship: object returned contains methods for length, number of times hit, and sunk status.', () => {
    expect(Ship()).toHaveProperty('getLength', 'getHitCount', 'getSunkStatus');
});

test('Ship: Ship() without arguments results in initialized values.', () => {
    let ship = Ship();
    expect(ship.getLength()).toBe(2);
    expect(ship.getHitCount()).toBe(0);
    expect(ship.isSunk()).toBe(false);
})

test('Ship: hit() increments the number of hits in ship.', () => {
    let ship = Ship();
    expect(ship.getHitCount()).toBe(0);
    ship.hit();
    expect(ship.getHitCount()).toBe(1);
});

test('Ship: isSunk() returns true if the ship\'s length equals its number of hits.', () => {
    let ship = Ship();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(true);

    ship.hit();
    expect(ship.isSunk()).toBe(true);
})



// Gameboard
test('Gameboard: function returns an object', () => {
    expect(Gameboard()).toBeTruthy();
})

test('Gameboard: initializes an empty 10x10 array', () => {
    let board = Gameboard().getBoard();

    expect(board).toEqual(expect.any(Array));
    expect(board).toHaveLength(10);
    board.forEach(element => {
        expect(element).toHaveLength(10);
        element.forEach(e => expect(e).toBeFalsy());
    })
})

// placeShip()
// Below: too broad! limit one test case per test
// test('Gameboard: placeShip(x, y, shipLength, direction) occupies an area on the grid with a ship.', () => {
// })

test('Gameboard: placeShip(x, y) returns false when x,y are outside of grid.', () => {
    let board = Gameboard();
    expect(board.placeShip(-1, 0)).toBe(false);
    expect(board.placeShip(0, 10)).toBe(false);
});

test('Gameboard: placeShip(x, y, length) returns false when length is not between 2 and 5.', () => {
    let board = Gameboard();
    expect(board.placeShip(0, 0, 1)).toBe(false);
    expect(board.placeShip(0, 0, 6)).toBe(false);
});

test('Gameboard: placeShip(x, y, length, direction) returns false when direction causes ship to fall outside grid dimensions.', () => {
    let board = Gameboard();
    expect(board.placeShip(0, 1, 2, 'left')).toBe(false);
    expect(board.placeShip(8, 9, 3, 'right')).toBe(false);
    expect(board.placeShip(4, 7, 4, 'up')).toBe(false);
    expect(board.placeShip(6, 3, 5, 'down')).toBe(false);
})

test('Gameboard: with valid args, placeShip(...) adds a ship on the corresponding grid elements.', () => {
    let board = Gameboard();
    board.placeShip(0, 0, 2, 'right');
    let grid = board.getBoard();
    
    expect(grid[2][0]).toBeFalsy();
    expect(grid[0][2]).toBeFalsy();
    expect(grid[0][0]).toBeTruthy();
    expect(grid[1][0]).toBeTruthy();
});

test('Gameboard: placeShip() returns false if there is a ship already on the desired grid position.', () => {
    let board = Gameboard();
    board.placeShip(0, 0, 2, 'right');
    expect(board.placeShip(0, 0, 2, 'up')).toBe(false);
});

// receiveAttack()

test('Gameboard: receiveAttack(x,y) returns false when x,y are outside grid.', () => {
    let board = Gameboard();
    expect(board.receiveAttack(-1, 0)).toBe(false);
    expect(board.receiveAttack(0, 10)).toBe(false);
});

test('Gameboard: receiveAttack(x,y) records coordinates of missed shot.', () => {
    let board = Gameboard();
    board.placeShip(0, 0, 2, 'right');
    expect(board.receiveAttack(2, 2)).toBe(false);
    expect(board.receiveAttack(3, 3)).toBe(false);
    expect(board.receiveAttack(4, 4)).toBe(false);

    let missedShots = board.getMissedShots();
    expect(missedShots[0]).toEqual([2,2]);
    expect(missedShots[1]).toEqual([3,3]);
    expect(missedShots[2]).toEqual([4,4]);
});

test('Gameboard: receiveAttack(x,y) returns true when x and y coordinates are valid and a ship is located at them.', () => {
    let board = Gameboard();
    board.placeShip();
    expect(board.receiveAttack(0, 0)).toBe(true);
});

test('Gameboard: receiveAttack() activates hit() of targeted ship.', () => {
    let board = Gameboard();
    board.placeShip();
    let grid = board.getBoard();
    expect(grid[0][0].getHitCount()).toBe(0);

    board.receiveAttack(0,0);
    expect(grid[0][0].getHitCount()).toBe(1);
});

// allShipsSunk()
test('Gameboard: allShipsSunk() returns false when all ships are not sunk.', () => {
    let board = Gameboard();
    board.placeShip();
    board.receiveAttack(0,0);
    expect(board.allShipsSunk()).toBe(false);
});

test('Gameboard: allShipsSunk() returns true when all ships are sunk.', () => {
    let board = Gameboard();
    board.placeShip(0, 0, 2, 'right');
    board.placeShip(9, 9, 3, 'left');
    board.receiveAttack(0,0);
    board.receiveAttack(1,0);
    board.receiveAttack(9,9);
    board.receiveAttack(8,9);
    board.receiveAttack(7,9);
    expect(board.allShipsSunk()).toBe(true);
});



// Player
test('Player: Player() returns an object.', () => {
    expect(Player()).toBeTruthy();
})

// setHit()
test('Player: setHit() sets hits in 2D array tracking attacks.', () => {
    const player = Player();
    player.setHit([2,2]);
    const attacks = player.getAttacks();
    expect(attacks[2][2]).toBe('hit');
})

// setMiss()
test('Player: setMiss() sets misses in 2D array tracking attacks.', () => {
    const player = Player();
    player.setMiss([2,2]);
    const attacks = player.getAttacks();
    expect(attacks[2][2]).toBe('miss');
})


