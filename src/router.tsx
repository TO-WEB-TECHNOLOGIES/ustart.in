'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname, useRouter as useNextRouter } from 'next/navigation';

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const useRouter = () => {
  const pathname = usePathname();
  const router = useNextRouter();

  const navigate = (to: string) => {
    router.push(to);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  return {
    pathname: pathname || '/',
    navigate,
  };
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
}

export const Link: React.FC<LinkProps> = ({ to, href, children, ...props }) => {
  const target = to || href || '/';
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
};
