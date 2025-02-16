import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const systemManagement = await prisma.menu.create({
        data: {
            name: "System Management",
            children: {
                create: [
                    {
                        name: "Systems",
                        children: {
                            create: [
                                {
                                    name: "System Code",
                                    children: { create: [{ name: "Code Registration" }] },
                                },
                                { name: "Code Registration - 2" },
                                { name: "Properties" },
                                {
                                    name: "Menus",
                                    children: { create: [{ name: "Menu Registration" }] },
                                },
                                {
                                    name: "API List",
                                    children: {
                                        create: [{ name: "API Registration" }, { name: "API Edit" }],
                                    },
                                },
                            ],
                        },
                    },
                    {
                        name: "Users & Groups",
                        children: {
                            create: [
                                {
                                    name: "Users",
                                    children: { create: [{ name: "User Account Registration" }] },
                                },
                                {
                                    name: "Groups",
                                    children: { create: [{ name: "User Group Registration" }] },
                                },
                                {
                                    name: "사용자 승인",
                                    children: { create: [{ name: "사용자 승인 상세" }] },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log("Database seeded:", systemManagement);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
