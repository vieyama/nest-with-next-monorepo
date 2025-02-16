import { Module } from '@nestjs/common';
import { MenuController } from './menus.controller';
import { MenuService } from './menus.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService]
})
export class MenusModule { }
