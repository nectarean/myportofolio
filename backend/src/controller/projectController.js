const db = require("../config/db");

const getAllProjects = (req, res) => {
    db.query("SELECT * FROM projects ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        res.status(200).json({ success: true, data: results });
    });
};

const getProjectById = (req, res) => {
    db.query("SELECT * FROM projects WHERE id = ?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        if (results.length === 0) return res.status(404).json({ success: false, message: "Proyek tidak ditemukan" });
        res.status(200).json({ success: true, data: results[0] });
    });
};

const createProject = (req, res) => {
    const { title, description, image_url, github_url, live_url, tags } = req.body;
    const tagsStr = typeof tags === 'string' ? tags : JSON.stringify(tags || []);
    db.query("INSERT INTO projects (title, description, image_url, github_url, live_url, tags) VALUES (?,?,?,?,?,?)",
        [title, description, image_url, github_url, live_url, tagsStr], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal menambah proyek", error: err.message });
            res.status(201).json({ success: true, message: "Proyek berhasil ditambah", data: { id: results.insertId } });
        });
};

const updateProject = (req, res) => {
    const { title, description, image_url, github_url, live_url, tags } = req.body;
    const tagsStr = typeof tags === 'string' ? tags : JSON.stringify(tags || []);
    db.query("UPDATE projects SET title=?, description=?, image_url=?, github_url=?, live_url=?, tags=? WHERE id=?",
        [title, description, image_url, github_url, live_url, tagsStr, req.params.id], (err) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal mengupdate proyek", error: err.message });
            res.status(200).json({ success: true, message: "Proyek berhasil diupdate" });
        });
};

const deleteProject = (req, res) => {
    db.query("DELETE FROM projects WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal menghapus proyek", error: err.message });
        res.status(200).json({ success: true, message: "Proyek berhasil dihapus" });
    });
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };
