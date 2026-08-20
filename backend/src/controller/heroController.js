const getHero = (req, res) => {
    res.send({ message: "Hero endpoint" });
}

module.exports = {
    getHero,
}