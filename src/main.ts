import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";


async function bootstrap() {
  const app = await NestFactory.create( AppModule, {
    logger: ["log"]
  } );

  app.enableCors( {
    origin: "*",
    methods: "GET,PATCH,POST,DELETE,PUT"
  } );

  const config = new DocumentBuilder()
    .setTitle( "Instant Mate API" )
    .setDescription( "Instant Mate API" )
    .setVersion( "1.0" ).addBearerAuth().build();
  const document = SwaggerModule.createDocument( app, config );

  SwaggerModule.setup( "api", app, document );
  await app.listen( 3000 );
}

bootstrap();
