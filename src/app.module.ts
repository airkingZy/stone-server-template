import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
const basedbconfg = `mongodb://${
  process.env.NODE_ENV === 'production' ? process.env.DB_USER : 'test'
}:${
  process.env.NODE_ENV === 'production' ? process.env.DB_PASSWORD : '!QAZ%40wsx'
}@${
  process.env.NODE_ENV === 'production'
    ? process.env.DB_HOST + process.env.DB_PORT
    : '127.0.0.1:27017'
}`;
// mongodb://test:!QAZ%40wsx@127.0.0.1:27017/test

import { HeaderMiddleware } from './middleware/header.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, '../src/config/.env'),
    }),
    // MongooseModule.forRoot(`${basedbconfg}/test`, {
    //   useCreateIndex: true,
    //   useNewUrlParser: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).forRoutes(AppController);
  }
}
