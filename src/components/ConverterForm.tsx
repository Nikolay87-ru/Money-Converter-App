import { useState, useEffect } from 'react';
import { AiOutlineSwap } from 'react-icons/ai';
import CurrencySelect from './CurrencySelect';

interface ExchangeRates {
  USD: number;
  EUR: number;
  RUB: number;
}

const ConverterForm = () => {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExchangeRates = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const data = await response.json();

      const usdRate = data.Valute.USD.Value; 
      const eurRate = data.Valute.EUR.Value; 
      
      setRates({
        USD: usdRate,     
        EUR: eurRate,     
        RUB: 1           
      });
    } catch (error) {
      console.error('Ошибка получения курсов:', error);
      setRates({
        USD: 93.5,  
        EUR: 101.2, 
        RUB: 1
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const resetConvertedAmount = () => {
    setConvertedAmount('');
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    resetConvertedAmount();
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    resetConvertedAmount();
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
    resetConvertedAmount();
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
    resetConvertedAmount();
  };

  const convertCurrency = () => {
    if (!rates || !amount) return;

    const amountNum = parseFloat(amount);
    
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amountNum.toFixed(2));
      return;
    }

    const amountInRUB = amountNum * rates[fromCurrency as keyof ExchangeRates];
    
    const result = amountInRUB / rates[toCurrency as keyof ExchangeRates];

    setConvertedAmount(result.toFixed(2));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    convertCurrency();
  };

  return (
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label className="form-label">Введите сумму</label>
        <input
          type="number"
          className="form-input"
          value={amount}
          onChange={handleAmountChange}
          required
        />
      </div>

      <div className="form-group form-group__currency">
        <div className="form-section">
          <label className="form-label">Из</label>
          <CurrencySelect
            selectedCurrency={fromCurrency}
            handleCurrency={handleFromCurrencyChange}
          />
        </div>

        <AiOutlineSwap className="swap-icon" onClick={handleSwapCurrencies} />

        <div className="form-section">
          <label className="form-label">В</label>
          <CurrencySelect
            selectedCurrency={toCurrency}
            handleCurrency={handleToCurrencyChange}
          />
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Загрузка...' : 'конвертировать'}
      </button>

      <div className="exchange-rate">
        {convertedAmount && `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
      </div>
    </form>
  );
};

export default ConverterForm;
