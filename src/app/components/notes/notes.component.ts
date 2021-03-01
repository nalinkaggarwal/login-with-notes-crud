import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Note } from '../../models/note';
import { noWhitespaceValidator } from '../../helpers/whitespace.validator';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notesForm!: FormGroup;
  submitted: boolean = false;
  notes: Note[] = [];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeFormControl();
  }

  initializeFormControl() {
    this.submitted = false;
    this.notesForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      body: [null, [Validators.required]]
    })
  }

  get notesFormControl() {
    return this.notesForm.controls;
  }

  onSubmit() {
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

  removeNote(index: number) {
    this.notes.splice(index, 1);
  }
}
