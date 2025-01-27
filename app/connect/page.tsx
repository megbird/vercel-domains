"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Nav } from "@/components/nav"
import { SiteFooter } from "@/components/site-footer"

export default function ConnectPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"input" | "configure" | "complete">("input")
  const [domain, setDomain] = React.useState("")
  const [project, setProject] = React.useState("")
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
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.push(`/domains/${encodeURIComponent(domain)}`)
    } catch (error) {
      console.error("Navigation error:", error)
      setIsNavigating(false)
    }
  }, [domain, router, isNavigating])

  const handleCancel = () => {
    router.push("/domains")
  }

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
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Nav />
      <main className="flex-1 px-[120px] py-6">
        <Card className="w-full max-w-md mx-auto bg-[#ffffff] shadow-[0_2px_4px_rgba(0,0,0,0.02)] rounded-xl border-[#eaeaea]">
          {step === "input" && (
            <>
              <CardHeader>
                <CardTitle className="text-[28px] font-medium">Add your site to Vercel</CardTitle>
                {/* Removed duplicate title */}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#f2f2f2] rounded-lg p-4 mb-6 flex gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm9-4a1 1 0 011 1v3a1 1 0 11-2 0V7a1 1 0 011-1zm0 6a1 1 0 100 2h.01a1 1 0 100-2H10z"
                      fill="currentColor"
                    />
                  </svg>
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
                    <label htmlFor="project" className="text-sm font-medium">
                      Project
                    </label>
                    <Input
                      id="project"
                      placeholder="Search projects..."
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleCancel}>
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
      </main>
      <SiteFooter />
    </div>
  )
}

type Step = {
  id: string
  title: string
  status: "pending" | "loading" | "complete"
  children?: Step[]
}

