"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// Sample projects data
const projects = [
  {
    value: "next-commerce",
    label: "Next.js Commerce",
  },
  {
    value: "blog",
    label: "Personal Blog",
  },
  {
    value: "portfolio",
    label: "Portfolio Website",
  },
  {
    value: "dashboard",
    label: "Analytics Dashboard",
  },
  {
    value: "docs",
    label: "Documentation Site",
  },
]

interface ConnectDomainProps {
  onClose: () => void
}

type Step = {
  id: string
  title: string
  status: "pending" | "loading" | "complete"
  children?: Step[]
}

export function ConnectDomain({ onClose }: ConnectDomainProps) {
  const router = useRouter()
  const [step, setStep] = React.useState<"input" | "configure" | "complete">("input")
  const [domain, setDomain] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [isNavigating, setIsNavigating] = React.useState(false)

  const [steps, setSteps] = React.useState<Step[]>([
    {
      id: "proxy",
      title: "Checking for proxies",
      status: "pending",
    },
    {
      id: "dns",
      title: "Analyzing DNS configuration",
      status: "pending",
      children: [
        { id: "lookup", title: "Looking up DNS records", status: "pending" },
        { id: "validate", title: "Validating current configuration", status: "pending" },
        { id: "prepare", title: "Preparing configuration changes", status: "pending" },
      ],
    },
    {
      id: "settings",
      title: "Configuring DNS settings",
      status: "pending",
      children: [
        { id: "records", title: "Updating DNS records", status: "pending" },
        { id: "backup", title: "Creating configuration backup", status: "pending" },
      ],
    },
    {
      id: "verify",
      title: "Verifying changes",
      status: "pending",
    },
  ])

  const simulateConfiguration = React.useCallback(() => {
    setStep("configure")

    const updateSteps = (stepId: string, status: "loading" | "complete") => {
      setSteps((prevSteps) =>
        prevSteps.map((step) =>
          step.id === stepId
            ? {
                ...step,
                status,
                children: step.children?.map((child) => ({ ...child, status })),
              }
            : step,
        ),
      )
    }

    updateSteps("proxy", "loading")

    setTimeout(() => {
      updateSteps("proxy", "complete")
      updateSteps("dns", "loading")

      setTimeout(() => {
        updateSteps("dns", "complete")
        updateSteps("settings", "loading")

        setTimeout(() => {
          updateSteps("settings", "complete")
          updateSteps("verify", "loading")

          setTimeout(() => {
            updateSteps("verify", "complete")
            setStep("complete")
          }, 1000)
        }, 2000)
      }, 2000)
    }, 1500)
  }, [])

  const handleComplete = React.useCallback(async () => {
    if (!domain || isNavigating) return

    try {
      setIsNavigating(true)
      console.log("Completing domain setup:", domain)
      onClose()
      await new Promise((resolve) => setTimeout(resolve, 100)) // Small delay to ensure modal closes
      router.push(`/domains/${encodeURIComponent(domain)}`)
    } catch (error) {
      console.error("Navigation error:", error)
      setIsNavigating(false)
    }
  }, [domain, onClose, router, isNavigating])

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const renderStep = (step: Step, index: number) => {
    const isComplete = step.status === "complete"
    const isLoading = step.status === "loading"
    const showChildren = !isComplete && step.children && step.status !== "pending"

    return (
      <div
        key={step.id}
        style={{
          position: "relative",
          marginBottom: isComplete ? "-8px" : "16px",
        }}
        className={cn("transition-all duration-300 ease-in-out", index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10")}
      >
        <div
          className={cn(
            "relative bg-[#ffffff] rounded-lg p-4",
            "shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_6px_rgba(0,0,0,0.03)]",
            "before:absolute before:inset-0 before:rounded-lg before:shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
            "before:pointer-events-none",
          )}
        >
          <div className="flex items-center gap-3">
            {isComplete ? (
              <div className="size-2 rounded-full bg-[#2ecc71]" />
            ) : isLoading ? (
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            ) : (
              <div className="size-2 rounded-full bg-[#eaeaea]" />
            )}
            <span className="text-[15px] font-normal">{step.title}</span>
          </div>
          {showChildren && (
            <div className="mt-4 ml-4 pl-4 border-l border-[#eaeaea] space-y-4">
              {step.children?.map((child) => (
                <div
                  key={child.id}
                  className={cn(
                    "relative bg-[#ffffff] rounded-lg p-4",
                    "shadow-[0_2px_4px_rgba(0,0,0,0.02),0_1px_6px_rgba(0,0,0,0.03)]",
                    "before:absolute before:inset-0 before:rounded-lg before:shadow-[0_0_0_1px_rgba(0,0,0,0.05)]",
                    "before:pointer-events-none",
                  )}
                >
                  <div className="flex items-center gap-3">
                    {child.status === "complete" ? (
                      <div className="size-2 rounded-full bg-[#2ecc71]" />
                    ) : child.status === "loading" ? (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    ) : (
                      <div className="size-2 rounded-full bg-[#eaeaea]" />
                    )}
                    <span className="text-[15px] font-normal">{child.title}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <Card className="w-full max-w-md bg-[#ffffff] shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-xl border-[#eaeaea]">
          {step === "input" && (
            <>
              <CardHeader>
                <CardTitle className="text-[28px] font-medium">Add your site to Vercel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#f2f2f2] rounded-lg p-4 mb-6 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-[#171717]" />
                  <p className="text-sm text-[#171717]">
                    For optimal performance and full feature support, your domain should connect directly to Vercel
                    without any intermediary proxies or CDNs.
                  </p>
                </div>
                <p className="text-[15px] text-[#666666]">
                  Enter the domain you want to add. Optionally, you can also assign it to a Vercel project.
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="domain" className="text-sm font-medium">
                      Domain
                    </label>
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Project</label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between text-left font-normal"
                        >
                          {value ? projects.find((project) => project.value === value)?.label : "Search projects..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search projects..." />
                          <CommandList>
                            <CommandEmpty>No project found.</CommandEmpty>
                            <CommandGroup>
                              {projects.map((project) => (
                                <CommandItem
                                  key={project.value}
                                  value={project.value}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === project.value ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                  {project.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={simulateConfiguration} disabled={!domain}>
                  Continue
                </Button>
              </CardFooter>
            </>
          )}

          {(step === "configure" || step === "complete") && (
            <>
              <CardHeader>
                <CardTitle className="text-[24px] font-medium">Configure {domain}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[16px] text-[#666666] mb-8">
                  We're automatically analyzing and configuring your DNS settings.
                </p>
                <div className="relative">
                  <div className="space-y-4">
                    {steps.map(renderStep)}
                    {step === "complete" && (
                      <div className="pt-6">
                        <div className="relative bg-[#ffffff] rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-1">
                            <div className="size-2 rounded-full bg-[#2ecc71]" />
                            <span className="text-[15px] font-medium">Configuration complete</span>
                          </div>
                          <p className="text-[15px] text-[#666666] ml-5 mb-6">
                            Your DNS settings have been successfully configured.
                          </p>
                          <Button
                            className="w-full bg-[#000000] text-[#ffffff] hover:bg-[#000000]/90"
                            onClick={handleComplete}
                            disabled={isNavigating}
                          >
                            {isNavigating ? "Redirecting..." : "Done"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

