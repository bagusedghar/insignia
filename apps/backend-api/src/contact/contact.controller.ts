import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContactEntity } from './entities/contact.entity';
import { GetContactDto } from './dto/get-contact.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ContactListEntity } from './entities/contact-list.entity';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { GetContactListDto } from './dto/get-contact-list.dto';

@Controller('contacts')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactEntity })
  async create(@Body() createContactDto: CreateContactDto): Promise<ContactEntity> {
    return this.contactService.create(createContactDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedResponseDto<ContactEntity> })
  async findAll(@Query() query: GetContactDto): Promise<PaginatedResponseDto<ContactEntity>> {
    return this.contactService.findAll(query);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedResponseDto<ContactListEntity> })
  async findAllList(@Query() query: GetContactListDto): Promise<PaginatedResponseDto<ContactListEntity>> {
    return this.contactService.findAllList(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactEntity> {
    return await this.contactService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto): Promise<ContactEntity> {
    return await this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ContactEntity> {
    return await this.contactService.remove(id);
  }

  @Post('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactListEntity })
  async createList(@Body() createContactListDto: CreateContactListDto): Promise<ContactListEntity> {
    return this.contactService.createList(createContactListDto);
  }

  @Get('list/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactListEntity })
  async findOneList(@Param('id', ParseIntPipe) id: number): Promise<ContactListEntity> {
    return await this.contactService.findOneList(id);
  }

  @Patch('list/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactListEntity })
  async updateList(@Param('id', ParseIntPipe) id: number, @Body() updateContactListDto: UpdateContactListDto): Promise<ContactListEntity> {
    return await this.contactService.updateList(id, updateContactListDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactListEntity })
  async removeList(@Param('id', ParseIntPipe) id: number): Promise<ContactListEntity> {
    return await this.contactService.removeList(id);
  }

}
