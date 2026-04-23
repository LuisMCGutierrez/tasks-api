import { Injectable } from '@nestjs/common';
import {
  INotificationChannel,
  NotificationResult,
} from './notifications-channel.interface';
import { Task } from '../../tasks/entities/task.entity';

@Injectable()
export class SmsChannel implements INotificationChannel {
  private readonly MAX_LENGTH = 160;

  async send(task: Task): Promise<NotificationResult> {
    try {
      // Paso 1: construir mensaje
      const message = `Nueva tarea: ${task.title}`;

      // Paso 2: validar longitud
      if (message.length > this.MAX_LENGTH) {
        throw new Error(`SMS excede ${this.MAX_LENGTH} caracteres`);
      }

      // Paso 3: registrar número y fecha
      const phone = `+521234567${task.userId}`; // simulado
      console.log(`[SMS] Enviando a ${phone}: "${message}"`);

      return {
        success: true,
        log: `SMS enviado a ${phone} - ${message.length} chars - ${new Date().toISOString()}`,
      };
    } catch (error) {
      let message = 'An unknown error occurred';

      if (error instanceof Error) {
        message = error.message;
      }

      return { success: false, log: `Error SMS: ${message}` };
    }
  }
}
