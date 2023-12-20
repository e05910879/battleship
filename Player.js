/*
What should a player object be responsible for?
What should a player object track?
What does a player do?

The player object first initializes his Gameboard object with his 5 pieces of lengths 2, 3, 3, 4, and 5.
Then the game starts. 
During his turn, he has access to view both his grid and a blank grid representing his enemy's grid.
The player object then attacks a valid position on the blank grid. If the position contains an enemy ship, 
it is marked with a red peg. Otherwise if the position does not contain an enemy ship, it is marked with a white peg.
This is to say that the player object tracks his own attacks.

To determine what the player object should be in charge of, imagine the screen of whichever player's turn it is.
All the common elements of both players is not what they are in charge of; only their differences.
Both players have two grids on display; one for their enemy's and one for their own.
Each player object then populates the grids with their specific data.
The player object populates his enemy grid with the values in his 'attack's property, preferably an array of x,y coordinates.
    Breaking this down even further, he has two arrays, one for successful attacks and one for misses.
For the player's own grid, those values are recorded in the Gameboard object.
Each player must thus be able to interact with his enemy's grid.
    A player has only one means by which he should be able to interact with the enemy grid: attacking.
        However, attacks can be managed by the interface and do not populate the screen in anyway, so it can be removed.
    He is not allowed to do anything else, which should be made explicit in his available methods.
    Despite the convenience, player should not contain a reference to the enemy gameboard, in favor of loose coupling and purity.
    Player should send out x,y coordinates. 
    Player: { setHits, setMisses, getHits, getMisses } 

There is no reason for a player object to contain his own gameboard. It actually adds to complexity as the gameboard becomes a 
dependency of the player object. 
Therefore, a player object should only be in charge of his hits and misses, as a 2D array.

*/

export function Player() {
    const attacks = [];
    let length;
    for (let i = 0; i < 10; i++) {
        length = attacks.push([]);
        for (let j = 0; j < 10; j++) {
            attacks[length - 1].push(null);
        }
    }

    function getAttacks() {
        return attacks;
    }

    function setHit(pos) {
        attacks[pos[0]][pos[1]] = 'hit';
    }

    function setMiss(pos) {
        attacks[pos[0]][pos[1]] = 'miss';
    }

    return { getAttacks, setHit, setMiss };
}