import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import getSupabaseServerClient from '~/core/supabase/server-client';
import GlobalRole from '~/core/session/types/global-role';

/**
 * @name ENFORCE_MFA
 * @description Set this constant to true if you want the SuperAdmin user to
 * sign in using MFA when accessing the Admin page
 */
const ENFORCE_MFA = false;

/**
 * @name isUserSuperAdmin
 * @description Checks if the current user is an admin by checking the
 * app_metadata.role field in Supabase Auth has a SuperAdmin role
 */
const isUserSuperAdmin = cache(
  async (
    params: {
      enforceMfa?: boolean;
    } = {
      enforceMfa: ENFORCE_MFA,
    },
  ) => {
    try {
      const client = getSupabaseServerClient();
      const { data, error } = await client.auth.getUser();

      if (error) {
        return false;
      }

      // If we enforce MFA, we need to check that the user is MFA authenticated.
      if (params.enforceMfa) {
        const isMfaAuthenticated =
          await verifyIsMultiFactorAuthenticated(client);

        if (!isMfaAuthenticated) {
          return false;
        }
      }

      const adminMetadata = data.user?.app_metadata;
      const role = adminMetadata?.role;

      return role === GlobalRole.SuperAdmin;
    } catch (e) {
      return false;
    }
  },
);

export default isUserSuperAdmin;

async function verifyIsMultiFactorAuthenticated(client: SupabaseClient) {
  const { data, error } =
    await client.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error || !data) {
    return false;
  }

  return data.currentLevel === 'aal2';
}
