import { getCurrentUser } from '@/lib/session';
import { UserRole } from '@prisma/client';
import React from 'react';

const Layout =async ({ children }: { children: React.ReactNode }) => {
    const user = await getCurrentUser();
    if(user?.role !== UserRole.ADMIN && user?.role !== UserRole.EDITOR) {
        return <div>You are not authorized to access this page</div>;
    }
  return (
    <div>
        {children}
    </div>
  );
};

export default Layout;
