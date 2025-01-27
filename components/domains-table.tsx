"use client"

import { Search, Check, X, AlertTriangle, Clock, RotateCcw, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const domains = [
  {
    name: "vercel.dev",
    status: "no-verification",
    expiration: "Redeemable until Dec. 11",
    updatedAgo: "2y ago",
  },
  {
    name: "triangle.company",
    status: "no-verification",
    expiration: "Expiring Sept 12, 2024",
    updatedAgo: "2y ago",
  },
  {
    name: "vercelforever.net",
    status: "verified",
    expiration: "Auto-renew",
    updatedAgo: "56d ago",
  },
  {
    name: "youwish.dream",
    status: "verified",
    expiration: "Auto-renew",
    updatedAgo: "56d ago",
  },
  {
    name: "triangle.life",
    status: "unverified",
    expiration: "Auto-renew",
    updatedAgo: "56d ago",
  },
  {
    name: "megstudio.com",
    status: "pending",
    expiration: "Auto-renew",
    updatedAgo: "56d ago",
  },
  {
    name: "megbird.co",
    status: "verified",
    expiration: "Auto-renew",
    updatedAgo: "56d ago",
  },
  {
    name: "i-registered-this-domain-in-2006.company",
    status: "no-verification",
    expiration: "Expired Sept 12, 2024",
    updatedAgo: "6y ago",
  },
]

export function DomainsTable() {
  return (
    <div className="px-[120px] py-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#666666]" />
          <Input
            placeholder="Search domains..."
            className="pl-9 h-9 text-sm bg-transparent border-[#eaeaea] placeholder:text-[#666666]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 px-3 text-sm font-normal bg-transparent border-[#eaeaea] text-[#666666]"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 6H12V10H4V6Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
              All Projects
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Projects</DropdownMenuItem>
            <DropdownMenuItem>Personal Projects</DropdownMenuItem>
            <DropdownMenuItem>Team Projects</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-9 px-3 text-sm font-normal bg-transparent border-[#eaeaea] text-[#666666]"
            >
              Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>All Statuses</DropdownMenuItem>
            <DropdownMenuItem>Verified</DropdownMenuItem>
            <DropdownMenuItem>Unverified</DropdownMenuItem>
            <DropdownMenuItem>No Verification</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg border border-[#eaeaea] bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-[#eaeaea]">
              <TableHead className="text-xs font-medium text-[#666666]">Domain</TableHead>
              <TableHead className="text-xs font-medium text-[#666666]">Status</TableHead>
              <TableHead className="text-xs font-medium text-[#666666]">Expiration</TableHead>
              <TableHead className="text-xs font-medium text-[#666666] text-right">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {domains.map((domain) => (
              <TableRow key={domain.name} className="hover:bg-transparent border-[#eaeaea]">
                <TableCell className="py-3 font-medium text-sm text-[#171717]">{domain.name}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2 text-sm text-[#171717]">
                    {domain.status === "verified" && (
                      <>
                        <Check className="text-[#27c75e] size-4" />
                        <span>Verified</span>
                      </>
                    )}
                    {domain.status === "no-verification" && (
                      <>
                        <X className="text-[#f44336] size-4" />
                        <span>No verification</span>
                      </>
                    )}
                    {domain.status === "unverified" && (
                      <>
                        <AlertTriangle className="text-[#f5a623] size-4" />
                        <span>Unverified</span>
                      </>
                    )}
                    {domain.status === "pending" && (
                      <>
                        <Clock className="text-[#f5a623] size-4" />
                        <span>Verification Pending</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2 text-sm text-[#171717]">
                    {domain.expiration === "Auto-renew" && <RotateCcw className="size-4 text-[#666666]" />}
                    <span>{domain.expiration}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-right text-sm text-[#666666]">{domain.updatedAgo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

