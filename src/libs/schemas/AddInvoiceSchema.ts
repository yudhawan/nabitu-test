import {z} from "zod"
export const AddInvoiceSchema = z.object({
    Name: z.string().min(1, 'Invoice name is required'),
    'Due Date': z.string().min(1, 'Due date is required'),
    Status: z.enum(['Paid', 'Unpaid', 'Pending'], { errorMap: () => ({ message: 'Invalid status' }) }),
    Number: z.string().min(1, 'Invoice number is required'),
    Amount: z.string().min(1, 'Amount is required'),
  })