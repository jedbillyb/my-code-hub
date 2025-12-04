import { TrendingUp, TrendingDown, DollarSign, PieChart, Eye, Newspaper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from "recharts";

// Mock data - replace with real API data
const portfolioValue = 24567.89;
const dailyChange = 342.15;
const dailyChangePercent = 1.41;

const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 15, price: 178.50, change: 2.3, value: 2677.50 },
  { symbol: "MSFT", name: "Microsoft", shares: 10, price: 378.20, change: 1.8, value: 3782.00 },
  { symbol: "GOOGL", name: "Alphabet", shares: 5, price: 141.80, change: -0.5, value: 709.00 },
  { symbol: "NVDA", name: "NVIDIA", shares: 8, price: 495.22, change: 4.2, value: 3961.76 },
  { symbol: "TSLA", name: "Tesla", shares: 12, price: 248.50, change: -1.2, value: 2982.00 },
];

const watchlist = [
  { symbol: "AMD", price: 178.30, change: 3.2 },
  { symbol: "META", price: 505.75, change: 1.5 },
  { symbol: "AMZN", price: 185.20, change: -0.8 },
  { symbol: "NFLX", price: 628.40, change: 2.1 },
];

const chartData = [
  { date: "Mon", value: 23500 },
  { date: "Tue", value: 23800 },
  { date: "Wed", value: 23200 },
  { date: "Thu", value: 24100 },
  { date: "Fri", value: 24567 },
];

const allocationData = [
  { name: "Tech", value: 65, color: "hsl(200, 80%, 60%)" },
  { name: "Finance", value: 15, color: "hsl(160, 60%, 50%)" },
  { name: "Healthcare", value: 12, color: "hsl(280, 60%, 60%)" },
  { name: "Energy", value: 8, color: "hsl(40, 70%, 50%)" },
];

const news = [
  { title: "NVIDIA reports record earnings amid AI boom", time: "2h ago" },
  { title: "Fed signals potential rate cuts in 2024", time: "4h ago" },
  { title: "Apple announces new product lineup", time: "6h ago" },
];

const StockPortfolio = () => {
  const isPositive = dailyChange >= 0;

  return (
    <section id="portfolio" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-semibold text-foreground mb-4 text-center">
          Stock Portfolio
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Real-time tracking of my investment portfolio and market watchlist.
        </p>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${portfolioValue.toLocaleString()}</div>
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
                {isPositive ? "+" : ""}${dailyChange.toLocaleString()} ({dailyChangePercent}%)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{holdings.length} Stocks</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Watchlist</CardTitle>
              <Eye className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{watchlist.length} Tracking</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="date" stroke="hsl(215, 15%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 15%, 55%)" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(220, 20%, 12%)",
                        border: "1px solid hsl(220, 15%, 22%)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "hsl(210, 20%, 95%)" }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, "Value"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(200, 80%, 60%)"
                      strokeWidth={2}
                      dot={{ fill: "hsl(200, 80%, 60%)" }}
                    />
                  </LineChart>
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

          {/* Holdings Table */}
          <Card className="lg:col-span-2 bg-card/50 border-border/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-heading">Holdings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm border-b border-border/50">
                      <th className="pb-3 font-medium">Symbol</th>
                      <th className="pb-3 font-medium">Shares</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Change</th>
                      <th className="pb-3 font-medium text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((stock) => (
                      <tr key={stock.symbol} className="border-b border-border/30 last:border-0">
                        <td className="py-3">
                          <div className="font-semibold text-foreground">{stock.symbol}</div>
                          <div className="text-xs text-muted-foreground">{stock.name}</div>
                        </td>
                        <td className="py-3 text-foreground">{stock.shares}</td>
                        <td className="py-3 text-foreground">${stock.price.toFixed(2)}</td>
                        <td className={`py-3 ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {stock.change >= 0 ? "+" : ""}{stock.change}%
                        </td>
                        <td className="py-3 text-right font-semibold text-foreground">
                          ${stock.value.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Watchlist & News */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-heading flex items-center gap-2">
                  <Eye className="w-4 h-4" /> Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlist.map((stock) => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{stock.symbol}</span>
                    <div className="text-right">
                      <div className="text-foreground">${stock.price}</div>
                      <div className={`text-xs ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stock.change >= 0 ? "+" : ""}{stock.change}%
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
