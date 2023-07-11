import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomAvatarService {

  constructor() { }

  get(): string {
    return `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
  }
}
