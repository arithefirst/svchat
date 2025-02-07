import { z } from 'zod';

export const newChannelSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required'),
});

export type NewChannelSchema = typeof newChannelSchema;
