import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SignupFormComponent} from './signup-form/signup-form.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SignupFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
