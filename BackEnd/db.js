import mariadb from "mariadb"

const db = mariadb.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: Number(process.env.DB_PORT) || 3306,
    connectTimeout: 100000
})

export default db