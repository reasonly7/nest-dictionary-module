import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from './entities/dictionary.entity';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { CheckDictionaryDto } from './dto/check-dictionary.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
  ) {}

  async query(paginationDto: PaginationDto) {
    const { page, size } = paginationDto;
    const [records, total] = await this.dictionaryRepository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { category: 'ASC', id: 'DESC', order: 'ASC' },
      select: ['id', 'category', 'description', 'enable', 'key', 'value'],
    });

    return { records, page, size: size, total };
  }

  findAllCategories() {
    return this.dictionaryRepository
      .createQueryBuilder('dictionary')
      .select('dictionary.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .groupBy('dictionary.category')
      .orderBy('dictionary.category', 'ASC')
      .getRawMany();
  }

  findByCategoryIncludeEnable(category: string) {
    return this.dictionaryRepository.find({
      where: { category },
      order: { order: 'ASC' },
      select: ['id', 'key', 'value', 'description', 'enable'],
    });
  }

  findByCategoryExcludeEnable(category: string) {
    return this.dictionaryRepository.find({
      where: { category, enable: true },
      order: { order: 'ASC' },
      select: ['key', 'value'],
    });
  }

  async create(createDictionaryDto: CreateDictionaryDto) {
    const item = this.dictionaryRepository.create(createDictionaryDto);
    const res = await this.dictionaryRepository.save(item);
    return res.id;
  }

  async update(id: number, updateDictionaryDto: UpdateDictionaryDto) {
    const res = await this.dictionaryRepository.update(id, updateDictionaryDto);
    return res.affected === 1;
  }

  findById(id: number) {
    return this.dictionaryRepository.findOneBy({ id });
  }

  async removeById(id: number) {
    const res = await this.dictionaryRepository.softDelete({ id });
    return res.affected === 1;
  }

  async removeByCategory(category: string) {
    const items = await this.findByCategoryIncludeEnable(category);
    const ids = items.map((item) => item.id);
    if (ids.length === 0) {
      return true;
    }
    const res = await this.dictionaryRepository.softDelete(ids);
    return res.affected === ids.length;
  }

  async findByKey(key: string) {
    const item = await this.dictionaryRepository.findOneBy({
      key,
      enable: true,
    });
    if (item) {
      return item.value;
    }
    return item;
  }

  check(checkDictionaryDto: CheckDictionaryDto) {
    return this.dictionaryRepository.existsBy(checkDictionaryDto);
  }
}
