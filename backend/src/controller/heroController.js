const db = require("../config/db");

const getHero = (req, res) => {
    const query = "SELECT * FROM profile LIMIT 1";
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

const updateHero = (req, res) => {
    const { name, title, bio, avatar, cv_url, github, linkedin, email, instagram } = req.body;
    const query = "UPDATE profile SET name=?, title=?, bio=?, avatar=?, cv_url=?, github=?, linkedin=?, email=?, instagram=?, updated_at=NOW() WHERE id=1";
    db.query(query, [name, title, bio, avatar, cv_url, github, linkedin, email, instagram], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengupdate data", error: err.message });
        res.status(200).json({ success: true, message: "Profile berhasil diupdate" });
    });
};

module.exports = { getHero, updateHero };