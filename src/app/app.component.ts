import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RadioButtonGroupComponent } from '../../projects/radio-button/src/lib/radio-button-group/radio-button-group.component';
import { RadioButtonComponent } from '../../projects/radio-button/src/lib/radio-button/radio-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormsModule,
    RadioButtonComponent,
    RadioButtonGroupComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Radio-Button';


  favoriteSeason: string = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

}