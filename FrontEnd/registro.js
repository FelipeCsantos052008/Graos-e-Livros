let nome = document.getElementById("nome")
let email = document.getElementById("email")
let senha = document.getElementById("senha")

let texto = document.getElementById("mensagem")

async function cadastrar() {
  const nomeNovo = String(nome.value)
  const emailNovo = String(email.value)
  const senhaNovo = String(senha.value)
  
  const response = await fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: nomeNovo,
      email: emailNovo,
      senha: senhaNovo
    })
  })

  if (response.ok) {
    mensagem.value = response.body.message
    window.location.href = "index.html"
  } else {
    mensagem.value = "Não foi possivel cadastrar"
  }
}

document.getElementById("cadastrar").addEventListener("click", cadastrar)