import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

//
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/_services/index';
//
import { AlertService } from "app/_services/index";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {

    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  loading = false;
  returnUrl: string;

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onSubmit(values: any): void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);

      this.loading = true;
      this.authenticationService.login(values.email, values.password)
        .subscribe(
        data => {
          // console.log(this.returnUrl);
          if (this.returnUrl !== undefined) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['pages']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }
}
