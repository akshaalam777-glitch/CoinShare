/**
 * CoinShare Application Configuration
 * File Location: assets/js/config.js
 */

const Config = {
  GEMINI_API_KEY_STORAGE: 'coinshare_gemini_key',

  getGeminiApiKey() {
    return localStorage.getItem(this.GEMINI_API_KEY_STORAGE) || '';
  },

  setGeminiApiKey(key) {
    if (key && key.trim() !== '') {
      localStorage.setItem(this.GEMINI_API_KEY_STORAGE, key.trim());
      return true;
    }
    return false;
  },

  promptForApiKey() {
    const existingKey = this.getGeminiApiKey();
    const inputKey = prompt("Enter your Gemini API Key for AI Assistant:", existingKey);
    if (inputKey !== null) {
      this.setGeminiApiKey(inputKey);
      alert("API Key updated successfully.");
    }
  }
};
