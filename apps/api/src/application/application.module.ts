import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RegisterClientHandler } from './use-cases/register-client/register-client.handler';
import { ValidatePhoneHandler } from './use-cases/validate-phone/validate-phone.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    RegisterClientHandler,
    ValidatePhoneHandler,
  ],
})
export class ApplicationModule {}
