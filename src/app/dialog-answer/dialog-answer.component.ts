import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-answer',
  templateUrl: './dialog-answer.component.html',
  styleUrls: ['./dialog-answer.component.scss']
})
export class DialogAnswerComponent implements OnInit {

  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DialogAnswerComponent>,
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

