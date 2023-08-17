import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityOneComponent } from './activity-one/activity-one.component';
import { ActivityTwoComponent } from './activity-two/activity-two.component';
import { MaterialModule } from '../material/material.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [ActivityOneComponent, ActivityTwoComponent],
  imports: [CommonModule, MaterialModule, ComponentsModule],
})
export class PagesModule {}
