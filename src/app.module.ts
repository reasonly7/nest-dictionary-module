import { Module } from '@nestjs/common';
import { importConfigModule } from './config/importConfigModule';
import { AppController } from './app.controller';
import { importTypeOrmModule } from './typeorm/importTypeOrmModule';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [importConfigModule(), importTypeOrmModule(), DictionaryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
