import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ConverterForm from '../src/components/ConverterForm';

// Мокаем react-icons
vi.mock('react-icons/ai', () => ({
  AiOutlineSwap: () => <div data-testid="swap-icon">Swap</div>
}));

// Мокаем react-country-flag
vi.mock('react-country-flag', () => ({
  default: ({ countryCode }: { countryCode: string }) => (
    <div data-testid={`flag-${countryCode}`}>Flag {countryCode}</div>
  )
}));

// Типы для моков
interface MockResponse {
  Valute: {
    USD: { Value: number; Nominal: number };
    EUR: { Value: number; Nominal: number };
  };
}

describe('ConverterForm', () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    window.fetch = vi.fn();
  });

  afterEach(() => {
    window.fetch = originalFetch;
    vi.clearAllMocks();
  });

  const mockSuccessResponse: MockResponse = {
    Valute: {
      USD: { Value: 93.5, Nominal: 1 },
      EUR: { Value: 101.2, Nominal: 1 }
    }
  };

  const mockFetch = (response: MockResponse, ok = true) => {
    (window.fetch as any).mockResolvedValueOnce({
      ok,
      json: async () => response
    });
  };

  it('получает курсы валют при монтировании компонента', async () => {
    mockFetch(mockSuccessResponse);

    render(<ConverterForm />);

    expect(window.fetch).toHaveBeenCalledWith('https://www.cbr-xml-daily.ru/daily_json.js');
    
    await waitFor(() => {
      expect(screen.getByText('1 USD = 93.50 RUB')).toBeInTheDocument();
    });
  });

  it('правильно конвертирует RUB в USD', async () => {
    mockFetch(mockSuccessResponse);

    render(<ConverterForm />);

    await waitFor(() => {
      expect(screen.getByText('1 USD = 93.50 RUB')).toBeInTheDocument();
    });

    // Используем data-testid вместо getByLabelText
    const amountInput = screen.getByRole('spinbutton');
    fireEvent.change(amountInput, { target: { value: '1000' } });

    const convertButton = screen.getByRole('button', { name: /конвертировать/i });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText('1000 RUB = 10.70 USD')).toBeInTheDocument();
    });
  });

  it('сбрасывает результат конвертации при изменении суммы', async () => {
    mockFetch(mockSuccessResponse);

    render(<ConverterForm />);

    await waitFor(() => {
      expect(screen.getByText('1 USD = 93.50 RUB')).toBeInTheDocument();
    });

    const amountInput = screen.getByRole('spinbutton');
    fireEvent.change(amountInput, { target: { value: '100' } });

    const convertButton = screen.getByRole('button', { name: /конвертировать/i });
    fireEvent.click(convertButton);

    await waitFor(() => {
      expect(screen.getByText(/100 RUB =/)).toBeInTheDocument();
    });

    // Меняем сумму
    fireEvent.change(amountInput, { target: { value: '200' } });

    // Результат должен сброситься
    expect(screen.queryByText(/100 RUB =/)).not.toBeInTheDocument();
  });

  it('отображает состояние загрузки', async () => {
    // Создаем промис, который не разрешается сразу
    let resolveFetch: (value: any) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    
    (window.fetch as any).mockReturnValue(fetchPromise);

    render(<ConverterForm />);

    // Проверяем состояние загрузки
    expect(screen.getByRole('button', { name: /загрузка/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();

    // Разрешаем промис
    resolveFetch!({
      ok: true,
      json: async () => mockSuccessResponse
    });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /конвертировать/i })).toBeInTheDocument();
    });
  });
});