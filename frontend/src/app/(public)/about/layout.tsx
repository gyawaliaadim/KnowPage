import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'About me',
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