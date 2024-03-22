import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

@Directive({
  selector: '[appMinCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinCountDirective,
      multi: true,
    }
  ]
})
export class MinCountDirective {
  @Input() appMinCount: number | undefined;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    if(this.appMinCount === undefined || control.value?.length >= this.appMinCount){
      return null;
    }

    return {
      appMinCount: this.appMinCount,
    };
  }

}
