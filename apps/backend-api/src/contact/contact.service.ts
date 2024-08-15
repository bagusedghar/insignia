import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import * as bcrypt from 'bcrypt';
import { ContactEntity } from './entities/contact.entity';
import { Prisma, User } from '@prisma/client';
import { GetContactDto } from './dto/get-contact.dto';
import { plainToClass } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { ContactListEntity } from './entities/contact-list.entity';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { GetContactListDto } from './dto/get-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) { }

  async create(createContactDto: CreateContactDto): Promise<ContactEntity> {
    return this.prisma.contact.create({ data: createContactDto });
  }

  async findAll(query: GetContactDto): Promise<PaginatedResponseDto<ContactEntity>> {
    const { page, limit, sortBy, sortOrder, name, phoneNumber } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.ContactWhereInput = {
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      }),
      ...(phoneNumber && {
        phoneNumber: {
          contains: phoneNumber,
          mode: 'insensitive',
        },
      }),
    };

    const orderBy = { [sortBy]: sortOrder }

    const data = await this.prisma.contact.findMany({
      skip,
      take: limit,
      where,
      orderBy,
      include: {
        contactList: {
          include: { contactGroup: true }
        }
      }
    });

    const total = await this.prisma.contact.count({
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

  async findOne(id: number): Promise<ContactEntity> {
    return this.prisma.contact.findUniqueOrThrow({ where: { id }, include: { contactList: true } });
  }

  async update(id: number, updateContactDto: UpdateContactDto): Promise<ContactEntity> {
    return this.prisma.contact.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: number): Promise<ContactEntity> {
    return this.prisma.contact.delete({
      where: { id }
    });
  }

  async createList(createContactListDto: CreateContactListDto): Promise<ContactListEntity> {
    await this.prisma.contact.findUniqueOrThrow({ where: { id: createContactListDto.contactId } });
    await this.prisma.contactGroup.findUniqueOrThrow({ where: { id: createContactListDto.contactGroupId } });
    return this.prisma.contactList.create({ data: createContactListDto });
  }

  async findAllList(query: GetContactListDto): Promise<PaginatedResponseDto<ContactListEntity>> {
    const { page, limit, sortBy, sortOrder, contactGroupId, contactId } = query;
    const skip = (page - 1) * limit;
    const where: Prisma.ContactListWhereInput = {
      ...(contactGroupId && { contactGroupId }),
      ...(contactId && { contactId }),
    };

    const orderBy = { [sortBy]: sortOrder }

    const data = await this.prisma.contactList.findMany({
      skip,
      take: limit,
      where,
      orderBy,
      include: {
        contact: true,
        contactGroup: true
      }
    });

    const total = await this.prisma.contactList.count({
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

  async findOneList(id: number): Promise<ContactListEntity> {
    return this.prisma.contactList.findUniqueOrThrow({
      where: { id }, include: {
        contact: true,
        contactGroup: true
      }
    });
  }

  async updateList(id: number, updateContactListDto: UpdateContactListDto): Promise<ContactListEntity> {
    await this.prisma.contact.findUniqueOrThrow({ where: { id: updateContactListDto.contactId } });
    await this.prisma.contactGroup.findUniqueOrThrow({ where: { id: updateContactListDto.contactGroupId } });

    return this.prisma.contactList.update({
      where: { id },
      data: updateContactListDto,
    });
  }

  async removeList(id: number): Promise<ContactListEntity> {
    return this.prisma.contactList.delete({
      where: { id }
    });
  }
}
