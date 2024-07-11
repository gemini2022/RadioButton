import { CommonModule } from '@angular/common';
import { Component, contentChildren, ElementRef, forwardRef, input, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'radio-button-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button-group.component.html',
  styleUrl: './radio-button-group.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonGroupComponent),
    multi: true
  }]
})
export class RadioButtonGroupComponent implements ControlValueAccessor {
  // Inputs
  public width = input<string>();
  public height = input<string>();
  public margin = input<string>();
  public padding = input<string>();
  public buttonSize = input<string>();
  public overlaySize = input<string>();
  public labelDistance = input<string>();
  public buttonDotSize = input<string>();
  public labelFontSize = input<string>();
  public labelFontFamily = input<string>();
  public buttonBorderWidth = input<string>();
  public labelPosition = input<'before' | 'after'>();
  public layout = input<'horizontal' | 'vertical'>();
  public buttonsAlignment = input<'start' | 'center' | 'end'>();

  // Private
  private radioButtons = contentChildren(RadioButtonComponent);
  private radioButtonGroup = viewChild<ElementRef<HTMLElement>>('radioButtonGroup');

  // Public
  public disabled: boolean = false;
  public onChange!: (value: any) => void;
  public name: string = this.generateName();



  private ngOnInit(): void {
    this.setLayout();
  }



  private generateName(): string {
    return Math.random().toString(36).substring(2);
  }



  private setLayout(): void {
    const layout = this.layout() ? this.layout() : getComputedStyle(document.documentElement).getPropertyValue('--radio-button-group-layout');
    this.radioButtonGroup()?.nativeElement.style.setProperty('--flex-direction', layout === 'horizontal' ? 'row' : 'column');
  }



  public writeValue(value: any): void {
    const radioButton = this.radioButtons().find(x => x.value() === value);
    radioButton?.setAsChecked();
  }



  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }



  public registerOnTouched(fn: any): void { }



  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}