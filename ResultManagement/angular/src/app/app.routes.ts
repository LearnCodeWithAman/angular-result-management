import { Routes } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddResultComponent } from './add-result/add-result.component';
import { FindResultComponent } from './find-result/find-result.component';
import { HomeComponent } from './home/home.component';
import { ShowResultComponent } from './show-result/show-result.component';
import { EditResultComponent } from './edit-result/edit-result.component';

export const routes: Routes = [
    {
        path: '', redirectTo: '/home', pathMatch: 'full'
    },
    {
        path: 'home',
        title: 'Home',
        component: HomeComponent
    },
    {
        path: 'home', children: [
            {
                path:'teacher',
                title: 'Teacher',
                component: ListStudentComponent
            },
            {
                path:'teacher', children:[
                    {
                        path:'addResult',
                        title: 'Teacher',
                        component: AddResultComponent
                    }
                ]
            },
            {
                path:'teacher', children:[
                    {
                        path:'editResult',
                        title: 'Teacher',
                        component: EditResultComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'home', children: [
            {
                path:'student',
                title: 'Student',
                component: FindResultComponent
            },
            {
                path:'student', children:[
                    {
                        path: "showResult",
                        title: 'Teacher',
                        component: ShowResultComponent
                    }
                ]
                
            }

        ]
    },
    {
        path:'**',
        redirectTo: '/home', pathMatch: 'full'
    }
];