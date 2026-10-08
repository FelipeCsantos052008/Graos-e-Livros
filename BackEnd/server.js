import express from "express"
import "dotenv/config"
import routerLogin from "./rotas/acesso.js"

const app = express()

app.use(express.json())
app.use(routerLogin)

app.listen(3000, () => {
    console.log("Coisos")
})