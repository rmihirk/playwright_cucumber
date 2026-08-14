const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: './reports/',
  reportPath: './reports/html/',
  reportName: "Playwright Automation Report",
  pageTitle: "Automation Report",
  metadata: {
    browser: {
      name: 'chromium',
      version: '119'
    },
    device: 'Local Machine',
    platform: {
      name: 'windows',
      version: '11'
    }
  },
  customData: {
    title: 'Test Execution Report',
    data: [
      { label: 'Project', value: 'Playwright Cucumber Framework' },
      { label: 'Release', value: '1.0.0' },
      { label: 'Execution Time', value: new Date().toLocaleString() }
    ]
  }
});