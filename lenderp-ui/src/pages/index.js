
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {

    // Function to handle connecting to Mina Snap
    const handleConnectMinaSnap = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log("MetaMask is installed.");
  
        // Replace 'yourSnapId' with the actual Snap ID for Mina
        const snapId = 'yourSnapId';
        
        try {
          // Request to add the Mina Snap
          await window.ethereum.request({
            method: 'wallet_enable',
            params: [{
              wallet_snap: { [snapId]: {} },
            }],
          });
          console.log("Mina Snap connected or enabled.");
        } catch (error) {
          console.error("Error connecting to Mina Snap:", error);
        }
      } else {
        alert("MetaMask is not installed. Please install MetaMask to use this feature.");
      }
    };


  return (
    <div className={styles.container}>
      <Head>
        <title>P2P Lending Platform with Mina Protocol</title>
        <meta name="description" content="Secure and private P2P lending powered by Mina Protocol" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Our Secure P2P Lending Platform
        </h1>

        <p className={styles.description}>
          Leveraging the Mina Protocol for Maximum Privacy and Security
        </p>

        {/* Connect to Mina Snap Button */}
        <button onClick={handleConnectMinaSnap} className={styles.minaSnapButton}>
          Connect Mina
        </button>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Creditworthiness</h2>
            <p>Prove your financial reliability securely without exposing your personal data.</p>
            <Link href="/apply-loan">
              <button className={styles.button}>Apply for a Loan</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h2>Marketplace</h2>
            <p>Coming soon</p>
            <Link href="/privacy-policy">
              <button className={styles.button}>Marketplace</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h2>Asset Transfer</h2>
            <p>Securely transfer assets as collateral or for repayments without revealing details.</p>
            <Link href="/transfer-assets">
              <button className={styles.button}>Manage Assets</button>
            </Link>
          </div>

          <div className={styles.card}>
            <h2>Dashboard</h2>
            <p>Manage your loans, repayments, and view your financial metrics in one place.</p>
            <Link href="/dashboard">
              <button className={styles.button}>Go to Dashboard</button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
