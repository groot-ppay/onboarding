import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterClientController } from './controllers/register-client/register-client.controller';

@Module({
  imports: [CqrsModule],
  controllers: [
    RegisterClientController,
  ],
  providers: [],
})
export class PresentationModule {}
