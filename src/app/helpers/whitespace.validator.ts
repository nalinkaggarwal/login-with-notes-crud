import { FormControl } from "@angular/forms";
import { of } from "rxjs";

export function noWhitespaceValidator(control: FormControl): null|any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return of(isValid ? null : { whitespace : true });
}
