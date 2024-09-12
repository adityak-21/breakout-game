import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { expect } from "chai";
import "mocha";

describe("Game Start Functionality Tests", function () {
  let driver;
  this.timeout(2000);
  before(async function () {
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new chrome.Options())
      .build();
    await driver.get("http://localhost:3000");
  });
  after(async function () {
    await driver.quit();
  });

  it("should start the stopwatch when the start button is clicked", async function () {
    let startButton = await driver.findElement(By.id("start_button"));
    await startButton.click();
    let stopwatch = await driver.wait(
      until.elementLocated(By.id("stopwatch")),
      5000,
    );
    let stopwatchText = await stopwatch.getText();
    expect(stopwatchText).to.not.equal("00:00");
  });

  it("should create a ball when the start button is clicked", async function () {
    let startButton = await driver.findElement(By.id("start_button"));
    await startButton.click();
    let ball = await driver.wait(until.elementLocated(By.id("ball")), 5000);
    expect(ball).to.not.be.null;
  });
  it("should not create another ball if the game has already started", async function () {
    let startButton = await driver.findElement(By.id("start_button"));
    await startButton.click();
    await startButton.click();
    let balls = await driver.findElements(By.id("ball"));
    expect(balls.length).to.equal(1);
  });
});
