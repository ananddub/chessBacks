import { PrismaClient } from '@prisma/client';
import { Status } from 'constant/status';

console.log(Object.values(Status));
const db = new PrismaClient();

(async () => {
    try {
        await db.$connect();
        await db.user.create({
            data: {
                name: 'test',
                email: 'test@test',
                password: 'test',
            },
        });
    } finally {
        await db.$disconnect();
    }
})();
