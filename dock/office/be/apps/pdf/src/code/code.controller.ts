import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { CodeService } from './code.service';
import { SendCodeDto } from './dto/send-code.dto';
import { Auth } from '@pdf/auth/auth.decorator';

@Controller('codes')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Auth()
  @Delete('')
  del() {
    return { del: true };
  }

  @Post('send')
  send(@Body() sendCodeDto: any) {
    console.log(`[SendCode]: `, sendCodeDto);
    return this.codeService.send(sendCodeDto);
  }

  @Get()
  // @HasPermission('users')
  async all(@Query('page') page = 1) {
    const data = await this.codeService.paginate(page);
    return { msg: 'dt', ...data };
  }

  @Post('forget')
  // @UseGuards(AuthGuard('jwt'))
  forget(@Body() forgetCodeDto: any) {
    console.log(`[ForgetCode]: `, forgetCodeDto);
    return this.codeService.forget(forgetCodeDto);
  }

  // @Post('verify')
  // @Auth()
  // verify(@Req() request) {
  //   console.log(`[Verify]: `, request.user, request.body);
  //   const { email, code } = request.body;
  //   return this.codeService.verify({
  //     code,
  //     email,
  //   });
  // }

  // @Get()
  // findAll() {
  //   return this.codeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.codeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
  //   return this.codeService.update(+id, updateCodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.codeService.remove(+id);
  // }
}
