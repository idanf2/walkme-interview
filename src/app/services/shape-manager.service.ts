import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Shape} from '../models/shape';

@Injectable({
  providedIn: 'root'
})
export class ShapeManagerService {

  constructor() { }

  saveShapes(shapes: Shape[]): Promise<AxiosResponse> {
    return axios.post('https://localhost.com/shapes', {
      shapes
    });
  }
}
