import { QueryFilterDto } from '@/common/dto';
import { Inbox } from '@/db/entities/Inbox';
import { customPaginate } from '@/utils/custom-paginate';
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

     await transaction.getRepository(Inbox).save(newInbox)
     
     return this.getInboxes({
      "limit":10,
      "page":1,
     });
  }

  async getInbox(inboxId: string) {
    const inbox = await Inbox.findOne({ id: inboxId });
    if (!inbox) {
      throw new NotFoundException('Inbox not found');
    }

    return inbox;
  }
  async getInboxes(queryParams: QueryFilterDto) {
    const builder = Inbox.createQueryBuilder();

    return await customPaginate<Inbox>(builder, queryParams);
  }

  async getMyInboxes(queryParams: QueryFilterDto, userId:string) {
    const builder = Inbox.createQueryBuilder().where({ userId});

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
