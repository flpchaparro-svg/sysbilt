import { Navigate } from 'react-router-dom'
import { BTW_HUB_PATH } from '../built-to-work/chapter-seo'

/** Legacy route — hub is now the public entry point. */
export default function BuiltToWorkPage() {
  return <Navigate to={BTW_HUB_PATH} replace />
}
