import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@prisma/client';
import { buildMenuInclude } from 'utils/buildMenuInclude';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) { }

    // Fetch all menus with nested children
    async getMenus(): Promise<Menu[]> {
        return this.prisma.menu.findMany({
            where: { parentId: null }, // Get root menus
            include: buildMenuInclude(10), // Define how deep you want to fetch children
        });
    }

    // Fetch all menus with null parentId
    async getParentMenu(): Promise<Menu[]> {
        return this.prisma.menu.findMany({
            where: { parentId: null }, // Get root menus
        });
    }

    // Find a menu by ID
    async getMenuById(id: string): Promise<Menu | null> {
        return this.prisma.menu.findUnique({
            where: { id },
            include: buildMenuInclude(10), // Define how deep you want to fetch children
        });
    }

    // Create a new menu item
    async createMenu(name: string, parentId?: string): Promise<Menu> {
        return this.prisma.menu.create({
            data: {
                name,
                parentId: parentId || null,
            },
        });
    }

    // Update an existing menu item
    async updateMenu(id: string, name: string): Promise<Menu> {
        return this.prisma.menu.update({
            where: { id },
            data: { name },
        });
    }

    // Delete a menu item
    async deleteMenu(id: string): Promise<Menu> {
        return this.prisma.menu.delete({
            where: { id },
        });
    }
}