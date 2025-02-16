import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getTranslations } from "next-intl/server"
import { Link } from '@/i18n/routing'
import { routes, getLocalizedRoute } from '@/config/routes'
import { DataTable } from "./data-table"
import type { Client } from "./columns"

// This would typically come from your database
const data: Client[] = [
  {
    id: "1",
    name: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    maxLoanAmount: 500000,
    updatedAt: "2024-02-15T12:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    phoneNumber: "+1 (555) 987-6543",
    maxLoanAmount: 750000,
    updatedAt: "2024-02-14T15:30:00Z",
  },
  // Add more sample data as needed
]

export default async function ClientsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations("Clients")

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={getLocalizedRoute(routes.dashboard, locale)}>
                    {t("people")}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("clients")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DataTable data={data} />
      </div>
    </>
  )
} 