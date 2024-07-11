import { CommonModule } from "@angular/common";
import { Component, input, booleanAttribute, inject, viewChild, ElementRef } from "@angular/core";
import { RadioButtonGroupComponent } from "../radio-button-group/radio-button-group.component";


@Component({
  selector: 'radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent {
  // Inputs
  public value = input<any>();
  public disabled = input(false, { transform: booleanAttribute });

  // Private
  protected checked!: boolean;
  protected hasFocus!: boolean;
  protected labelDistance!: string;
  protected labelPositionAfter!: boolean;
  private radioButton = viewChild<ElementRef<HTMLElement>>('radioButton');
  protected radioButtonGroup: RadioButtonGroupComponent = inject(RadioButtonGroupComponent);



  private ngOnInit() {
    this.setDotSize();
    this.setOverlaySize();
    this.setLabelDistance();
    this.setLabelPosition();
  }



  private setDotSize(): void {
    const dotSize = this.radioButtonGroup.buttonDotSize() ? this.radioButtonGroup.buttonDotSize() : getComputedStyle(document.documentElement).getPropertyValue('--radio-button-dot-size');
    this.radioButton()?.nativeElement.style.setProperty('--dot-size', dotSize!);
  }



  private setOverlaySize(): void {
    const overlaySize = this.radioButtonGroup.overlaySize() ? this.radioButtonGroup.overlaySize() : getComputedStyle(document.documentElement).getPropertyValue('--radio-button-overlay-size');
    this.radioButton()?.nativeElement.style.setProperty('--overlay-size', overlaySize!);
  }



  private setLabelDistance(): void {
    this.labelDistance = this.radioButtonGroup.labelDistance() ? this.radioButtonGroup.labelDistance()! : getComputedStyle(document.documentElement).getPropertyValue('--radio-button-label-distance');
  }



  private setLabelPosition(): void {
    const labelPosition = this.radioButtonGroup.labelPosition() ? this.radioButtonGroup.labelPosition() : getComputedStyle(document.documentElement).getPropertyValue('--radio-button-label-position');
    this.labelPositionAfter = labelPosition === 'before' ? false : true;
  }



  public setAsChecked(): void {
    this.checked = true;
  }
}