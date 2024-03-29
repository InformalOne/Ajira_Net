import { use } from 'react';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

import isUserSuperAdmin from '~/app/admin/utils/is-user-super-admin';
import AdminSidebar from '~/app/admin/components/AdminSidebar';
import AdminProviders from '~/app/admin/components/AdminProviders';

export const dynamic = 'force-dynamic';

function AdminLayout({ children }: React.PropsWithChildren) {
  const isAdmin = use(isUserSuperAdmin());

  if (!isAdmin) {
    redirect('/');
  }

  const csrfToken = headers().get('X-CSRF-Token');
  const collapsed = cookies().get('sidebarCollapsed')?.value === 'true';

  return (
    <AdminProviders csrfToken={csrfToken} collapsed={collapsed}>
      <div className={'flex'}>
        <AdminSidebar />

        {children}
      </div>
    </AdminProviders>
  );
}

export default AdminLayout;
