import mysql from "mysql2/promise";

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

const connection = await mysql.createConnection({
  host: required("DB_HOST"),
  database: required("DB_NAME"),
  user: required("DB_USER"),
  password: required("DB_PASSWORD"),
  charset: "utf8mb4",
});

try {
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS journal_posts (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
      owner_email VARCHAR(254) NOT NULL,
      title VARCHAR(180) NOT NULL,
      slug VARCHAR(190) NOT NULL,
      category VARCHAR(80) NOT NULL,
      published_at DATE NOT NULL,
      excerpt VARCHAR(600) NOT NULL,
      body MEDIUMTEXT NOT NULL,
      status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE KEY journal_posts_slug_unique (slug),
      KEY journal_posts_owner_updated (owner_email, updated_at),
      KEY journal_posts_status_published (status, published_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log("Journal database is ready.");
} finally {
  await connection.end();
}
