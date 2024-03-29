import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxCount]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxCountDirective,
      multi: true,
    }
  ]
})
export class MaxCountDirective {
  @Input() appMaxCount: number | undefined;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {

    if(this.appMaxCount === undefined || control.value?.length <= this.appMaxCount || 0){
      return null;
    }

    return {
      appMaxCount: this.appMaxCount,
    };
  }

}
