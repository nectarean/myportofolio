const db = require("./config/db");

const setupData = async () => {
    try {
        const checkProjects = "SELECT COUNT(*) as count FROM projects";
        const count = await new Promise((resolve, reject) => {
            db.query(checkProjects, (err, results) => {
                if (err) reject(err);
                else resolve(results[0].count);
            });
        });

        if (count === 0) {
            const insertProjects = `INSERT INTO projects (title, description, image_url, tags) VALUES 
            ('E-Commerce Dashboard', 'A comprehensive admin dashboard for e-commerce platforms.', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', '["React", "Next.js", "Tailwind CSS"]'),
            ('Task Management App', 'A collaborative task management application with real-time updates.', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800', '["Node.js", "Express", "MongoDB"]'),
            ('Portfolio Website', 'A modern, responsive personal portfolio website.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', '["Next.js", "TypeScript", "Framer Motion"]')`;
            
            await new Promise((resolve, reject) => {
                db.query(insertProjects, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            console.log("✅ Projects inserted");
        } else {
            console.log("✅ Projects already exist");
        }

        console.log("Setup complete");
    } catch (e) {
        console.error(e);
    }
    process.exit(0);
}

setupData();
