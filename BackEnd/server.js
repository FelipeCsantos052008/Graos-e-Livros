import express from "express"
import "dotenv/config"
import routerLogin from "./rotas/acesso.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())
app.use(routerLogin)

app.listen(process.env.PORT, () => {
    console.log("Rodando na porta " + process.env.PORT)
})