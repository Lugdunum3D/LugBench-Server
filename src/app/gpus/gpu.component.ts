import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { Gpu } from '../shared/models/gpu';

/*
public extensions: Array<Object>;
public features: Object;
public memory: Object;
public properties: Object;
public formats: Array<Array<Object>>;
public queues: Array<Object>;
*/

@Component({
  selector: 'lugbench-gpu',
  template: require('./gpu.component.html')
})
export class GpuComponent implements OnInit, OnDestroy {
  @Input() public gpu: Gpu;
  @Input() public limitKeys: Array<String>;
  @Input() public sparsePropertyKeys: Array<String>;
  @Input() public featureKeys: Array<String>;
  gpuId: string;
  @Input() public tabIndex: Number;
  public tabObservable: Observable<Number>;

  constructor(public http: Http, public activatedRoute: ActivatedRoute) {
    this.tabIndex = 1;
    this.tabObservable = new Observable<Number>();
    this.limitKeys = new Array<String>();
    this.sparsePropertyKeys = new Array<String>();
    this.featureKeys = new Array<String>();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.gpuId = params.id;
      this.getGpu().subscribe(data => {
        this.gpu = data;

        for (let key in this.gpu.properties.limits) {
          if (this.gpu.properties.limits[key]) {
            this.limitKeys.push(key);
          }
        }

        for (let key in this.gpu.properties.sparseProperties) {
          if (this.gpu.properties.sparseProperties[key]) {
            this.sparsePropertyKeys.push(key);
          }
        }

        for (let key in this.gpu.features) {
          if (this.gpu.features) {
            this.featureKeys.push(key);
          }
        }

      });
    });
  }

  ngOnDestroy() {
    console.log();
  }

  getGpu(): Observable<Gpu> {
    return this.http
      // .get(`https://lugbench-api.herokuapp.com/api/v1/gpus/${this.gpuId}`)
      .get(`http://localhost:5000/api/v1/gpus/${this.gpuId}`)
      .map(response => response.json().data);
  }
}
