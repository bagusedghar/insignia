import { Module } from '@nestjs/common';
import { ContactGroupService } from './contact-group.service';
import { ContactGroupController } from './contact-group.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ContactGroupController],
  providers: [ContactGroupService],
})
export class ContactGroupModule { }
