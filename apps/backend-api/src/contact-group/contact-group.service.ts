import { Injectable } from '@nestjs/common';
import { CreateContactGroupDto } from './dto/create-contact-group.dto';
import { UpdateContactGroupDto } from './dto/update-contact-group.dto';
import { ContactGroupEntity } from './entities/contact-group.entity';
import { Prisma } from '@prisma/client';
import { GetContactGroupDto } from './dto/get-contact-group.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@Injectable()
export class ContactGroupService {
  constructor(private prisma: PrismaService) { }

  async create(createContactGroupDto: CreateContactGroupDto): Promise<ContactGroupEntity> {
    return this.prisma.contactGroup.create({ data: createContactGroupDto });
  }

  async findAll(query: GetContactGroupDto): Promise<PaginatedResponseDto<ContactGroupEntity>> {
    const { page, limit, sortBy, sortOrder, name, description } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.ContactGroupWhereInput = {
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
      ...(description && {
        description: {
          contains: description,
          mode: 'insensitive',
        },
      }),
    };

    const orderBy = { [sortBy]: sortOrder }

    const data = await this.prisma.contactGroup.findMany({
      skip,
      take: limit,
      where,
      orderBy,
      include: {
        contactList: true
      }
    });

    const total = await this.prisma.contactGroup.count({
      where
    });

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    };
  }

  async findOne(id: number): Promise<ContactGroupEntity> {
    return this.prisma.contactGroup.findUniqueOrThrow({ where: { id }, include: { contactList: true } });
  }

  async update(id: number, updateContactGroupDto: UpdateContactGroupDto): Promise<ContactGroupEntity> {
    return this.prisma.contactGroup.update({
      where: { id },
      data: updateContactGroupDto,
    });
  }

  async remove(id: number): Promise<ContactGroupEntity> {
    return this.prisma.contactGroup.delete({
      where: { id }
    });
  }
}
