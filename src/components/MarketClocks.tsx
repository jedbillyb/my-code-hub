import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Market {
  name: string;
  timezone: string;
  openHour: number;
  closeHour: number;
  shortName: string;
}

const markets: Market[] = [
  { name: "New York", shortName: "NYSE", timezone: "America/New_York", openHour: 9, closeHour: 16 },
  { name: "London", shortName: "LSE", timezone: "Europe/London", openHour: 8, closeHour: 16 },
  { name: "Tokyo", shortName: "TSE", timezone: "Asia/Tokyo", openHour: 9, closeHour: 15 },
  { name: "Sydney", shortName: "ASX", timezone: "Australia/Sydney", openHour: 10, closeHour: 16 },
];

const getMarketTime = (timezone: string) => {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const isMarketOpen = (timezone: string, openHour: number, closeHour: number) => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { timeZone: timezone, hour: "numeric", weekday: "short" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(now);
  
  const hour = parseInt(parts.find(p => p.type === "hour")?.value || "0");
  const weekday = parts.find(p => p.type === "weekday")?.value || "";
  
  // Closed on weekends
  if (weekday === "Sat" || weekday === "Sun") return false;
  
  return hour >= openHour && hour < closeHour;
};

const MarketClocks = () => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading flex items-center gap-2 text-base">
          <Clock className="w-4 h-4" /> Market Hours
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {markets.map((market) => {
            const open = isMarketOpen(market.timezone, market.openHour, market.closeHour);
            return (
              <div
                key={market.shortName}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/30"
              >
                <div>
                  <div className="text-xs text-muted-foreground">{market.shortName}</div>
                  <div className="font-mono text-sm text-foreground">
                    {getMarketTime(market.timezone)}
                  </div>
                </div>
                <Badge
                  variant={open ? "default" : "secondary"}
                  className={`text-xs ${open ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                >
                  {open ? "Open" : "Closed"}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketClocks;
