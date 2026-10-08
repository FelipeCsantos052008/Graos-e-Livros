import mariadb from "mariadb"

const db = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

export default db