import { ActivityTwoComponent } from './pages/activity-two/activity-two.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityOneComponent } from './pages/activity-one/activity-one.component';

const routes: Routes = [
  {
    path: 'actividad-1',
    component: ActivityOneComponent,
  },
  {
    path: 'actividad-2',
    component: ActivityTwoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
