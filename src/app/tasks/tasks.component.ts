import { Component, OnInit }    from '@angular/core';

import { TaskService }      from '../task.service';
import { Task }             from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  add(taskDesc: string, complDate: Date): void {
    var task = {} as Task
    task.description = taskDesc.trim();
    task.completionDate = complDate;
    task.userOwner = this.taskService.getUsername();

    if (!taskDesc) { return; }
    this.taskService.addTask(task)
      .subscribe(task => {
      this.tasks.push(task);
    });
    this.taskService.log('Task Added: ' + task.description);
  }
}
