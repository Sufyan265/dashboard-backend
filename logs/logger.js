const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const isProduction = process.env.NODE_ENV === 'production';

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),  // Always log to console
        // Conditionally add file transport if not in production (e.g., locally)
        ...(isProduction ? [] : [
            new transports.DailyRotateFile({
                filename: 'logs/application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                maxFiles: '14d'
            })
        ])
    ]
});

module.exports = logger;
