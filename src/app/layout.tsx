import type { Metadata, Viewport } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: '単位しらべ | 身近なモノでたとえる単位換算アプリ（小学生向け）',
  description:
    '数字を入力すると、牛乳パックやペットボトル、スマホなど、子どもたちにとって「身近なモノ」でたとえて分かりやすく単位（かさ・長さ・重さ）を換算します。宿題の調べ学習や知育にぴったり！',
  keywords: [
    '単位換算',
    'デシリットル',
    'リットル',
    'センチメートル',
    'メートル',
    '小学生の学習',
    '身近なもの',
    'たとえ',
    '単位の覚え方',
  ],
  openGraph: {
    title: '単位しらべ | 身近なモノでたとえる単位換算アプリ',
    description:
      '数字を入力すると、身近なモノ（牛乳パックやスマホなど）でたとえて分かりやすく単位を換算します。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '単位しらべ | 身近なモノでたとえる単位換算アプリ',
    description:
      '数字を入力すると、身近なモノ（牛乳パックやスマホなど）でたとえて分かりやすく単位を換算します。',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJp.variable}`}>
      <head>
        {/* We can insert Google AdSense tag or script here if needed */}
      </head>
      <body>{children}</body>
    </html>
  );
}
