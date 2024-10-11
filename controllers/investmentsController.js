const Investment = require('../models/Investment');
const { fetchPerformanceData } = require('../utils/PerformanceData.js');

exports.addInvestment = async (req, res) => {
    try {
        const { date, type, amount } = req.body;
        const newInvestment = new Investment({ date, type, amount });
        await newInvestment.save();

        // Fetch real-time data from Alpha Vantage or Yahoo Finance
        const performanceData = await fetchPerformanceData(type);

        // Save performance metrics to investment
        newInvestment.performanceMetrics = performanceData;
        await newInvestment.save();

        res.status(201).json({ success: true, investment: newInvestment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllInvestments = async (req, res) => {
    try {
        const investments = await Investment.find();
        if (!investments) {
            return res.status(404).json({ success: false, error: 'No investments found' });
        }

        res.status(200).json({ success: true, investments });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.editInvestment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInvestment = await Investment.findByIdAndUpdate(id, req.body, { new: true });

        // Fetch updated real-time data after editing
        const performanceData = await fetchPerformanceData(updatedInvestment.type);
        updatedInvestment.performanceMetrics = performanceData;
        await updatedInvestment.save();

        res.status(200).json({ success: true, investment: updatedInvestment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};