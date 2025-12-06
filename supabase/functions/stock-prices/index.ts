import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const FINNHUB_API_KEY = Deno.env.get('FINNHUB_API_KEY');
    if (!FINNHUB_API_KEY) {
      throw new Error('FINNHUB_API_KEY is not configured');
    }

    const { symbols } = await req.json();
    
    if (!symbols || !Array.isArray(symbols)) {
      throw new Error('symbols array is required');
    }

    console.log('Fetching prices for symbols:', symbols);

    // Fetch USD to NZD exchange rate
    let usdToNzd = 1.70; // fallback rate
    try {
      const forexResponse = await fetch(
        `https://finnhub.io/api/v1/forex/rates?base=USD&token=${FINNHUB_API_KEY}`
      );
      if (forexResponse.ok) {
        const forexData = await forexResponse.json();
        if (forexData.quote?.NZD) {
          usdToNzd = forexData.quote.NZD;
          console.log('USD to NZD rate:', usdToNzd);
        }
      }
    } catch (forexError) {
      console.error('Error fetching forex rate, using fallback:', forexError);
    }

    // Fetch quotes for all symbols in parallel
    const quotePromises = symbols.map(async (symbol: string) => {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );
        
        if (!response.ok) {
          console.error(`Error fetching ${symbol}:`, response.status);
          return { symbol, error: true };
        }
        
        const data = await response.json();
        console.log(`${symbol} quote data:`, data);
        
        return {
          symbol,
          currentPrice: data.c,
          change: data.d,
          changePercent: data.dp,
          high: data.h,
          low: data.l,
          open: data.o,
          previousClose: data.pc,
        };
      } catch (error) {
        console.error(`Error fetching ${symbol}:`, error);
        return { symbol, error: true };
      }
    });

    const quotes = await Promise.all(quotePromises);

    return new Response(JSON.stringify({ quotes, usdToNzd }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in stock-prices function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
