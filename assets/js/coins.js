/**
 * CoinShare Earning & Coin Engine
 * File Location: assets/js/coins.js
 */

const CoinSystem = {
  RATES: {
    PER_DOWNLOAD_COINS: 1,
    COIN_TO_INR: 0.10,
    MIN_WITHDRAWAL_COINS: 5000
  },

  STORAGE_KEY: 'coinshare_user_coins',

  getCoins() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  },

  setCoins(amount) {
    localStorage.setItem(this.STORAGE_KEY, amount.toString());
    this.updateUI();
  },

  creditCoinsForDownload() {
    const current = this.getCoins();
    this.setCoins(current + this.RATES.PER_DOWNLOAD_COINS);
  },

  getConvertedValue(coins) {
    return `₹${(coins * this.RATES.COIN_TO_INR).toFixed(2)}`;
  },

  updateUI() {
    const coinDisplay = document.getElementById('userCoinCount');
    const currencyDisplay = document.getElementById('userCurrencyValue');
    const totalCoins = this.getCoins();

    if (coinDisplay) coinDisplay.innerText = totalCoins.toLocaleString();
    if (currencyDisplay) currencyDisplay.innerText = `(${this.getConvertedValue(totalCoins)})`;
  },

  processWithdrawal() {
    const totalCoins = this.getCoins();
    if (totalCoins < this.RATES.MIN_WITHDRAWAL_COINS) {
      alert(`Minimum payout requirement is ${this.RATES.MIN_WITHDRAWAL_COINS} Coins (₹500).\nYour current balance: ${totalCoins} Coins (${this.getConvertedValue(totalCoins)}).`);
      return;
    }

    const details = prompt("Enter UPI ID or Bank Account details for payment:");
    if (details && details.trim()) {
      alert(`Payout request submitted for ${this.getConvertedValue(totalCoins)}. Processing time: 24-48 hours.`);
      this.setCoins(0);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  CoinSystem.updateUI();
});
