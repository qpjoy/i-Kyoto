import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  AllowNull,
  AutoIncrement,
  Index,
  HasOne,
  BelongsToMany,
  AfterCreate,
  BeforeCreate,
} from 'sequelize-typescript';
import { Gender } from '../../../shared/enum/gender';
import { Article } from '../../articles/entities/article.entity';
import config from '../../../../config';
import { UserProfile } from 'src/modules/user-profiles/entities/user-profile.entity';
import { File } from 'src/modules/files/entities/file.entity';
import { Device } from 'src/modules/devices/entities/device.entity';
import { Subscription } from 'src/modules/subscriptions/entities/subscription.entity';
import { UserSubscription } from 'src/modules/subscriptions/entities/user-subscription.entity';
import * as dayjs from 'dayjs';

@Table({
  tableName: 'user',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class User extends Model<User> {
  [x: string]: any;
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Unique
  @IsEmail
  @AllowNull(false)
  @Column
  email: string;

  @Unique
  @Column({
    field: 'user_name',
    unique: true,
  })
  userName: string;

  @Column({
    field: 'nick_name',
    defaultValue: '',
  })
  nickName: string;

  @AllowNull(false)
  @Column
  password: string;

  @Column({
    field: 'first_name',
    defaultValue: '',
  })
  firstName: string;

  @Column({
    field: 'last_name',
    defaultValue: '',
  })
  lastName: string;

  @Column({
    type: DataType.ENUM(Gender.female, Gender.male, Gender.others),
    defaultValue: Gender.others,
  })
  gender: Gender;

  @Column(DataType.DATEONLY)
  birthday: string;

  @Column(DataType.JSONB)
  hobbies: object;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @HasOne(() => UserProfile, {
    foreignKey: 'userId',
    constraints: false,
    // as: 'profile',
  })
  userProfile: UserProfile;

  @HasMany(() => File, {
    foreignKey: 'userId',
    constraints: false,
  })
  files: File[];

  @HasMany(() => Article, {
    foreignKey: 'userId',
    constraints: false,
  })
  articles: Article[];

  @HasMany(() => Device, {
    foreignKey: 'userId',
    constraints: false,
  })
  devices: Device[];

  // @BelongsToMany(() => Subscription, () => UserSubscription)
  @BelongsToMany(() => Subscription, {
    through: {
      model: () => UserSubscription,
      unique: false,
    },
    foreignKey: 'userId',
    constraints: false,
  })
  subscriptions: Subscription[];

  // @BeforeCreate
  // static updateWordCount(user: User) {

  // }

  @AfterCreate
  static async initMember(user: User) {
    try {
      const baseMember = await Subscription.findOne({
        where: {
          name: '基础会员',
        },
      });

      if (baseMember) {
        await UserSubscription.create({
          userId: user.id,
          subscriptionId: baseMember.id,
          expiredAt: dayjs().add(baseMember.timer, 'day').toDate(),
        });
      }

      const basepEquip = await Subscription.findOne({
        where: {
          name: '基础设备',
        },
      });
      if (basepEquip) {
        await UserSubscription.create({
          userId: user.id,
          subscriptionId: basepEquip.id,
          // expiredAt: dayjs().add(7, 'day').toDate(),
        });
      }
    } catch (e) {
      console.log(e);
    }

    // const articleData: any = {};
    // const content =
    //   '<h2 style="text-align: center">Hey there 👋</h2><p>This is a <em>basic</em> example of <code>mui-tiptap</code>, which combines <a target="_blank" rel="noopener noreferrer nofollow" href="https://tiptap.dev/">Tiptap</a> with customizable <a target="_blank" rel="noopener noreferrer nofollow" href="https://mui.com/">MUI (Material-UI)</a> styles, plus a suite of additional components and extensions! Sure, there are <strong>all <em>kinds</em> of <s>text</s> <u>formatting</u> options</strong> you’d probably expect from a rich text editor. But wait until you see the <span data-type="mention" data-id="15" data-label="Axl Rose">@Axl Rose</span> mentions and lists:</p><ul><li><p>That’s a bullet list with one …</p></li><li><p>… or two list items.</p></li></ul><p>Isn’t that great? And all of that is editable. <strong><span style="color: #ff9900">But wait, </span><span style="color: #403101"><mark data-color="#ffd699" style="background-color: #ffd699; color: inherit">there’s more!</mark></span></strong> Let’s try a code block:</p><pre><code class="language-css">body {\n  display: none;\n}</code></pre><p></p><p>That’s only the tip of the iceberg. Feel free to add and resize images:</p><img height="auto" src="https://picsum.photos/600/400" alt="random image" width="350" style="aspect-ratio: 3 / 2"><p></p><p>Organize information in tables:</p><table><tbody><tr><th colspan="1" rowspan="1"><p>Name</p></th><th colspan="1" rowspan="1"><p>Role</p></th><th colspan="1" rowspan="1"><p>Team</p></th></tr><tr><td colspan="1" rowspan="1"><p>Alice</p></td><td colspan="1" rowspan="1"><p>PM</p></td><td colspan="1" rowspan="1"><p>Internal tools</p></td></tr><tr><td colspan="1" rowspan="1"><p>Bob</p></td><td colspan="1" rowspan="1"><p>Software</p></td><td colspan="1" rowspan="1"><p>Infrastructure</p></td></tr></tbody></table><p></p><p>Or write down your groceries:</p><ul data-type="taskList"><li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"><span></span></label><div><p>Milk</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Eggs</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Sriracha</p></div></li></ul><blockquote><p>Wow, that’s amazing. Good work! 👏 <br>— Mom</p></blockquote><p>Give it a try and click around!</p>';
    // articleData.userId = user.id;
    // articleData.content = content;
    // try {
    //   const article = await Article.create(articleData);
    //   console.log(`[article]: from user.id `, article);
    // } catch (e) {
    //   console.log(`[e]: `, e);
    // }
  }
}
