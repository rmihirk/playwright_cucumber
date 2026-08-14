import { Locator } from "playwright";
import { fixture } from "../../hooks/fixtures";

export default class CheckBoxActions {
    private locator: Locator;
    private description: string;

    /**
     * Sets the locator with description
     * @param locator
     * @param description
     * @returns
     */
    public setLocator(locator: Locator, description: string): CheckBoxActions {
        this.locator = locator;
        this.description = description;
        return this;
    }

    /**
     * check checkbox or radio button
     */
    public async check() {
        fixture.logger.info(`Check ${this.description}`);
        await this.locator.check();
        return this;
    }

    /**
     * uncheck checkbox or radio button
     */
    public async uncheck() {
        fixture.logger.info(`Uncheck ${this.description}`);
        await this.locator.uncheck();
        return this;
    }

    /**
     * Returns the status of the checkbox
     * @returns
     */
    public async isChecked(): Promise<boolean> {
        fixture.logger.info(`Verifying if checkbox ${this.description} is checked`);
        const element = this.locator;
        await element.waitFor({ state: "visible", timeout: 60 * 1000 });
        return await this.locator.isChecked();
    }
}
