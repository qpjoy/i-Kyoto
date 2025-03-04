import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';

import { Article } from './entities/article.entity';
import { ArticleDto } from './dto/article.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { generateMetaVerse } from '../../utils/metaVerseGenerator';

import * as cheerio from 'cheerio';
import { Sequelize } from 'sequelize';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject('ArticlesRepository')
    private readonly articlesRepository: typeof Article,
    // @Inject('UserProfilesRepository')
    // private readonly userProfilesRepository: typeof UserProfile,
    private readonly usersService: UsersService,
    @Inject('SEQUELIZE')
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(condition: any = { limit: 10, offset: 0 }) {
    const articles = await this.articlesRepository.findAndCountAll<Article>({
      ...condition,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'title', 'userId', 'brief', 'desc', 'ledePic'],
      include: [
        {
          model: User,
          attributes: [
            'id',
            'birthday',
            'email',
            'gender',
            'nickName',
            'hobbies',
          ],
        },
      ],
      distinct: false,
    });
    const { count, rows } = articles;
    return {
      count,
      rows: rows?.length
        ? rows.map((article) => article ?? new ArticleDto(article))
        : [],
    };
  }

  async findOne(id: number) {
    const article = await this.articlesRepository.findByPk<Article>(id, {
      include: [User],
    });
    if (!article) {
      throw new HttpException('No article found', HttpStatus.NOT_FOUND);
    }
    return new ArticleDto(article);
  }

  async create(user: User, createArticleDto: CreateArticleDto) {
    // const t = await this.sequelize.transaction();

    try {
      const articleData: any = {};
      const content = createArticleDto.content;
      articleData.userId = user.id;
      articleData.title = createArticleDto.title;
      articleData.content = content;

      const $ = cheerio.load(content);
      const rawArticle = $.text();
      articleData.brief = $.text().substring(0, 200);
      articleData.words = rawArticle.length;
      // , { transaction: t }
      const article = await Article.create(articleData);

      const words = await Article.sum('words');
      const records = await Article.count();
      console.log(`[Article]: sum words`, words, article);

      await this.usersService.setMyUserProfile(
        {
          id: user.id,
        },
        {
          userProfile: {
            records,
            words,
            likes: 66,
          },
        },
      );
      // await t.commit();

      return article;
    } catch (error) {
      // await t.rollback();
      throw error;
    }
    // const article = new Article();
    // const content = createArticleDto.content;
    // article.userId = user.id;
    // article.title = createArticleDto.title;
    // article.content = content;

    // const $ = cheerio.load(content);
    // const rawArticle = $.text();
    // article.brief = $.text().substring(0, 200);
    // article.words = rawArticle.length;
    // return article.save();
  }

  private async getUserArticle(id: number, userId: number) {
    const article = await this.articlesRepository.findByPk<Article>(id);
    if (!article) {
      throw new HttpException('No article found', HttpStatus.NOT_FOUND);
    }
    console.log(`[get user article]: `, article.userId, userId);
    if (article.userId != userId) {
      throw new HttpException(
        'You are unauthorized to manage this article',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return article;
  }

  async update(id: number, userId: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.getUserArticle(id, userId);
    article.title = updateArticleDto.title || article.title;
    article.content = updateArticleDto.content || article.content;
    return article.save();
  }

  async delete(id: number, userId: number) {
    const article = await this.getUserArticle(id, userId);
    await article.destroy();
    return article;
  }

  // TODO: formal
  async searchAll(condition: any = { limit: 10, offset: 0 }) {
    const articles = await this.articlesRepository.findAndCountAll<Article>({
      ...condition,
      order: [['created_at', 'DESC']],
    });
    const metaVerse = generateMetaVerse({
      model: Article,
      createDtoClass: CreateArticleDto,
      updateDtoClass: UpdateArticleDto,
      dtoClass: ArticleDto,
    });
    const { count, rows } = articles;
    return {
      count,
      rows: rows?.length
        ? rows.map((user) => user ?? new ArticleDto(user))
        : [],
      metaVerse,
    };
  }
}
