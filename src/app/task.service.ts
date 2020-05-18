import { Injectable }               from '@angular/core';
import { Observable, of }           from 'rxjs';
import { MessagesService }          from './messages.service';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { catchError, map, tap }     from 'rxjs/operators';
import { CookieService }            from "ngx-cookie-service";
import { Router}                    from '@angular/router';

import { Task }  from './task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'http://localhost:8081/task';
  private loginUrl = 'http://localhost:8081/login';
  
  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router, private messagesService: MessagesService) { }
  
  login(username: string, password: string): Observable<string> {
    const url = this.loginUrl + "?username=" + username + "&password=" + password;
    return this.http.post(url, {headers: this.getHttpOptions('login')}, {responseType: 'text'}).pipe(
      tap((response: string) => this.log('user logged:' + response)),
      catchError(this.handleError<string>('login'))
    );
  }

  getTasks(): Observable<Task[]> {
    const url = this.tasksUrl + '/' + this.getUsername();
    return this.http.get<Task[]>(url, {headers: this.getHttpOptions('task')})
      .pipe(tap(_ => console.log('fetched tasks')),
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }  

  getTask(taskId: number): Observable<Task> {
    const url = this.tasksUrl + '/id/' + taskId;
    return this.http.get<Task>(url, {headers: this.getHttpOptions('task')}).pipe(
      tap(_ => console.log('fetched task Id=' + taskId)),
      catchError(this.handleError<Task>('getTask id=' + taskId))
    );
  }

  updateTask(task: Task): Observable<any> {
    const url = this.tasksUrl + "/updateStatus/" + task.taskId;
    return this.http.post(url, task.status, {headers: this.getHttpOptions('task')}).pipe(
      tap(_ => this.log('updated task id=' + task.taskId)),
      catchError(this.handleError<any>('updateTask'))
    );
  }
  
  addTask(task: Task): Observable<Task> {
    const url = this.tasksUrl + "/add";
    return this.http.put<Task>(url, task, {headers: this.getHttpOptions('task')}).pipe(
      tap((newTask: Task) => this.log('added task with id=${newTask.taskId}')),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  getUsername(): string {
    var username = this.cookies.get('username');
    if (!username || username == 'undefined') {
      this.router.navigate(['/login']);
    }
    return username;
  }

  getHttpOptions(type: string) : HttpHeaders {
    var headers;
    if (type === 'login') {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    } else {
      var token = this.getCookies('token');
      if (!token || token == 'undefined') {
        this.router.navigate(['/login']);
      } else {
          headers = new HttpHeaders({ 'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token })
      }
    }
    return headers;
  }
  
  setCookies(key: string, value: string) : void {
    this.cookies.set(key, value);
  }
  
  getCookies(key: string) : string {
    return this.cookies.get(key);
  }
  
  log(message: string) {
    this.messagesService.add('TaskService: ' + message);
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(operation + ' failed: ' + error.message);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
