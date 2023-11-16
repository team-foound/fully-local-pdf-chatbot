import { ChatWindowMessage } from "@/schema/ChatWindowMessage";
import { ChatOllama } from "langchain/chat_models/ollama";
import { PromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

const ollama = new ChatOllama({
  baseUrl: "http://localhost:11435",
  temperature: 0.3,
  model: "codellama",
});

const queryVectorStore = async (messages: ChatWindowMessage[]) => {
  const text = messages[messages.length - 1].content;
  const outputParser = new StringOutputParser();

  const llmResult = await ollama.predict(text);

  self.postMessage({
    type: "chunk",
    data: llmResult,
  });

  console.log(llmResult);
};

// Listen for messages from the main thread
self.addEventListener("message", async (event: any) => {
  self.postMessage({
    type: "log",
    data: `Received data!`,
  });

  try {
    await queryVectorStore(event.data.messages);
  } catch (e: any) {
    self.postMessage({
      type: "error",
      error: `${e.message}. Make sure you are running Ollama.`,
    });
    throw e;
  }

  self.postMessage({
    type: "complete",
    data: "OK",
  });
});
