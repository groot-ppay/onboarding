import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RegisterClientHandler } from './use-cases/register-client/register-client.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    RegisterClientHandler,
  ],
})
export class ApplicationModule {}
