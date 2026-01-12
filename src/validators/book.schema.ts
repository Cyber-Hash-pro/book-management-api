import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publishedYear: z.number().lte(new Date().getFullYear(), "Year cannot be in the future")
});
