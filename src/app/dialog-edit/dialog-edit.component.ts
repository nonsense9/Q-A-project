import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogAnswerComponent} from '../dialog-answer/dialog-answer.component';

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
