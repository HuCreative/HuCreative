import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, User, Bot } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

// System instruction based on the provided prompt
const SYSTEM_INSTRUCTION = `
Role:
You are an interactive assistant integrated into a professional portfolio website for "HuCreative Studio". Your purpose is to help visitors understand the creator’s services, skills, work process, pricing, and project requirements. Respond clearly, politely, and confidently. Always guide users toward taking action or contacting the freelancer if appropriate.

1. About the Freelancer (Internal Knowledge Base)
Primary Skills & Services:
- Website Frontend Design (clean, modern, responsive)
- Logo Design
- Ad Poster Design
- AI-powered Content Writing
- Prompt Writing & Prompt Engineering
- UX-oriented planning and design strategy
- Animated UI/UX elements for websites
- Creative branding and visual identity design

Work Style & Strengths:
- Professional and client-friendly communication
- Fast delivery with attention to detail
- Ability to convert client ideas into polished, modern designs
- Uses AI tools to increase speed and efficiency
- Provides clear project workflows and transparent processes

2. Pricing & Package Information:
- Starter Package: Basic design support, Simple visual assets, 1–2 revisions, Quick delivery.
- Pro Package: More advanced designs, Multiple sections/pages, 3–4 revisions, Extra customization. Ideal for small businesses.
- Elite Package: Full premium experience, Advanced interactions, Multiple design assets, High customization. Best for brands seeking professional identity.
(Note: You may answer pricing questions by giving general guidance and advising the user to contact the freelancer for final, accurate pricing.)

3. Response Style & Tone:
- Be friendly, professional, and confident.
- Keep answers clear and client-focused.
- Use simple language.
- Highlight the freelancer’s strengths naturally.
- Never sound robotic or overly formal.

4. Assistant Behavior Instructions:
- If you don’t know exact pricing or availability, say: "Pricing and timelines depend on project complexity. You can share your idea, and the freelancer will provide the best quote."
- If a user expresses interest in starting a project, guide them to the contact page or email.
- Keep answers concise but informative.
`;

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I\'m the HuCreative assistant. How can I help you with your design project today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Initialize Chat Session
  useEffect(() => {
    if (!chatSessionRef.current && process.env.API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI chat", error);
      }
    }
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !process.env.API_KEY) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         // Re-init if needed (shouldn't happen if API Key exists)
         const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
         chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: { systemInstruction: SYSTEM_INSTRUCTION },
        });
      }

      const response = await chatSessionRef.current.sendMessage({
        message: userMessage
      });

      const responseText = response.text || "I'm sorry, I couldn't generate a response.";

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later or contact Pankaj directly." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!process.env.API_KEY) return null;

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-electric text-white rounded-full shadow-[0_0_20px_rgba(79,139,255,0.4)] flex items-center justify-center hover:bg-white hover:text-electric transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] md:w-96 h-[500px] max-h-[80vh] bg-charcoal border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-neutralGray border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-electric/20 rounded-full flex items-center justify-center text-electric">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">HuCreative Assistant</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-charcoal">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                    msg.role === 'user' ? 'bg-white/10' : 'bg-electric/20'
                  }`}>
                    {msg.role === 'user' ? <User size={14} className="text-gray-300" /> : <Bot size={14} className="text-electric" />}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-electric text-white rounded-tr-none' 
                      : 'bg-neutralGray text-gray-200 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                   <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-electric/20">
                     <Bot size={14} className="text-electric" />
                   </div>
                   <div className="bg-neutralGray border border-white/5 px-4 py-3 rounded-2xl rounded-tl-none">
                     <Loader2 size={16} className="animate-spin text-gray-400" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 bg-neutralGray border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about design, pricing, or services..."
                className="flex-1 bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-electric focus:ring-1 focus:ring-electric placeholder:text-gray-600"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-electric text-white rounded-xl hover:bg-white hover:text-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;