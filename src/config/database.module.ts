import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ControllersList } from "../Lists/controllers.list";
import { EntitiesList } from "../Lists/entities.list";
import { ServicesList } from "../Lists/services.list";
import { JwtModule } from "@nestjs/jwt";


@Module( {
  imports: [
    TypeOrmModule.forRootAsync( <TypeOrmModuleAsyncOptions>{
      inject: [ConfigService],
      name: "postgreConnection",
      useFactory: async (
        configService: ConfigService
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: "postgres",
          host: configService.get<string>( "DB_HOST" ),
          port: configService.get<number>( "DB_PORT" ),
          username: configService.get<string>( "DB_NAME" ),
          password: configService.get<string>( "DB_PASSWORD" ),
          database: configService.get<string>( "DB_DATABASE" ),
          autoLoadEntities: true,
          synchronize: true,
          entities: EntitiesList,
          ssl: true
        };
      }
    } ),
    TypeOrmModule.forFeature( EntitiesList, "postgreConnection" ),
    JwtModule.registerAsync( {
      imports: [ConfigModule],
      useFactory: async ( configService: ConfigService ) => ({
        secret: configService.get<string>( "JWT_SECRET" ),
        signOptions: { expiresIn: "1d" }
      }),
      inject: [ConfigService]
    } )
  ],
  controllers: ControllersList,
  providers: ServicesList,
  exports: ServicesList
} )
export class DatabaseModule {
}
