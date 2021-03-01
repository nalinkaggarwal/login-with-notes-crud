import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { noWhitespaceValidator } from './whitespace.validator';
let formcontrol: FormControl;
describe('Whitespace.Validator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
        formcontrol = new FormControl();
    });
    it('should create an instance', () => {
        expect(noWhitespaceValidator(formcontrol)).toBeTruthy();
    });

    it('should return error incase of whitespace', (done: DoneFn) => {
        formcontrol.setValue('');
        noWhitespaceValidator(formcontrol).subscribe((value) => {
            const expectedOutput = { whitespace: true };
            expect(value).toEqual(expectedOutput);
            done();
        });
    });

    it('should not return error incase of valid string', (done: DoneFn) => {
        formcontrol.setValue(' 1234');
        noWhitespaceValidator(formcontrol).subscribe((value) => {
            expect(value).toEqual(null);
            done();
        });
    });
});
