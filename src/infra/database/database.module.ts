import { Module } from '@nestjs/common';
import { NotificationsRespository } from '@app/repositories/notifications-repositories';
import { PrismaService } from './prisma/prisma.service';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRespository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRespository],
})
export class DatabaseModule {}
