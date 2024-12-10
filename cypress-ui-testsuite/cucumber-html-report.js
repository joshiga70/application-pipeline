const report = require('multiple-cucumber-html-reporter');

var d = new Date();

report.generate({
	jsonDir: 'cypress/cucumber-json',
	reportPath: './reports/cucumber-htmlreport.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '102.0.5005.63'
        },
        device: 'localhost:8080',
        platform: {
            name: 'windows 10 pro',
            version: '10.0'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'pipeline ui testsuite'},
            {label: 'Release', value: '0.1.0'},
            {label: 'Platform', value: ''},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: d.toLocaleString()},
            {label: 'Execution End Time', value: d.toLocaleString()}
        ]
    }
});