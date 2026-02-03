import { z } from 'zod'

// Auth validations
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

// Profile validations
export const profileSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phoneNumber: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
})

// Trip validations
export const tripSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    cityId: z.string().uuid('Please select a city'),
    startDate: z.date({
        required_error: 'Start date is required',
    }),
    endDate: z.date({
        required_error: 'End date is required',
    }),
    totalBudget: z.number().min(0, 'Budget must be positive').optional(),
}).refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
})

// Trip section validations
export const tripSectionSchema = z.object({
    title: z.string().min(2, 'Title must be at least 2 characters'),
    startDate: z.date({
        required_error: 'Start date is required',
    }),
    endDate: z.date({
        required_error: 'End date is required',
    }),
    budget: z.number().min(0, 'Budget must be positive').optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
export type TripFormData = z.infer<typeof tripSchema>
export type TripSectionFormData = z.infer<typeof tripSectionSchema>
