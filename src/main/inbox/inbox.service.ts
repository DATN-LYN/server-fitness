import { QueryFilterDto } from '@/common/dto';
import { Inbox } from '@/db/entities/Inbox';
import { customPaginate } from '@/utils/custom-paginate';
import { extractFilter } from '@/utils/extractFilter';
import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager } from 'typeorm';
import { UpsertInboxInputDto } from './dto';

@Injectable()
export class InboxService {
  async upsertInbox(input: UpsertInboxInputDto) {

    const transaction = getManager();
    const newInbox = transaction
      .getRepository(Inbox)
      .merge(Inbox.create(), { ...input });

    return await transaction.getRepository(Inbox).save(newInbox);
  }

  async getInbox(inboxId: string) {
    const inbox = await Inbox.findOne({ id: inboxId });
    if (!inbox) {
      throw new NotFoundException('Category not found');
    }

    return inbox;
  }
  async getInboxes(queryParams: QueryFilterDto) {
    const builder = Inbox.createQueryBuilder();
    extractFilter<Inbox>(
      builder,
      queryParams,
      'Inbox.userId',
    );

    return await customPaginate<Inbox>(builder, queryParams);
  }

  async deleteInbox(inboxId: string) {
    await getManager()
      .getRepository(Inbox)
      .createQueryBuilder()
      .delete()
      .where({ id: inboxId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }
}
