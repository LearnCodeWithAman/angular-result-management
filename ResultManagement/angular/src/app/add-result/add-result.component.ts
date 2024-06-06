import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms'
import {CommonModule} from '@angular/common'
import { ResultService } from '../result.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-result',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-result.component.html',
  styleUrl: './add-result.component.css'
})
export class AddResultComponent implements OnInit{
  
  alert:boolean = false
  addResultForm!: FormGroup

  constructor(private result:ResultService, private _fb:FormBuilder) {}


  ngOnInit(): void {

    this.addResultForm = this._fb.group({
      rollno: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(1000)]],
      name: ['', [Validators.required, Validators.pattern("^[a-z A-Z]*$"), Validators.minLength(3), Validators.maxLength(30)]],
      dob: ['', [Validators.required,
         Validators.pattern("^(0[1-9]|[1-2][0-9]|3[0-1])[-]{1}(0[1-9]|1[0-2])[-]{1}((19[0-9]{2})|(20[0-1][0-9])|(202[0-4]))$")]], 
      score: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(100)]]
    })
  }

  collectResult() {
    
    this.result.addResult(this.addResultForm.value).subscribe({
        next:(data)=>{
          
          console.warn("Data Inserted", data)
          this.alert = true
          this.addResultForm.reset({})
        },
        error: () =>{
          alert("Error while adding product!")
        }
      }
    );
  }
  
  clearForm() {
    this.addResultForm.reset({})
  }

  closeAlert() {
    this.alert = false
  }

}
