export function Ship(length = 2) {
    let hitCount = 0;
    let sunk = false;

    function getLength() { return length; };
    function getHitCount() { return hitCount; };
    function hit() { hitCount++; };
    function isSunk() { return hitCount >= length ? true : false; }

    return { getLength, getHitCount, hit, isSunk };
}
