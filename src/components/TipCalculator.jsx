import React, { useState } from "react";

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(1);

  // calculations
  const tipAmount = (bill * tipPercent) / 100;
  const totalAmount = Number(bill) + tipAmount;
  const perPerson = totalAmount / people;

  return (
    <div className="card-box">
      <h2 className="mb-4">Tip Calculator</h2>

      {/* Bill Amount */}
      <div style={{ marginBottom: "15px" }}>
        <label>Bill Amount</label>
        <input
          type="number"
          placeholder="Enter bill amount"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* Tip Percentage */}
      <div style={{ marginBottom: "15px" }}>
        <label>Tip Percentage : {tipPercent}%</label>

        <input
          type="range"
          min="0"
          max="30"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          style={{ width: "100%" }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          {[5, 10, 15, 20].map((val) => (
            <button
              key={val}
              onClick={() => setTipPercent(val)}
              style={{
                padding: "8px 12px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>

      {/* Number of People */}
      <div style={{ marginBottom: "15px" }}>
        <label>Number of People</label>

        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
          }}
        />
      </div>

      {/* Results */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h3>Results</h3>

        <p>
          Tip Amount: <strong>₹ {tipAmount.toFixed(2)}</strong>
        </p>

        <p>
          Total Amount: <strong>₹ {totalAmount.toFixed(2)}</strong>
        </p>

        <p>
          Per Person: <strong>₹ {perPerson.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};

export default TipCalculator;