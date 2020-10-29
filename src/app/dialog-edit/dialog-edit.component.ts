import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogAnswerComponent} from '../dialog-answer/dialog-answer.component';
import {Answer} from "../interfaces";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {

  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: Answer
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['']
    })
  }

  close() {
    this.dialogRef.close('');
  }

  get text(): AbstractControl {
    return this.form.get('text')
  }

  onSubmit() {
    this.dialogRef.close(this.text.value)
  }
}
