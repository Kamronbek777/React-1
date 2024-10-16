import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [balance, setBalance] = useState(2309341);
  const [clicks, setClicks] = useState(1307);
  const [boostLevel, setBoostLevel] = useState(1);
  const [boostPrice, setBoostPrice] = useState(100000);
  const [isBoosting, setIsBoosting] = useState(false);
  const [boostTime, setBoostTime] = useState(0);
  const boostIntervalRef = useRef(null);

  const [coinAmount, setCoinAmount] = useState(0);
  const [currentRank, setCurrentRank] = useState({ rank: 1, threshold: 100 });
  const ranks = [
    { threshold: 100, rank: 1 },
    { threshold: 500, rank: 2 },
    { threshold: 1000, rank: 3 },
    { threshold: 2500, rank: 4 },
    { threshold: 5000, rank: 5 },
    { threshold: 10000, rank: 6 },
    { threshold: 20000, rank: 7 },
    { threshold: 50000, rank: 8 },
    { threshold: 100000, rank: 9 },
    { threshold: Infinity, rank: 10 }
  ];

  const updateRank = () => {
    const currentRank = ranks.find(rank => coinAmount < rank.threshold);
    setCurrentRank(currentRank);
  };

  useEffect(() => {
    updateRank();
  }, [coinAmount]);

  const handleClick = () => {
    setBalance((prevBalance) => prevBalance + 1);
    setClicks((prevClicks) => prevClicks + 1);
  };

  const handleBoostClick = () => {
    if (balance >= boostPrice) {
      setBalance((prevBalance) => prevBalance - boostPrice);
      setBoostLevel((prevBoostLevel) => prevBoostLevel + 1);
      setBoostPrice((prevBoostPrice) => prevBoostPrice * 2);
      setIsBoosting(true);
      setBoostTime(10);

      if (boostIntervalRef.current) {
        clearInterval(boostIntervalRef.current);
      }

      boostIntervalRef.current = setInterval(() => {
        setBoostTime((prevBoostTime) => prevBoostTime - 1);
        setBalance((prevBalance) => prevBalance + boostLevel * 100);
      }, 1000);
    }
  };

  useEffect(() => {
    if (boostTime === 0 && isBoosting) {
      clearInterval(boostIntervalRef.current);
      setIsBoosting(false);
    }
  }, [boostTime, isBoosting, boostLevel]);

  useEffect(() => {
    return () => {
      clearInterval(boostIntervalRef.current);
    };
  }, []);

  return (
    <div className="app-container">
          <div className="app-container">
      <header className="header">
        <div className="legendary-status">
          <span className="legendary-text">Legendary</span>
          <span className="legendary-level">7/10</span>
        </div>
        <div className="profit-info">
          <span className="profit-per-hour">Profit per hour</span>
          <span className="profit-amount">$ +550.65K</span>
        </div>
      </header>

      <div className="daily-tasks">
        <div className="task">
          <img src="https://via.placeholder.com/150" alt="Daily Reward" />
          <span className="task-title">Daily reward</span>
          <span className="task-time">03:00</span>
        </div>
        <div className="task">
          <img src="https://via.placeholder.com/150" alt="Daily Cipher" />
          <span className="task-title">Daily cipher</span>
          <span className="task-time">22:00</span>
        </div>
        <div className="task">
          <img src="https://via.placeholder.com/150" alt="Daily Combo" />
          <span className="task-title">Daily combo</span>
          <span className="task-time">15:00</span>
        </div>
      </div>

      <div className="balance">
        <span className="balance-amount">${balance.toLocaleString()}</span>
      </div>

      <div className="clicker" onClick={handleClick}>
        <img src="https://hamsterkombat.me/hamster-kombat-coin.png" alt="Hamster" className="hamster" />
        <span className={`clicker-text ${isBoosting ? 'boosting' : ''}`}>
          {isBoosting ? `Boosting x${boostLevel}` : ''}
        </span>
      </div>

      <div className="boost-info">
        <span className="energy-count">{clicks}/7000</span>
        <button className="boost-button" onClick={handleBoostClick}>
          Boost
        </button>
      </div>

      <footer className="footer">
        <button className="footer-button">
          <img src="https://via.placeholder.com/50" alt="Exchange" />
          Exchange
        </button>
        <button className="footer-button">
          <img src="https://via.placeholder.com/50" alt="Mine" />
          Mine
        </button>
        <button className="footer-button">
          <img src="https://via.placeholder.com/50" alt="Friends" />
          Friends
        </button>
        <button className="footer-button">
          <img src="https://via.placeholder.com/50" alt="Earn" />
          Earn
        </button>
        <button className="footer-button">
          <img src="https://via.placeholder.com/50" alt="Airdrop" />
          Airdrop
        </button>
      </footer>
    </div>
    </div>
  );
}

export default App;