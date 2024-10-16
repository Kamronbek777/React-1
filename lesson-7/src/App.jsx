import React, { useEffect, useState } from "react";

const database = [
  { name: "Doni kazyol", profit: 10, price: 1500, lvl: 0 },
  { name: "Anivar kazyol", profit: 20, price: 2500, lvl: 1 },
  { name: "Akbar kazyol", profit: 30, price: 4700, lvl: 2 },
  { name: "Bekzod krasavchik", profit: 100000, price: 10, lvl: 10 },
];
const reward = [
  {name: "10", profit: 99999, price:1}
]
const App = () => {
  // hooks
  const [rank, setRank] = useState(0);
  const [perHour, setPerHour] = useState(10);
  const [balance, setBalance] = useState(() => {
    let localStorageItem = JSON.parse(localStorage.getItem("balance") || 0);
    return localStorageItem;
  });

  const [point, setPoint] = useState(1);

  useEffect(() => {
    // rank
  }, []);

  useEffect(() => {
    // per hour
  }, []);

  useEffect(() => {
    localStorage.setItem("balance", JSON.stringify(balance));
  }, [balance]);

  useEffect(() => {
    // point
  }, []);

  const handleRankChange = (newBalance) => {
    if (newBalance >= 180000000000) {
      setRank(10);
    } else if (newBalance >= 10000000000) {
      setRank(9);
    } else if (newBalance >= 1000000000) {
      setRank(8);
    } else if (newBalance >= 500000000) {
      setRank(7);
    } else if (newBalance >= 100000000) {
      setRank(6);
    } else if (newBalance >= 20000000) {
      setRank(5);
    } else if (newBalance >= 10000000) {
      setRank(4);
    } else if (newBalance >= 1000000) {
      setRank(3);
    } else if (newBalance >= 250000) {
      setRank(2);
    } else if (newBalance >= 5000) {
      setRank(1);
    } else {
      setRank(0);
    }
  };

  const buyHandler = (lvl, price, profit) => {
    if (lvl <= rank) {
      if (balance >= price) {
        setBalance((prev) => prev - price);
        setPerHour((prev) => prev + profit);
      } else {
        alert("You don't have enough balance!");
      }
    } else {
      alert("You don't have enough rank to buy this item!");
    }
  };

  useEffect(() => {
    handleRankChange(balance);
  }, [balance]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalance((prev) => prev + perHour);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [perHour]);

  const checkRank = () => {
    switch (rank) {
      case 0:
        return "Bronze";
      case 1:
        return "Silver";
      case 2:
        return "Gold";
      case 3:
        return "Platinum";
      case 4:
        return "Diamond";
      case 5:
        return "Epic";
      case 6:
        return "Legendary";
      case 7:
        return "Master";
      case 8:
        return "Grand Master";
      case 9:
        return "Lord";
      case 10:
        return "Creator";
      default:
        return "Unknown";
    }
  };

  const handlerClick = () => {
    setBalance((prev) => prev + point);
  };

  return (
    <div className="container max-w-[80%] mx-auto py-5">
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-yellow-500 p-8 rounded-2xl flex items-center justify-between">
        <div className="flex-1">
          <p className="font-bold text-white text-2xl tracking-widest">
            {checkRank()}
          </p>
          <p className="text-white text-lg">{rank}/10</p>
        </div>
        <div className="flex-1 text-right">
          <p className="font-bold text-2xl text-white">Profit per hour</p>
          <p className="text-white text-lg">$ +{perHour}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-10">
        <div className="drawer bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="">
              <img src="" className="bg-base-100 size-14" alt="Daily Reward" />
              <p>Per hour</p>
              <p>3:00</p>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-[35%] p-4">
              {database.map((item, id) => (
                <li
                  onClick={() => buyHandler(item.lvl, item.price, item.profit)}
                  className="glass flex items-center justify-between flex-row rounded-lg hover:bg-primary text-white"
                  key={id}
                >
                  <span>{item.name}</span>
                  <span>{item.lvl}</span>
                  <span>$ +{item.profit}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="drawer bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer" className="">
              <img src="" className="bg-base-100 size-14" alt="Daily Reward" />
              <p>Per hour</p>
              <p>3:00</p>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-[35%] p-4">
              {reward.map((item, id) => (
                <li
                  onClick={() => buyHandler(item.lvl, item.price, item.profit)}
                  className="glass flex items-center justify-between flex-row rounded-lg hover:bg-primary text-white"
                  key={id}
                >
                  <span>{item.name}</span>
                  <span>{item.lvl}</span>
                  <span>$ +{item.profit}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-base-200 flex-1 rounded-2xl flex items-center justify-center gap-2 flex-col py-6 mt-5">
          <img src="" className="bg-base-100 size-14" alt="Daily Reward" />
          <p>Daily Reward</p>
          <p>3:00</p>
        </div>
      </div>

      <div className="text-center text-2xl text-warning font-bold mt-5">
        <p>${balance}</p>
      </div>

      <div className="flex items-center justify-center">
        <button
          className="active:scale-95 active:transition-all"
          onClick={handlerClick}
        >
          <img
            src="https://hamsterkombat.me/hamster-kombat-coin.png"
            className="size-64 mt-5"
            alt="Coin"
          />
        </button>
      </div>
    </div>
  );
};

export default App;
