
import { SmartContract, Field, method, PublicKey, PrivateKey, Mina } from 'o1js';
import { CreditWorthiness } from './Creditworthiness';

export class AssetTransfer extends SmartContract {
  transferAsset(publicKey: any, recipientPublicKey: string, amount: number) {
      throw new Error('Method not implemented.');
  }
  private creditWorthinessContract: CreditWorthiness;

  constructor(creditWorthinessAddress: PublicKey) {
    super();
    // Initialize the CreditWorthiness contract interface with its address
    this.creditWorthinessContract = new CreditWorthiness();
  }

  @method async transferAssetIfCreditworthy(sender: PublicKey, recipient: PublicKey, amount: Field, senderData: any): Promise<boolean> {
    // First, verify the sender's creditworthiness
    const isCreditworthy = await this.creditWorthinessContract.verifyCreditScore(senderData);

    if (isCreditworthy) {
      // Logic to transfer the asset
      console.log(`Transferring ${amount} from ${sender} to ${recipient}`);
      
      
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
  const sender = new PublicKey(0);
  const recipient = new PublicKey();
  const amount = new Field();
  const senderData = {};

  // Attempt to transfer asset
  const success = await assetTransferContract.transferAssetIfCreditworthy(sender, recipient, amount, senderData);

  if (success) {
    console.log("Asset transferred successfully.");
  } else {
    console.log("Asset transfer failed due to creditworthiness check.");
  }
})();
