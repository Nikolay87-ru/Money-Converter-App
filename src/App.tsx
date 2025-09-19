import ConverterForm from './components/ConverterForm';
import './style/index.css';

export const App = () => {
  return (
    <div className="currency-converter">
      <h2 className="converter-title">Конвертер валют</h2>
      <ConverterForm />
    </div>
  );
};
