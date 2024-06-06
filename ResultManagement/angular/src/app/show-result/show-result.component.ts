import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResultService } from '../result.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-result',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './show-result.component.html',
  styleUrl: './show-result.component.css'
})

export class ShowResultComponent implements OnInit {

  studentDetail: any;
  found: boolean = false

  constructor(private result: ResultService) { }

  ngOnInit(): void {
    this.result.studentData.subscribe((res) => {

      if (res.length != 0) {
        this.studentDetail = res;
        this.found = true
      }
    })
  }

}
