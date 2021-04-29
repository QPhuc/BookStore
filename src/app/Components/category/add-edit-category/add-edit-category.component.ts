import { CategoryService } from './../../../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/Services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html'
})

export class AddEditCategoryComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      CategoryName: ['', Validators.required],
    });
    
    if (!this.isAddMode) {
      this.categoryService
        .getCategoryById(this.id)
        .subscribe((x: { CategoryName: any  }) => {
          this.f.CategoryName.setValue(x.CategoryName);
        });
    }
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
    if (this.isAddMode) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  
  private createCategory() {
    this.categoryService
      .addCategory(this.form.value)
      .subscribe(
        (data) => {
          this.alertService.success('Category added successfully', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['.', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  private updateCategory() {
    this.categoryService
      .updateCategory(this.id, this.form.value)
      .subscribe(
        (data) => {
          this.alertService.success('Update successful', {
            keepAfterRouteChange: true,
          });
          this.router.navigate(['..', { relativeTo: this.route }]);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
