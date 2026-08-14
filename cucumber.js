module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        require: ['src/steps/**/*.ts', 'src/hooks/hooks.ts'],
        requireModule: ['ts-node/register'],
        format: [
            'json:reports/cucumber-report.json',
            'html:reports/cucumber-report.html'
        ],
        paths: [
            'features/'
        ],
        timeout: 60000,
        formatOptions: {
            snippetInterface: 'async-await'
        },
        publishQuiet: true
    }
};