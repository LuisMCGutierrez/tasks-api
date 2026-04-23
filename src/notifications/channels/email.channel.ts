import { Injectable } from '@nestjs/common';
import {
  INotificationChannel,
  NotificationResult,
} from './notifications-channel.interface';
import { Task } from '../../tasks/entities/task.entity';

@Injectable()
export class EmailChannel implements INotificationChannel {
  async send(task: Task): Promise<NotificationResult> {
    try {
      // Paso 1: validar destinatario
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const recipient = `user-${task.userId}@app.com`; // simulado
      if (!emailRegex.test(recipient)) {
        throw new Error('Formato de email inválido');
      }

      // Paso 2: generar template
      const template = `
        Asunto: Nueva tarea asignada
        Cuerpo: Se ha creado la tarea "${task.title}"
        Destinatario: ${recipient}
      `;

      // Paso 3: registrar envío (aquí iría el llamado real al proveedor)
      console.log('[EMAIL] Template generado:', template);

      return {
        success: true,
        log: `Email enviado a ${recipient} - ${new Date().toISOString()}`,
      };
    } catch (error) {
      let message = 'An unknown error occurred';

      if (error instanceof Error) {
        message = error.message;
      }

      return { success: false, log: `Error email: ${message}` };
    }
  }
}
