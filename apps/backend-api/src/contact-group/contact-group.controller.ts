import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { ContactGroupService } from './contact-group.service';
import { CreateContactGroupDto } from './dto/create-contact-group.dto';
import { UpdateContactGroupDto } from './dto/update-contact-group.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ContactGroupEntity } from './entities/contact-group.entity';
import { GetContactGroupDto } from './dto/get-contact-group.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contact-groups')
@ApiTags('contact groups')
export class ContactGroupController {
  constructor(private readonly contactGroupService: ContactGroupService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ContactGroupEntity })
  async create(@Body() createContactGroupDto: CreateContactGroupDto): Promise<ContactGroupEntity> {
    return this.contactGroupService.create(createContactGroupDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PaginatedResponseDto<ContactGroupEntity> })
  async findAll(@Query() query: GetContactGroupDto): Promise<PaginatedResponseDto<ContactGroupEntity>> {
    return this.contactGroupService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactGroupEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactGroupEntity> {
    return await this.contactGroupService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactGroupEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateContactGroupDto: UpdateContactGroupDto): Promise<ContactGroupEntity> {
    return await this.contactGroupService.update(id, updateContactGroupDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ContactGroupEntity })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<ContactGroupEntity> {
    return await this.contactGroupService.remove(id);
  }
}
