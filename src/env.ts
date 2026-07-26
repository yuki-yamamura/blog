import { defineEnvVars } from '@sveltejs/kit/hooks';
import { z } from 'zod';

export const variables = defineEnvVars({
	PRODUCTION_HOSTNAME: {
		public: true,
		schema: z.string().optional()
	}
});
