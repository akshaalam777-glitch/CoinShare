/**
 * CoinShare User Authentication & Profile Handler
 * File Location: assets/js/auth.js
 */

const AuthSystem = {
  USER_KEY: 'coinshare_user_profile',

  getUser() {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveUser(username, email) {
    const user = { username, email, joinedAt: new Date().toISOString() };
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.updateUserUI();
  },

  updateUserUI() {
    const user = this.getUser();
    const profileBtn = document.getElementById('userProfileBtn');
    
    if (profileBtn && user) {
      profileBtn.innerText = `@${user.username}`;
    }
  },

  openLoginModal() {
    const modal = document.getElementById('loginModal');
    const overlay = document.getElementById('appOverlay');
    if (modal && overlay) {
      modal.classList.add('active');
      overlay.classList.add('active');
    }
  },

  closeLoginModal() {
    const modal = document.getElementById('loginModal');
    const overlay = document.getElementById('appOverlay');
    if (modal && overlay) {
      modal.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthSystem.updateUserUI();
});
