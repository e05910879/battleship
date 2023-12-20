export function Ship(length = 2) {
    let hitCount = 0;
    let sunk = false;

    function getLength() { return length; };
    function getHitCount() { return hitCount; };
    function hit() { 
        hitCount++;
        sunk = hitCount >= length ? true : false;
     };
    function isSunk() { return sunk; }

    return { getLength, getHitCount, hit, isSunk };
}
