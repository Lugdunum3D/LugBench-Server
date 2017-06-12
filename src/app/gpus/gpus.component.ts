import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

import { Gpu } from '../shared/models/gpu';

@Component({
  selector: 'lugbench-gpus',
  template: require('./gpus.component.html')
})

export class GpusComponent {
  public gpus: Gpu[];
  public gpu: Gpu;

  constructor(public http: Http, public router: Router) {
    this.getGpus().subscribe(data => {
      this.gpus = data;
      return data;
    });
  }

  getGpus(): Observable<Gpu[]> {
    return this.http
      // .get('https://lugbench-api.herokuapp.com/api/v1/gpus')
      .get('http://localhost:5000/api/v1/gpus')
      .map(response => response.json().data);
  }

  public goToGpu(id: string) {
    this.router.navigateByUrl(`/gpus/${id}`);
  }

}
