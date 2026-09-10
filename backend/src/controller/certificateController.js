const db = require("../config/db");

const getAllCertificates = (req, res) => {
    db.query("SELECT * FROM certificates ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal mengambil data", error: err.message });
        res.status(200).json({ success: true, data: results });
    });
};

const createCertificate = (req, res) => {
    const { title, issuer, date, image_url } = req.body;
    db.query("INSERT INTO certificates (title, issuer, date, image_url) VALUES (?,?,?,?)",
        [title, issuer, date, image_url], (err, results) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal menambah sertifikat", error: err.message });
            res.status(201).json({ success: true, message: "Sertifikat berhasil ditambah", data: { id: results.insertId } });
        });
};

const updateCertificate = (req, res) => {
    const { title, issuer, date, image_url } = req.body;
    db.query("UPDATE certificates SET title=?, issuer=?, date=?, image_url=? WHERE id=?",
        [title, issuer, date, image_url, req.params.id], (err) => {
            if (err) return res.status(500).json({ success: false, message: "Gagal mengupdate sertifikat", error: err.message });
            res.status(200).json({ success: true, message: "Sertifikat berhasil diupdate" });
        });
};

const deleteCertificate = (req, res) => {
    db.query("DELETE FROM certificates WHERE id=?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ success: false, message: "Gagal menghapus sertifikat", error: err.message });
        res.status(200).json({ success: true, message: "Sertifikat berhasil dihapus" });
    });
};

module.exports = { getAllCertificates, createCertificate, updateCertificate, deleteCertificate };
