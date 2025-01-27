import { Nav } from "./components/nav"
import { DomainsHeader } from "./components/domains-header"
import { DomainsTable } from "./components/domains-table"
import { SiteFooter } from "./components/site-footer"

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <main className="flex-1">
        <DomainsHeader />
        <DomainsTable />
      </main>
      <SiteFooter />
    </div>
  )
}

