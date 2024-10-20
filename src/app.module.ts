import { Module } from '@nestjs/common';
import { importConfigModule } from './config/importConfigModule';
import { AppController } from './app.controller';
import { importTypeOrmModule } from './typeorm/importTypeOrmModule';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    importConfigModule(),
    importTypeOrmModule(),
    ResponseModule,
    DictionaryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
