// Import necessary components from your smart contract library
import { SmartContract, Field, method, PublicKey, PrivateKey, Mina } from 'o1js';
import { CreditWorthiness } from './Creditworthiness';

class AssetTransfer extends SmartContract {
  private creditWorthinessContract: CreditWorthiness;

  constructor(creditWorthinessAddress: PublicKey) {
    super();
    // Initialize the CreditWorthiness contract interface with its address
    this.creditWorthinessContract = new CreditWorthiness(creditWorthinessAddress);
  }

  @method async transferAssetIfCreditworthy(sender: PublicKey, recipient: PublicKey, amount: Field, senderData: any): Promise<boolean> {
    // First, verify the sender's creditworthiness
    const isCreditworthy = await this.creditWorthinessContract.verifyCreditScore(senderData);

    if (isCreditworthy) {
      // Logic to transfer the asset
      console.log(`Transferring ${amount} from ${sender} to ${recipient}`);
      // You would include the actual transfer logic here, which might involve updating state to reflect the transfer
      
      return true; // Indicate success
    } else {
      console.log("Sender is not creditworthy.");
      return false; // Transfer not allowed
    }
  }
}

// Example usage
(async () => {
  const creditWorthinessAddress = /* Address of the deployed CreditWorthiness contract */;
  const assetTransferContract = new AssetTransfer(creditWorthinessAddress);

  // Example data - replace with actual data
  const sender = new PublicKey(/* sender's public key */);
  const recipient = new PublicKey(/* recipient's public key */);
  const amount = new Field(/* transfer amount */);
  const senderData = {/* sender's data for credit score verification */};

  // Attempt to transfer asset
  const success = await assetTransferContract.transferAssetIfCreditworthy(sender, recipient, amount, senderData);

  if (success) {
    console.log("Asset transferred successfully.");
  } else {
    console.log("Asset transfer failed due to creditworthiness check.");
  }
})();
