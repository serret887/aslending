import { createClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect(`/${locale}/auth/login`)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {children}
    </div>
  )
} 