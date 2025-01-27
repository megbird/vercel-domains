import Link from "next/link"
import { Command } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="#" className="flex items-center gap-2">
            ▲<span className="text-sm">© 2024</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="size-2 bg-green-500 rounded-full" />
            <Link href="#" className="text-sm text-[#2684ff]">
              All systems normal
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            Command Menu
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <Command className="size-3" />K
            </kbd>
          </div>
        </div>
      </div>
    </footer>
  )
}

