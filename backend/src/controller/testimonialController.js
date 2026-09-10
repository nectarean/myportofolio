const db = require("../config/db");

const getAllTestimonials = (req, res) => {
    db.query("SELECT * FROM testimonials ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        res.status(200).json({ success: true, data: results });
    });
};

const createTestimonial = (req, res) => {
    const { name, role, content, avatar } = req.body;
    db.query("INSERT INTO testimonials (name, role, content, avatar) VALUES (?,?,?,?)",
        [name, role, content, avatar], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal menambah testimoni", error: err.message });
            res.status(201).json({ success: true, message: "Testimoni berhasil ditambah", data: { id: results.insertId } });
        });
};

const updateTestimonial = (req, res) => {
    const { name, role, content, avatar } = req.body;
    db.query("UPDATE testimonials SET name=?, role=?, content=?, avatar=? WHERE id=?",
        [name, role, content, avatar, req.params.id], (err) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal mengupdate testimoni", error: err.message });
            res.status(200).json({ success: true, message: "Testimoni berhasil diupdate" });
        });
};

const deleteTestimonial = (req, res) => {
    db.query("DELETE FROM testimonials WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal menghapus testimoni", error: err.message });
        res.status(200).json({ success: true, message: "Testimoni berhasil dihapus" });
    });
};

module.exports = { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial };
