import { Module } from '@nestjs/common';
import { SupportResolver } from './support.resolver';
import { SupportService } from './support.service';

@Module({ providers: [SupportResolver, SupportService],})
export class SupportModule {}
