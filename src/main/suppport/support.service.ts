import { QueryFilterDto } from "@/common/dto";
import { Support } from "@/db/entities/Support";
import { customPaginate } from "@/utils/custom-paginate";
import { extractFilter } from "@/utils/extractFilter";
import { Injectable, NotFoundException } from "@nestjs/common";
import { getManager } from "typeorm";
import { UpsertSupportInputDto } from "./dto";

@Injectable()
export class SupportService {
  async upsertSupport(input: UpsertSupportInputDto) {
    const { id } = input;

    const support = await Support.findOne({ id });

    const transaction = getManager();
    const newSuppport = transaction
      .getRepository(Support)
      .merge(support ?? Support.create(), { ...input });

    return await transaction.getRepository(Support).save(newSuppport);
  }

  async deleteSupport(supportId: string) {
    await getManager()
      .getRepository(Support)
      .createQueryBuilder()
      .delete()
      .where({ id: supportId })
      .returning('id')
      .execute();

    return {
      message: 'true',
      success: true,
    };
  }

  async getSupport(supportId: string) {
    const support = (await Support.findOne({ id: supportId }));
    if (!support) {
      throw new NotFoundException('Support not found');
    }

    return support;
  }
  
  async getSupports(queryParams: QueryFilterDto) {
    const builder = Support.createQueryBuilder().leftJoinAndSelect('Support.user', 'user');
    extractFilter<Support>(
      builder,
      queryParams,
    );
    
    return await customPaginate<Support>(builder, queryParams);
  
  }

  async getMySupports(queryParams: QueryFilterDto, userId:string) {
    const builder = Support.createQueryBuilder().where({ userId});

    return await customPaginate<Support>(builder, queryParams);
  }
}