import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/note';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notesForm!: FormGroup;
  submitted = false;
  notes: Note[] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFormControl();
  }

  initializeFormControl(): void {
    this.submitted = false;
    this.notesForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]]
    });
  }

  get notesFormControl(): { [key: string]: AbstractControl; } {
    return this.notesForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.notesForm.valid) {
      const note: Note = {
        title: this.notesFormControl['title'].value.trim(),
        body: this.notesFormControl['body'].value.trim(),
      };
      this.notes.unshift(note);
      this.initializeFormControl();
    }
  }

  removeNote(index: number): void {
    this.notes.splice(index, 1);
  }
}
