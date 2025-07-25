const { Builder, By, until } = require("selenium-webdriver");

describe("UI test with Selenium", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Homepage loads and shows logo", async () => {
    await driver.get("http://127.0.0.1/");

    const logo = await driver.wait(
      until.elementLocated(By.className("App-logo")),
      10000
    );

    const isDisplayed = await logo.isDisplayed();
    expect(isDisplayed).toBe(true);
  });
});
