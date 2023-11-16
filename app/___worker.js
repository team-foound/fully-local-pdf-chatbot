import { ChatWindowMessage } from "@/schema/ChatWindowMessage";
import { ChatOllama } from "langchain/chat_models/ollama";
import { PromptTemplate, ChatPromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

let model = "ee";
console.log(typeof localStorage);
if (typeof localStorage === "object") {
  model = localStorage.getItem("_model");
}

console.log(model);

const ollama = new ChatOllama({
  baseUrl: "http://localhost:11435",
  temperature: 0.3,
  model: model,
});

const queryVectorStore = async (messages) => {
  const text = messages[messages.length - 1].content;
  const outputParser = new StringOutputParser();

  const llmResult = await ollama.predict(text);

  self.postMessage({
    type: "chunk",
    data: llmResult,
  });

  console.log(llmResult);

  /*
  
    const TEMPLATE = `You are a translator expert`;
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const chain = prompt.pipe(ollama).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: messages.join("\n"),
    input: text,
  });
  
  for await (const chunk of stream) {
    if (chunk) {
      self.postMessage({
        type: "chunk",
        data: chunk,
      });
    }
  }

  self.postMessage({
    type: "complete",
    data: "OK",
  });
*/
  /*
  const systemTemplate =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
const humanTemplate = "{text}";

const chatPrompt = ChatPromptTemplate.fromMessages([
  ["system", systemTemplate],
  ["human", humanTemplate],
]);



  const chain = chatPrompt.pipe(ollama).pipe(outputParser);

  const formattedChatPrompt = await chatPrompt.formatMessages({
    input_language: "English",
    output_language: "French",
    text: text,
  });
  console.log(formattedChatPrompt);



  const stream = await chain.stream({
    chat_history: messages.join("\n"),
    input: text,
    text: text,
    input_language: 'English',
    output_language: 'French',
  });


  for await (const chunk of stream) {
    if (chunk) {
      self.postMessage({
        type: "chunk",
        data: chunk,
      });
    }
  }

  self.postMessage({
    type: "complete",
    data: "OK",
  });
*/
};

// Listen for messages from the main thread
self.addEventListener("message", async (event) => {
  self.postMessage({
    type: "log",
    data: `Received data!`,
  });

  try {
    await queryVectorStore(event.data.messages);
  } catch (e) {
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
