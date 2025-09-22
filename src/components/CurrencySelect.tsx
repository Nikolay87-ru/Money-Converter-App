import type { ChangeEvent, FC } from 'react';
import ReactCountryFlag from 'react-country-flag';

interface CurrencyProps {
  selectedCurrency: string;
  handleCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const currencyCodes = ['EUR', 'RUB', 'USD'];

const CurrencySelect: FC<CurrencyProps> = ({ selectedCurrency, handleCurrency }) => {
  const getCountryCode = (currency: string) => {
    switch (currency) {
      case 'USD': return 'US';
      case 'RUB': return 'RU';
      case 'EUR': return 'EU'; 
      default: return 'RU';
    }
  };

  return (
    <div className="currency-select">
      <ReactCountryFlag
        countryCode={getCountryCode(selectedCurrency)}
        style={{
          fontSize: '2rem',
          lineHeight: '2rem'
        }}
        svg
      />
      <select className="currency-dropdown" value={selectedCurrency} onChange={handleCurrency}>
        {currencyCodes.map((currency) => (
          <option className="currency-dropdown__option" key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
