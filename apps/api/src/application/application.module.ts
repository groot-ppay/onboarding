import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RegisterClientHandler } from './use-cases/register-client/register-client.handler';
import { ValidatePhoneHandler } from './use-cases/validate-phone/validate-phone.handler';
import { ValidateOtpHandler } from './use-cases/validate-otp/validate-otp.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    RegisterClientHandler,
    ValidatePhoneHandler,
    ValidateOtpHandler,
  ],
})
export class ApplicationModule {}
