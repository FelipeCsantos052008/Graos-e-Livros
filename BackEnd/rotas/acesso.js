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
  
      const senhaHash = await bcrypt.hash(senha, 10)
      
      const criacao = await db.query("INSERT INTO usuarios(nome,email,senha) VALUES (?,?,?)", [nome, email, senhaHash])
  
      if (criacao.affectedRows > 0) {
          return res.status(200).json({ message: "Usúario criado com sucesso"})
      }
  
      return res.status(500).json({ message: "não foi possivel cadastrar" })
    } catch (erro) {
      if (erro.code == "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Usúario já cadastrado"})
      }
    }
})

router.post("/login", async (req,res) => {
  try {
    const { email, senha } = req.body
    if (!email || !senha) {
      return res.status(400).json({message: "Faltando informações"})
    }
    const query = await db.query("SELECT * FROM usuarios WHERE email = ?", [email])
    if (query.length === 0) {
      return res.status(400).json({message: "Usúario inexistente"})
    }
    
  } catch (erro) {
    console.log(erro)
  }
})

export default router