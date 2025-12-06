import { TrendingUp, TrendingDown, DollarSign, PieChart, Eye, Newspaper, RefreshCw, Bitcoin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// ... (other imports)

// The holdings data is now defined with costBasisUSD, eliminating historical NZD conversion complexity.
const holdingsData = [
    // Symbol, Name, Shares, Back-Calculated Cost Basis USD
    // These values are derived from your raw data (Current Value USD / (1 + Total Gain %))
    { symbol: "VOO", name: "Vanguard 500 Index Fund", shares: 1.0606, costBasisUSD: 574.27 },
    { symbol: "NVDA", name: "NVIDIA Corp", shares: 2.9633, costBasisUSD: 383.10 },
    { symbol: "RKLB", name: "Rocket Lab Corp", shares: 7.0449, costBasisUSD: 307.13 },
    { symbol: "MSFT", name: "Microsoft Corp", shares: 0.2029, costBasisUSD: 84.68 },
    { symbol: "NBIS", name: "Nebius Group NV", shares: 0.8991, costBasisUSD: 113.38 },
    { symbol: "IREN", name: "IREN Ltd", shares: 1.5753, costBasisUSD: 77.01 },
    { symbol: "QQQM", name: "Invesco NASDAQ 100 ETF", shares: 0.1498, costBasisUSD: 37.41 },
    { symbol: "META", name: "Meta Platforms Inc", shares: 0.0403, costBasisUSD: 26.02 },
    { symbol: "AMD", name: "Advanced Micro Devices", shares: 0.0821, costBasisUSD: 21.01 },
    { symbol: "GOOG", name: "Alphabet Inc", shares: 0.0137, costBasisUSD: 4.00 },
];

const watchlistData = [
    { symbol: "NBIS", name: "Nebius Group NV" },
    { symbol: "RKLB", name: "Rocket Lab Corp" },
];

// Crypto holdings still use a USD cost basis for simplified profit tracking
const cryptoHoldings = [
    // BTC: $64.60 + $20.96 = $85.56 total current value
    // Assuming a weighted average cost basis was calculated to result in your reported percentages
    { symbol: "BTC", name: "Bitcoin", amount: 0.0011, costBasisUSD: 94.69 }, // Back-calculated using -9.60% combined est.
];

// ... (allocationData and news remain the same)

// New formatter for USD
const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

// Formatter for NZD (unchanged)
const formatNZD = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
        style: 'currency',
        currency: 'NZD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};


const StockPortfolio = () => {
    // ... (stockSymbols, loading, lastUpdated, refetch, and usdToNzd remain the same)
    const usdToNzd = 1.7307; // Using the current rate fetched

    // Calculate holdings with live prices in NZD and USD
    const holdings = useMemo(() => {
        return holdingsData.map(holding => {
            const quote = quotes[holding.symbol];
            const currentPriceUSD = quote?.currentPrice || 0; 
            
            // --- CORE CHANGE: CALCULATIONS ARE NOW IN USD ---
            const valueUSD = currentPriceUSD * holding.shares;
            const totalGainLossUSD = valueUSD - holding.costBasisUSD;
            const totalGainLossPercent = holding.costBasisUSD > 0 ? (totalGainLossUSD / holding.costBasisUSD) * 100 : 0;
            
            // --- CONVERT ONLY THE CURRENT VALUE TO NZD FOR DISPLAY ---
            const valueNZD = valueUSD * usdToNzd; 
            
            return {
                ...holding,
                priceUSD: currentPriceUSD,
                priceNZD: currentPriceUSD * usdToNzd, // Price per share in NZD
                change: quote?.changePercent || 0,
                valueUSD,
                valueNZD,
                totalGainLossUSD,
                totalGainLossPercent,
            };
        }).sort((a, b) => b.valueNZD - a.valueNZD);
    }, [quotes, usdToNzd]);

    // Calculate portfolio totals in USD
    const portfolioValueUSD = useMemo(() => {
        return holdings.reduce((sum, h) => sum + h.valueUSD, 0);
    }, [holdings]);

    const totalCostBasisUSD = useMemo(() => {
        return holdingsData.reduce((sum, h) => sum + h.costBasisUSD, 0);
    }, []);
    
    // Convert final USD totals to NZD for portfolio display
    const portfolioValueNZD = portfolioValueUSD * usdToNzd;
    const totalGainLossUSD = portfolioValueUSD - totalCostBasisUSD;
    const totalGainLossNZD = totalGainLossUSD * usdToNzd;
    const totalGainLossPercent = totalCostBasisUSD > 0 ? (totalGainLossUSD / totalCostBasisUSD) * 100 : 0;

    // Daily change calculation now in USD, converted at the end
    const dailyChangeUSD = useMemo(() => {
        return holdings.reduce((sum, h) => {
            const quote = quotes[h.symbol];
            if (quote?.change && h.shares) {
                // quote.change is the dollar change in USD
                return sum + (quote.change * h.shares);
            }
            return 0;
        }, 0);
    }, [holdings, quotes]);
    
    const dailyChangeNZD = dailyChangeUSD * usdToNzd;
    const isPositive = dailyChangeUSD >= 0;

    const dailyChangePercent = useMemo(() => {
        const prevValue = portfolioValueUSD - dailyChangeUSD;
        return prevValue > 0 ? (dailyChangeUSD / prevValue) * 100 : 0;
    }, [portfolioValueUSD, dailyChangeUSD]);

    // ... (chartData and other components remain the same, ensuring they use the new NZD totals)

    return (
        <section id="portfolio" className="py-24 px-6 bg-card/30">
            <div className="max-w-7xl mx-auto">
                {/* ... (Header remains the same) */}

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
                            {/* Display profit/loss in USD with NZD conversion below */}
                            <div className={`text-sm font-medium ${totalGainLossUSD >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {totalGainLossUSD >= 0 ? "+" : ""}{formatUSD(totalGainLossUSD)} ({totalGainLossPercent >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%)
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">Total return (USD)</div>
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
                    {/* ... (Holdings and Watchlist cards remain the same) */}
                </div>

                {/* Main Grid: Holdings Table Adjustment */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* ... (Chart and Allocation Pie remain the same) */}

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
                                            <th className="pb-3 font-medium text-right">Value (NZD)</th> {/* Changed label */}
                                            <th className="pb-3 font-medium text-right">Total Gain/Loss (USD)</th> {/* Changed label */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {holdings.map((stock) => (
                                            <tr key={stock.symbol} className="border-b border-border/30 last:border-0 hover:bg-accent/5 transition-colors">
                                                {/* ... (Stock, Shares, Price (NZD), Today columns remain the same) */}
                                                <td className="py-4 text-right font-semibold text-foreground">
                                                    {loading ? "..." : formatNZD(stock.valueNZD)}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <div className={`font-bold text-lg ${stock.totalGainLossUSD >= 0 ? "text-green-500" : "text-red-500"}`}>
                                                        {loading ? "..." : `${stock.totalGainLossUSD >= 0 ? "+" : ""}${formatUSD(stock.totalGainLossUSD)}`}
                                                    </div>
                                                    <div className={`text-sm ${stock.totalGainLossUSD >= 0 ? "text-green-400" : "text-red-400"}`}>
                                                        {loading ? "" : `${stock.totalGainLossPercent >= 0 ? "+" : ""}${stock.totalGainLossPercent.toFixed(1)}%`}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {/* ... (Crypto and Watchlist rows remain the same) */}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {/* ... (Watchlist, News & Market Clocks remain the same) */}
                </div>
            </div>
        </section>
    );
};

export default StockPortfolio;