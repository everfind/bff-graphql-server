import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import resolvers from './resolvers';
import services from './services';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot({
      debug: true, // 生产环境中需要关闭
      introspection: true, // 生产环境中需要关闭
      path: '/graphql',
    }),
  ],
  controllers: [AppController],
  providers: [...services, ...resolvers],
})
export class AppModule {}
