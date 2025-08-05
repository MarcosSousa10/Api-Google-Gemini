import readline from "readline";
import { GoogleGenerativeAI } from "@google/generative-ai";

// https://aistudio.google.com/app/apikey
// node index.js
const API_KEY = "AIzaSyBmvEWsFkEnvbUCHcgp119k_jFw7cesffo";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

async function gerarResposta(prompt) {
  const maxTentativas = 3;
  let tentativas = 0;

  while (tentativas < maxTentativas) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      if (error.message.includes("503")) {
        tentativas++;
        console.log(`⚠️ Modelo sobrecarregado. Tentando novamente (${tentativas}/${maxTentativas})...`);
        await new Promise((r) => setTimeout(r, 2000)); 
      } else {
        throw error; 
      }
    }
  }
  throw new Error("Modelo indisponível após várias tentativas.");
}

async function main() {
  console.log("Chat Gemini aberto. Digite sua pergunta ou 'sair' para encerrar.");
  while (true) {
    const perguntaUsuario = await perguntar("> ");
    if (perguntaUsuario.toLowerCase() === "sair") break;

    try {
      const resposta = await gerarResposta(perguntaUsuario);
      console.log("🤖 Resposta:", resposta);
    } catch (error) {
      console.error("❌ Erro:", error.message);
    }
  }

  rl.close();
  console.log("Encerrado.");
}

main();
