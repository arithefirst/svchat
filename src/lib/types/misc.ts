import { z } from 'zod';

export const newChannelSchema = z.object({
  channelName: z.string().min(1, 'Channel name is required').max(24, 'Channel name cannot be longer than 24 characters.'),
});

export type NewChannelSchema = typeof newChannelSchema;
