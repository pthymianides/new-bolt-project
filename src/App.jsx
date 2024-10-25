// Main application component
    import React, { useState, useEffect } from 'react';
    import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
    import Portfolio from './components/Portfolio';
    import Analysis from './components/Analysis';
    import RiskManagement from './components/RiskManagement';
    import './App.css';
    import { ethers } from 'ethers';
    import VaultABI from './VaultABI.json';

    function App() {
      const [balance, setBalance] = useState(0);
      const [amount, setAmount] = useState(0);
      const [depositType, setDepositType] = useState('erc20');

      const contractAddress = 'YOUR_CONTRACT_ADDRESS';
      const contractABI = VaultABI;

      useEffect(() => {
        const fetchBalance = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          const balance = await contract.balanceOf();
          setBalance(ethers.utils.formatEther(balance));
        };

        fetchBalance();
      }, []);

      const deposit = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        if (depositType === 'erc20') {
          await contract.deposit({ value: ethers.utils.parseEther(amount) });
        } else {
          await contract.deposit(ethers.utils.parseEther(amount), parseInt(amount));
        }
      };

      const changeDepositType = (type) => {
        setDepositType(type);
      };

      return (
        <Router>
          <div className="container">
            <h1>ERC-4626 Vault for Investors</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/">Portfolio</Link>
                </li>
                <li>
                  <Link to="/analysis">Analysis</Link>
                </li>
                <li>
                  <Link to="/risk">Risk Management</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<Portfolio balance={balance} />} />
              <Route
                path="/deposit"
                element={
                  <div>
                    <select value={depositType} onChange={(e) => changeDepositType(e.target.value)}>
                      <option value="erc20">ERC-20</option>
                      <option value="erc1155">ERC-1155</option>
                    </select>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <button onClick={deposit}>Deposit</button>
                  </div>
                }
              />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/risk" element={<RiskManagement />} />
            </Routes>
          </div>
        </Router>
      );
    }

    export default App;
