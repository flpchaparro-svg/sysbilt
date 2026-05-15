import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import DeepAuditReportDashboard from '@/components/audit/DeepAuditReportDashboard';
import type { DeepAuditReportPayload } from '@/types/deepAuditReport';
import { normalizeDeepAuditReportPayload } from '@/types/deepAuditReport';

export { normalizeDeepAuditReportPayload };

export default function DeepAuditReportPage() {
  const { token } = useParams<{ token: string }>();
  const safe = token ?? '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<DeepAuditReportPayload | null>(null);

  useEffect(() => {
    if (!safe.trim()) {
      setError(true);
      setLoading(false);
      setData(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(false);
    setData(null);

    fetch(`/api/reports/get?token=${encodeURIComponent(safe)}`)
      .then(async (res) => {
        const json: unknown = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error('bad');
        const normalized = normalizeDeepAuditReportPayload(json);
        if (!normalized) throw new Error('bad');
        return normalized;
      })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [safe]);

  return (
    <>
      <Helmet>
        <title>Deep Audit Report · Sysbilt</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <DeepAuditReportDashboard loading={loading} error={error} data={data} />
    </>
  );
}
