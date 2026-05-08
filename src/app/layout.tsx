import type { Metadata } from 'next';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: 'iStudy LMS - Nền tảng học tập thông minh',
  description: 'Hệ thống quản lý học tập hiện đại dành cho sinh viên và giảng viên',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={cn("dark", "font-sans", geist.variable)}>
      <body className="min-h-screen bg-background antialiased">{children}</body>
    </html>
  );
}
