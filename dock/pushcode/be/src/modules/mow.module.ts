import { Module } from '@nestjs/common';
import { ArticlesModule } from './articles/articles.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { EventsModule } from './socketio/events.module';
import { SettingsModule } from './settings/settings.module';
import { CloudModule } from './cloud/cloud.module';
import { CodeModule } from './code/code.module';
import { HelpsModule } from './helps/helps.module';
import { MessagesModule } from './messages/messages.module';
import { DevicesModule } from './devices/devices.module';
import { MockModule } from './mock/mock.module';
// import { AiModule } from './ai/ai.module';
// import { ExaminationModule } from './examination/examination.module';

@Module({
  imports: [
    UsersModule,
    ArticlesModule,
    FilesModule,
    UserProfilesModule,
    EventsModule,
    SettingsModule,
    // ExaminationModule,
    CloudModule,
    CodeModule,
    HelpsModule,
    MessagesModule,
    DevicesModule,
    MockModule,
    // AiModule,
  ],
})
export class MowModule {}
