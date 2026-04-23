import { Injectable } from '@nestjs/common';
import { EmailChannel } from '../channels/email.channel';
import { SmsChannel } from '../channels/sms.channel';
import { PushChannel } from '../channels/push.channel';
import { INotificationChannel } from '../channels/notifications-channel.interface';
import { NotificationChannel, Task } from '../../tasks/entities/task.entity';

@Injectable()
export class NotificationsService {
  private readonly channels: Record<NotificationChannel, INotificationChannel>;

  constructor(
    private readonly emailChannel: EmailChannel,
    private readonly smsChannel: SmsChannel,
    private readonly pushChannel: PushChannel,
  ) {
    // mapa de canal → estrategia
    this.channels = {
      [NotificationChannel.EMAIL]: this.emailChannel,
      [NotificationChannel.SMS]: this.smsChannel,
      [NotificationChannel.PUSH]: this.pushChannel,
    };
  }

  async notify(task: Task): Promise<string> {
    const strategy = this.channels[task.channel];

    if (!strategy) {
      return `Canal "${task.channel}" no soportado`;
    }

    const result = await strategy.send(task);
    return result.log;
  }
}
