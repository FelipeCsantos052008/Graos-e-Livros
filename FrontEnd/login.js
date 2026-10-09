let email = document.querySelector('[name="email"]')
let senha = document.querySelector('[name="senha"]')

let texto = document.querySelector('[name="mensagem"]')

const form = document.getElementById("form")

async function logar(event) {
  event.preventDefault()

  if (localStorage.getItem("token") !== null) {
    texto.value = "Já logado"
    window.location.href = "index.html"
    return
  }
  
  try {
    const emailNovo = String(email.value)
    const senhaNovo = String(senha.value)
    
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailNovo,
        senha: senhaNovo
      })
    })

    const dados = await response.json()
    
    if (response.ok) {
      localStorage.setItem("token", dados.token)
      window.location.href = "index.html"
    } else {
      throw new Error(dados.message || "Erro")
    }
  } catch (erro) {
    console.log(erro)
  }
}

form.addEventListener("submit",logar)