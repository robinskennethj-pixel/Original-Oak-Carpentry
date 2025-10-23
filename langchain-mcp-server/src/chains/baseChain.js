import { ChatOpenAI } from "@langchain/openai";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";

export class BaseChain {
  constructor() {
    this.llm = null;
    this.memory = null;
    this.chains = new Map();
  }

  async initialize() {
    // Initialize LLM with fallback options
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: process.env.MODEL_NAME || "gpt-3.5-turbo",
      temperature: 0.1,
      maxTokens: 2000,
    });

    this.memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history"
    });

    console.log('LangChain components initialized');
  }

  async createChain(systemPrompt, humanPrompt) {
    const prompt = ChatPromptTemplate.fromMessages([
      SystemMessagePromptTemplate.fromTemplate(systemPrompt),
      new MessagesPlaceholder("chat_history"),
      HumanMessagePromptTemplate.fromTemplate(humanPrompt),
    ]);

    return new LLMChain({
      llm: this.llm,
      prompt,
      memory: this.memory,
    });
  }

  async runChain(chainType, input) {
    if (!this.llm) {
      throw new Error('LLM not initialized');
    }

    let chain = this.chains.get(chainType);

    if (!chain) {
      const { systemPrompt, humanPrompt } = this.getPromptTemplates(chainType);
      chain = await this.createChain(systemPrompt, humanPrompt);
      this.chains.set(chainType, chain);
    }

    const response = await chain.call(input);
    return response.text;
  }

  getPromptTemplates(chainType) {
    const templates = {
      summarization: {
        systemPrompt: `You are a helpful assistant that creates concise and accurate summaries.
        Focus on the main points and key information while maintaining the original meaning.`,
        humanPrompt: `Please summarize the following text. Keep the summary under {max_length} characters if specified.

        Text: {text}

        Summary:`
      },
      qa: {
        systemPrompt: `You are a helpful assistant that answers questions based on the provided context.
        If the context doesn't contain enough information to answer the question, say so.
        Be precise and use the context to support your answers.`,
        humanPrompt: `Context: {context}

        Question: {question}

        Answer based on the context:`
      },
      classification: {
        systemPrompt: `You are a classification assistant. Classify the given text into one of the provided categories.
        If the text doesn't clearly fit any category, choose the most appropriate one and explain your reasoning.`,
        humanPrompt: `Categories: {categories}

        Text to classify: {text}

        Classification and reasoning:`
      },
      translation: {
        systemPrompt: `You are a professional translator. Translate the text accurately while maintaining natural phrasing in the target language.`,
        humanPrompt: `Translate the following text to {target_language}.
        {source_language ? 'The source language is ' + source_language + '.' : 'Detect the source language automatically.'}

        Text: {text}

        Translation:`
      },
      code_analysis: {
        systemPrompt: `You are an expert code analyst. Analyze the given code and provide insights about its functionality, potential issues, and improvements.`,
        humanPrompt: `Language: {language}

        Code: {code}

        Analysis:`
      }
    };

    return templates[chainType] || templates.qa;
  }

  async directLLMCall(messages) {
    if (!this.llm) {
      throw new Error('LLM not initialized');
    }

    const response = await this.llm.invoke(messages);
    return response.content;
  }
}