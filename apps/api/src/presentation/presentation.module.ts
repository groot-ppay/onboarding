import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterClientController } from './controllers/register-client/register-client.controller';
import { PhoneValidationController } from './controllers/phone-validation/phone-validation.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    RegisterClientController,
    PhoneValidationController,
  ],
  providers: [],
})
export class PresentationModule {}
