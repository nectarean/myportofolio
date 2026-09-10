const db = require("./config/db");

const tables = [
  `CREATE TABLE IF NOT EXISTS hero (
    id INT AUTO_INCREMENT PRIMARY KEY,
    greeting VARCHAR(255) DEFAULT 'Hello, I''m',
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    github_url TEXT,
    live_url TEXT,
    tags VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    issuer VARCHAR(255),
    date VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    content TEXT,
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
];

async function setupDatabase() {
  for (const sql of tables) {
    try {
      await new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      console.log("✅ Table created/verified");
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  }

  // Insert sample data if tables are empty
  const sampleData = [
    {
      check: "SELECT COUNT(*) as count FROM hero",
      insert: `INSERT INTO hero (greeting, name, title, description, image_url) VALUES 
        ('Hello, I''m', 'John Doe', 'Full Stack Developer', 'I build exceptional and accessible digital experiences for the web.', 'https://ui-avatars.com/api/?name=John+Doe&size=256&background=3b82f6&color=fff')`,
    },
    {
      check: "SELECT COUNT(*) as count FROM skills",
      insert: `INSERT INTO skills (category, name) VALUES 
        ('Frontend Development', 'React.js'),
        ('Frontend Development', 'Next.js'),
        ('Frontend Development', 'Tailwind CSS'),
        ('Frontend Development', 'TypeScript'),
        ('Frontend Development', 'HTML5'),
        ('Frontend Development', 'CSS3'),
        ('Backend Development', 'Node.js'),
        ('Backend Development', 'Express.js'),
        ('Backend Development', 'PHP'),
        ('Backend Development', 'Laravel'),
        ('Backend Development', 'Python'),
        ('Backend Development', 'RESTful APIs'),
        ('Database & Tools', 'MySQL'),
        ('Database & Tools', 'PostgreSQL'),
        ('Database & Tools', 'MongoDB'),
        ('Database & Tools', 'Git'),
        ('Database & Tools', 'Docker'),
        ('Database & Tools', 'Figma')`,
    },
    {
      check: "SELECT COUNT(*) as count FROM certificates",
      insert: `INSERT INTO certificates (title, issuer, date, image_url) VALUES 
        ('Full Stack Web Development', 'FreeCodeCamp', '2025', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600'),
        ('React Developer Nanodegree', 'Udacity', '2024', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600'),
        ('Advanced CSS and Sass', 'Udemy', '2024', 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=600')`,
    },
    {
      check: "SELECT COUNT(*) as count FROM testimonials",
      insert: `INSERT INTO testimonials (name, role, content, avatar) VALUES 
        ('Sarah Johnson', 'CEO at TechStart', 'An absolute pleasure to work with. Delivered our project ahead of schedule and the code quality was exceptional.', 'https://i.pravatar.cc/150?img=1'),
        ('Michael Chen', 'Product Manager', 'Incredibly talented developer who really understands both the technical and business requirements of a project.', 'https://i.pravatar.cc/150?img=11'),
        ('Emma Davis', 'Creative Director', 'Transformed our design mockups into a flawless, pixel-perfect website with smooth animations. Highly recommended!', 'https://i.pravatar.cc/150?img=5')`,
    },
  ];

  for (const { check, insert } of sampleData) {
    try {
      const count = await new Promise((resolve, reject) => {
        db.query(check, (err, results) => {
          if (err) reject(err);
          else resolve(results[0].count);
        });
      });

      if (count === 0) {
        await new Promise((resolve, reject) => {
          db.query(insert, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
        console.log("✅ Sample data inserted");
      } else {
        console.log("ℹ️  Table already has data, skipping");
      }
    } catch (err) {
      console.error("❌ Error inserting sample data:", err.message);
    }
  }

  console.log("\n🎉 Database setup complete!");
  process.exit(0);
}

setupDatabase();
