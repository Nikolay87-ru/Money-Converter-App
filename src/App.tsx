import ReactCountryFlag from 'react-country-flag';
import { AiOutlineSwap } from 'react-icons/ai';
import './App.css';

export const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="converter-title">Конвертер валют</h2>
      <form className="converter-form">
        <div className="form-group">
          <label className="form-label">Введите сумму</label>
          <input type="number" className="form-input" required />
        </div>

        <div className="form-group form-group__currency">
          <div className="form-section">
            <label className="form-label">Из</label>
            <div className="currency-select">
              <ReactCountryFlag countryCode="RU" className="flag-ru" svg title="RU" />
              <select className="currency-dropdown">
                <option className="currency-dropdown__option" value="RUR" selected>
                  RUR
                </option>
                <option className="currency-dropdown__option" value="USD">
                  USD
                </option>
                <option className="currency-dropdown__option" value="EUR">
                  EUR
                </option>
              </select>
            </div>
          </div>

          <AiOutlineSwap className="swap-icon" />

          <div className="form-section">
            <label className="form-label">В</label>
            <div className="currency-select">
              <ReactCountryFlag countryCode="US" className="flag-us" svg title="US" />
              <select className="currency-dropdown">
                <option className="currency-dropdown__option" value="RUR">
                  RUR
                </option>
                <option className="currency-dropdown__option" value="USD" selected>
                  USD
                </option>
                <option className="currency-dropdown__option" value="EUR">
                  EUR
                </option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          конвертировать
        </button>

        <div className="exchange-rate">Итог конвертации...</div>
      </form>
    </div>
  );
};
