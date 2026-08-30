/**
 * CoinShare Subscription & Ad Control Engine
 * File Location: assets/js/subscription.js
 */

const SubscriptionSystem = {
  PLANS: {
    FREE: { id: 'free', name: 'Free Plan', price: 0, storage: '500 MB', showAds: true },
    REMOVE_ADS: { id: 'no_ads', name: 'Ad-Free Plan', price: 49, storage: '500 MB', showAds: false },
    PRO: { id: 'pro', name: 'Pro Plan', price: 99, storage: '2 GB', showAds: false },
    ULTIMATE: { id: 'ultimate', name: 'Ultimate Plan', price: 199, storage: '4 GB', showAds: false }
  },

  STORAGE_KEY: 'coinshare_user_plan',

  getUserPlan() {
    const savedPlan = localStorage.getItem(this.STORAGE_KEY);
    return savedPlan ? JSON.parse(savedPlan) : this.PLANS.FREE;
  },

  setUserPlan(planObject) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(planObject));
    this.applyAdPreferences();
  },

  applyAdPreferences() {
    const currentPlan = this.getUserPlan();
    const adContainers = document.querySelectorAll('.ad-banner-space');

    if (currentPlan.showAds === false) {
      adContainers.forEach(container => container.style.display = 'none');
      console.log("[Subscription] Ads Disabled for user.");
    } else {
      adContainers.forEach(container => container.style.display = 'block');
      console.log("[Subscription] Ads Enabled for user.");
    }
  },

  initiatePaytmPayment(planId) {
    let selectedPlan = null;
    if (planId === 'no_ads') selectedPlan = this.PLANS.REMOVE_ADS;
    if (planId === 'pro') selectedPlan = this.PLANS.PRO;
    if (planId === 'ultimate') selectedPlan = this.PLANS.ULTIMATE;

    if (!selectedPlan) return;

    const upiDetails = "8888888888@paytm"; // Change to your actual Paytm UPI ID
    const txnId = prompt(
      `UPGRADE TO ${selectedPlan.name.toUpperCase()}\n\n` +
      `Price: ₹${selectedPlan.price}/month\n` +
      `Features: Storage ${selectedPlan.storage} | Ads: ${selectedPlan.showAds ? 'YES' : 'NO'}\n\n` +
      `Pay ₹${selectedPlan.price} to Paytm UPI: ${upiDetails}\n\n` +
      `Enter Paytm/UPI Transaction Reference ID after payment:`
    );

    if (txnId && txnId.trim() !== '') {
      alert(`Payment Submitted!\nTransaction ID: ${txnId}\n\nYour ${selectedPlan.name} will be activated after verification.`);
      this.setUserPlan(selectedPlan);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  SubscriptionSystem.applyAdPreferences();
});
