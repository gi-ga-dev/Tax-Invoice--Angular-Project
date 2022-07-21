import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* ------------- Material ----------------- */

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginMatCardComponent } from './login/components/mat-card/login-mat-card.component';
import { SignupMatCardComponent } from './signup/components/mat-card/signup-mat-card.component';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    LoginMatCardComponent,
    SignupMatCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class AuthModule { }
