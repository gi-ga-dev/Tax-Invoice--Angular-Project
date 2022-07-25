import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-signup-mat-card',
  templateUrl: './signup-mat-card.component.html',
  styleUrls: ['./signup-mat-card.component.scss']
})
export class SignupMatCardComponent implements OnInit {

  @ViewChild('f') form!: NgForm;
  error = undefined;
  hide = true;
  show = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit() {
    this.show = true;
    this.authService.signup(this.form.value).subscribe(
      resp => {
        console.log(resp);
        this.error = undefined;
        this.router.navigate(['/login'])
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    )
  }

}
