// src/components/WalletView.tsx

import React, { useState } from 'react';
import { hederaService, AccountInfo } from '../services/hederaService';
import './WalletView.css';

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const WalletView: React.FC = () => {
  const [accountId, setAccountId] = useState('');
  const [walletInfo, setWalletInfo] = useState<AccountInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!accountId) return;

    setIsLoading(true);
    setError(null);

    try {
      const info = await hederaService.getAccountInfo(accountId);
      setWalletInfo(info);
    } catch (err) {
      setError('Failed to fetch account information. Please check the account ID and try again.');
      setWalletInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wallet-view">
      <h1>Wallet View</h1>
      <div className="search-container">
        <input
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          placeholder="Enter Hedera Account ID"
        />
        <button onClick={handleSearch} disabled={isLoading}>
          <SearchIcon />
        </button>
      </div>

      {isLoading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {walletInfo && (
        <div className="wallet-info">
          <h2>Wallet Information</h2>
          <p><strong>Account ID:</strong> {walletInfo.accountId}</p>
          <p><strong>Balance:</strong> {walletInfo.balance} tinybar</p>
          <h3>Token Balances</h3>
          {walletInfo.tokenBalances.length > 0 ? (
            <ul>
              {walletInfo.tokenBalances.map((token) => (
                <li key={token.tokenId}>
                  {token.tokenId}: {token.balance.toString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No token balances found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletView;