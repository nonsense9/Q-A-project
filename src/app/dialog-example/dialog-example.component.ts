import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';


@Component({
  selector: 'app-dialog-example',
  templateUrl: './dialog-example.component.html',
  styleUrls: ['./dialog-example.component.scss']
})
export class DialogExampleComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogExampleComponent>,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['']
    });
  }

  close(): void {
    this.dialogRef.close();
  }


  get title(): AbstractControl {
    return this.form.get('title');
  }

  onSubmit() {
    this.dialogRef.close(this.title.value);
  }
}


