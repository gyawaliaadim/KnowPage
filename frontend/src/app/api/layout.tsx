import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Invalid API Route Access',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  )
}