import { SmartContract, Field, state, State, method, PrivateKey, PublicKey, Mina } from 'o1js';

class CreditWorthiness extends SmartContract {
  @state(Field) private creditScoreThreshold = State<Field>();

  constructor(initialState: { creditScoreThreshold: Field }) {
    super();
    this.creditScoreThreshold.set(initialState.creditScoreThreshold);
  }

  @method async verifyCreditScore(creditScore: Field): Promise<boolean> {
    const threshold = await this.creditScoreThreshold.get();
    return creditScore.gte(threshold);
  }
}

// Example usage
(async () => {
  // Assuming you have a deployed instance of the contract
  const privateKey = PrivateKey.random();
  const publicKey = privateKey.toPublicKey();
  const contract = new CreditWorthiness({ creditScoreThreshold: new Field(650) });

  Mina.setActiveInstance(new Mina.LocalBlockchain());
  await contract.deploy({ from: publicKey });

  // Simulate verifying a credit score
  const isCreditworthy = await contract.verifyCreditScore(new Field(700));
  console.log('Is creditworthy:', isCreditworthy);
})();
