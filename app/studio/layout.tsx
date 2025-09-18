import { AuthGuard } from '@/components/AuthGuard'
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[var(--bg)]">
        {children}
      </div>
    </AuthGuard>
  )
}
