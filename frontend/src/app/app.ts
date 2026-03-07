import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  ngOnInit(): void {
    console.log('App initialized');

    fetch('http://localhost:3000/users/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Raw response:', response);
        return response.json();
      })
      .then(data => {
        console.log('User data:', data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
  protected readonly title = signal('flosports-event-explorer-frontend');
}
