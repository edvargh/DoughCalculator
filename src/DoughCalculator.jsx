import React, { useState } from 'react';

function DoughCalculator() {
  const [doughWeight, setDoughWeight] = useState('');
  const [numberOfDoughs, setNumberOfDoughs] = useState('');
  const [hydrationPercentage, setHydrationPercentage] = useState('');
  const [yeastType, setYeastType] = useState('dry'); // 'dry' or 'fresh'
  const [ingredients, setIngredients] = useState({});
  const [error, setError] = useState('');

  const handleYeastToggle = (type) => {
    setYeastType(type);
  };

  const validateInput = () => {
    if (!doughWeight || doughWeight <= 0 || doughWeight % 1 !== 0) {
      return "Dough weight must be a positive whole number.";
    }
    if (!numberOfDoughs || numberOfDoughs <= 0 || numberOfDoughs % 1 !== 0) {
      return "Number of doughs must be a positive whole number greater than zero.";
    }
    if (!hydrationPercentage || hydrationPercentage < 1 || hydrationPercentage > 1000 || hydrationPercentage % 1 !== 0) {
      return "Hydration must be a whole number between 1 and 1000.";
    }
    return "";
  };

  const handleCalculate = () => {
    const errorMessage = validateInput();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError('');
    const totalDoughWeight = doughWeight * numberOfDoughs;
    const flourWeight = totalDoughWeight / (1 + (hydrationPercentage / 100) + 0.02 + (yeastType === 'dry' ? 0.01 : 0.02));
    const waterWeight = flourWeight * (hydrationPercentage / 100);
    const waterVolumeL = waterWeight / 1000; // converting grams to liters
    const saltWeight = flourWeight * 0.02;
    const yeastWeight = flourWeight * (yeastType === 'dry' ? 0.01 : 0.02);
    setIngredients({ flourWeight, waterVolumeL, saltWeight, yeastWeight });
  };

  return (
    <div style={{ margin: '50px' }}>
      <h1>Dough Calculator</h1>
      <div>
        <label>
          Dough weight (grams):
          <input type="number" value={doughWeight} onChange={e => setDoughWeight(e.target.value)} placeholder="Enter desired dough weight in grams" />
        </label>
        <label>
          Number of doughs:
          <input type="number" value={numberOfDoughs} onChange={e => setNumberOfDoughs(e.target.value)} placeholder="How many doughs?" />
        </label>
        <label>
          Hydration (%):
          <input type="number" value={hydrationPercentage} onChange={e => setHydrationPercentage(e.target.value)} placeholder="Enter desired hydration percentage" />
        </label>
        <div>
          <span>Yeast Type:</span>
            <br />
          <button className={`toggle-button ${yeastType === 'dry' ? 'active' : ''}`} onClick={() => handleYeastToggle('dry')}>Dry Yeast</button>
          <button className={`toggle-button ${yeastType === 'fresh' ? 'active' : ''}`} onClick={() => handleYeastToggle('fresh')}>Fresh Yeast</button>
        </div>
        <br />
        <button onClick={handleCalculate}>Calculate Ingredients</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {ingredients.flourWeight && (
          <div>
            <p>Flour: {ingredients.flourWeight.toFixed(2)} grams</p>
            <p>Water: {ingredients.waterVolumeL.toFixed(3)} liters</p>
            <p>Salt: {ingredients.saltWeight.toFixed(2)} grams</p>
            <p>Yeast: {ingredients.yeastWeight.toFixed(2)} grams</p>
          </div>
        )}
      </div>
      <div style={{marginTop: "20px", fontSize: "0.9em", lineHeight: "1.5"}}>
        <strong>How to Use the Calculator:</strong>
        <p>
            This calculator helps you determine the correct amounts of flour, water, salt, and yeast needed to make dough with your desired specifications. Simply enter the total desired weight of the dough, the number of individual doughs you want to make, and the hydration percentage (how much water relative to flour). Choose whether you're using dry or fresh yeast. Click "Calculate Ingredients" to see the results.
        </p>
        <p>
        <strong>Ingredient Proportions:</strong><br/>
        - <strong>Salt:</strong> The salt content is calculated as 2% of the flour weight.<br/>
        - <strong>Yeast:</strong> The dry yeast content is calculated as 1% of the flour weight, while fresh yeast is calculated as 2% of the flour weight.<br/>
        This ensures that the dough has the proper fermentation and flavor profile, depending on the yeast type and salt level you choose.
        </p>
      </div>
    </div>
  );
}

export default DoughCalculator;
