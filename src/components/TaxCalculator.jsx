import React, { useState } from 'react';
import styles from './TaxCalculator.module.scss';
import '../styles/global.scss';

const ExciseTaxCalculator = () => {
  const [price, setPrice] = useState(0);
  const [engineCapacity, setEngineCapacity] = useState(0);
  const [engineType, setEngineType] = useState('');
  const [tax, setTax] = useState(0);
  const [error, setError] = useState('');
  const [showTax, setShowTax] = useState(false);

  const calculateTax = () => {
    if (price <= 0 || (engineCapacity < 0 || (engineCapacity === 0 && engineType !== 'EV'))) {
      setError('Proszę wprowadzić poprawne dane.');
      return;
    }

    let taxRate = 0;

    if (engineType === 'gasoline') {
      taxRate = engineCapacity <= 2000 ? 0.031 : 0.186;
    } else if (engineType === 'hybrid') {
      taxRate = engineCapacity <= 2000 ? 0.0155 : 0.093;
    } else if (engineType === 'EV') {
      taxRate = 0;
    }

    setTax(Math.round(price * taxRate)); 
    setError('');
    setShowTax(true);
  };

  return (
    <div id="calculator" className={styles.container}>
      <h1 className={styles.title}>Wprowadź <br/>dane<br/> o samochodzie</h1>
      <label>
        Cena samochodu <br/> (w PLN)
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </label>
      <label>
        Pojemność silnika (w cm3)
        <input type="number" value={engineCapacity} onChange={e => setEngineCapacity(e.target.value)} />
      </label>
      <label>
        Rodzaj napędu
        <select value={engineType} onChange={e => setEngineType(e.target.value)}>
        <option value="" disabled >Wybierz</option>
          <option value="gasoline">Spalinowy</option>
          <option value="hybrid">Hybryda</option>
          <option value="EV">Elektryczny</option>
        </select>
      </label>
      <button onClick={calculateTax}>Oblicz podatek</button>
      {error && <p className="error">{error}</p>}
      {showTax && <p>Wartość podatku: {tax} PLN</p>}
    </div>
  );
};

export default ExciseTaxCalculator;
