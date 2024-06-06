import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-edit-result',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-result.component.html',
  styleUrl: './edit-result.component.css'
})
export class EditResultComponent implements OnInit {

  studentDetail: any
  alert: boolean = false
  editResultForm: FormGroup = new FormGroup({
    result_id: new FormControl,
    rollno: new FormControl,
    name: new FormControl,
    dob: new FormControl,
    score: new FormControl
  })

  

  constructor(private result: ResultService, private _fb: FormBuilder) { }


  ngOnInit(): void {


    this.result.studentData.subscribe((res: any) => {
      this.studentDetail = res
      
      //console.warn("RES : ", res[0]['id'])
      this.editResultForm = this._fb.group({
        result_id:[res[0]['id']],
        rollno: [res[0]['rollno'], [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(1000)]],
        name: [res[0]['name'], [Validators.required, Validators.pattern("^[a-z A-Z]*$"), Validators.minLength(3), Validators.maxLength(30)]],
        dob: [res[0]['dob'], [Validators.required,
          Validators.pattern("^(0[1-9]|[1-2][0-9]|3[0-1])[-]{1}(0[1-9]|1[0-2])[-]{1}((19[0-9]{2})|(20[0-1][0-9])|(202[0-4]))$")
        ]],
        score: [res[0]['score'], [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(100)]]
      })
    })
  }

  collectResult() {


    //console.warn("SUBMITED: ", this.editResultForm.value.result_id)
    this.result.updateResult(this.editResultForm.value.result_id, this.editResultForm.value).subscribe({
        next: (data) => {
          //console.warn("Data Updated", data)
          this.alert = true
          //this.editResultForm.reset({})
        },
        error: () => {
          alert("Error while adding product!")
        }
      }
    );
  }

  clearForm() {
    this.editResultForm.reset({})
  }

  closeAlert() {
    this.alert = false
  }
}
