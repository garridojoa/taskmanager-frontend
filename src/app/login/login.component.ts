import { Component, OnInit }    from '@angular/core';
import { Router}                from '@angular/router';

import { TaskService }      from '../task.service';
import { Task }             from '../task';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
  }

  login(): void {
    if (!this.username || !this.password) {
      this.taskService.log('Please provide valid username and password.');
      return; 
    }
    this.taskService.login(this.username, this.password)
      .subscribe(token => {
        if (!token) {
          this.router.navigate(['/login']);
        } else {
          this.taskService.setCookies('username', this.username);
          this.taskService.setCookies('token', token);
          this.router.navigate(['/tasks']);
        }
      });
  }  
}
