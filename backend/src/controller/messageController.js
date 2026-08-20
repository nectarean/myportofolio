const db = require ("../config/db");

const createMessage = (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Nama, email, dan pesan harus diisi",
        });
    }

    const query = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

    db.query(query, [name, email, message], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengirim pesan",
                error: err.message,
            });
        }

        res.status(201).json({
            success: true,
            message: "Pesan berhasil dikirim",
            data: {
                id: results.insertId,
                name,
                email,
                message,
            },
        });
    });
};

module.exports = {
    createMessage,
};