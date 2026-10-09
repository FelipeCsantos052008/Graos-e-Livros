let nome = document.querySelector('[name="nome"]')
let email = document.querySelector('[name="email"]')
let senha = document.querySelector('[name="senha"]')

let texto = document.querySelector('[name="mensagem"]')

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
    window.location.href = "login.html"
  } else {
    mensagem.value = "Não foi possivel cadastrar"
  }
}

document.getElementById("cadastrar").addEventListener("click", cadastrar)