import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})

//directive class implement the validator interface
export class EqualValidator implements Validator {
    constructor( @Attribute('validateEqual') public validateEqual: string) {}
    // the value of validateEqual would be 'password'
    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let v = c.value;

        // control value (e.g. password)
        let e = c.root.get(this.validateEqual);

        // value not equal, check value equality
        if (e && v !== e.value) return {
            validateEqual: false
        }
        return null;
    }
}