import { Injectable } from '@nestjs/common';
import {
  INotificationChannel,
  NotificationResult,
} from './notifications-channel.interface';
import { Task } from '../../tasks/entities/task.entity';

@Injectable()
export class PushChannel implements INotificationChannel {
  async send(task: Task): Promise<NotificationResult> {
    try {
      // Paso 1: validar token de dispositivo (simulado)
      const deviceToken = `device-token-user-${task.userId}`;
      if (!deviceToken) throw new Error('Token de dispositivo inválido');

      // Paso 2: formatear payload
      const payload = {
        token: deviceToken,
        notification: {
          title: 'Nueva tarea',
          body: task.title,
        },
        data: {
          taskId: task.id.toString(),
        },
      };

      // Paso 3: registrar estado
      console.log('[PUSH] Payload enviado:', JSON.stringify(payload));

      return {
        success: true,
        log: `Push enviado a ${deviceToken} - taskId:${task.id} - ${new Date().toISOString()}`,
      };
    } catch (error) {
      let message = 'An unknown error occurred';

      if (error instanceof Error) {
        message = error.message;
      }

      return { success: false, log: `Error Push: ${message}` };
    }
  }
}
