import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResultService } from '../result.service';
import { CommonModule, } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShowResultComponent } from '../show-result/show-result.component';

@Component({
  selector: 'app-find-result',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, ShowResultComponent],
  templateUrl: './find-result.component.html',
  styleUrl: './find-result.component.css'
})
export class FindResultComponent {

  studentForm!: FormGroup
  studentDetail: any;

  constructor(private result: ResultService, private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.studentForm = this._fb.group({
      rollno: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(1000)]],
      name: ['', [Validators.pattern("^[a-z A-Z]*$"), Validators.minLength(3), Validators.maxLength(30)]],
    })
  }

  searchResult() {

    this.result.getResult(this.studentForm.value.rollno).subscribe((data: any) => {
      if (data.length != 0) {
        this.studentDetail = data;
        this.result.dataEmit(this.studentDetail)
      }
    })
  }

  clearForm() {
    this.studentForm.reset({})
  }
}
