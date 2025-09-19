import { useState } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import CurrencySelect from './CurrencySelect';

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState('RUR');
  const [toCurrency, setToCurrency] = useState('USD');

  const handleSwapCurrincies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const preventMathSigns = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-' || e.key === '+') {
      e.preventDefault();
    }
  };

  const preventWheelScroll = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <form className="converter-form">
      <div className="form-group">
        <label className="form-label">Введите сумму</label>
        <input 
          type="number" 
          className="form-input" 
          onKeyDown={preventMathSigns} 
          onWheel={preventWheelScroll} 
          required 
        />
      </div>

      <div className="form-group form-group__currency">
        <div className="form-section">
          <label className="form-label">Из</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <AiOutlineSwap className="swap-icon" onClick={handleSwapCurrincies} />

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
