import React, { useState } from "react";
import heading from "../assets/images/Heading.svg";
import userIcon from "../assets/images/ri_user-fill.svg";

const Tip = () => {
  const tipPercentage = [5, 10, 15, 25, 50];
  const [tipDetails, setTipDetails] = useState({
    amount: 0,
    tip: "",
    people: 0,
  });

  const [splitAmount, setSplitAmount] = useState({
    tipPerPerson: 0,
    total: 0,
  });

  const handleChange = (name, value) => {
    setTipDetails({
      ...tipDetails,
      [name]: value,
    });
    let { amount, tip, people } = tipDetails;
    if (name === "amount") {
      amount = value || 0;
    }
    if (name === "tip") {
      tip = value || 0;
    }
    if (name === "people") {
      people = value || 0;
    }
    let tipData = 0;
    if (amount && tip) {
      tipData = amount / tip;
    }
    if (people) {
      setSplitAmount({
        tipPerPerson: tipData ? tipData / people : 0,
        total: (parseInt(amount) + parseInt(tipData)) / people || 0,
      });
    } else {
      setSplitAmount({
        tipPerPerson: 0,
        total: 0,
      });
    }
  };

  const resetTip = () => {
    setTipDetails({
      amount: 0,
      tip: "",
      people: 0,
    });
    setSplitAmount({
      tipPerPerson: 0,
      total: 0,
    });
  };

  return (
    <div className="container">
      <div className="header-label">
        <img src={heading} alt="heading" />
      </div>
      <div className="amt-card">
        <div className="flex-1 pm-10">
          <div className="pst-relative">
            <p className="label">Bill</p>
            <input
              type="number"
              name="amount"
              value={tipDetails.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
            />
            <span className="input-icon">$</span>
          </div>
          <div>
            <p className="label">Select Tip %</p>
            <div className="btn-container">
              {tipPercentage.map((percent, index) => (
                <button
                  key={`${percent}-${index}`}
                  style={{ marginTop: 0 }}
                  className={`${
                    tipDetails.tip === percent
                      ? "secondary reset-btn"
                      : "primary"
                  }`}
                  onClick={() => handleChange("tip", percent)}
                >
                  {percent}%
                </button>
              ))}
              <button className="secondary">Custom</button>
            </div>
          </div>
          <div className="pst-relative">
            <p className="label">number of People</p>
            <input
              type="number"
              name="people"
              value={tipDetails.people}
              onChange={(e) => handleChange("people", e.target.value)}
            />
            <img height={22} className="input-icon" src={userIcon} alt="user" />
          </div>
        </div>
        <div className="flex-1 pm-10 percent-card">
          <div className="split-card">
            <div>
              <p className="tip">Tip Amount</p>
              <p className="tip" style={{ color: "#649BA0" }}>
                /person
              </p>
            </div>
            <p className="amt">
              {Number(splitAmount.tipPerPerson || 0).toFixed(2)}
            </p>
          </div>
          <div className="split-card">
            <div>
              <p className="tip">Total</p>
              <p className="tip" style={{ color: "#649BA0" }}>
                /person
              </p>
            </div>
            <p className="amt">{Number(splitAmount.total || 0).toFixed(2)}</p>
          </div>
          <button onClick={resetTip} className="secondary reset-btn">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tip;
