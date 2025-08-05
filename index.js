import { GoogleGenerativeAI } from "@google/generative-ai";

// https://aistudio.google.com/app/apikey
const API_KEY = "";

// 🔧 Inicializa o cliente Gemini
const genAI = new GoogleGenerativeAI(API_KEY);

// 🚀 Função principal
async function executarGeminiFlash() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent("Como criar uma ");
    const response = await result.response;
    console.log("✅ Resposta:\n", response.text());
  } catch (error) {
    console.error("❌ Erro ao gerar conteúdo:", error.message);
  }
}

// ▶️ Executa
executarGeminiFlash();
