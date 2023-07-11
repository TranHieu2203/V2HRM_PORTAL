import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static startsWithUpperCase(control: AbstractControl): any | null {

        const words = control.value.split(' ');
        let valid = true;
        words.some((word: string) => {
            if (word.trim() === '') return;
            if (word.charAt(0) !== word.charAt(0).toUpperCase()) {
                valid = false;
                return;
            }
        });

        return CustomValidators.core("startsWithUpperCase", valid, "lỗi chính tả không viết hoa đầu từ")(control);
    }

    static upperCaseAll(control: AbstractControl): any | null {

        const valid = !!!control.value || (control.value === control.value.toUpperCase());
        return CustomValidators.core("upperCaseAll", valid, "lỗi chính tả không viết hoa tất cả các chữ")(control);
    }

    static core(errorKey: string, valid: boolean, errorMessage: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            if (valid) return null;
            const result: any = {};
            result[errorKey] = [ control.value, errorMessage];
            return result;
        }
    }
}

