const { GoogleGenerativeAI } = require("@google/generative-ai");

const initializeGemAI = () => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return { genAI, model };
  } catch (error) {
    console.error(`Gemni API not initialized.`);
    return { genAI: null, model: null }; // Retornar um objeto com valores nulos
  }
};

export { initializeGemAI };
