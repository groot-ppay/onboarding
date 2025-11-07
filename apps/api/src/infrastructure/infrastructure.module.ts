import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './config/env.config';
import {
  Client,
  ClientSchema,
  PhoneVerification,
  PhoneVerificationSchema,
  SimSwap,
  SimSwapSchema,
  KycMatch,
  KycMatchSchema,
} from './persistence/schemas';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('DOCDB_URI'),
        user: config.get<string>('DOCDB_USER'),
        pass: config.get<string>('DOCDB_PASSWORD'),
        dbName: config.get<string>('DOCDB_DATABASE'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: PhoneVerification.name, schema: PhoneVerificationSchema },
      { name: SimSwap.name, schema: SimSwapSchema },
      { name: KycMatch.name, schema: KycMatchSchema },
    ]),
  ],
  exports: [ConfigModule, MongooseModule],
})
export class InfrastructureModule { }
