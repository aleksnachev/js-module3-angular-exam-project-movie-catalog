import { computed, Injectable, signal } from '@angular/core';
import { NotificationInterface } from '../../shared/interfaces/notification.js';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSignal = signal<NotificationInterface | null>(null);
  private timeOutId: ReturnType<typeof setTimeout> | null = null;

  notification = computed(() => this.notificationSignal());

  private show(notification: NotificationInterface): void {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    }

    this.notificationSignal.set(notification);

    this.timeOutId = setTimeout(() => {
      this.notificationSignal.set(null);
      this.timeOutId = null;
    }, 5000);
  }

  showSuccess(message: string): void {
    this.show({ message, type: 'success' });
  }
  showError(message: string): void {
    this.show({ message, type: 'error' });
  }
}
