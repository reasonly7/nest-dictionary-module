import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { CheckDictionaryDto } from './dto/check-dictionary.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  // @Get()
  // findAllCategories() {
  //   return this.dictionaryService.findAllCategories();
  // }

  @HttpCode(200)
  @Get()
  query(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.dictionaryService.query({ page, size });
  }

  @Post()
  create(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.create(createDictionaryDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ) {
    return this.dictionaryService.update(id, updateDictionaryDto);
  }

  @Get('admin/:category')
  findByCategoryIncludeEnable(@Param('category') category: string) {
    return this.dictionaryService.findByCategoryIncludeEnable(category);
  }

  @Delete(':id')
  removeById(@Param('id', ParseIntPipe) id: number) {
    return this.dictionaryService.removeById(id);
  }

  @Delete('category/:category')
  removeByCategory(@Param('category') category: string) {
    return this.dictionaryService.removeByCategory(category);
  }

  @Get('key/:key')
  findByKey(@Param('key') key: string) {
    return this.dictionaryService.findByKey(key);
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  check(@Body() checkDictionaryDto: CheckDictionaryDto) {
    return this.dictionaryService.check(checkDictionaryDto);
  }

  @Get(':category')
  findByCategoryExcludeEnable(@Param('category') category: string) {
    return this.dictionaryService.findByCategoryExcludeEnable(category);
  }
}
