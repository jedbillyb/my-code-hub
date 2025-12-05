export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content?: string;
}

export const posts: BlogPost[] = [
  {
    id: "getting-started-with-algorithmic-trading",
    title: "Getting Started with Algorithmic Trading",
    excerpt:
      "A beginner's guide to understanding and implementing basic trading algorithms using Python and popular financial APIs.",
    date: "Dec 1, 2024",
    readTime: "8 min read",
    tags: ["Trading", "Python"],
    content: `
## Getting Started with Algorithmic Trading

Algorithmic trading has revolutionized the way we approach financial markets. In this post, I'll share my experience getting started with automated trading systems.

### What is Algorithmic Trading?

Algorithmic trading uses computer programs to execute trades based on predefined criteria. These can range from simple moving average crossovers to complex machine learning models.

### My First Steps

When I started, I focused on understanding the basics:
- Market data APIs
- Order execution
- Risk management
- Backtesting strategies

### Tools I Use

I primarily work with Python and libraries like:
- pandas for data manipulation
- numpy for calculations
- yfinance for market data

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "building-a-real-time-stock-dashboard",
    title: "Building a Real-Time Stock Dashboard",
    excerpt:
      "How I built a real-time stock tracking dashboard using React, WebSockets, and the Alpha Vantage API.",
    date: "Nov 20, 2024",
    readTime: "12 min read",
    tags: ["React", "WebSockets"],
    content: `
## Building a Real-Time Stock Dashboard

Creating a dashboard that updates in real-time was one of my most rewarding projects.

### The Challenge

Traditional REST APIs require polling, which isn't ideal for real-time data. WebSockets provide a better solution.

### Tech Stack

- React for the frontend
- WebSocket connections for live data
- Alpha Vantage API for market data
- Recharts for visualizations

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "my-journey-into-stock-trading",
    title: "My Journey Into Stock Trading",
    excerpt:
      "Reflections on my first year as a retail investor - lessons learned, mistakes made, and strategies that worked.",
    date: "Nov 5, 2024",
    readTime: "6 min read",
    tags: ["Personal", "Investing"],
    content: `
## My Journey Into Stock Trading

Looking back on my first year in the markets, I've learned more than I ever expected.

### The Beginning

Like many, I started during the pandemic when markets were volatile and interesting. What began as curiosity became a passion.

### Lessons Learned

1. Patience is crucial
2. Never invest what you can't afford to lose
3. Research before buying
4. Emotions are your enemy

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "understanding-technical-analysis",
    title: "Understanding Technical Analysis",
    excerpt:
      "Breaking down the fundamentals of chart patterns, indicators, and how I use them in my trading decisions.",
    date: "Oct 28, 2024",
    readTime: "10 min read",
    tags: ["Trading", "Analysis"],
    content: `
## Understanding Technical Analysis

Technical analysis is a powerful tool when used correctly. Here's how I approach it.

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "portfolio-diversification-strategies",
    title: "Portfolio Diversification Strategies",
    excerpt:
      "How I structure my portfolio across different sectors and asset classes to manage risk effectively.",
    date: "Oct 15, 2024",
    readTime: "7 min read",
    tags: ["Investing", "Strategy"],
    content: `
## Portfolio Diversification Strategies

Diversification is key to long-term success. Here's my approach.

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "automating-trade-alerts",
    title: "Automating Trade Alerts",
    excerpt:
      "Building a notification system that alerts me when stocks hit certain price targets or technical conditions.",
    date: "Oct 1, 2024",
    readTime: "9 min read",
    tags: ["Automation", "Python"],
    content: `
## Automating Trade Alerts

I built a system to never miss important market movements.

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "risk-management-fundamentals",
    title: "Risk Management Fundamentals",
    excerpt:
      "The importance of position sizing, stop losses, and protecting your capital in volatile markets.",
    date: "Sep 20, 2024",
    readTime: "8 min read",
    tags: ["Risk", "Strategy"],
    content: `
## Risk Management Fundamentals

Risk management is arguably more important than stock picking.

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "learning-from-market-crashes",
    title: "Learning from Market Crashes",
    excerpt:
      "What historical market downturns teach us about investing psychology and opportunity recognition.",
    date: "Sep 5, 2024",
    readTime: "11 min read",
    tags: ["History", "Psychology"],
    content: `
## Learning from Market Crashes

History doesn't repeat, but it often rhymes.

*This is placeholder content - replace with your actual post.*
`,
  },
  {
    id: "building-your-first-trading-bot",
    title: "Building Your First Trading Bot",
    excerpt:
      "A step-by-step guide to creating a simple trading bot that can execute paper trades automatically.",
    date: "Aug 25, 2024",
    readTime: "15 min read",
    tags: ["Tutorial", "Python"],
    content: `
## Building Your First Trading Bot

Let's build a basic trading bot from scratch.

*This is placeholder content - replace with your actual post.*
`,
  },
];

export default posts;
