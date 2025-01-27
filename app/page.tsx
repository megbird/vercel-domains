"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { DomainsHeader } from "@/components/domains-header"
import { DomainsTable } from "@/components/domains-table"
import { ConnectDomain } from "@/components/connect-domain"
import { SiteFooter } from "@/components/site-footer"

export default function DomainsPage() {
  const [showConnect, setShowConnect] = useState(false)

  const handleConnectDomain = () => {
    setShowConnect(true)
  }

  const handleCloseModal = () => {
    console.log("Closing modal")
    setShowConnect(false)
  }

  // Use a div instead of a modal for the connect domain component
  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Nav />
      <main className="flex-1">
        <DomainsHeader onConnectDomain={handleConnectDomain} />
        <DomainsTable />
        {showConnect && (
          <div
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <ConnectDomain onClose={handleCloseModal} />
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

