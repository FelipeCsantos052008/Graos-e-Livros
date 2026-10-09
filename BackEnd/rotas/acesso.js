import express from "express"
import db from "../db.js"
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/cadastro", async (req,res) => {
    try {
      const { nome, email, senha } = req.body
  
      if (!nome || !email || !senha) {
          return res.status(400).json({message: "Faltando informações"})
      }
      
      const resposta = await db.query("SELECT email FROM usuarios WHERE email = ?", [email])
  
      if (resposta.length > 0) {
          return res.status(409).json({ message: "Usúario já cadastrado"})
      }
  
      const senhaHash = await bcrypt.hash(senha, 10)
      
      const criacao = await db.query("INSERT INTO usuarios(nome,email,senha) VALUES (?,?,?)", [nome, email, senhaHash])
  
      if (criacao.affectedRows > 0) {
          return res.status(200).json({ message: "Usúario criado com sucesso"})
      }
  
      return res.status(500).json({ message: "não foi possivel cadastrar" })
    } catch (erro) {
      console.log(erro)
    }
})

export default router