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
} from '@nestjs/common';
import { CodeService } from './code.service';
import { UpdateCodeDto } from './dto/update-code.dto';
import { SendCodeDto } from './dto/send-code.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post('send')
  // @UseGuards(AuthGuard('jwt'))
  send(@Body() sendCodeDto: any) {
    console.log(`[SendCode]: `, sendCodeDto);
    return this.codeService.send(sendCodeDto);
  }

  // get forget password code
  @Post('forget')
  // @UseGuards(AuthGuard('jwt'))
  forget(@Body() forgetCodeDto: any) {
    console.log(`[ForgetCode]: `, forgetCodeDto);
    return this.codeService.forget(forgetCodeDto);
  }

  @Post('verify')
  @UseGuards(AuthGuard('jwt'))
  verify(@Req() request) {
    console.log(`[Verify]: `, request.user, request.body);
    const { email, code } = request.body;
    return this.codeService.verify({
      code,
      email,
    });
  }

  @Get()
  findAll() {
    return this.codeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.codeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCodeDto: UpdateCodeDto) {
    return this.codeService.update(+id, updateCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.codeService.remove(+id);
  }
}
