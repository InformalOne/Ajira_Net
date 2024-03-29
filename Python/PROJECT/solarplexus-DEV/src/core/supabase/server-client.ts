import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import invariant from 'tiny-invariant';
import type { Database } from '~/database.types';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

/**
 * @name getSupabaseServerClient
 * @description Get a Supabase client for use in the Server Routes
 * @param params
 */
function getSupabaseServerClient(
  params = {
    admin: false,
  }
) {
  const env = process.env;

  invariant(env.NEXT_PUBLIC_SUPABASE_URL, `Supabase URL not provided`);

  invariant(
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    `Supabase Anon Key not provided`
  );

  if (params.admin) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    invariant(serviceRoleKey, `Supabase Service Role Key not provided`);

    return createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }

  return createServerSupabaseClient();
}

export default getSupabaseServerClient;
