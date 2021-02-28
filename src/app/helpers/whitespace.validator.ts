import { AbstractControl, FormControl } from "@angular/forms";
import { of } from "rxjs";

export function noWhitespaceValidator(control: AbstractControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return of(isValid ? null : { 'whitespace': true });
}