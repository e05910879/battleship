import { Ship } from './Ship.js';

test('Ship: function returns an object.', () => {
    expect(Ship()).not.toBeFalsy();
});

test('Ship: object returned contains methods for length, number of times hit, and sunk status.', () => {
    expect(Ship()).toHaveProperty('getLength', 'getHitCount', 'getSunkStatus');
});

test('Ship: function invocation results in initialized values.', () => {
    let ship = Ship();
    expect(ship.getLength()).toBe(2);
    expect(ship.getHitCount()).toBe(0);
    expect(ship.isSunk()).toBe(false);
})

test('Ship: hit() function increases the number of hits in ship.', () => {
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
})