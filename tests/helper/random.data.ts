import { faker } from '@faker-js/faker';

export class RandomData {

    static get randomEmail() {
        return faker.internet.email();
    }
    
    static get randomPassword(){
        return faker.internet.password();
    }

    static get randomFirstName() {
        return faker.name.firstName();
    }
    
    static get randomLastName() {
        return faker.name.lastName();
    }

    static get randomUsername() {
        return faker.internet.userName();
    }   
    
}