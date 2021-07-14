import { HttpModule, Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
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
      autoSchemaFile: true,
      playground: {
        // 生产环境中需要关闭
        settings: {
          'request.credentials': 'same-origin',
        },
      },
    } as GqlModuleOptions),
  ],
  controllers: [AppController],
  providers: [...services, ...resolvers],
})
export class AppModule {}
