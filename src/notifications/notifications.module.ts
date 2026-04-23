import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { EmailChannel } from './channels/email.channel';
import { SmsChannel } from './channels/sms.channel';
import { PushChannel } from './channels/push.channel';

@Module({
  providers: [NotificationsService, EmailChannel, SmsChannel, PushChannel],
  exports: [NotificationsService], // lo exportamos para que TasksModule lo use
})
export class NotificationsModule {}
