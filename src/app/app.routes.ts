import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { BookComponent } from './pages/book/book.component';
import { BorrowDetailsComponent } from './pages/borrow-details/borrow-details.component';

export const routes: Routes = [
  {
    path: '',
    component:DashboardComponent
  },
  {
        path:"dashboard",
        component:DashboardComponent,
        children:[
            {
                path:"user",
                component:UserComponent
            },
            {
                path:"view-books",
                component:BookComponent
            },
            {
              path:"borrow-details",
              component:BorrowDetailsComponent
            }
        ]
  }
];
