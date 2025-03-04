import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './modules/database/database.module';
import { ElasticsearchModule } from './modules/elasticsearch/elasticsearch.module';
import { MowModule } from './modules/mow.module';
import { SharedModule } from './shared/shared.module';
// import { UserProfilesModule } from './modules/user-profiles/user-profiles.module';
// import { UsersModule } from './modules/users/users.module';
// import { FilesModule } from './modules/files/files.module';
// import { DevicesModule } from './modules/devices/devices.module';

@Module({
  imports: [
    CoreModule,
    DatabaseModule,
    ElasticsearchModule,
    MowModule,
    SharedModule,

    // UserProfilesModule,
    // UsersModule,
    // FilesModule,
  ],
})
export class AppModule {}
