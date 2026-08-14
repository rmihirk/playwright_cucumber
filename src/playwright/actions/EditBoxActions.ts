import UIElementActions from "./UIElementActions";
import { Locator } from "playwright";
import { fixture } from "../../hooks/fixtures";

export default class EditBoxActions extends UIElementActions {
  /**
   * Sets the selector with description
   * @param selector
   * @param description
   * @returns
   */
  public setEditBox(selector: string, description?: string): EditBoxActions {
    this.setElement(selector, description);
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @returns
   */
  public setLocator(locator: Locator, description: string): EditBoxActions {
    super.setLocator(locator, description);
    return this;
  }

  /**
   * Clear and enter text
   * @param value
   * @returns
   */
  public async fill(value: string) {
    fixture.logger.info(`Entering ${this.description} as ${value}`)
      await this.getLocator().fill(value);
    return this;
  }

  /**
   * Clear the text
   * @returns
   */
  public async clear() {
    fixture.logger.info(`Clearing text from ${this.description}`)
    await this.getLocator().clear();
    return this;
  }

  /**
   * Types the value to text field
   * @param value
   * @returns
   */
  public async type(value: string) {
    fixture.logger.info(`Typing ${this.description} as ${value}`)
      await this.getLocator().type(value);
    return this;
  }

  /**
   * Enter text and hit tab key
   * @param value
   * @returns
   */
  public async fillAndTab(value: string) {
    fixture.logger.info(`Entering ${this.description} as ${value} and Tab`)
      await this.getLocator().fill(value);
      await this.getLocator().press("Tab");
    return this;
  }

  /**
   * Typing text and hit tab key
   * @param value
   * @returns
   */
  public async typeAndTab(value: string) {
    fixture.logger.info(`Entering ${this.description} as ${value} and Tab`)
      await this.getLocator().type(value);
      await this.getLocator().press("Tab");
    return this;
  }
}
