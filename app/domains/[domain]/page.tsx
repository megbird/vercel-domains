"use client"

import Link from "next/link"
import { ArrowLeft, Clock, MoreVertical, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Nav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"
import { useState, useEffect } from "react"

interface DomainPageProps {
  params: {
    domain: string
  }
}

export default function DomainPage({ params }: DomainPageProps) {
  const domain = decodeURIComponent(params.domain)
  const [hasProxy, setHasProxy] = useState<boolean | null>(null)

  // Simulating a check for proxy (replace with actual implementation)
  useEffect(() => {
    const checkProxy = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setHasProxy(Math.random() > 0.5) // Random result for demonstration
    }
    checkProxy()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Nav />
      <main className="flex-1">
        <div className="px-[120px] py-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/domains" className="text-[#666666] hover:text-[#171717] flex items-center">
              <ArrowLeft className="h-4 w-4" />
              <span className="ml-2">All Domains</span>
            </Link>
            <Button variant="outline" className="text-[#171717] border-[#eaeaea]">
              Edit
            </Button>
          </div>

          <h1 className="text-[32px] font-semibold mb-8">{domain}</h1>

          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-sm text-[#666666] mb-1">Status</div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#2ECC71]" />
                <span className="text-[#171717]">Verified</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#666666] mb-1">Expiration Status</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#666666]" />
                <span className="text-[#171717]">Expires Jan 25, 2026</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-[#666666] mb-1">Registrar</div>
              <div className="text-[#171717]">Third Party</div>
            </div>
            <div>
              <div className="text-sm text-[#666666] mb-1">Nameservers</div>
              <div className="text-[#171717]">Third Party</div>
            </div>
          </div>

          <div className="bg-[#fff4d5] border border-[#a35200] rounded-lg p-4 mb-8 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-[#a35200] mt-0.5" />
            <p className="text-sm text-[#171717]">
              Your domain is currently using an external proxy. Disable the proxy to use Vercel's edge network and
              improve your site's performance.
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-[#ffffff] rounded-lg border border-[#eaeaea]">
              <div className="p-6">
                <h2 className="text-[20px] font-semibold mb-4">Renew domain</h2>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#666666]">
                    When enabled, auto-renewal will automatically resubscribe to your domain.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#666666]">Disabled</span>
                    <Switch />
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-4 border-t border-[#eaeaea]">
                <Button variant="outline" size="sm" className="text-[#171717] border-[#eaeaea]">
                  Save
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-semibold">DNS records</h2>
              <Button className="bg-[#000000] text-[#ffffff] hover:bg-[#000000]/90">Add Record</Button>
            </div>
            <div className="bg-[#ffffff] rounded-lg border border-[#eaeaea] p-6">
              <p className="text-sm text-[#666666] mb-6">
                DNS records point to services your domain uses, like forwarding your domain or setting up an email
                service.
              </p>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-[#eaeaea]">
                    <TableHead className="text-xs font-medium text-[#666666]">Name</TableHead>
                    <TableHead className="text-xs font-medium text-[#666666]">Type</TableHead>
                    <TableHead className="text-xs font-medium text-[#666666]">Target</TableHead>
                    <TableHead className="text-xs font-medium text-[#666666]">TTL</TableHead>
                    <TableHead className="w-[30px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-[#eaeaea]">
                    <TableCell className="py-4 text-[#171717]">megbird.studio</TableCell>
                    <TableCell className="py-4 text-[#171717]">CNAME</TableCell>
                    <TableCell className="py-4 text-[#171717]">megbird.github.io</TableCell>
                    <TableCell className="py-4 text-[#171717]">Auto</TableCell>
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-[#666666]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-[#ca2a30]">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-4 text-[#171717]">www</TableCell>
                    <TableCell className="py-4 text-[#171717]">CNAME</TableCell>
                    <TableCell className="py-4 text-[#171717]">81.81.81.81</TableCell>
                    <TableCell className="py-4 text-[#171717]">Auto</TableCell>
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-[#666666]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-[#ca2a30]">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-semibold">Nameservers</h2>
              <Button variant="outline" className="text-[#171717] border-[#eaeaea]">
                Add Nameserver
              </Button>
            </div>
            <div className="bg-[#ffffff] rounded-lg border border-[#eaeaea] p-6">
              <p className="text-sm text-[#666666] mb-6">
                By default, Vercel will propagate Vercel Nameservers for your Vercel domains.
              </p>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-[#eaeaea]">
                    <TableHead className="text-xs font-medium text-[#666666]">Name</TableHead>
                    <TableHead className="w-[100px] text-right text-xs font-medium text-[#666666]">Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-[#eaeaea]">
                    <TableCell className="py-4 text-[#171717]">ns1.vercel-dns.com</TableCell>
                    <TableCell className="py-4 text-right text-sm text-[#666666]">2d ago</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="py-4 text-[#171717]">ns2.vercel-dns.com</TableCell>
                    <TableCell className="py-4 text-right text-sm text-[#666666]">2d ago</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-semibold">SSL Certificates</h2>
              <Button variant="outline" className="text-[#171717] border-[#eaeaea]">
                Add Certificate
              </Button>
            </div>
            <div className="bg-[#ffffff] rounded-lg border border-[#eaeaea] p-6">
              <p className="text-sm text-[#666666] mb-6">
                By default, Vercel will issue and automatically renew SSL Certificates for your domains.
              </p>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-[#eaeaea]">
                    <TableHead className="text-xs font-medium text-[#666666]">Name</TableHead>
                    <TableHead className="text-xs font-medium text-[#666666]">Expiration Status</TableHead>
                    <TableHead className="w-[100px] text-right text-xs font-medium text-[#666666]">Updated</TableHead>
                    <TableHead className="w-[30px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="py-4 font-mono text-[#171717]">cert_BLxEMFSLRwge6JZceQ1982cE</TableCell>
                    <TableCell className="py-4 text-[#171717]">Auto-renew</TableCell>
                    <TableCell className="py-4 text-right text-sm text-[#666666]">2d ago</TableCell>
                    <TableCell className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-[#666666]" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Certificate</DropdownMenuItem>
                          <DropdownMenuItem className="text-[#ca2a30]">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-semibold mb-4">Delete Domain</h2>
            <div className="bg-[#ffffff] rounded-lg border border-[#eaeaea] p-6">
              <p className="text-sm text-[#666666] mb-6">
                This domain will be permanently deleted from your account. This action cannot be undone. All DNS records
                and configurations associated with this domain will be removed.
              </p>
              <Button variant="destructive" className="bg-[#ca2a30] hover:bg-[#ca2a30]/90">
                Delete Domain
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

