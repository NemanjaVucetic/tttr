// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';  // Adjust the import path as necessary

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];
  userId!: string;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Get the user ID from the decoded JWT token
    this.userId = this.getUserIdFromToken();

    if (this.userId) {
      this.loadNotifications();
    }
  }

  private getUserIdFromToken(): string {
    const token = localStorage.getItem('token'); // Adjust the key if needed
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decoding the JWT token
      return decodedToken.userId; // Adjust field if necessary
    }
    return '';
  }

  private loadNotifications(): void {
    this.notificationService.getNotificationsByUserId(this.userId).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error('Error loading notifications:', error);
      }
    );
  }
}
