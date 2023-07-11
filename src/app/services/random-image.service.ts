import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DemoImage } from '../interfaces/demoImage';
import { DEMO_IMAGES } from '../constants/demo-images';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  constructor() { }

  get(): Observable<DemoImage> {
    const imageCount = DEMO_IMAGES.length;
    const index = Math.floor(Math.random() * imageCount);
    return of(DEMO_IMAGES[index]);
  }
};