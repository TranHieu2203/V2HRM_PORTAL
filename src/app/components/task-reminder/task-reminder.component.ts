import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ITaskCard } from '../task-card/task-card.component';
export const ONE_DAY_IN_MILLISECONDS = 5184000000; // 24 * 60 * 60 * 60 * 1000;

@Component({
  selector: 'app-task-reminder',
  templateUrl: './task-reminder.component.html',
  styleUrls: ['./task-reminder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskReminderComponent implements OnInit {

  @Input() tasks!: ITaskCard[];

  overdues!: ITaskCard[];
  comings!: ITaskCard[];
  willcomes!: ITaskCard[];
  expanded: any = {
    overdues: true,
    comings: true,
    willcomes: true,
  }

  constructor() { }

  ngOnInit(): void {
    const today = new Date();
    const endOfDayTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime();
    const now = today.getTime();
    this.overdues = this.tasks.filter(x => now > x.dueDate.getTime());
    this.comings = this.tasks.filter(x => now <= x.dueDate.getTime() && x.dueDate.getTime() <= endOfDayTime);
    this.willcomes = this.tasks.filter(x => x.dueDate.getTime() > endOfDayTime);
  }

  toggleExpanded(group: string) {
    this.expanded[group] = !this.expanded[group]
  }

}
