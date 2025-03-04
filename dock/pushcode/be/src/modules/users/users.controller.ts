import { UserLoginRequestDto } from './dto/user-login-request.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Delete,
  Req,
  UseGuards,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../../core/decorators/response.decorator';
import * as qs from 'qs';
import { Op } from 'sequelize';
import { EmailRegisterDto } from './dto/email-register.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('verify-token')
  @UseGuards(AuthGuard('jwt'))
  async verifyToken(@Req() request: any) {
    // const { token } = tokenDto;
    return await this.usersService.verifyToken(request.user);
    // return {
    //   email: request.user.email,
    // };
  }

  @Post('register')
  @ApiOkResponse({ type: UserLoginResponseDto })
  register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordDto: any): any {
    return this.usersService.changePassword(changePasswordDto);
  }

  @Post('email-register')
  @ApiOkResponse({ type: UserLoginResponseDto })
  emailRegister(@Body() emailregisterDto: EmailRegisterDto) {
    return this.usersService.emailRegister(emailregisterDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginResponseDto })
  login(
    @Body() userLoginRequestDto: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    console.log(`[Login]: `, userLoginRequestDto);
    return this.usersService.login(userLoginRequestDto);
  }

  @Get('all')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  findAndCountAll(
    @Query() query: { limit: number; offset: number },
  ): Promise<any> {
    console.log(`[findAndCountAll]: `, query);
    const { limit, offset } = query;
    return this.usersService.findAndCountAll({ limit, offset });
  }

  @Get('/search')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: [UserDto] })
  searchAll(@Req() request): Promise<any> {
    const parsedQuery: any = qs.parse(request.url.split('?')[1]);

    const { limit, offset, where } = parsedQuery;
    const _where = {};
    if (where) {
      for (const [key, val] of Object.entries(where)) {
        val &&
          (_where[key] = {
            [Op.iLike]: `%${val}%`,
          });
      }
      parsedQuery.where = _where;
    }
    console.log(`[searchAll]: `, request.url, parsedQuery);
    return this.usersService.searchAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: _where,
    });
  }

  @Post('')
  @ApiOkResponse({ type: UserLoginResponseDto })
  createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserLoginResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Put('/:uuid')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  @ResponseMessage('User updated')
  updateUser(
    @Req() request,
    @Param('uuid') uuid: string,
  ): Promise<UserDto> | any {
    console.log(`[updateUser]: `, request.body, uuid);
    return this.usersService.update(uuid, request.body);
  }

  @Delete('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  deleteIds(@Req() request): Promise<UserDto> | any {
    const ids = request.body.ids;
    console.log(' -  -- - ids', ids);
    return this.usersService.deleteIds(ids);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  async getUser(@Req() request): Promise<UserDto> {
    return this.usersService.getUser(request.user.id);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async getUserProfile(@Req() request): Promise<any> {
    return this.usersService.getUserProfile(request.user.id);
  }

  @Post('profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async setUserProfile(@Req() request, @Body() body): Promise<any> {
    return this.usersService.setMyUserProfile(request.user, body);
  }

  @Put('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  @ResponseMessage('User updated')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() request,
  ): Promise<UserDto> | any {
    console.log(`[Put me]: `, request.user.id);
    return this.usersService.update(request.user.id, updateUserDto);
  }

  @Delete('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  delete(@Req() request): Promise<UserDto> | any {
    return this.usersService.delete(request.user.id);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserDto })
  deleteById(@Param('id') id: string): Promise<UserDto> | any {
    return this.usersService.delete(id);
  }

  // 充会员
  @Post('/member')
  async member(@Body() createUserDto: any) {
    return await this.usersService.member(createUserDto);
  }

  // 添加设备
  @Post('/add-device')
  async addDevice(@Body() createUserDto: any) {
    return await this.usersService.addDevice(createUserDto);
  }
  @Post('/add-subscription')
  async addSubscription(@Body() createUserDto: any) {
    return await this.usersService.addSubscription(createUserDto);
  }

  @Delete('/del-subscription')
  async delSubscription(@Body() createUserDto: any) {
    return await this.usersService.delSubscription(createUserDto);
  }

  // 续费
  async addTimer(@Body() createUserDto: any) {
    return await this.usersService.addTimer(createUserDto);
  }
}
