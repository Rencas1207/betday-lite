'use client';

import dynamic from 'next/dynamic';

const ModalLogin = dynamic(() => import('../components/ModalLogin'), {
  ssr: false
});

export default function PublicLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ModalLogin />
    </>
  );
}
