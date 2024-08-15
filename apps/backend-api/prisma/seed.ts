import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const devAdmin = await prisma.user.upsert({
        where: { email: 'dev@admin.com' },
        update: {
            name: 'Admin',
            email: 'dev@admin.com',
            password: '$2b$10$XKTbnqXo4tH5ZhMvZNGQY.w6fS/.gXP63.8sFj6A/NmzkqxpbHLVu',
            role: Role.ADMIN,
            emailVerfiedAt: new Date()
        },
        create: {
            name: 'Admin',
            email: 'dev@admin.com',
            password: '$2b$10$XKTbnqXo4tH5ZhMvZNGQY.w6fS/.gXP63.8sFj6A/NmzkqxpbHLVu',
            role: Role.ADMIN,
            emailVerfiedAt: new Date()
        },
    });

    console.log(`seed default admin: ${JSON.stringify(devAdmin)}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });