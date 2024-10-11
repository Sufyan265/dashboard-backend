const axios = require('axios');

exports.fetchPerformanceData = async (type) => {
    try {
        // Example: Fetch data from Alpha Vantage
        const apiKey = 'XXBQUFBK1QC25FMY';
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${type}&apikey=${apiKey}`);
        const data = response.data;
        // Calculate performance metrics based on API response
        const performance = calculatePerformanceMetrics(data);
        return performance;
    } catch (error) {
        console.error("Error fetching performance data: ", error);
        throw error;
    }
};

const calculatePerformanceMetrics = (data) => {
    try {
        // Assuming data comes from an API like Alpha Vantage's "TIME_SERIES_DAILY"
        const timeSeries = data['Time Series (Daily)'];

        // Convert the time series data into an array of objects with date and close price
        const prices = Object.keys(timeSeries).map((date) => ({
            date,
            close: parseFloat(timeSeries[date]['4. close']),
        }));

        // Sort by date ascending (oldest to newest)
        prices.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Get the first (oldest) and last (most recent) closing prices
        const firstPrice = prices[0].close;
        const lastPrice = prices[prices.length - 1].close;

        // Calculate growth percentage
        const growth = ((lastPrice - firstPrice) / firstPrice) * 100;

        // Calculate loss if growth is negative
        const losses = growth < 0 ? Math.abs(growth) : 0;

        // Calculate profit (just as an example, you can define your own logic)
        const profit = growth > 0 ? growth * 0.5 : 0;

        return {
            growth: growth.toFixed(2),  // Percentage growth
            losses: losses.toFixed(2),  // Percentage losses
            profit: profit.toFixed(2),  // Example profit calculation
        };
    } catch (error) {
        console.error('Error calculating performance metrics:', error);
        return {
            growth: 0,
            losses: 0,
            profit: 0,
        };
    }
};
