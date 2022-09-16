import { Page } from "@playwright/test";
import AccountData from "../helper/account.data";

export class RegisterPage {

    private page: Page
    private accountData; 

    constructor(page){
        this.page=page;
    }
    get login() {
        return this.page.locator('#user_login');
    }

    get password() {
        return this.page.locator('#user_password');
    }

    get conformition() {
        return this.page.locator('#user_password_confirmation');
    }


    get firstName() {
        return this.page.locator('#user_firstname');
    }

    get lastName() {
        return this.page.locator('#user_lastname')
    }

    get email() {
        return this.page.locator('#user_mail');
    }

    get nick() {
        return this.page.locator('[id*="user_custom"]');
    }

    get submit() {
        return this.page.locator("[type=submit]");
    }

    get errorExplanation() {
        return this.page.locator('#errorExplanation');
    }

    get requiredLabel() {
        const arr = this.page.$$eval('p>label', nodes => nodes.map(n => n.textContent));
        return arr;
    }

    async goto() {
        await this.page.goto("https://www.redmine.org/account/register");
    }

    async enterLogin(login) {
        await this.login.type(login);
    }

    async enterPassword(password) {
        await this.password.type(password);
    }

    async enterConfirmation(password) {
        await this.conformition.type(password);
    }

    async enterFirstName(firstname) {
        await this.firstName.type(firstname);
    }

    async enterLastname(lastname) {
        await this.lastName.type(lastname);
    }

    async enterEmail(email) {
        await this.email.type(email);
    }

    async enterNick(nick) {
        await this.nick.type(nick);
    }

    async clickSubmit() {
        await this.submit.click();
    }

    async register() {
       this.accountData=new AccountData();
       await this.enterLogin(this.accountData.getLogin);
       await this.enterPassword(this.accountData.getPasssword);
       await this.enterConfirmation(this.accountData.getPasssword);
       await this.enterFirstName(this.accountData.getFirstname);
       await this.enterLastname(this.accountData.getLastname);
       await this.enterEmail(this.accountData.getEmail);
       await this.enterNick(this.accountData.getNick);
       await this.clickSubmit();
    }

    async getTextError() {
        return this.errorExplanation.textContent();
    }

    async getTextLabel() {
        console.log("Get text label " + await this.requiredLabel);
    }

    async nameLabelRequired() {
        const elements: string[] = [];
        (await this.requiredLabel).forEach(async el => {
            if (el?.includes('*')) {
                el = await el.slice(0, -1);
                elements.push(await el);
            }
        });
        return await elements;
    }

    async toHaveLabelRequireInError() {
        const textError = await this.getTextError();
        const labelRequired = await this.nameLabelRequired();
        labelRequired.splice(2, 1);
        console.log(await labelRequired);
        let index = 0;
        (await labelRequired).forEach(async el => {
            if (textError?.includes(el)) {
                await index++;
            }
        });
        console.log("Index " + await index);
        return await index === await labelRequired.length ? true : false;
    }



}