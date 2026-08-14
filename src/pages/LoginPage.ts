import { Page } from 'playwright';
import UIActions from '../playwright/actions/UIActions';
import UIElementActions from '../playwright/actions/UIElementActions';
import EditBoxActions from '../playwright/actions/EditBoxActions';

export class LoginPage {

  private ui: UIActions;
  private elementAction: UIElementActions;
  private editBoxAction: EditBoxActions;

  constructor(private page: Page) {
    this.elementAction = new UIElementActions(page);
    this.editBoxAction = new EditBoxActions(page);
    this.ui = new UIActions(page);
  }

  async navigate() {
    await this.ui.goto(process.env.BASEURL, 'login to application');
  }

  async login(username: string, password: string) {
    await this.elementAction.setElement('text=Login', 'Click Login button').click();
    await this.editBoxAction.setEditBox('#username', 'Enter username').fill(username);
    await this.editBoxAction.setEditBox('#password', 'Enter password').fill(password);
  }

  async loginButtonIsDisabled() {
    return await this.elementAction.setElement('#login-submit-btn', 'Login Button').isDisabled();
  }

  async loginButtonIsEnabled() {
    return await this.elementAction.setElement('#login-submit-btn', 'Login Button').isEnabled();
  }

}