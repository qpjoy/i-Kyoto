import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { ArticlesProviders } from './articles.providers';
import { UserProfilesProviders } from '../user-profiles/user-profiles.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService, ...ArticlesProviders, ...UserProfilesProviders],
})
export class ArticlesModule {}
