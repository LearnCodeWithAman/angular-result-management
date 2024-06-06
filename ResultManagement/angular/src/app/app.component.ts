import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddResultComponent } from './add-result/add-result.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { FindResultComponent } from './find-result/find-result.component';
import { HomeComponent } from './home/home.component';
import { NgIf } from '@angular/common';
import { ShowResultComponent } from './show-result/show-result.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HomeComponent, ListStudentComponent,
    AddResultComponent, FindResultComponent, ShowResultComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  hidden: boolean = true;

  constructor(private router: Router) {

    router.events.subscribe((val: any) => {

      if (val.url == ('/') || val.url == ('/home'))
        this.hidden = true;
      else
        this.hidden = false;
    })
  }
}
