import { z } from "zod";
import { createQrCodeSchema } from "./qrCodeValidator";

// TODO: Implement schemas
export const createLinkSchema = z.object({
  title: z.string(),
  destination: z.string().url(),
  slug: z.string().min(1), // TODO: Add a slug validator
  generateQrCode: z.boolean().default(false),
  qrCode: createQrCodeSchema.optional(),
});

export const updateLinkSchema = z.object({
  destination: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().nullable().optional(),
});

export const listLinkSchema = z.object({
  limit: z.coerce.number().min(1).default(10),
  cursor: z.string().nullable().optional(),
});
