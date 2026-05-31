import { z } from "zod";

const bungieConfigSchema = z.object({
  apiKey: z.string().min(1),
  clientId: z.string().min(1),
  clientSecret: z.string().min(1),
  redirectUri: z.string().url(),
});

export type BungieConfig = z.infer<typeof bungieConfigSchema>;

export function getBungieConfig(): BungieConfig {
  return bungieConfigSchema.parse({
    apiKey: process.env.BUNGIE_API_KEY,
    clientId: process.env.BUNGIE_CLIENT_ID,
    clientSecret: process.env.BUNGIE_CLIENT_SECRET,
    redirectUri: process.env.OAUTH_REDIRECT_URI,
  });
}

export function getOptionalBungieConfig(): BungieConfig | null {
  const parsed = bungieConfigSchema.safeParse({
    apiKey: process.env.BUNGIE_API_KEY,
    clientId: process.env.BUNGIE_CLIENT_ID,
    clientSecret: process.env.BUNGIE_CLIENT_SECRET,
    redirectUri: process.env.OAUTH_REDIRECT_URI,
  });

  return parsed.success ? parsed.data : null;
}
