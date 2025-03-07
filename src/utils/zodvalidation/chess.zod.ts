import { z } from 'zod';

export const getChessGroup = z.object({
    body: z.object({
        id: z.string().nonempty(),
        groupId: z.string().nonempty(),
    }),
});

export const setChessGroup = z.object({
    body: z.object({
        id: z.string().nonempty(),
        private: z.boolean().optional().default(false),
        password: z.string().min(4).optional(),
    }),
});
