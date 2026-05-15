import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import DeepAuditReportDashboard from '../../components/reports/DeepAuditReportDashboard';

export default function DeepAuditReportPage() {
  const { token } = useParams<{ token: string }>();
  const safe = token ?? '';

  return (
    <>
      <Helmet>
        <title>Deep Audit Report · Sysbilt</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <DeepAuditReportDashboard token={safe} />
    </>
  );
}
