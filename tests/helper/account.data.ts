import { RandomData } from "./random.data";

export default class AccountData{

    private login;
    private password;
    private firstname;
    private lastname;
    private email;
    private nick;

    constructor(){
        this.login=RandomData.randomUsername;
        this.password=RandomData.randomPassword;
        this.firstname=RandomData.randomFirstName;
        this.lastname=RandomData.randomLastName;
        this.email=RandomData.randomEmail;
        this.nick=RandomData.randomUsername;
    }

    get getLogin() {
        return this.login;
    }
    
    get getPasssword() {
        return this.password;
    }
    
    get getFirstname() {
        return this.firstname;
    }

    get getLastname(){
        return this.lastname;
    }

    get getEmail(){
        return this.email;
    }

    get getNick(){
        return this.nick;
    } 
    
}