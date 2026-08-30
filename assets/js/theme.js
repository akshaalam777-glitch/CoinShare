/**
 * CoinShare Theme Management
 * File Location: assets/js/theme.js
 */

const ThemeController = {
  STORAGE_KEY: 'coinshare_theme_preference',

  init() {
    const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
    this.applyTheme(savedTheme);
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ThemeController.init();
});
