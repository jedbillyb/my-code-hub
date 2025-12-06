import { TrendingUp, TrendingDown, DollarSign, PieChart, Eye, Newspaper, RefreshCw, Bitcoin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, AreaChart, Area } from "recharts";
import { Button } from "@/components/ui/button";
import MarketClocks from "@/components/MarketClocks";
import { useStockPrices } from "@/hooks/useStockPrices";
import { useMemo } from "react";

// Your actual holdings data (cost basis in NZD)
const holdingsData = [
  { symbol: "VOO", name: "Vanguard 500 Index Fund", shares: 1.0606, costBasisNZD: 668.69 },
  { symbol: "NVDA", name: "NVIDIA Corp", shares: 2.9633, costBasisNZD: 540.54 },
  { symbol: "RKLB", name: "Rocket Lab Corp", shares: 7.0449, costBasisNZD: 345.59 },
  { symbol: "MSFT", name: "Microsoft Corp", shares: 0.2029, costBasisNZD: 98.06 },
  { symbol: "NBIS", name: "Nebius Group NV", shares: 0.8991, costBasisNZD: 88.15 },
  { symbol: "IREN", name: "IREN Ltd", shares: 1.5753, costBasisNZD: 70.44 },
  { symbol: "QQQM", name: "Invesco NASDAQ 100 ETF", shares: 0.1498, costBasisNZD: 38.59 },
  { symbol: "META", name: "Meta Platforms Inc", shares: 0.0403, costBasisNZD: 27.15 },
  { symbol: "AMD", name: "Advanced Micro Devices", shares: 0.0821, costBasisNZD: 17.90 },
  { symbol: "GOOG", name: "Alphabet Inc", shares: 0.0137, costBasisNZD: 4.42 },
];

const watchlistData = [
  { symbol: "NBIS", name: "Nebius Group NV" },
  { symbol: "RKLB", name: "Rocket Lab Corp" },
];

// Crypto holdings (tracked separately)
const cryptoHoldings = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.0009, costBasisNZD: 85.56 },
];

const allocationData = [
  { name: "Tech", value: 65, color: "hsl(200, 80%, 60%)" },
  { name: "ETFs", value: 25, color: "hsl(160, 60%, 50%)" },
  { name: "Crypto", value: 10, color: "hsl(40, 70%, 50%)" },
];

const news = [
  { title: "NVIDIA reports record earnings amid AI boom", time: "2h ago" },
  { title: "Fed signals potential rate cuts in 2024", time: "4h ago" },
  { title: "Rocket Lab secures new launch contracts", time: "6h ago" },
];

