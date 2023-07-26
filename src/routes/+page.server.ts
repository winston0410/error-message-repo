import { superValidate } from 'sveltekit-superforms/server';
import { schema } from './schema'

export const load = (async () => {
  const form = await superValidate(schema);

  return { form };
});