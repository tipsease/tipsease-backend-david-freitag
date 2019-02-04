const random = (a = 0, b = 10) => {
    return Math.random() * (b - a) + a;
};

module.exports = random;
