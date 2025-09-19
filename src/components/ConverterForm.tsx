import { useState } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import CurrencySelect from './CurrencySelect';

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState('RUR');
  const [toCurrency, setToCurrency] = useState('USD');

  return (
    <form className="converter-form">
      <div className="form-group">
        <label className="form-label">Введите сумму</label>
        <input type="number" className="form-input" required />
      </div>

      <div className="form-group form-group__currency">
        <div className="form-section">
          <label className="form-label">Из</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <AiOutlineSwap className="swap-icon" />

        <div className="form-section">
          <label className="form-label">В</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        конвертировать
      </button>

      <div className="exchange-rate">Итог конвертации...</div>
    </form>
  );
};

export default ConverterForm;
