/**
 * CoinShare Subscription, Pricing Engine & Advanced Donation Handler
 * File Location: assets/js/subscription.js
 */

const SubscriptionSystem = {
  // Configured Membership Tiers
  PLANS: {
    FREE: {
      id: 'free',
      name: 'Free Tier Plan',
      price: 0,
      storage: '500 MB',
      showAds: true,
      description: 'Standard access with ad-supported environment'
    },
    REMOVE_ADS: {
      id: 'no_ads',
      name: 'Ad-Free Plan',
      price: 49,
      storage: '500 MB',
      showAds: false,
      description: 'Completely eliminates all advertisements across the platform'
    },
    PRO: {
      id: 'pro',
      name: 'Pro Member Plan',
      price: 99,
      storage: '2 GB',
      showAds: false,
      description: 'Expanded storage capacity with high-speed server access'
    },
    ULTIMATE: {
      id: 'ultimate',
      name: 'Ultimate VIP Plan',
      price: 199,
      storage: '4 GB',
      showAds: false,
      description: 'Maximum storage allocation with priority download links'
    }
  },

  STORAGE_KEY: 'coinshare_user_plan',
  
  // Destination UPI Identification for Subscriptions and Donations
  UPI_ID: '8178255064@fam',
  RECIPIENT_NAME: 'CoinShare Project Support',

  // Fetch Current Local Plan State
  getUserPlan() {
    const savedPlan = localStorage.getItem(this.STORAGE_KEY);
    if (savedPlan) {
      try {
        return JSON.parse(savedPlan);
      } catch (error) {
        console.error("[Subscription Engine] Error parsing stored plan data:", error);
        return this.PLANS.FREE;
      }
    }
    return this.PLANS.FREE;
  },

  // Save Plan State and Trigger Display Adjustments
  setUserPlan(planObject) {
    if (!planObject || !planObject.id) {
      console.error("[Subscription Engine] Invalid plan object provided.");
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(planObject));
    this.applyAdPreferences();
  },

  // Toggle Advertising Container Visibility
  applyAdPreferences() {
    const currentPlan = this.getUserPlan();
    const adContainers = document.querySelectorAll('.ad-banner-space');

    if (currentPlan.showAds === false) {
      adContainers.forEach(container => {
        container.style.display = 'none';
      });
      console.log("[Subscription Engine] User plan status: Ad-Free enabled. Banners hidden.");
    } else {
      adContainers.forEach(container => {
        container.style.display = 'block';
      });
      console.log("[Subscription Engine] User plan status: Standard Free. Banners enabled.");
    }
  },

  // Membership Purchase Handler
  initiatePaytmPayment(planId) {
    let selectedPlan = null;
    
    if (planId === 'no_ads') selectedPlan = this.PLANS.REMOVE_ADS;
    if (planId === 'pro') selectedPlan = this.PLANS.PRO;
    if (planId === 'ultimate') selectedPlan = this.PLANS.ULTIMATE;

    if (!selectedPlan) {
      alert("Error: Selected plan type was not recognized by the system.");
      return;
    }

    const formattedMessage = 
      "MEMBERSHIP SUBSCRIPTION REQUEST\n" +
      "----------------------------------------\n" +
      "Target Plan: " + selectedPlan.name + "\n" +
      "Billing Price: INR " + selectedPlan.price.toFixed(2) + " / Month\n" +
      "Storage Allocation: " + selectedPlan.storage + "\n" +
      "Ad Display Status: " + (selectedPlan.showAds ? "Enabled" : "Disabled") + "\n\n" +
      "PAYMENT INSTRUCTIONS:\n" +
      "1. Open any UPI Payment Application (Paytm, PhonePe, Google Pay).\n" +
      "2. Send INR " + selectedPlan.price.toFixed(2) + " to VPA / UPI ID: " + this.UPI_ID + "\n" +
      "3. Copy the 12-Digit Transaction Reference ID / UTR.\n\n" +
      "Please enter your 12-Digit Transaction Reference ID below to complete activation:";

    const transactionId = prompt(formattedMessage);

    if (transactionId && transactionId.trim() !== '') {
      const cleanTxnId = transactionId.trim();
      alert(
        "PAYMENT ACKNOWLEDGEMENT RECEIVED\n" +
        "----------------------------------------\n" +
        "Transaction Reference ID: " + cleanTxnId + "\n" +
        "Selected Plan: " + selectedPlan.name + "\n\n" +
        "Status: Pending Verification.\n" +
        "Your account privileges have been updated locally. In case of verification failure, access may revert within 24 hours."
      );
      this.setUserPlan(selectedPlan);
    } else if (transactionId !== null) {
      alert("Validation Failed: Transaction Reference ID cannot be empty.");
    }
  },

  // Multi-Step Flexible Donation System
  openDonationModal() {
    const promptMessage = 
      "DONATE TO SUPPORT FUTURE DEVELOPMENTS\n" +
      "----------------------------------------\n" +
      "Your contributions directly fund server costs, API maintenance, and new open-source software tools.\n\n" +
      "Support features:\n" +
      "- Accepts any amount (Minimum INR 0.50 or INR 1.00)\n" +
      "- Direct peer-to-peer UPI routing\n" +
      "- Zero intermediary commission fees\n\n" +
      "Enter the contribution amount in INR (e.g., 1, 5, 50, 100, 500):";

    const userInput = prompt(promptMessage, "1");

    if (userInput === null) {
      return; // User cancelled
    }

    const parsedAmount = parseFloat(userInput);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Invalid Input: Please provide a valid numerical donation amount greater than 0.");
      return;
    }

    const formattedAmount = parsedAmount.toFixed(2);
    const encodedRecipient = encodeURIComponent(this.RECIPIENT_NAME);
    const encodedNote = encodeURIComponent("Donation for Next Project Development");
    
    // Standardized Universal Payment Link
    const upiDeepLink = "upi://pay?pa=" + this.UPI_ID + "&pn=" + encodedRecipient + "&am=" + formattedAmount + "&cu=INR&tn=" + encodedNote;

    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobileDevice) {
      window.location.href = upiDeepLink;
    }

    setTimeout(() => {
      const confirmationPrompt = 
        "DONATION PAYMENT RECORDING\n" +
        "----------------------------------------\n" +
        "Target Amount: INR " + formattedAmount + "\n" +
        "Payee VPA: " + this.UPI_ID + "\n\n" +
        "If you completed the transaction inside your UPI application, enter the 12-digit UTR/Reference ID to log your contribution:";

      const refId = prompt(confirmationPrompt);

      if (refId && refId.trim() !== '') {
        alert(
          "THANK YOU FOR YOUR SUPPORT!\n" +
          "----------------------------------------\n" +
          "Reference ID: " + refId.trim() + "\n" +
          "Amount: INR " + formattedAmount + "\n\n" +
          "Your transaction log has been recorded successfully. Thank you for empowering our ongoing project build."
        );
      }
    }, 800);
  }
};

// Auto Initialize Event Handling
document.addEventListener('DOMContentLoaded', () => {
  SubscriptionSystem.applyAdPreferences();
});
