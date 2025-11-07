import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfig } from './config/env.config';
import { 
  NUMBER_VERIFICATION_SERVICE, 
  SIM_SWAP_SERVICE 
} from './config/tokens';
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
import { NumberVerificationService } from './external/services/number-verification.service';
import { TokenService } from './external/services/token.service';
import { SimSwapService } from './external/services/sim-swap.service';

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
  providers: [
    {
      provide: NUMBER_VERIFICATION_SERVICE,
      useClass: NumberVerificationService,
    },
    {
      provide: SIM_SWAP_SERVICE,
      useClass: SimSwapService,
    },
    TokenService,
  ],
  exports: [ConfigModule, MongooseModule],
})
export class InfrastructureModule { }
