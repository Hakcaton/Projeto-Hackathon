import { Component, Input, OnInit, Output } from '@angular/core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordInputComponent,
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {

  @Input() value: string = '';

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  bPasswordVisible = false;

  onChange: any = () => { };
  onTouched: any = () => { };
  disabled = false;

  constructor() {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public btnToogleOnClick() {
    this.bPasswordVisible = !this.bPasswordVisible;
  }

}
