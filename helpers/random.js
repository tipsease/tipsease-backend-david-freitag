const random = (a = 0, b = 10) => {
    return Math.floor(Math.random() * (b - a) + a);
};

const reallyRandom = (a = 0, b = 10) => {
    if (random(0, 10) > 5) {
        return random(1, 100);
    } else {
        return null;
    }
};

module.exports = { random, reallyRandom };
