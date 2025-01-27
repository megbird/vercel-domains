import Link from "next/link"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="flex flex-col">
        <div className="flex h-16 items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8">▲</div>
            <Link href="#" className="flex items-center gap-2">
              <span className="font-medium">Vercel</span>
              <span className="text-xs bg-[#eaeaea] px-2 py-0.5 rounded-full">Enterprise</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            {["Feedback", "Changelog", "Help", "Docs"].map((item) => (
              <Link key={item} href="#" className="text-sm text-[#666666]">
                {item}
              </Link>
            ))}
            <Bell className="size-5 text-[#666666]" />
            <Avatar className="size-8">
              <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Domains_2025-RHDEbpi0gbWNL03wzQpHnIVbvuR2wB.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <nav className="px-4 pb-0">
          <ul className="flex gap-4">
            {[
              "Overview",
              "Integrations",
              "Activity",
              "Domains",
              "Usage",
              "Monitoring",
              "Storage",
              "Support",
              "Settings",
            ].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className={`text-sm ${
                    item === "Domains" ? "text-[#171717] border-b-2 border-[#171717] pb-[19px]" : "text-[#666666]"
                  }`}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

