import { Module } from '@nestjs/common';
import { InboxResolver } from './inbox.resolver';
import { InboxService } from './inbox.service';

@Module({ providers: [InboxResolver, InboxService],})
export class InboxModule {}
