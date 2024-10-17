import { Module } from '@nestjs/common';
import { importConfigModule } from './config/importConfigModule';
import { AppController } from './app.controller';
import { importTypeOrmModule } from './typeorm/importTypeOrmModule';

@Module({
  imports: [importConfigModule(), importTypeOrmModule()],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
