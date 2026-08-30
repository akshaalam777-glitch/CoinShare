/**
 * CoinShare Earning & Withdrawal Logic
 * File Location: assets/js/coins.js
 */

const CoinSystem = {
  // Application Configurations
  RATES: {
    PER_DOWNLOAD_COINS: 1,      // 1 Download = 1 Coin
    COIN_TO_INR: 0.10,         // 1 Coin = 0.10 INR
    MIN_WITHDRAWAL_COINS: 5000 // Minimum threshold for payout
  },

  STORAGE_KEY: 'coinshare_user_coins',

  // 1. Current Coin Count Fetcher
  getCoins() {
    const savedCoins = localStorage.getItem(this.STORAGE_KEY);
    return savedCoins ? parseInt(savedCoins, 10) : 0;
  },

  // 2. Set Coins & Update System State
  setCoins(amount) {
    localStorage.setItem(this.STORAGE_KEY, amount.toString());
    this.updateUI();
  },

  // 3. Add Coins when someone downloads
  creditCoinsForDownload() {
    const currentCoins = this.getCoins();
    const updatedCoins = currentCoins + this.RATES.PER_DOWNLOAD_COINS;
    this.setCoins(updatedCoins);
  },

  // 4. Conversion Logic (Coins to INR)
  getConvertedValue(coins) {
    return `INR ${(coins * this.RATES.COIN_TO_INR).toFixed(2)}`;
  },

  // 5. BOOLEAN CHECK ENGINE (true/false)
  canUserWithdraw() {
    const currentCoins = this.getCoins();
    
    // Check condition: Is current balance >= Minimum Required Balance?
    const hasSufficientCoins = currentCoins >= this.RATES.MIN_WITHDRAWAL_COINS;
    
    // Returns TRUE if eligible, FALSE if not eligible
    return hasSufficientCoins; 
  },

  // 6. Real-time Dynamic UI Updater
  updateUI() {
    const coinDisplay = document.getElementById('userCoinCount');
    const currencyDisplay = document.getElementById('userCurrencyValue');
    const totalCoins = this.getCoins();

    if (coinDisplay) coinDisplay.innerText = totalCoins.toLocaleString();
    if (currencyDisplay) currencyDisplay.innerText = `(${this.getConvertedValue(totalCoins)})`;

    console.log(`[CoinSystem Status] Balance: ${totalCoins} | Payout Eligible: ${this.canUserWithdraw()}`);
  },

  // 7. Withdrawal Process with True/False Handling
  processWithdrawal() {
    const totalCoins = this.getCoins();
    
    // Perform Boolean Logic Check
    const isEligible = this.canUserWithdraw(); 

    // CASE 1: isEligible === false (User ke paas sufficient coins nahi hain)
    if (isEligible === false) {
      const remainingCoinsNeeded = this.RATES.MIN_WITHDRAWAL_COINS - totalCoins;
      const neededINR = this.getConvertedValue(remainingCoinsNeeded);

      alert(
        `WITHDRAWAL REJECTED: Low Balance\n\n` +
        `Current Balance: ${totalCoins} Coins (${this.getConvertedValue(totalCoins)})\n` +
        `Required Target: ${this.RATES.MIN_WITHDRAWAL_COINS} Coins (INR 500.00)\n\n` +
        `Status: Eligible = FALSE\n` +
        `You need ${remainingCoinsNeeded} more Coins (${neededINR}) to unlock payouts.`
      );
      return;
    }

    // CASE 2: isEligible === true (User ke paas required coins hain)
    if (isEligible === true) {
      const payoutDetails = prompt(
        `WITHDRAWAL UNLOCKED: Eligible = TRUE\n\n` +
        `Available Balance: ${totalCoins} Coins (${this.getConvertedValue(totalCoins)})\n\n` +
        `Enter your UPI ID or Bank Details to process payout:`
      );

      if (payoutDetails && payoutDetails.trim() !== '') {
        alert(
          `SUCCESS!\n\n` +
          `Payout Request of ${this.getConvertedValue(totalCoins)} has been submitted.\n` +
          `Payment details saved: ${payoutDetails}\n\n` +
          `Status: Pending Admin Approval (24 Hours).`
        );
        
        // Balance reset to 0 after payout
        this.setCoins(0);
      }
    }
  }
};

// Automatic load initialization
document.addEventListener('DOMContentLoaded', () => {
  CoinSystem.updateUI();
});
