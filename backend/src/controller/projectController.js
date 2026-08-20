const db = require("../config/db");

const getAllProjects = (req, res) => {
    const query = "SELECT * FROM projects ORDER BY created_at DESC";

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data proyek",
                error: err.message,
            });

        }

        res.status (200).json({
            sucess: true,
            message: "Berhasil mengambil data proyek",
            data: results,
        });
    });
};

const getProjectById = (req, res) => {
    const projectId = req.params.id;
    const query = "SELECT * FROM projects WHERE id = ?";

    db.query(query, [projectId], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Gagal mengambil data proyek",
                error: err.message,
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Proyek tidak ditemukan",
            });
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mengambil data proyek",
            data: results[0],
        });
    });
};

module.exports = {
    getAllProjects,
    getProjectById,
}
