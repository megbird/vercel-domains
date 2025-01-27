import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DomainsHeaderProps {
  onConnectDomain: () => void
}

export function DomainsHeader({ onConnectDomain }: DomainsHeaderProps) {
  return (
    <div className="flex items-center justify-between px-[120px] py-4 pt-6">
      <h1 className="text-2xl font-medium">Domains</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="bg-[#171717] text-[#ffffff] hover:bg-[#171717]/90">
            Add Domain
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[280px]">
          <DropdownMenuItem onClick={onConnectDomain} className="py-3">
            <div className="flex flex-col">
              <span className="font-medium">Connect existing domain</span>
              <span className="text-sm text-muted-foreground">
                Point your existing domain to Vercel while keeping your current registrar
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <div className="flex flex-col">
              <span className="font-medium">Buy domain</span>
              <span className="text-sm text-muted-foreground">Purchase a domain through Vercel's registrar</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="py-3">
            <div className="flex flex-col">
              <span className="font-medium">Transfer domain</span>
              <span className="text-sm text-muted-foreground">Move an existing domain from another registrar</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

