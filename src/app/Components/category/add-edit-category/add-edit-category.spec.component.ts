import { AddEditCategoryComponent } from './add-edit-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

describe('AddEditCategoryComponent', () => {
    let comp: AddEditCategoryComponent;
    let fixture: ComponentFixture<AddEditCategoryComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AddEditCategoryComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule
            ]
        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(AddEditCategoryComponent);

            comp = fixture.componentInstance;

            de = fixture.debugElement.query(By.css('form'));
            el = de.nativeElement;
        });
    }));

    // it(`Should have as test 'Add Category'`, async(() => {
    //     expect(comp.text).toEqual('Add Category');
    // }));

    it('form should be invalid', async(() => {
        comp.f.controls['CategoryName'].setValue('');
        expect(comp.f.valid).toBeTruthy();
    }));

    it('form should be valid', async(() => {
        comp.f.controls['CategoryName'].setValue('abc');
        expect(comp.f.valid).toBeTruthy();
    }));

})