import { Mina, Account, PrivateKey } from 'o1js';

import { CreditWorthiness, AssetTransfer } from './';

let userAccount: Account;
let userPrivateKey: PrivateKey;

async function submitCreditScore(creditScore: number) {
    const creditWorthiness = new CreditWorthiness();
    
    // Interact with the contract
    try {
      await creditWorthiness.submitCreditScore(userAccount.publicKey, creditScore);
      console.log('Credit score submitted successfully.');
    } catch (error) {
      console.error('Failed to submit credit score:', error);
    }
  }
  
  // Function to check if a user is creditworthy before performing an asset transfer
  async function transferAssetIfCreditworthy(recipientPublicKey: string, amount: number) {
    const assetTransfer = new AssetTransfer(0);
    
    // Assume a function to check creditworthiness (could be a contract call)
    const isCreditworthy = true; // Simplified for demonstration
    
    if (isCreditworthy) {
      try {
        await assetTransfer.transferAsset(userAccount.publicKey, recipientPublicKey, amount);
        console.log('Asset transferred successfully.');
      } catch (error) {
        console.error('Failed to transfer asset:', error);
      }
    } else {
      console.log('User is not creditworthy. Asset transfer cancelled.');
    }
  }
  
  // Export functions for use elsewhere in your application
  export { submitCreditScore, transferAssetIfCreditworthy };