const formatNZD = (value: number) => {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const StockPortfolio = () => {
  const stockSymbols = useMemo(() => {
    const holdings = holdingsData.map(h => h.symbol);
    const watchlist = watchlistData.map(w => w.symbol);
    return [...new Set([...holdings, ...watchlist])];
  }, []);

  const { quotes, loading, lastUpdated, usdToNzd, refetch } = useStockPrices(stockSymbols);

  // Calculate holdings with live prices in NZD
  const holdings = useMemo(() => {
    return holdingsData.map(holding => {
      const quote = quotes[holding.symbol];
      const currentPriceUSD = quote?.currentPrice || 0;
      const currentPriceNZD = currentPriceUSD * usdToNzd;
      const valueNZD = currentPriceNZD * holding.shares;
      const change = quote?.changePercent || 0;
      const totalGainLoss = valueNZD - holding.costBasisNZD;
      const totalGainLossPercent = holding.costBasisNZD > 0 ? (totalGainLoss / holding.costBasisNZD) * 100 : 0;
      
      return {
        ...holding,
        priceNZD: currentPriceNZD,
        priceUSD: currentPriceUSD,
        change,
        valueNZD,
        totalGainLoss,
        totalGainLossPercent,
      };
    }).sort((a, b) => b.valueNZD - a.valueNZD); // Sort by value descending
  }, [quotes, usdToNzd]);

  // Calculate watchlist with live prices
  const watchlist = useMemo(() => {
    return watchlistData.map(item => {
      const quote = quotes[item.symbol];
      return {
        ...item,
        priceNZD: (quote?.currentPrice || 0) * usdToNzd,
        priceUSD: quote?.currentPrice || 0,
        change: quote?.changePercent || 0,
      };
    });
  }, [quotes, usdToNzd]);

  // Calculate portfolio totals in NZD
  const portfolioValueNZD = useMemo(() => {
    return holdings.reduce((sum, h) => sum + h.valueNZD, 0);
  }, [holdings]);

  const totalCostBasisNZD = useMemo(() => {
    return holdingsData.reduce((sum, h) => sum + h.costBasisNZD, 0);
  }, []);

  const totalGainLossNZD = portfolioValueNZD - totalCostBasisNZD;
  const totalGainLossPercent = totalCostBasisNZD > 0 ? (totalGainLossNZD / totalCostBasisNZD) * 100 : 0;

  // Daily change in NZD
  const dailyChangeNZD = useMemo(() => {
    return holdings.reduce((sum, h) => {
      const quote = quotes[h.symbol];
      if (quote?.change && h.shares) {
        return sum + (quote.change * h.shares * usdToNzd);
      }
      return sum;
    }, 0);
  }, [holdings, quotes, usdToNzd]);

  const dailyChangePercent = useMemo(() => {
    const prevValue = portfolioValueNZD - dailyChangeNZD;
    return prevValue > 0 ? (dailyChangeNZD / prevValue) * 100 : 0;
  }, [portfolioValueNZD, dailyChangeNZD]);

  const isPositive = dailyChangeNZD >= 0;

  // Enhanced chart data with gradient effect
  const chartData = useMemo(() => {
    const baseValue = portfolioValueNZD;
    return [
      { date: "Mon", value: baseValue * 0.96, display: formatNZD(baseValue * 0.96) },
      { date: "Tue", value: baseValue * 0.98, display: formatNZD(baseValue * 0.98) },
      { date: "Wed", value: baseValue * 0.95, display: formatNZD(baseValue * 0.95) },
      { date: "Thu", value: baseValue * 0.99, display: formatNZD(baseValue * 0.99) },
      { date: "Fri", value: baseValue, display: formatNZD(baseValue) },
    ];
  }, [portfolioValueNZD]);

  return (
    <section id="portfolio" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-2">
              Stock Portfolio
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Real-time tracking in NZD • Exchange rate: 1 USD = {usdToNzd.toFixed(4)} NZD
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 justify-center md:justify-end">
            {lastUpdated && (
              <span className="text-xs text-muted-foreground">
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {loading ? "..." : formatNZD(portfolioValueNZD)}
              </div>
              <div className={`text-sm font-medium ${totalGainLossNZD >= 0 ? "text-green-500" : "text-red-500"}`}>
                {totalGainLossNZD >= 0 ? "+" : ""}{formatNZD(totalGainLossNZD)} ({totalGainLossPercent >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">Total return</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Today's Change</CardTitle>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {loading ? "..." : `${isPositive ? "+" : ""}${formatNZD(dailyChangeNZD)}`}
              </div>
              <div className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? "+" : ""}{dailyChangePercent.toFixed(2)}% today
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{holdingsData.length} Stocks</div>
              <div className="text-xs text-muted-foreground">+ {cryptoHoldings.length} crypto</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Watchlist</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{watchlistData.length} Tracking</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enhanced Chart */}
          <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(200, 80%, 60%)" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(200, 80%, 60%)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(215, 15%, 55%)" 
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="hsl(215, 15%, 55%)" 
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${(v/1000).toFixed(1)}k`}
                      domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 20%, 12%)",
                        border: "1px solid hsl(220, 15%, 22%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                      labelStyle={{ color: "hsl(210, 20%, 95%)" }}
                      formatter={(value: number) => [formatNZD(value), "Value"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(200, 80%, 60%)"
                      strokeWidth={3}
                      fill="url(#colorValue)"
                      dot={{ fill: "hsl(200, 80%, 60%)", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: "hsl(200, 80%, 70%)" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Allocation Pie */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Sector Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={allocationData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      label={({ name, value }) => `${name} ${value}%`}
                      labelLine={false}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Holdings Table with clear Total Gain/Loss */}
          <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm border-b border-border/50">
                      <th className="pb-3 font-medium">Stock</th>
                      <th className="pb-3 font-medium">Shares</th>
                      <th className="pb-3 font-medium">Price (NZD)</th>
                      <th className="pb-3 font-medium">Today</th>
                      <th className="pb-3 font-medium text-right">Value</th>
                      <th className="pb-3 font-medium text-right">Total Gain/Loss</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((stock) => (
                      <tr key={stock.symbol} className="border-b border-border/30 last:border-0 hover:bg-accent/5 transition-colors">
                        <td className="py-4">
                          <div className="font-semibold text-foreground">{stock.symbol}</div>
                          <div className="text-xs text-muted-foreground">{stock.name}</div>
                        </td>
                        <td className="py-4 text-foreground">{stock.shares.toFixed(4)}</td>
                        <td className="py-4 text-foreground">
                          {loading ? "..." : formatNZD(stock.priceNZD)}
                        </td>
                        <td className={`py-4 font-medium ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {loading ? "..." : `${stock.change >= 0 ? "▲" : "▼"} ${Math.abs(stock.change).toFixed(2)}%`}
                        </td>
                        <td className="py-4 text-right font-semibold text-foreground">
                          {loading ? "..." : formatNZD(stock.valueNZD)}
                        </td>
                        <td className="py-4 text-right">
                          <div className={`font-bold text-lg ${stock.totalGainLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                            {loading ? "..." : `${stock.totalGainLoss >= 0 ? "+" : ""}${formatNZD(stock.totalGainLoss)}`}
                          </div>
                          <div className={`text-sm ${stock.totalGainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {loading ? "" : `${stock.totalGainLossPercent >= 0 ? "+" : ""}${stock.totalGainLossPercent.toFixed(1)}%`}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {/* Crypto row */}
                    {cryptoHoldings.map((crypto) => (
                      <tr key={crypto.symbol} className="border-b border-border/30 last:border-0 bg-accent/5">
                        <td className="py-4">
                          <div className="font-semibold text-foreground flex items-center gap-2">
                            <Bitcoin className="h-4 w-4 text-orange-500" />
                            {crypto.symbol}
                          </div>
                          <div className="text-xs text-muted-foreground">{crypto.name}</div>
                        </td>
                        <td className="py-4 text-foreground">{crypto.amount.toFixed(4)}</td>
                        <td className="py-4 text-muted-foreground" colSpan={4}>
                          <span className="text-xs">Crypto tracking coming soon</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Watchlist, News & Market Clocks */}
          <div className="space-y-6">
            <MarketClocks />
            
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlist.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-foreground">{stock.symbol}</span>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground">
                        {loading ? "..." : formatNZD(stock.priceNZD)}
                      </div>
                      <div className={`text-xs ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {loading ? "..." : `${stock.change >= 0 ? "+" : ""}${stock.change.toFixed(2)}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Newspaper className="w-4 h-4" /> Market News
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {news.map((item, i) => (
                  <div key={i} className="border-b border-border/30 last:border-0 pb-3 last:pb-0">
                    <p className="text-sm text-foreground">{item.title}</p>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockPortfolio;
