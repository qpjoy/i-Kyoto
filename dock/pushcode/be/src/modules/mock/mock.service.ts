import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

import { CreateMockDto } from './dto/create-mock.dto';
import { UpdateMockDto } from './dto/update-mock.dto';
import { User } from '../users/entities/user.entity';
import { UserSubscription } from '../subscriptions/entities/user-subscription.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';

@Injectable()
export class MockService {
  // constructor(
  //   @Inject('UsersRepository')
  //   private usersRepository: typeof User,
  // ) {}
  async createUser(createMockDto: CreateMockDto) {
    const _user = {
      email: 'admin@admin.com',
      password: 'admin',
    };
    try {
      const user = new User();
      user.email = _user.email;

      const salt = await genSalt(10);
      user.password = await hash(_user.password, salt);
      await user.save();
      return user;
    } catch (err) {
      if (err.original?.constraint === 'user_email_key') {
        throw new HttpException(
          `User with email '${err.errors[0].value}' already exists`,
          HttpStatus.CONFLICT,
        );
      }

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async userSub(createMockDto: CreateMockDto) {
    // Create example users and subscriptions
    try {
      // const user1 = await User.create({
      //   name: 'user11',
      //   email: 'user11@example.com',
      //   password: '321',
      // });
      // const user2 = await User.create({
      //   name: 'user21',
      //   email: 'user21@example.com',
      //   password: '1123',
      // });

      const baseMember = await Subscription.findOrCreate({
        where: { name: '基础会员' },
        defaults: {
          name: '基础会员',
          desc: '新用户自动获取权益',
          price: '0',
          // discountedPrice: '7.0',
          timer: 7,
          amount: 0,
          plan: '7D',
        },
      });

      const baseEquip = await Subscription.findOrCreate({
        where: { name: '基础设备' },
        defaults: {
          name: '基础设备',
          desc: '新用户自动获取权益',
          price: '0',
          // discountedPrice: '7.0',
          timer: -1,
          amount: 2,
          plan: '7D',
        },
      });

      const monthMember = await Subscription.findOrCreate({
        where: { name: '月会员' },
        defaults: {
          name: '月会员',
          desc: '新增新设备额外支付 7元/月/台',
          price: '15元/月',
          // discountedPrice: '7.0',
          timer: 30,
          amount: 0,
          plan: '1M',
        },
      });
      const seasonMember = await Subscription.findOrCreate({
        where: { name: '季度会员' },
        defaults: {
          name: '季度会员',
          desc: '增加新设备额外支付 18元/季/台',
          price: '36元/季',
          // discountedPrice: '88.0',
          timer: 90,
          amount: 0,
          plan: '3M',
        },
      });
      const yearMember = await Subscription.findOrCreate({
        where: { name: '年度会员' },
        defaults: {
          name: '年度会员',
          desc: '增加新设备额外支付 60元/年/台',
          price: '108元/年',
          // discountedPrice: '88.0',
          timer: 365,
          amount: 0,
          plan: '1Y',
        },
      });

      const monthly1Equip = await Subscription.findOrCreate({
        where: { name: '加1台设备/月会员' },
        defaults: {
          name: '加1台设备/月会员',
          desc: '7元/1月/1台',
          price: '7元/月/台',
          // discountedPrice: '88.0',
          timer: 30,
          amount: 1,
          plan: '设备',
        },
      });

      const monthly2Equip = await Subscription.findOrCreate({
        where: { name: '加2台设备/月会员' },
        defaults: {
          name: '加2台设备/月会员',
          desc: '14元/1月/2台',
          price: '7元/月/台',
          // discountedPrice: '88.0',
          timer: 30,
          amount: 2,
          plan: '设备',
        },
      });

      const monthly5Equip = await Subscription.findOrCreate({
        where: { name: '加5台设备/月会员' },
        defaults: {
          name: '加5台设备/月会员',
          desc: '35元/1月/5台',
          price: '7元/月/台',
          // discountedPrice: '88.0',
          timer: 30,
          amount: 5,
          plan: '设备',
        },
      });

      const seasonly1Equip = await Subscription.findOrCreate({
        where: { name: '加1台设备/季会员' },
        defaults: {
          name: '加1台设备/季会员',
          desc: '18元/1季/1台',
          price: '18元/季/台',
          // discountedPrice: '88.0',
          timer: 90,
          amount: 1,
          plan: '设备',
        },
      });

      const seasonly2Equip = await Subscription.findOrCreate({
        where: { name: '加2台设备/季会员' },
        defaults: {
          name: '加2台设备/季会员',
          desc: '36元/1季/2台',
          price: '18元/季/台',
          // discountedPrice: '88.0',
          timer: 90,
          amount: 2,
          plan: '设备',
        },
      });

      const seasonly5Equip = await Subscription.findOrCreate({
        where: { name: '加5台设备/季会员' },
        defaults: {
          name: '加5台设备/季会员',
          desc: '90元/1季/5台',
          price: '18元/季/台',
          // discountedPrice: '88.0',
          timer: 90,
          amount: 5,
          plan: '设备',
        },
      });

      const yearly1Equip = await Subscription.findOrCreate({
        where: { name: '加1台设备/年会员' },
        defaults: {
          name: '加1台设备/年会员',
          desc: '60元/1年/1台',
          price: '60元/年/台',
          // discountedPrice: '88.0',
          timer: 365,
          amount: 1,
          plan: '设备',
        },
      });

      const yearly2Equip = await Subscription.findOrCreate({
        where: { name: '加2台设备/年会员' },
        defaults: {
          name: '加2台设备/年会员',
          desc: '120元/1年/2台',
          price: '60元/年/台',
          // discountedPrice: '88.0',
          timer: 365,
          amount: 2,
          plan: '设备',
        },
      });
      const yearly5Equip = await Subscription.findOrCreate({
        where: { name: '加5台设备/年会员' },
        defaults: {
          name: '加5台设备/年会员',
          desc: '300元/1年/5台',
          price: '60元/年/台',
          // discountedPrice: '88.0',
          timer: 365,
          amount: 5,
          plan: '设备',
        },
      });

      const test10min = await Subscription.findOrCreate({
        where: { name: '加1台设备/10分钟' },
        defaults: {
          name: '加1台设备/10分钟',
          desc: '+10分钟',
          price: '0',
          // discountedPrice: '88.0',
          timer: 1 / 24 / 60,
          amount: 0,
          plan: '设备',
        },
      });

      const test20min = await Subscription.findOrCreate({
        where: { name: '加1台设备/20分钟' },
        defaults: {
          name: '加1台设备/20分钟',
          desc: '+20分钟',
          price: '0',
          // discountedPrice: '88.0',
          timer: 2 / 24 / 60,
          amount: 0,
          plan: '设备',
        },
      });

      const test30min = await Subscription.findOrCreate({
        where: { name: '加1台设备/30分钟' },
        defaults: {
          name: '加1台设备/30分钟',
          desc: '+30分钟',
          price: '0',
          // discountedPrice: '88.0',
          timer: 3 / 24 / 60,
          amount: 0,
          plan: '设备',
        },
      });

      // Associate users with subscriptions
      // await user1.$add('subscriptions', subscription1);
      // await user1.$add('subscriptions', subscription2);
      // await user2.$add('subscriptions', subscription1);

      // Fetch and log associations
      // const user1Subscriptions = await user1.$get('subscriptions');
      // console.log(
      //   `User1's subscriptions:`,
      //   user1Subscriptions.map((sub) => sub.name),
      // );

      // const user2Subscriptions = await user2.$get('subscriptions');
      // console.log(
      //   `User2's subscriptions:`,
      //   user2Subscriptions.map((sub) => sub.name),
      // );
    } catch (e) {
      console.log(`[user subscription]: `, e.message, e);
    }
  }

  // async create(createCategoryDto: any) {
  //   // 推荐产品
  //   const tuijianWare = [
  //     {
  //       name: '【春菜】枸杞头 250g/份',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '时令鲜蔬|微苦回干|热炒凉拌',
  //       price: 9.9,
  //       perWeight: '250g/份',
  //       ledeImage:
  //         'https://img.ddimg.mobi/product/cbd8150a6b0d31614767166953.jpg?width=800&height=800',
  //     },
  //     {
  //       name: '黄瓜 约600g',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '新鲜脆嫩|爽口多汁|水润回甘',
  //       price: 4.49,
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/b45b7420dc944a02a7024975fe26b521.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //       thumbnails: [
  //         {
  //           url: 'https://img.ddimg.mobi/product/738e5ab8cbc391608889171736.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //         {
  //           url: 'https://img.ddimg.mobi/product/20aee11bbda581608889171737.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //         {
  //           url: 'https://img.ddimg.mobi/product/20aee11bbda581608889171737.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //         {
  //           url: 'https://img.ddimg.mobi/product/d7813a9a984a31608889171774.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //         {
  //           url: 'https://img.ddimg.mobi/product/ef38ff05b48111608889171774.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //         {
  //           url: 'https://img.ddimg.mobi/product/fc745d899b08e1608889171775.jpg?imageView2/3/w/1080/h/1080/format/webp/q/90',
  //         },
  //       ],
  //     },
  //     {
  //       name: '莴笋 约1kg',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '新鲜带叶|粗壮饱满|小炒凉拌',
  //       price: 8.19,
  //       perWeight: '约1k',
  //       ledeImage:
  //         'https://img.ddimg.mobi/product/9abf0c5fb74fb1613725847722.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '【高原鲜】高原牛心菜 650g/份',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '新鲜完整|清脆微甜|适合清炒',
  //       price: 7.89,
  //       perWeight: '650g/份',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/d3f0b256e0a34de1a2f9b64ec6b7bff3.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '【春菜】矮脚青菜苔（带花）300g',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '春季时蔬|软糯清甜|家常百搭',
  //       price: 5.99,
  //       perWeight: '300g',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/b3000213931a4003b58cc231c0d62c9a.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '【春菜】韭菜 约300g',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '辛香温和|新鲜带泥|适合炒食',
  //       price: 5.59,
  //       perWeight: '约300g',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/048f5442dce547c9abd91eae19c275e3.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '崇明大叶蓬蒿菜 300g/份',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '叶片宽大|清香脆嫩|适合清炒',
  //       price: 9.9,
  //       perWeight: '300g/份',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/068b467c43a545e6a38884fbf1cc2125.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '优质番茄 约500g',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '性价比高|酸甜多汁|适合炖煮',
  //       price: 3.99,
  //       perWeight: '约500g',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/6587163c06664bfbada868b8c0cf3f67.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '大葱 约500g',
  //       desc: '新鲜带跟葱白长，生吃辛辣炒食香',
  //       title: '新鲜带根|葱白较长|生吃炒食',
  //       price: 3.49,
  //       perWeight: '约500g',
  //       ledeImage:
  //         'https://img.ddimg.mobi/product/35e24bb8ea61611369606176.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '【酒香草头用】草头 250g/份',
  //       desc: '新鲜采摘，难免有些许杂草，建议稍作挑拣后烹煮，烹煮时多加油，口感更佳哦',
  //       title: '摘取嫩头|江南风味|清炒即鲜',
  //       price: 7.59,
  //       perWeight: '250g/份',
  //       ledeImage:
  //         'https://img.ddimg.mobi/product/bcd9b042beeec1614405806135.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '毛豆【带壳】约500g',
  //       desc: '受季节影响外壳轻微发黄，豆子依旧新鲜饱满',
  //       title: '豆荚饱满|清脆带甜|可煮可炒',
  //       price: 8.29,
  //       perWeight: '约500g',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/756eafe6d06347ab8f5d57363f211314.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //   ];
  //   // 新品
  //   const xinpinWare = [
  //     {
  //       name: '杏鲍菇 250g/盒',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '肥厚口感|菌体完整|烧烤小炒',
  //       price: 2.79,
  //       perWeight: '250g/盒',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/8428a5608eed48d1ab992c0b0d8ec18f.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '金针菇 300g/盒',
  //       desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //       title: '整丛带根|脆嫩爽滑|凉拌涮烫',
  //       price: 2.19,
  //       perWeight: '300g/盒',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/952346b314dd4bf3aa9e673943122d4f.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //     {
  //       name: '小平菇 200g/份',
  //       desc: '个头虽小肉肥厚，炒食涮煮滑嫩鲜',
  //       title: '个小肉厚|滑嫩鲜美|炒食涮煮',
  //       price: 6.29,
  //       perWeight: '200g/份',
  //       ledeImage:
  //         'https://imgnew.ddimg.mobi/product/38794afa6e5c417595e98d0110fad8e2.jpg?imageView2/3/w/540/h/540/format/webp/q/90',
  //     },
  //   ];

  //   const shucaiList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //       ware: tuijianWare,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //       ware: xinpinWare,
  //     },
  //     {
  //       name: '平价蔬菜',
  //       desc: '平价蔬菜',
  //       level: 2,
  //     },
  //     {
  //       name: '菜花类',
  //       desc: '菜花类',
  //       level: 2,
  //     },
  //     {
  //       name: '茄瓜类',
  //       desc: '茄瓜类',
  //       level: 2,
  //     },
  //     {
  //       name: '根茎类',
  //       desc: '根茎类',
  //       level: 2,
  //     },
  //     {
  //       name: '菌菇类',
  //       desc: '菌菇类',
  //       level: 2,
  //     },
  //     {
  //       name: '火锅菜',
  //       desc: '火锅菜',
  //       level: 2,
  //     },
  //     {
  //       name: '有机菜',
  //       desc: '有机菜',
  //       level: 2,
  //     },
  //     {
  //       name: '净菜沙拉',
  //       desc: '净菜沙拉',
  //       level: 2,
  //     },
  //     {
  //       name: '豆腐制品',
  //       desc: '豆腐制品',
  //       level: 2,
  //     },
  //     {
  //       name: '芽苗类',
  //       desc: '芽苗类',
  //       level: 2,
  //     },
  //     {
  //       name: '预制菜',
  //       desc: '预制菜',
  //       level: 2,
  //     },
  //   ];
  //   const rouqinList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '牛肉寻鲜',
  //       desc: '牛肉寻鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '日日鲜',
  //       desc: '日日鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '猪肉',
  //       desc: '猪肉',
  //       level: 2,
  //     },
  //     {
  //       name: '黑猪',
  //       desc: '黑猪',
  //       level: 2,
  //     },
  //     {
  //       name: '鸡鸭鸽',
  //       desc: '鸡鸭鸽',
  //       level: 2,
  //     },
  //     {
  //       name: '鸡蛋/蛋类',
  //       desc: '鸡蛋/蛋类',
  //       level: 2,
  //     },
  //     {
  //       name: '牛肉',
  //       desc: '牛肉',
  //       level: 2,
  //     },
  //     {
  //       name: '牛排',
  //       desc: '牛排',
  //       level: 2,
  //     },
  //     {
  //       name: '羊肉',
  //       desc: '羊肉',
  //       level: 2,
  //     },
  //     {
  //       name: '嗨吃火锅',
  //       desc: '嗨吃火锅',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '新鲜方便菜',
  //       desc: '新鲜方便菜',
  //       level: 2,
  //     },
  //     {
  //       name: '肉禽半成品',
  //       desc: '肉禽半成品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //     {
  //       name: '高端预售',
  //       desc: '高端预售',
  //       level: 2,
  //     },
  //   ];
  //   const shuiguoxianhuaList = [
  //     {
  //       name: '时令推荐',
  //       desc: '时令推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '莓果/草莓',
  //       desc: '莓果/草莓',
  //       level: 2,
  //     },
  //     {
  //       name: '柑橘橙柚',
  //       desc: '柑橘橙柚',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜花绿植',
  //       desc: '鲜花绿植',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '葡萄/瓜果',
  //       desc: '葡萄/瓜果',
  //       level: 2,
  //     },
  //     {
  //       name: '热带水果',
  //       desc: '热带水果',
  //       level: 2,
  //     },
  //     {
  //       name: '进口水果',
  //       desc: '进口水果',
  //       level: 2,
  //     },
  //     {
  //       name: '苹果梨蕉',
  //       desc: '苹果梨蕉',
  //       level: 2,
  //     },
  //     {
  //       name: '果切/礼盒',
  //       desc: '果切/礼盒',
  //       level: 2,
  //     },
  //     {
  //       name: '榴莲/山竹',
  //       desc: '榴莲/山竹',
  //       level: 2,
  //     },
  //     {
  //       name: '桃李杏枣',
  //       desc: '桃李杏枣',
  //       level: 2,
  //     },
  //   ];
  //   const shuichanhaixianList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '周末好吃点',
  //       desc: '周末好吃点',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '春捕时令鲜',
  //       desc: '春捕时令鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '虾/小龙虾',
  //       desc: '虾/小龙虾',
  //       level: 2,
  //     },
  //     {
  //       name: '鱼',
  //       desc: '鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '贝/生蚝',
  //       desc: '贝/生蚝',
  //       level: 2,
  //     },
  //     {
  //       name: '蟹',
  //       desc: '蟹',
  //       level: 2,
  //     },
  //     {
  //       name: '品质刺身',
  //       desc: '品质刺身',
  //       level: 2,
  //     },
  //     {
  //       name: '三文鱼/鳕鱼',
  //       desc: '三文鱼/鳕鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜活水产',
  //       desc: '鲜活水产',
  //       level: 2,
  //     },
  //     {
  //       name: '冰鲜水产',
  //       desc: '冰鲜水产',
  //       level: 2,
  //     },
  //     {
  //       name: '冷冻水产',
  //       desc: '冷冻水产',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '高端大海鲜',
  //       desc: '高端大海鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '海菜海蛰',
  //       desc: '海菜海蛰',
  //       level: 2,
  //     },
  //     {
  //       name: '鱿墨章鱼',
  //       desc: '鱿墨章鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '水产半成品',
  //       desc: '水产半成品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //     {
  //       name: '干货水产',
  //       desc: '干货水产',
  //       level: 2,
  //     },
  //   ];
  //   const rupinhongpeiList = [
  //     {
  //       name: '今日力荐',
  //       desc: '今日力荐',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜奶',
  //       desc: '鲜奶',
  //       level: 2,
  //     },
  //     {
  //       name: '酸奶/乳酸菌',
  //       desc: '酸奶/乳酸菌',
  //       level: 2,
  //     },
  //     {
  //       name: '春日新品',
  //       desc: '春日新品',
  //       level: 2,
  //     },
  //     {
  //       name: '三明治早餐',
  //       desc: '三明治早餐',
  //       level: 2,
  //     },
  //     {
  //       name: '黄油奶酪',
  //       desc: '黄油奶酪',
  //       level: 2,
  //     },
  //     {
  //       name: '常温/箱装奶',
  //       desc: '常温/箱装奶',
  //       level: 2,
  //     },
  //     {
  //       name: '吐司/面包',
  //       desc: '吐司/面包',
  //       level: 2,
  //     },
  //     {
  //       name: '蛋糕甜品',
  //       desc: '蛋糕甜品',
  //       level: 2,
  //     },
  //     {
  //       name: '点心/麻薯',
  //       desc: '点心/麻薯',
  //       level: 2,
  //     },
  //     {
  //       name: '披萨/蛋挞',
  //       desc: '披萨/蛋挞',
  //       level: 2,
  //     },
  //     {
  //       name: '闭眼入',
  //       desc: '闭眼入',
  //       level: 2,
  //     },
  //     {
  //       name: '烘焙下午茶',
  //       desc: '烘焙下午茶',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];
  //   const dongpinmiandianList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '周末特惠',
  //       desc: '周末特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '新品尝鲜',
  //       desc: '新品尝鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '春日青团',
  //       desc: '春日青团',
  //       level: 2,
  //     },
  //     {
  //       name: '冰淇淋',
  //       desc: '冰淇淋',
  //       level: 2,
  //     },
  //     {
  //       name: '冷藏鲜食',
  //       desc: '冷藏鲜食',
  //       level: 2,
  //     },
  //     {
  //       name: '饺子/馄饨',
  //       desc: '饺子/馄饨',
  //       level: 2,
  //     },
  //     {
  //       name: '包子/馒头',
  //       desc: '包子/馒头',
  //       level: 2,
  //     },
  //     {
  //       name: '烧麦/点心',
  //       desc: '烧麦/点心',
  //       level: 2,
  //     },
  //     {
  //       name: '汤圆/年糕',
  //       desc: '汤圆/年糕',
  //       level: 2,
  //     },
  //     {
  //       name: '手抓饼/饼类',
  //       desc: '手抓饼/饼类',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜面/鲜粉',
  //       desc: '鲜面/鲜粉',
  //       level: 2,
  //     },
  //     {
  //       name: '肉肠/培根',
  //       desc: '肉肠/培根',
  //       level: 2,
  //     },
  //   ];
  //   const liangyoutiaoweiList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '轻食好物',
  //       desc: '轻食好物',
  //       level: 2,
  //     },
  //     {
  //       name: '新品尝鲜',
  //       desc: '新品尝鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '大米',
  //       desc: '大米',
  //       level: 2,
  //     },
  //     {
  //       name: '食用油',
  //       desc: '食用油',
  //       level: 2,
  //     },
  //     {
  //       name: '酱油/醋',
  //       desc: '酱油/醋',
  //       level: 2,
  //     },
  //     {
  //       name: '盐糖/调味料',
  //       desc: '盐糖/调味料',
  //       level: 2,
  //     },
  //     {
  //       name: '蚝油/调味汁',
  //       desc: '蚝油/调味汁',
  //       level: 2,
  //     },
  //     {
  //       name: '调味酱',
  //       desc: '调味酱',
  //       level: 2,
  //     },
  //     {
  //       name: '杂粮干货',
  //       desc: '杂粮干货',
  //       level: 2,
  //     },
  //     {
  //       name: '面条/粉丝',
  //       desc: '面条/粉丝',
  //       level: 2,
  //     },
  //     {
  //       name: '面粉/预拌粉',
  //       desc: '面粉/预拌粉',
  //       level: 2,
  //     },
  //     {
  //       name: '酱菜/罐头',
  //       desc: '酱菜/罐头',
  //       level: 2,
  //     },
  //     {
  //       name: '方便速食',
  //       desc: '方便速食',
  //       level: 2,
  //     },
  //     {
  //       name: '快手调味料',
  //       desc: '快手调味料',
  //       level: 2,
  //     },
  //     {
  //       name: '腌腊制品',
  //       desc: '腌腊制品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];
  //   const jiushuiyinliaoList = [
  //     {
  //       name: '今日力荐',
  //       desc: '今日力荐',
  //       level: 2,
  //     },
  //     {
  //       name: '饮用水',
  //       desc: '饮用水',
  //       level: 2,
  //     },
  //     {
  //       name: '啤酒',
  //       desc: '啤酒',
  //       level: 2,
  //     },
  //     {
  //       name: '碳酸/功能',
  //       desc: '碳酸/功能',
  //       level: 2,
  //     },
  //     {
  //       name: '果汁/乳饮',
  //       desc: '果汁/乳饮',
  //       level: 2,
  //     },
  //     {
  //       name: '茶饮/咖啡',
  //       desc: '茶饮/咖啡',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '白酒',
  //       desc: '白酒',
  //       level: 2,
  //     },
  //     {
  //       name: '葡萄酒',
  //       desc: '葡萄酒',
  //       level: 2,
  //     },
  //     {
  //       name: '米酒/黄酒',
  //       desc: '米酒/黄酒',
  //       level: 2,
  //     },
  //     {
  //       name: '果酒/预调酒',
  //       desc: '果酒/预调酒',
  //       level: 2,
  //     },
  //     {
  //       name: '洋酒/清酒',
  //       desc: '洋酒/清酒',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '蜂蜜/冲泡',
  //       desc: '蜂蜜/冲泡',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];

  //   const specList = [
  //     {
  //       storeCondition: '冷藏',
  //       intro: '新鲜脆嫩',
  //       other: [
  //         {
  //           intro: '爽口多汁',
  //         },
  //         {
  //           intro: '水润回甘',
  //         },
  //       ],
  //     },
  //     {
  //       storeCondition: '冷藏',
  //       intro: '新鲜脆嫩',
  //       other: [
  //         {
  //           intro: '时令鲜蔬',
  //         },
  //         {
  //           intro: '爽口多汁',
  //         },
  //         {
  //           intro: '水润回甘',
  //         },
  //       ],
  //     },
  //   ];

  //   const mockData = [
  //     {
  //       name: '蔬菜豆制品',
  //       desc: '蔬菜豆制品',
  //       level: 1,
  //       sub: shucaiList,
  //     },
  //     {
  //       name: '肉禽类',
  //       desc: '肉禽类',
  //       level: 1,
  //       sub: rouqinList,
  //     },
  //     {
  //       name: '水果鲜花',
  //       desc: '水果鲜花',
  //       level: 1,
  //       sub: shuiguoxianhuaList,
  //     },
  //     {
  //       name: '水产海鲜',
  //       desc: '水产海鲜',
  //       level: 1,
  //       sub: shuichanhaixianList,
  //     },
  //     {
  //       name: '乳品烘焙',
  //       desc: '乳品烘焙',
  //       level: 1,
  //       sub: rupinhongpeiList,
  //     },
  //     {
  //       name: '冻品面点',
  //       desc: '冻品面点',
  //       level: 1,
  //       sub: dongpinmiandianList,
  //     },
  //     {
  //       name: '粮油调味',
  //       desc: '粮油调味',
  //       level: 1,
  //       sub: liangyoutiaoweiList,
  //     },
  //     {
  //       name: '酒水饮料',
  //       desc: '酒水饮料',
  //       level: 1,
  //       sub: jiushuiyinliaoList,
  //     },
  //   ];

  //   const specRes = await this.specRepository.bulkCreate(specList);

  //   let firstCategory;
  //   for (let mock of mockData) {
  //     const _mock = { ...mock };
  //     delete _mock.sub;
  //     firstCategory = await this.categoryRepository.create(_mock);
  //     // const secondCategories = await this.categoryRepository.bulkCreate(
  //     //   mock.sub,
  //     // );
  //     // await firstCategory.setSubCategories(secondCategories);

  //     for (let subMock of mock.sub) {
  //       const _subMock = { ...mock.sub };
  //       delete _subMock['ware'];

  //       const secondCategory = await this.categoryRepository.create(_subMock);
  //       await secondCategory.setParentCategory(firstCategory);

  //       if (subMock['ware']) {
  //         for (let ware of subMock['ware']) {
  //           const wareRes = await this.waresRepository.create(ware);
  //           await wareRes.setCategory(secondCategory);

  //           await wareRes.setSpec(specRes[Math.floor(Math.random() * 2)]);
  //         }
  //       }
  //     }
  //   }

  //   // const bulkCreateRes = await this.categoryRepository.bulkCreate(mockData);
  //   return {
  //     specRes,
  //     firstCategory,
  //   };
  // }

  // async createCategory(createCategoryDto: any) {
  //   const mockData = [
  //     {
  //       name: '蔬菜豆制品',
  //       desc: '蔬菜豆制品',
  //       level: 1,
  //     },
  //     {
  //       name: '肉禽类',
  //       desc: '肉禽类',
  //       level: 1,
  //     },
  //     {
  //       name: '水果鲜花',
  //       desc: '水果鲜花',
  //       level: 1,
  //     },
  //     {
  //       name: '水产海鲜',
  //       desc: '水产海鲜',
  //       level: 1,
  //     },
  //     {
  //       name: '乳品烘焙',
  //       desc: '乳品烘焙',
  //       level: 1,
  //     },
  //     {
  //       name: '冻品面点',
  //       desc: '冻品面点',
  //       level: 1,
  //     },
  //     {
  //       name: '粮油调味',
  //       desc: '粮油调味',
  //       level: 1,
  //     },
  //     {
  //       name: '酒水饮料',
  //       desc: '酒水饮料',
  //       level: 1,
  //     },
  //   ];
  //   const shucaiList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '平价蔬菜',
  //       desc: '平价蔬菜',
  //       level: 2,
  //     },
  //     {
  //       name: '菜花类',
  //       desc: '菜花类',
  //       level: 2,
  //     },
  //     {
  //       name: '茄瓜类',
  //       desc: '茄瓜类',
  //       level: 2,
  //     },
  //     {
  //       name: '根茎类',
  //       desc: '根茎类',
  //       level: 2,
  //     },
  //     {
  //       name: '菌菇类',
  //       desc: '菌菇类',
  //       level: 2,
  //     },
  //     {
  //       name: '火锅菜',
  //       desc: '火锅菜',
  //       level: 2,
  //     },
  //     {
  //       name: '有机菜',
  //       desc: '有机菜',
  //       level: 2,
  //     },
  //     {
  //       name: '净菜沙拉',
  //       desc: '净菜沙拉',
  //       level: 2,
  //     },
  //     {
  //       name: '豆腐制品',
  //       desc: '豆腐制品',
  //       level: 2,
  //     },
  //     {
  //       name: '芽苗类',
  //       desc: '芽苗类',
  //       level: 2,
  //     },
  //     {
  //       name: '预制菜',
  //       desc: '预制菜',
  //       level: 2,
  //     },
  //   ];
  //   const rouqinList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '牛肉寻鲜',
  //       desc: '牛肉寻鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '日日鲜',
  //       desc: '日日鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '猪肉',
  //       desc: '猪肉',
  //       level: 2,
  //     },
  //     {
  //       name: '黑猪',
  //       desc: '黑猪',
  //       level: 2,
  //     },
  //     {
  //       name: '鸡鸭鸽',
  //       desc: '鸡鸭鸽',
  //       level: 2,
  //     },
  //     {
  //       name: '鸡蛋/蛋类',
  //       desc: '鸡蛋/蛋类',
  //       level: 2,
  //     },
  //     {
  //       name: '牛肉',
  //       desc: '牛肉',
  //       level: 2,
  //     },
  //     {
  //       name: '牛排',
  //       desc: '牛排',
  //       level: 2,
  //     },
  //     {
  //       name: '羊肉',
  //       desc: '羊肉',
  //       level: 2,
  //     },
  //     {
  //       name: '嗨吃火锅',
  //       desc: '嗨吃火锅',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '新鲜方便菜',
  //       desc: '新鲜方便菜',
  //       level: 2,
  //     },
  //     {
  //       name: '肉禽半成品',
  //       desc: '肉禽半成品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //     {
  //       name: '高端预售',
  //       desc: '高端预售',
  //       level: 2,
  //     },
  //   ];
  //   const shuiguoxianhuaList = [
  //     {
  //       name: '时令推荐',
  //       desc: '时令推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '莓果/草莓',
  //       desc: '莓果/草莓',
  //       level: 2,
  //     },
  //     {
  //       name: '柑橘橙柚',
  //       desc: '柑橘橙柚',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜花绿植',
  //       desc: '鲜花绿植',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '葡萄/瓜果',
  //       desc: '葡萄/瓜果',
  //       level: 2,
  //     },
  //     {
  //       name: '热带水果',
  //       desc: '热带水果',
  //       level: 2,
  //     },
  //     {
  //       name: '进口水果',
  //       desc: '进口水果',
  //       level: 2,
  //     },
  //     {
  //       name: '苹果梨蕉',
  //       desc: '苹果梨蕉',
  //       level: 2,
  //     },
  //     {
  //       name: '果切/礼盒',
  //       desc: '果切/礼盒',
  //       level: 2,
  //     },
  //     {
  //       name: '榴莲/山竹',
  //       desc: '榴莲/山竹',
  //       level: 2,
  //     },
  //     {
  //       name: '桃李杏枣',
  //       desc: '桃李杏枣',
  //       level: 2,
  //     },
  //   ];
  //   const shuichanhaixianList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '周末好吃点',
  //       desc: '周末好吃点',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '春捕时令鲜',
  //       desc: '春捕时令鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '虾/小龙虾',
  //       desc: '虾/小龙虾',
  //       level: 2,
  //     },
  //     {
  //       name: '鱼',
  //       desc: '鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '贝/生蚝',
  //       desc: '贝/生蚝',
  //       level: 2,
  //     },
  //     {
  //       name: '蟹',
  //       desc: '蟹',
  //       level: 2,
  //     },
  //     {
  //       name: '品质刺身',
  //       desc: '品质刺身',
  //       level: 2,
  //     },
  //     {
  //       name: '三文鱼/鳕鱼',
  //       desc: '三文鱼/鳕鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜活水产',
  //       desc: '鲜活水产',
  //       level: 2,
  //     },
  //     {
  //       name: '冰鲜水产',
  //       desc: '冰鲜水产',
  //       level: 2,
  //     },
  //     {
  //       name: '冷冻水产',
  //       desc: '冷冻水产',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '高端大海鲜',
  //       desc: '高端大海鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '海菜海蛰',
  //       desc: '海菜海蛰',
  //       level: 2,
  //     },
  //     {
  //       name: '鱿墨章鱼',
  //       desc: '鱿墨章鱼',
  //       level: 2,
  //     },
  //     {
  //       name: '水产半成品',
  //       desc: '水产半成品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //     {
  //       name: '干货水产',
  //       desc: '干货水产',
  //       level: 2,
  //     },
  //   ];
  //   const rupinhongpeiList = [
  //     {
  //       name: '今日力荐',
  //       desc: '今日力荐',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜奶',
  //       desc: '鲜奶',
  //       level: 2,
  //     },
  //     {
  //       name: '酸奶/乳酸菌',
  //       desc: '酸奶/乳酸菌',
  //       level: 2,
  //     },
  //     {
  //       name: '春日新品',
  //       desc: '春日新品',
  //       level: 2,
  //     },
  //     {
  //       name: '三明治早餐',
  //       desc: '三明治早餐',
  //       level: 2,
  //     },
  //     {
  //       name: '黄油奶酪',
  //       desc: '黄油奶酪',
  //       level: 2,
  //     },
  //     {
  //       name: '常温/箱装奶',
  //       desc: '常温/箱装奶',
  //       level: 2,
  //     },
  //     {
  //       name: '吐司/面包',
  //       desc: '吐司/面包',
  //       level: 2,
  //     },
  //     {
  //       name: '蛋糕甜品',
  //       desc: '蛋糕甜品',
  //       level: 2,
  //     },
  //     {
  //       name: '点心/麻薯',
  //       desc: '点心/麻薯',
  //       level: 2,
  //     },
  //     {
  //       name: '披萨/蛋挞',
  //       desc: '披萨/蛋挞',
  //       level: 2,
  //     },
  //     {
  //       name: '闭眼入',
  //       desc: '闭眼入',
  //       level: 2,
  //     },
  //     {
  //       name: '烘焙下午茶',
  //       desc: '烘焙下午茶',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];
  //   const dongpinmiandianList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '周末特惠',
  //       desc: '周末特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '新品尝鲜',
  //       desc: '新品尝鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '春日青团',
  //       desc: '春日青团',
  //       level: 2,
  //     },
  //     {
  //       name: '冰淇淋',
  //       desc: '冰淇淋',
  //       level: 2,
  //     },
  //     {
  //       name: '冷藏鲜食',
  //       desc: '冷藏鲜食',
  //       level: 2,
  //     },
  //     {
  //       name: '饺子/馄饨',
  //       desc: '饺子/馄饨',
  //       level: 2,
  //     },
  //     {
  //       name: '包子/馒头',
  //       desc: '包子/馒头',
  //       level: 2,
  //     },
  //     {
  //       name: '烧麦/点心',
  //       desc: '烧麦/点心',
  //       level: 2,
  //     },
  //     {
  //       name: '汤圆/年糕',
  //       desc: '汤圆/年糕',
  //       level: 2,
  //     },
  //     {
  //       name: '手抓饼/饼类',
  //       desc: '手抓饼/饼类',
  //       level: 2,
  //     },
  //     {
  //       name: '鲜面/鲜粉',
  //       desc: '鲜面/鲜粉',
  //       level: 2,
  //     },
  //     {
  //       name: '肉肠/培根',
  //       desc: '肉肠/培根',
  //       level: 2,
  //     },
  //   ];
  //   const liangyoutiaoweiList = [
  //     {
  //       name: '推荐',
  //       desc: '推荐',
  //       level: 2,
  //     },
  //     {
  //       name: '特惠专区',
  //       desc: '特惠专区',
  //       level: 2,
  //     },
  //     {
  //       name: '轻食好物',
  //       desc: '轻食好物',
  //       level: 2,
  //     },
  //     {
  //       name: '新品尝鲜',
  //       desc: '新品尝鲜',
  //       level: 2,
  //     },
  //     {
  //       name: '大米',
  //       desc: '大米',
  //       level: 2,
  //     },
  //     {
  //       name: '食用油',
  //       desc: '食用油',
  //       level: 2,
  //     },
  //     {
  //       name: '酱油/醋',
  //       desc: '酱油/醋',
  //       level: 2,
  //     },
  //     {
  //       name: '盐糖/调味料',
  //       desc: '盐糖/调味料',
  //       level: 2,
  //     },
  //     {
  //       name: '蚝油/调味汁',
  //       desc: '蚝油/调味汁',
  //       level: 2,
  //     },
  //     {
  //       name: '调味酱',
  //       desc: '调味酱',
  //       level: 2,
  //     },
  //     {
  //       name: '杂粮干货',
  //       desc: '杂粮干货',
  //       level: 2,
  //     },
  //     {
  //       name: '面条/粉丝',
  //       desc: '面条/粉丝',
  //       level: 2,
  //     },
  //     {
  //       name: '面粉/预拌粉',
  //       desc: '面粉/预拌粉',
  //       level: 2,
  //     },
  //     {
  //       name: '酱菜/罐头',
  //       desc: '酱菜/罐头',
  //       level: 2,
  //     },
  //     {
  //       name: '方便速食',
  //       desc: '方便速食',
  //       level: 2,
  //     },
  //     {
  //       name: '快手调味料',
  //       desc: '快手调味料',
  //       level: 2,
  //     },
  //     {
  //       name: '腌腊制品',
  //       desc: '腌腊制品',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];
  //   const jiushuiyinliaoList = [
  //     {
  //       name: '今日力荐',
  //       desc: '今日力荐',
  //       level: 2,
  //     },
  //     {
  //       name: '饮用水',
  //       desc: '饮用水',
  //       level: 2,
  //     },
  //     {
  //       name: '啤酒',
  //       desc: '啤酒',
  //       level: 2,
  //     },
  //     {
  //       name: '碳酸/功能',
  //       desc: '碳酸/功能',
  //       level: 2,
  //     },
  //     {
  //       name: '果汁/乳饮',
  //       desc: '果汁/乳饮',
  //       level: 2,
  //     },
  //     {
  //       name: '茶饮/咖啡',
  //       desc: '茶饮/咖啡',
  //       level: 2,
  //     },
  //     {
  //       name: '新品',
  //       desc: '新品',
  //       level: 2,
  //     },
  //     {
  //       name: '白酒',
  //       desc: '白酒',
  //       level: 2,
  //     },
  //     {
  //       name: '葡萄酒',
  //       desc: '葡萄酒',
  //       level: 2,
  //     },
  //     {
  //       name: '米酒/黄酒',
  //       desc: '米酒/黄酒',
  //       level: 2,
  //     },
  //     {
  //       name: '果酒/预调酒',
  //       desc: '果酒/预调酒',
  //       level: 2,
  //     },
  //     {
  //       name: '洋酒/清酒',
  //       desc: '洋酒/清酒',
  //       level: 2,
  //     },
  //     {
  //       name: '超值特惠',
  //       desc: '超值特惠',
  //       level: 2,
  //     },
  //     {
  //       name: '蜂蜜/冲泡',
  //       desc: '蜂蜜/冲泡',
  //       level: 2,
  //     },
  //     {
  //       name: '量贩到家',
  //       desc: '量贩到家',
  //       level: 2,
  //     },
  //   ];

  //   const shucai = await this.categoryRepository.create(mockData[0]);
  //   const shucaiSub = await this.categoryRepository.bulkCreate(
  //     shucaiList.map((_sucai) => {
  //       return {
  //         ..._sucai,
  //         parentId: shucai.id,
  //       };
  //     }),
  //   );
  //   // for (let sucai of shucaiSub) {
  //   //   if (sucai.name === '推荐') {
  //   //     const tuijianRes = await this.waresRepository.bulkCreate(tuijianWare);
  //   //     tuijianRes.map((tuijian) => {
  //   //       tuijian.setCategory(sucai);
  //   //     });
  //   //   } else if (sucai.name === '新品') {
  //   //     const xinpinRes = await this.waresRepository.bulkCreate(xinpinWare);
  //   //     xinpinRes.map((xinpin) => {
  //   //       xinpin.setCategory(xinpin);
  //   //     });
  //   //   }
  //   // }

  //   const rouqin = await this.categoryRepository.create(mockData[1]);
  //   const rouqinSub = await this.categoryRepository.bulkCreate(
  //     rouqinList.map((_rouqin) => {
  //       return {
  //         ..._rouqin,
  //         parentId: rouqin.id,
  //       };
  //     }),
  //   );

  //   const shuiguoxianhua = await this.categoryRepository.create(mockData[2]);
  //   const shuiguoxianhuaSub = await this.categoryRepository.bulkCreate(
  //     shuiguoxianhuaList.map((_shuiguoxianhua) => {
  //       return {
  //         ..._shuiguoxianhua,
  //         parentId: shuiguoxianhua.id,
  //       };
  //     }),
  //   );

  //   const shuichanhaixian = await this.categoryRepository.create(mockData[3]);
  //   const shuichanhaixianSub = await this.categoryRepository.bulkCreate(
  //     shuichanhaixianList.map((_shuichanhaixian) => {
  //       return {
  //         ..._shuichanhaixian,
  //         parentId: shuichanhaixian.id,
  //       };
  //     }),
  //   );

  //   const rupinhongpei = await this.categoryRepository.create(mockData[3]);
  //   const rupinhongpeiSub = await this.categoryRepository.bulkCreate(
  //     rupinhongpeiList.map((_rupinhongpei) => {
  //       return {
  //         ..._rupinhongpei,
  //         parentId: rupinhongpei.id,
  //       };
  //     }),
  //   );

  //   const dongpinmiandian = await this.categoryRepository.create(mockData[3]);
  //   const dongpinmiandianSub = await this.categoryRepository.bulkCreate(
  //     dongpinmiandianList.map((_dongpinmiandian) => {
  //       return {
  //         ..._dongpinmiandian,
  //         parentId: dongpinmiandian.id,
  //       };
  //     }),
  //   );

  //   const liangyoutiaowei = await this.categoryRepository.create(mockData[3]);
  //   const liangyoutiaoweiSub = await this.categoryRepository.bulkCreate(
  //     liangyoutiaoweiList.map((_liangyoutiaowei) => {
  //       return {
  //         ..._liangyoutiaowei,
  //         parentId: liangyoutiaowei.id,
  //       };
  //     }),
  //   );

  //   const jiushuiyinliao = await this.categoryRepository.create(mockData[3]);
  //   const jiushuiyinliaoSub = await this.categoryRepository.bulkCreate(
  //     jiushuiyinliaoList.map((_jiushuiyinliao) => {
  //       return {
  //         ..._jiushuiyinliao,
  //         parentId: jiushuiyinliao.id,
  //       };
  //     }),
  //   );

  //   // const bulkCreateRes = await this.categoryRepository.bulkCreate(mockData);
  //   return {
  //     shucaiSub,
  //     rouqinSub,
  //     shuiguoxianhuaSub,
  //     shuichanhaixianSub,
  //     rupinhongpeiSub,
  //     dongpinmiandianSub,
  //     liangyoutiaoweiSub,
  //     jiushuiyinliaoSub,
  //   };
  // }

  // async wareSpec() {
  //   const ware = {
  //     name: '【春菜】枸杞头 250g/份',
  //     desc: '春季时令鲜蔬，清爽微苦回味甜，草木清香，适合凉拌或热炒',
  //     title: '时令鲜蔬|微苦回干|热炒凉拌',
  //     price: 9.9,
  //     perWeight: '250g/份',
  //     ledeImage:
  //       'https://img.ddimg.mobi/product/cbd8150a6b0d31614767166953.jpg?width=800&height=800',
  //   };
  //   const spec = {
  //     desc: '枸杞',
  //     storeCondition: '冷藏',
  //     isImports: true,
  //     intro: '快来买我！',
  //   };

  //   const wareRes = await this.waresRepository.create(ware);
  //   const specRes = await this.specRepository.create(spec);
  //   const setRes = await wareRes.setSpec(specRes);
  //   return setRes;
  // }

  findAll() {
    return `This action returns all mock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mock`;
  }

  update(id: number, updateMockDto: UpdateMockDto) {
    return `This action updates a #${id} mock`;
  }

  remove(id: number) {
    return `This action removes a #${id} mock`;
  }
}
