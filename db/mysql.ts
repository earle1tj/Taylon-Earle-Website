import mysql from "mysql2/promise";

const globalForMysql = globalThis as unknown as {
  journalPool?: mysql.Pool;
};

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export function getJournalPool() {
  if (!globalForMysql.journalPool) {
    globalForMysql.journalPool = mysql.createPool({
      host: required("DB_HOST"),
      database: required("DB_NAME"),
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      connectionLimit: 5,
      enableKeepAlive: true,
      charset: "utf8mb4",
      timezone: "Z",
    });
  }

  return globalForMysql.journalPool;
}
