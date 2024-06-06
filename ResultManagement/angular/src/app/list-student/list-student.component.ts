import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service';
import {NgForOf} from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-student',
  standalone: true,
  imports: [NgForOf, RouterLink],
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.css'
})
export class ListStudentComponent implements OnInit{

  collection: any;
  studentDetail:any;
  
  constructor(private result:ResultService) {}
  
  ngOnInit(): void {
     
    //console.warn(this.data.getList());
    this.result.getList().subscribe(
      (resp:any) => {
        this.collection = resp;
      }
    );
  }

  editItem(rollno:any) {

    console.warn("Edit Item", rollno)
    this.result.getResult(rollno).subscribe((data:any) => {
        //console.warn("Student Found", data);
        this.studentDetail = data;
        this.result.dataEmit(this.studentDetail)
      }
    )
  }

  deleteItem(id:any) {
      
    return this.result.deleteResult(id).subscribe((data) => {
      console.warn("Delete Item", data)
      this.ngOnInit();
    })
  }
}


