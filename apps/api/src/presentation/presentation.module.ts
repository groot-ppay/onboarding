import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterClientController } from './controllers/register-client/register-client.controller';
import { PhoneValidationController } from './controllers/phone-validation/phone-validation.controller';
import { OtpValidationController } from './controllers/otp-validation/otp-validation.controller';
import { CompleteClientDataController } from './controllers/complete-client-data/complete-client-data.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    RegisterClientController,
    PhoneValidationController,
    OtpValidationController,
    CompleteClientDataController,
  ],
  providers: [],
})
export class PresentationModule {}
