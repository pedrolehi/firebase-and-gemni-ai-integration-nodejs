import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { uploadProcessedData } from "./firebase";
import { initializeFirebaseApp } from "./firebase";
import { initializeGemAI } from "./gemniAi";

const server = Fastify({ logger: true });
initializeFirebaseApp();
const { genAI, model } = initializeGemAI();

if (genAI && model) {
  server.get(
    "/test-upload",
    async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`Entering route.`);
      await uploadProcessedData();
      return "success";
    }
  );

  server.get(
    "/test-ai",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const prompt =
          "Você consegue gerar legendas com minutagem no padrão vtt para este link? https://www.youtube.com/watch?v=xxMVODTcW90";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        return text;
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  const port = 3000;
  const start = async () => {
    try {
      await server.listen({ port: port });
      console.log(`HTTP Server Running at http://localhost:${port}`);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  };

  start();
} else {
  console.error("Failed to initialize GenAI");
}
