import { AbstractControl } from "@angular/forms";

export class Validator{
    static matchPasswords(control:AbstractControl){
        const password:string = control.get('password')?.value;
        const confirmPassword:string = control.get('confirmPassword')?.value;
        if(password === confirmPassword){
            return null;
        }
        return { match_passwords:true };
    }
}