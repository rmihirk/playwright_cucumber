import { Locator, Page } from "playwright";
import { fixture } from "../../hooks/fixtures";

export default class UIElementActions {
  protected locator: Locator;
  protected description: string;
  protected selector: string;

  constructor(private page: Page) { }

  /**
   * Returns the first locator
   * @returns
   */
  public getLocator(): Locator {
    return this.locator.first();
  }

  /**
   * Returns the all the locators
   * @returns
   */
  public getLocators(): Locator {
    return this.locator;
  }

  /**
   * Sets the locator using the selector * 
   * @param selector 
   * @param description optional
   * @returns
   */
  public setElement(selector: string, description?: string): UIElementActions {
    this.selector = selector;
    this.locator = this.page.locator(this.selector);
    this.description = description;
    return this;
  }

  /**
   * Sets the locator with description
   * @param locator
   * @param description optional
   * @returns
   */
  public setLocator(locator: Locator, description?: string): UIElementActions {
    this.locator = locator;
    this.description = description;
    return this;
  }

  /**
   * Click on element
   * @returns
   */
  // public async click() {
  //   fixture.logger.info(`Clicking on ${this.description}`)
  //     await this.getLocator().click({ force: true });
  //   return this;
  // }

  // /**
  //  * Click on element
  //  * @returns
  //  */
  // public async click() {
  //   fixture.logger.info(`Clicking on ${this.description}`)
  //     await this.getLocator().click({ force: true });
  //   return this;
  // }
  public async click() {
    fixture.logger.info(`Clicking on ${this.description}`);

    // Get the locator
    const locator = this.getLocator();
    await locator.waitFor();

    // Highlight the element
    await locator.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';

      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 500ms
    });

    // Click the element
    await locator.click({ force: true });

    return this;
  }

  /**
   * Click on nth element
   * @returns
   */
  public async clickNth(index: number = 0) {

    fixture.logger.info(`Clicking on the ${index}th element for ${this.description}`);
    // Get the nth locator
    const locator = this.getLocators().nth(index);
    // Highlight the nth element
    await locator.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';
      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 1 second
    });
    // Click the nth element
    await locator.click({ force: true });
    return this;
  }

  public async jsClickNth(index: number = 0) {
    const ele = this.getLocators().nth(index);   // pick specific element
    await ele.waitFor({ state: "visible", timeout: 30000 });
    await ele.evaluate((node: Element) => (node as HTMLElement | SVGElement).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
    return this;
  }

  /**
   * Double click on element
   * @returns
   */
  public async doubleClick() {
    fixture.logger.info(`Double Clicking ${this.description}`)
    await this.getLocator().dblclick();
    return this;
  }

  /**
   * scroll element into view, unless it is completely visible
   * @returns
   */
  public async scrollIntoView() {
    fixture.logger.info(`Scroll to element ${this.description}`)
    await this.getLocator().scrollIntoViewIfNeeded();
    return this;
  }

  /**
   * Wait for element to be invisible
   * @returns
   */
  public async waitTillInvisible() {
    fixture.logger.info(`Waiting for ${this.description} to be invisible`)
    await this.getLocator().waitFor({ state: "hidden" });
    return this;
  }

  /**
   * wait for element not to be present in DOM
   * @returns
   */
  public async waitTillDetached() {
    fixture.logger.info(`Wait for ${this.description} to be detached from DOM`)
    await this.getLocator().waitFor({ state: "detached" });
    return this;
  }

  /**
   * wait for element to be visible
   * @param wait time for element is visible
   * @returns
   */
  public async waitTillVisible(sec: number) {
    fixture.logger.info(`Wait for ${this.description} to be visible in DOM`)
    await this.getLocator().waitFor({ state: "visible", timeout: sec * 1000 });
    return this;
  }

  /**
   * wait for element to be attached to DOM
   * @returns
   */
  public async waitForPresent() {
    fixture.logger.info(`Wait for ${this.description} to attach to DOM`)
    await this.getLocator().waitFor({ state: "attached" });
    return this;
  }

  /**
   * This method hovers over the element
   */
  public async hover() {
    fixture.logger.info(`Hovering on ${this.description}`)
    // Get the locator
    const locator = this.getLocator();
    // Highlight the element
    await locator.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';

      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 500ms
    });
    // Click the element
    await locator.hover();
    return this;
  }

  /**
   * Returns input.value for <input> or <textarea> or <select> element.
   * @returns
   */
  public async getInputValue(): Promise<string> {
    let value: string;
    fixture.logger.info(`Getting input value of ${this.description}`)
    const element = this.getLocator();
    await element.waitFor();
    value = await element.inputValue();
    return value;
  }

  /**
   * Gets the text content
   * @returns
   */
  public async getTextContent(): Promise<string> {
    let content: string;
    fixture.logger.info(`Getting text content of ${this.description}`)
    const element = this.getLocator();
    await element.waitFor();
    // Highlight the element
    await element.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';

      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 1 sec
    });
    content = (await element.textContent()).trim();
    return content;
  }

  /**
   * Get Attribute value
   * @param attributeName
   * @returns
   */
  public async getAttribute(attributeName: string): Promise<string> {
    let value: string;
    fixture.logger.info(`Getting attribute value of ${this.description}`)
    const element = this.getLocator();
    await element.waitFor();
    value = (await element.getAttribute(attributeName)).trim();
    return value;
  }

  /**
   * Get innerHTML
   * @returns
   */
  public async getInnerHTML(): Promise<string> {
    let text: string;
    fixture.logger.info(`Get innerHTML of ${this.description}`)
    const element = this.getLocator();
    await element.waitFor();
    text = (await element.innerHTML()).trim();
    return text;
  }

  /**
   * Get inner text
   * @returns
   */
  public async getInnerText(): Promise<string> {
    let text: string;
    fixture.logger.info(`Get inner text of ${this.description}`)
    const element = this.getLocator();
    await element.waitFor();
    text = (await element.innerText()).trim();
    return text;
  }

  /**
   * checks if element is editable
   * @returns Promise<boolean>
   */
  public async isEditable(): Promise<boolean> {
    let status: boolean;
    fixture.logger.info(`Checking if ${this.description} is editable`)
    const element = this.getLocator();
    await element.waitFor();
    status = await element.isEditable();
    return status;
  }

  /**
   * checks if Nth element is editable
   * @param index for element to be editable
   * @returns Promise<boolean>
   */
  public async isNthEditable(index: number = 0): Promise<boolean> {
    let editableStatus: boolean;
    fixture.logger.info(`Checking if the ${index}th element for ${this.description} is editable.`);
    try {

      // Get the nth locator
      const element = this.getLocators().nth(index);

      // Check if the nth element is editable
      await element.waitFor();
      editableStatus = await element.isEditable();
    } catch (error) {

      // In case of error, assume the element is not editable
      fixture.logger.warn(`Error while checking editable state of ${this.description} the ${index}th element: ${error}`);
      editableStatus = false;
    }
    return editableStatus;
  }

  /**
   * checks if element is enabled
   * @returns Promise<boolean>
   */
  public async isEnabled(): Promise<boolean> {
    let status: boolean;
    fixture.logger.info(`Checking if ${this.description} is enabled`)
    const element = this.getLocator();
    await element.waitFor();
    status = await element.isEnabled();
    return status;
  }

  /**
   * checks if Nth element is enabled
   * @param index for element to be enabled
   * @returns Promise<boolean>
   */
  public async isNthEnabled(index: number = 0): Promise<boolean> {
    let enabledStatus: boolean;
    fixture.logger.info(`Checking if the ${index}th element for ${this.description} is enabled.`);
    try {

      // Get the nth locator
      const element = this.getLocators().nth(index);

      // Check if the nth element is enabled
      await element.waitFor();
      enabledStatus = await element.isEnabled();
    } catch (error) {

      // In case of error, assume the element is not enabled
      fixture.logger.warn(`Error while checking enabled state of ${this.description} the ${index}th element: ${error}`);
      enabledStatus = false;
    }
    return enabledStatus;
  }

  /**
   * checks if element is enabled
   * @returns Promise<boolean>
   */
  public async isDisabled(): Promise<boolean> {
    let status: boolean;
    fixture.logger.info(`Checking if ${this.description} is disabled`)
    const element = this.getLocator();
    await element.waitFor();
    status = await element.isDisabled();
    return status;
  }

  /**
   * checks if element is visible
   * @param wait time for element to be visible
   * @returns Promise<boolean>
   */
  public async isVisible(sec: number): Promise<boolean> {
    let visibility: boolean;
    fixture.logger.info(`Checking if ${this.description} is visible`)
    try {
      // Highlight the nth element with a green border
      await this.getLocator().evaluate((el) => {
        el.style.border = '5px solid green';
        el.style.transition = 'border 0.5s ease-in-out';

        // Optionally remove the highlight after a delay
        setTimeout(() => {
          el.style.border = ''; // Revert the border
        }, 1000); // Remove after 1 second
      });
      visibility = await this.getLocator().isVisible({ timeout: sec * 1000 });
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }

  /**
   * checks if element is not visible
   * @param wait time for element to be visible
   * @returns Promise<boolean>
   */
  public async isNotVisible(sec: number): Promise<boolean> {
    let visibility: boolean;
    fixture.logger.info(`Checking if ${this.description} is not visible`)
    try {
      visibility = true
    } catch (error) {
      visibility = false;
    }
    return visibility;
  }

  /**
   * checks if Nth element is visible
   * @param wait time for element to be visible
   * @returns Promise<boolean>
   */
  public async isNthVisible(sec: number, index: number = 0): Promise<boolean> {
    let visibility: boolean;
    fixture.logger.info(`Checking if the ${index}th element for ${this.description} is visible`);

    try {
      // Get the nth locator
      const locator = this.getLocators().nth(index);

      // Highlight the nth element with a green border
      await locator.evaluate((el) => {
        el.style.border = '3px solid green';
        el.style.transition = 'border 0.5s ease-in-out';

        // Optionally remove the highlight after a delay
        setTimeout(() => {
          el.style.border = ''; // Revert the border
        }, 1000); // Remove after 1 second
      });

      // Check if the nth element is visible with a timeout
      visibility = await locator.isVisible({ timeout: sec * 1000 });

      // Log the result
      // if (visibility) {
      //     fixture.logger.info(`The ${index}th element is visible.`);
      // } else {
      //     fixture.logger.warn(`The ${index}th element is not visible.`);
      // }
    } catch (error) {
      // In case of error, assume the element is not visible
      fixture.logger.warn(`Error while checking visibility of ${this.description} the ${index}th element: ${error}`);
      visibility = false;
    }

    return visibility;
  }

  /**
   * Press a key on web element
   * @param key
   */
  public async keyPress(key: string) {
    fixture.logger.info(`Pressing ${this.description}`)
    await this.getLocator().press(key);
  }

  /**
   * Get all the text Content
   * @returns
   */
  public async getAllTextContent(): Promise<string[]> {
    let content: string[];
    fixture.logger.info(`Getting all the text content of ${this.description}`)
    const element = this.getLocators();
    await element.first().waitFor();
    content = await element.allTextContents();
    return content;
  }

  /**
   * Get the count of
   * @returns
   */
  public async getCount(): Promise<number> {
    let count: number;
    fixture.logger.info(`Getting the count of ${this.description}`)
    count = await this.getLocators().count();
    return count;
  }
  /**
   * Performs mouse click action on the element
   * @returns 
   */
  public async mouseClick() {
    fixture.logger.info(`Clicking on ${this.description}`)
    await this.getLocator().scrollIntoViewIfNeeded();
    const box = await this.getLocator().boundingBox();
    await this.page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    return this;
  }
  /**
   * Click on element using js
   * @returns
   */
  public async jsClick() {
    fixture.logger.info(`Clicking on ${this.description}`)
    const ele = this.getLocator();
    await ele.waitFor();
    await ele.evaluate((node: HTMLElement) => { node.click(); });
    return this;
  }

  public async hoverNth(index: number = 0) {

    fixture.logger.info(`Hovering on the ${index}th element for ${this.description}`);
    // Get the nth locator
    const locator = this.getLocators().nth(index);
    // Highlight the nth element
    await locator.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';
      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 1 second
    });
    // Click the nth element
    await locator.hover({ force: true });
    return this;
  }

  public async clickLast() {

    fixture.logger.info(`Clicking on the last element for ${this.description}`);
    // Get the nth locator
    const locator = this.getLocators().last();
    // Highlight the nth element
    await locator.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';
      // Optionally remove the highlight after a delay
      setTimeout(() => {
        el.style.border = '';
      }, 1000); // remove after 1 second
    });
    // Click the nth element
    await locator.click({ force: true });
    return this;
  }

  public async getColorRGB(cssType: string): Promise<string> {
    let content: string;
    fixture.logger.info(`Getting background/font color of ${this.description}`)
    const web_element = this.getLocator();
    await web_element.waitFor();
    if (cssType == "Color") {
      content = await web_element.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("Color")
      )
    }
    else if (cssType == "background-color") {
      content = await web_element.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("background-color")
      )
    }
    else if (cssType == "border-color") {
      content = await web_element.evaluate((element) =>
        window.getComputedStyle(element).getPropertyValue("border-color")
      )
    }
    return content;
  }

  public async getCssPropertyValue(cssProperty: string): Promise<string> {
    let content: string;
    fixture.logger.info(`Getting Css property Value of ${this.description}`)
    const web_element = this.getLocator();
    await web_element.waitFor();
    await web_element.evaluate((el) => {
      el.style.border = '7px solid red';
      el.style.transition = 'border 1s ease-in-out';
      // Optionally Remove the highlight after a delay
      setTimeout(() => { el.style.border = ''; }, 1000); // Remove after 1 second
    });
    if (cssProperty == "font-weight") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("font-weight")
      )
    }
    else if (cssProperty == "text-decoration-line") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("text-decoration-line")
      )
    }
    else if (cssProperty == "text-decoration") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("text-decoration")
      )
    }
    else if (cssProperty == "height") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("height")
      )
    }
    else if (cssProperty == "fill") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("fill")
      )
    }
    else if (cssProperty == "outline-color") {
      content = await web_element.evaluate((el) =>
        window.getComputedStyle(el).getPropertyValue("outline-color")
      )
    }
    return content;
  }
}