import { z } from 'zod';
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email().nonempty(),
        password: z.string().min(4),
    }),
});

export const registerSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).min(3),
        email: z.string({ required_error: 'Email is required' }).email(),
        password: z.string({ required_error: 'Password is required' }).min(4),
        image: z.string().optional(),
    }),
});

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().min(3).optional(),
        email: z.string().email().optional(),
        password: z.string().min(4).optional(),
        image: z.string().optional(),
    }),
    params: z.object({
        id: z.string().nonempty(),
    }),
});

export const getUserSchema = z.object({
    params: z.object({
        id: z.string().nonempty(),
    }),
});

export const deleteUserSchema = z.object({
    params: z.object({
        id: z.string().nonempty(),
    }),
});

export const setSocketIdSchema = z.object({
    body: z.object({
        id: z.string().nonempty(),
        socketId: z.string().nonempty(),
    }),
});

export const whoSchema = z.object({
    params: z.object({
        id: z.string().nonempty(),
    }),
});
