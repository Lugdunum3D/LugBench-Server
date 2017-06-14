import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {GpusComponent} from './gpus/gpus.component';
import {GpuComponent} from './gpus/gpu.component';
import {DownloadComponent} from './download.component';

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
    component: GpusComponent
  },
  {
    path: 'gpus/:id',
    component: GpuComponent
  },
  {
    path: 'download',
    component: DownloadComponent
  }
];

export const routing = RouterModule.forRoot(routes);
