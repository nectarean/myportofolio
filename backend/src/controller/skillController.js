const db = require("../config/db");

const getAllSkills = (req, res) => {
    db.query("SELECT * FROM skills ORDER BY category, name", (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        const grouped = {};
        results.forEach((skill) => {
            if (!grouped[skill.category]) grouped[skill.category] = [];
            grouped[skill.category].push(skill.name);
        });
        const categories = Object.keys(grouped).map((cat) => ({ title: cat, skills: grouped[cat] }));
        res.status(200).json({ success: true, data: categories });
    });
};

const getAllSkillsRaw = (req, res) => {
    db.query("SELECT * FROM skills ORDER BY category, name", (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        res.status(200).json({ success: true, data: results });
    });
};

const createSkill = (req, res) => {
    const { category, name } = req.body;
    db.query("INSERT INTO skills (category, name) VALUES (?,?)", [category, name], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal menambah skill", error: err.message });
        res.status(201).json({ success: true, message: "Skill berhasil ditambah", data: { id: results.insertId } });
    });
};

const updateSkill = (req, res) => {
    const { category, name } = req.body;
    db.query("UPDATE skills SET category=?, name=? WHERE id=?", [category, name, req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengupdate skill", error: err.message });
        res.status(200).json({ success: true, message: "Skill berhasil diupdate" });
    });
};

const deleteSkill = (req, res) => {
    db.query("DELETE FROM skills WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal menghapus skill", error: err.message });
        res.status(200).json({ success: true, message: "Skill berhasil dihapus" });
    });
};

module.exports = { getAllSkills, getAllSkillsRaw, createSkill, updateSkill, deleteSkill };
