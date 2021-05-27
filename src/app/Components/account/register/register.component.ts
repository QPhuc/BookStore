import { Component, OnInit } from '@angular/core';
import { User } from '@app/Models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '@app/Services/account.service';
import { AlertService } from '@app/Services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  user: User;
  
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email:['', [Validators.required, Validators.pattern('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+')]],
      birthday:['', Validators.required],
      phone:['', [Validators.required, Validators.pattern('(^\\+)?[0-9()-]*')]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .register(this.form.value)
      .subscribe(
        (data: any) => {
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        (error: any) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
