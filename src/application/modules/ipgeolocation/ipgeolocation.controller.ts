import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IpgeolocationService } from './ipgeolocation.service';
import { IpgeolocationDto } from './models/dto/ipgeolocation.dto';

@Controller()
export class IpgeolocationController {
  constructor(private readonly IpService: IpgeolocationService) {}

  @Post('')
  getInfoAddress(@Body() body: IpgeolocationDto) {
    return this.IpService.getInfoAddress(body);
  }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return `This action removes a #${id} cat`;
  // }
}
