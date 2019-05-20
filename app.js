const chalk = require('chalk');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const address = process.argv[2];

if (!address) {
    console.log(chalk.red('Please enter address to know the weather forecast'));
} else {
    geocode(address, (error, locationData) => {
        if (error) {
            console.log(chalk.red(error));
            return;
        }
    
        const { latitude, longitude, address } = locationData;
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                console.log(chalk.red(error));
                return;
            }
    
            const { dailySummary, temperature, precipProbability } = forecastData;
            console.log(chalk.inverse(address));
            console.log(dailySummary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.');
        });
    });
}

