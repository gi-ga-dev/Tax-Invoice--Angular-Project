import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-login-mat-card',
  templateUrl: './login-mat-card.component.html',
  styleUrls: ['./login-mat-card.component.scss']
})
export class LoginMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.authService.login(this.form.value).subscribe(
      resp => {
        this.error = undefined;
        this.router.navigate(['home']);
      },
      err => {
        this.error = err.error;
      }
    )
  }

}
