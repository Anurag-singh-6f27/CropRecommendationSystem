import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import axios from 'axios';


const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${GEMINI_API_KEY}`;

//Retry
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;

// Define the shape of the API response
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello! I am AgroBot. Ask me anything about crops or soil in your region.',
      createdAt: new Date(),
      user: { _id: 2, name: 'AgroBot' },
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Helper function to delay execution
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Handle sending messages
  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    const userMessage = newMessages[0].text;
    setIsTyping(true);

    let lastError: any = null;

    // Retry Loop
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const requestBody = {
          contents: [{
            parts: [{
              text: `You are an expert agricultural assistant for farmers in India. Your name is AgroBot. Answer the following question concisely and helpfully: "${userMessage}"`
            }]
          }],
        };

        const response = await axios.post<GeminiResponse>(API_URL, requestBody);
        // Add a safe check to prevent crashes if the response structure is unexpected
        const botResponseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that response.";

        const botMessage: IMessage = {
          _id: Math.random().toString(36).substring(7),
          text: botResponseText,
          createdAt: new Date(),
          user: { _id: 2, name: 'AgroBot' },
        };
        
        setMessages((prevMessages) => GiftedChat.append(prevMessages, [botMessage]));
        
        lastError = null;
        break;

      } catch (error: unknown) {
        lastError = error;
        // This is a robust check that looks for the 'isAxiosError' property on the error object itself.
        const isNetworkError = (error as any)?.isAxiosError && (error as any).response?.status === 503;

        if (isNetworkError && attempt < MAX_RETRIES) {
          console.log(`Attempt ${attempt} failed with 503. Retrying in ${attempt}s...`);
          await sleep(INITIAL_DELAY_MS * attempt);
        } else {
          break;
        }
      }
    }

    // Final Error Handling
    if (lastError) {
      // Use the same robust check here.
      if ((lastError as any)?.isAxiosError) {
        const axiosError = lastError as { response?: { data: any }, message: string };
        console.error('Error sending message to Gemini:', axiosError.response ? axiosError.response.data : axiosError.message);
      } else {
        console.error('An unexpected error occurred:', lastError);
      }

      const errorMessage: IMessage = {
        _id: Math.random().toString(36).substring(7),
        text: 'Sorry, the server is busy right now. Please try again in a moment.',
        createdAt: new Date(),
        user: { _id: 2, name: 'AgroBot' },
      };
      setMessages((prevMessages) => GiftedChat.append(prevMessages, [errorMessage]));
    }
    
    setIsTyping(false);
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: 1 }}
        placeholder="Type your question for AgroBot..."
        isTyping={isTyping}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    width: '100%', 
    backgroundColor: '#FFFFFF' 
  },
});

export default ChatBot;

