import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface StockQuote {
  symbol: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  open?: number;
  previousClose?: number;
  error?: boolean;
}

interface UseStockPricesResult {
  quotes: Record<string, StockQuote>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  usdToNzd: number;
  refetch: () => Promise<void>;
}

export const useStockPrices = (
  symbols: string[],
  refreshInterval = 5 * 60 * 1000 // 5 minutes
): UseStockPricesResult => {
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [usdToNzd, setUsdToNzd] = useState(1.70);

  const fetchPrices = useCallback(async () => {
    if (symbols.length === 0) return;

    try {
      setError(null);
      console.log('Fetching stock prices for:', symbols);

      const { data, error: fnError } = await supabase.functions.invoke('stock-prices', {
        body: { symbols },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data?.quotes) {
        const quotesMap: Record<string, StockQuote> = {};
        data.quotes.forEach((quote: StockQuote) => {
          quotesMap[quote.symbol] = quote;
        });
        setQuotes(quotesMap);
        setLastUpdated(new Date());
        console.log('Stock prices updated:', quotesMap);
      }

      if (data?.usdToNzd) {
        setUsdToNzd(data.usdToNzd);
        console.log('USD to NZD rate:', data.usdToNzd);
      }
    } catch (err) {
      console.error('Error fetching stock prices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchPrices();
    
    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchPrices, refreshInterval]);

  return { quotes, loading, error, lastUpdated, usdToNzd, refetch: fetchPrices };
};
