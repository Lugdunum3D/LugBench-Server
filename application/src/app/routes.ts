import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main';
import {GpuComponent} from './gpus/gpu';

@Component({
  selector: 'lugbench-root',
  template: '<router-outlet></router-outlet>'
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/gpus',
    pathMatch: 'full'
  },
  {
    path: 'gpus',
    component: MainComponent
  },
  {
    path: 'gpus/:id',
    component: GpuComponent
  }
];

export const routing = RouterModule.forRoot(routes);
