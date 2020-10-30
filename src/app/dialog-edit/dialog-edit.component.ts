import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {QuestionsComponent} from "../questions/questions.component";

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {

  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<DialogEditComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      message: string,
      title: string
    },
    private mdDialogRef: MatDialogRef<QuestionsComponent>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      message: new FormControl(this.data.message)
    })
  }

  onSubmit() {
    this.dialogRef.close(this.form.controls.message.value)
  }
}



