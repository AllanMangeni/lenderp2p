
import { SmartContract, Field, method, PublicKey, State } from 'o1js'; 

export class CreditWorthiness extends SmartContract {
  // Assume each user's credit score is stored in a map-like structure, with their public key as the key
  @State(Field) private userCreditScores: Map<PublicKey, Field>;

  constructor() {
    super();
    this.userCreditScores = new Map();
  }

  @method async submitCreditScore(userPublicKey: PublicKey, creditScore: Field): Promise<void> {
    
    this.userCreditScores.set(userPublicKey, creditScore);
  }

  @method async verifyCreditScore(userPublicKey: PublicKey, requiredScore: Field): Promise<boolean> {
    const userScore = this.userCreditScores.get(userPublicKey) || new Field(0); // Default to 0 if not found
    return userScore.gte(requiredScore);
  }
}


(async () => {
  const creditWorthinessContract = new CreditWorthiness();
  
  // Example user data
  const userPublicKey = new PublicKey('userPublicKeyHere');
  const userCreditScore = new Field(700); // Example credit score
  const requiredScore = new Field(650); // The minimum required score


  await creditWorthinessContract.submitCreditScore(userPublicKey, userCreditScore);

  // Verify if a user meets the required credit score
  const isCreditworthy = await creditWorthinessContract.verifyCreditScore(userPublicKey, requiredScore);
  console.log(`Is user creditworthy? ${isCreditworthy}`);
})();
