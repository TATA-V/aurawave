'use client';

import dynamic from 'next/dynamic';
import FadeInMotion from 'src/components/Layout/FadeInMotion';

const AdminAwplaylistEditor = dynamic(() => import('src/components/AdminAwplaylistEditor/AdminAwplaylistEditor'), {
  loading: () => <div className="w-full h-[194px]" />,
  ssr: false,
});

function AdminAdminAwplaylistEditorPage() {
  return (
    <FadeInMotion>
      <AdminAwplaylistEditor />
    </FadeInMotion>
  );
}

export default AdminAdminAwplaylistEditorPage;
