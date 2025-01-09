import type { PageLoad } from './$types';
export const load: PageLoad = async ({ data }) => {
  return {
    messages: data.serverMessages,
  };
};
