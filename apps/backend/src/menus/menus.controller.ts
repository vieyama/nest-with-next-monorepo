import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MenuService } from './menus.service';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    // Get all menus (hierarchical)
    @Get()
    async getMenus() {
        return this.menuService.getMenus();
    }

    // Get all menus with parent id null (parent menu)
    @Get('parent')
    async getParentMenu() {
        return this.menuService.getParentMenu();
    }

    // Get a single menu by ID
    @Get(':id')
    async getMenuById(@Param('id') id: string) {
        return this.menuService.getMenuById(id);
    }

    // Create a new menu
    @Post()
    async createMenu(@Body() body: { name: string; parentId?: string }) {
        console.log(body);
        
        return this.menuService.createMenu(body.name, body.parentId);
    }

    // Update a menu
    @Put(':id')
    async updateMenu(@Param('id') id: string, @Body() body: { name: string }) {
        return this.menuService.updateMenu(id, body.name);
    }

    // Delete a menu
    @Delete(':id')
    async deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(id);
    }
}
