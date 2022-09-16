import { test, expect } from '@playwright/test';
import {MainPage} from './pages/main.page.spec';
import {RegisterPage} from './pages/register.page.spec';
import resources from './resources';

test.describe('Redmine.org', () => {

    let main: MainPage;
    let register: RegisterPage;

    test.beforeEach(async({page})=>{
        main=new MainPage(page);
        await main.goto();
        register=new RegisterPage(page);
    });

    test('title should be "Overview - Redmine"', async({page}) => {
        await expect(page).toHaveTitle("Overview - Redmine");
    });

    test('should go to register page', async({page}) => {
        
        await  main.clickRegister();
        await expect(page.url()).toContain("/register");
    });

    test('should verify menu on main page', async({page}) => {
        console.log(await main.menuOnMainPage);
        await expect(await main.menuOnMainPage).toEqual(resources.menuOnMainPage);
    });

    test('should registration with empty credentials', async ({page}) => {
       await register.goto();
       await register.clickSubmit();
       console.log('Get text Error: '+ await register.getTextError());
       await expect(await register.toHaveLabelRequireInError()).toBeTruthy();
       await expect(register.errorExplanation).toBeEnabled();
    });

    test('should registration with credentials', async({page}) => {
        await register.goto();
        await register.register();
        await page.waitForTimeout(4000);
        await expect(page).toHaveURL(/.*login/);
    });

});