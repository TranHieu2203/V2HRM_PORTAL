import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export interface ITaskCard {
  paths: string[];
  title: string;
  dueDate: Date;
}

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskCardComponent implements OnInit {

  @Input() task!: ITaskCard;

  constructor() { }

  ngOnInit(): void {
  }

}
