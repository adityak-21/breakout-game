import { Builder, Capabilities } from 'selenium-webdriver';

const performanceTimingScript = `
    let performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
    return performance.timing;
`;

(async function measureLoadTime() {
    const capabilities = Capabilities.chrome();
    capabilities.set('acceptInsecureCerts', true);
    let driver = await new Builder()
        .forBrowser('chrome')
        .withCapabilities(capabilities)
        .build();

    try {
        const url = 'https://adityak-21.github.io/breakout-game/client/';
        console.log(`Navigating to ${url}`);
        await driver.get(url);
        await driver.wait(() => driver.executeScript('return document.readyState === "complete"'), 10000);
        let performanceTiming = await driver.executeScript(performanceTimingScript);
        const navigationStart = performanceTiming.navigationStart;
        const loadEventEnd = performanceTiming.loadEventEnd;
        const domContentLoaded = performanceTiming.domContentLoadedEventEnd;
        const totalLoadTime = loadEventEnd - navigationStart;
        const domLoadTime = domContentLoaded - navigationStart;
        console.log(`Total Load Time: ${totalLoadTime} ms`);
        console.log(`DOM Content Loaded Time: ${domLoadTime} ms`);
        let resources = await driver.executeScript(() => {
            return window.performance.getEntriesByType('resource').map(resource => ({
                name: resource.name,
                size: resource.transferSize,
                duration: resource.duration
            }));
        });

        console.log('Assets Impacting Load Time:');
        resources
            .sort((a, b) => b.duration - a.duration) 
            .slice(0, 5) 
            .forEach(resource => {
                console.log(`Asset: ${resource.name}, Size: ${resource.size} bytes, Duration: ${resource.duration} ms`);
            });

    } catch (err) {
        console.error('Error during performance measurement:', err);
    } finally {
        await driver.quit();
    }
})();

