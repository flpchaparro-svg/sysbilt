'use client';

/**
 * Next.js App Router — place this file at `app/reports/[token]/page.tsx` (or `src/app/...`) in your Next project.
 * This repo excludes `src/app` from TypeScript so Vite does not require the `next` package; copy this file when using Next.
 *
 * Depends on `@/components/reports/DeepAuditReportDashboard` (same source as the Vite site).
 */

import { useParams } from 'next/navigation';
import DeepAuditReportDashboard from '@/components/reports/DeepAuditReportDashboard';

export default function DeepAuditReportTokenPage() {
  const params = useParams();
  const raw = params?.token;
  const token = typeof raw === 'string' ? raw : Array.isArray(raw) ? raw[0] ?? '' : '';

  return <DeepAuditReportDashboard token={token} />;
}
