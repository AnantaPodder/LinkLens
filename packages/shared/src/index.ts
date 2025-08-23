import { z } from 'zod';

// URL Schemas
export const createUrlSchema = z.object({
  originalUrl: z.string().url('Please provide a valid URL'),
  alias: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
  password: z.string().optional(),
});

export const urlSchema = z.object({
  id: z.string(),
  originalUrl: z.string().url(),
  shortCode: z.string(),
  alias: z.string().optional(),
  expiresAt: z.date().optional(),
  password: z.string().optional(),
  isActive: z.boolean(),
  clickCount: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Analytics Schemas
export const analyticsEventSchema = z.object({
  id: z.string(),
  urlId: z.string(),
  ip: z.string(),
  userAgent: z.string(),
  referer: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  browser: z.string().optional(),
  os: z.string().optional(),
  device: z.string().optional(),
  timestamp: z.date(),
});

export const analyticsStatsSchema = z.object({
  totalClicks: z.number(),
  uniqueClicks: z.number(),
  clicksByDate: z.array(
    z.object({
      date: z.string(),
      clicks: z.number(),
    })
  ),
  topCountries: z.array(
    z.object({
      country: z.string(),
      clicks: z.number(),
    })
  ),
  topBrowsers: z.array(
    z.object({
      browser: z.string(),
      clicks: z.number(),
    })
  ),
  topReferrers: z.array(
    z.object({
      referrer: z.string(),
      clicks: z.number(),
    })
  ),
});

// Type exports
export type CreateUrlDto = z.infer<typeof createUrlSchema>;
export type Url = z.infer<typeof urlSchema>;
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type AnalyticsStats = z.infer<typeof analyticsStatsSchema>;

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
