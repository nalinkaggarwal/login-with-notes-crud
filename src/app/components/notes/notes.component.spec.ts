import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ NotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form using formbuilder', () => {
    expect(component.notesForm instanceof FormGroup).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.notesForm.valid).toBeFalsy();
  });

  it('title field validity', () => {
    let title = component.notesForm.controls['title']; (1)
    expect(title.valid).toBeFalsy(); (2)
  });

  it('title field error validity', () => {
    let errors = {};
    let title = component.notesForm.controls['title'];
    errors = title.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });

  it('body field validity', () => {
    let body = component.notesForm.controls['body']; (1)
    expect(body.valid).toBeFalsy(); (2)
  });

  it('body field error validity', () => {
    let errors = {};
    let body = component.notesForm.controls['body'];
    errors = body.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });

  it('should return all controls', () => {
    expect(component.notesFormControl).toBeTruthy();
  });

  it('should return true for valid data', () => {
    expect(component.notesForm.valid).toBeFalsy();
    component.notesForm.controls['title'].setValue("title1");
    component.notesForm.controls['body'].setValue("this is test body");
    expect(component.notesForm.valid).toBe(true);
  });

  it('for valid data, notes should be added', () => {
    expect(component.notesForm.valid).toBeFalsy();
    component.notesForm.controls['title'].setValue("tes1");
    component.notesForm.controls['body'].setValue("123456789");
    expect(component.notesForm.valid).toBe(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.notes.length).toBe(1);
  });

  it('for invalid data, notes should not be added', () => {
    expect(component.notesForm.valid).toBeFalsy();
    component.notesForm.controls['body'].setValue("123456789");
    expect(component.notesForm.valid).toBe(false);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.notes.length).toBe(0);
  });

  it('should allow user to delete note', () => {
    expect(component.notesForm.valid).toBeFalsy();
    component.notesForm.controls['title'].setValue("tes1");
    component.notesForm.controls['body'].setValue("123456789");
    expect(component.notesForm.valid).toBe(true);
    component.onSubmit();
    fixture.detectChanges();
    expect(component.notes.length).toBe(1);
    component.removeNote(0);
    expect(component.notes.length).toBe(0);
  });

});
