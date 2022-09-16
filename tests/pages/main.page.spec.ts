import { Page } from "@playwright/test"

export class MainPage {

    private page: Page;

    constructor(page){
        this.page=page;
    }

    get register() {
        return this.page.locator('a.register');
    }

    get menuOnMainPage(){
        return this.page.$$eval('.toc > li a', nodes => nodes.map(n => n.textContent));
    }

    async goto () {
        await this.page.goto('https://www.redmine.org/');
    }

    async clickRegister() {
        await this.register.click();
    }
}