/**
 * CoinShare AI Assistant Engine
 * File Location: assets/js/ai-bot.js
 */

const AIChatbot = {
  async sendMessage() {
    const inputField = document.getElementById('aiInputField');
    const chatHistory = document.getElementById('aiChatHistory');
    
    if (!inputField || !chatHistory) return;
    
    const userText = inputField.value.trim();
    if (!userText) return;

    // Display User Message
    this.appendMessage('user', userText);
    inputField.value = '';

    // Display Bot Loading State
    const botMsgId = this.appendMessage('bot', 'Thinking...');

    try {
      const response = await this.getAIResponse(userText);
      this.updateMessage(botMsgId, response);
    } catch (error) {
      this.updateMessage(botMsgId, "Sorry, I couldn't process your request right now. Please check your API key.");
    }
  },

  appendMessage(sender, text) {
    const chatHistory = document.getElementById('aiChatHistory');
    const msgDiv = document.createElement('div');
    const msgId = 'msg-' + Date.now();
    
    msgDiv.id = msgId;
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.innerText = text;
    
    chatHistory.appendChild(msgDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    return msgId;
  },

  updateMessage(msgId, text) {
    const msgDiv = document.getElementById(msgId);
    if (msgDiv) {
      msgDiv.innerText = text;
    }
  },

  async getAIResponse(prompt) {
    // Basic AI response engine simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`CoinShare AI: You searched for "${prompt}". Files related to this will be featured soon!`);
      }, 800);
    });
  }
};
