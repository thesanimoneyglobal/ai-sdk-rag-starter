import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function TechnicalDetailsCard() {
  const technicalDetails = [
    {
      title: "Embedding Model",
      description: "text-embedding-ada-002",
    },
    {
      title: "Vector Database",
      description: "PostgreSQL",
    },
    {
      title: "Frontend & Backend",
      description: "Next.js + Shadcn",
    },
    {
      title: "Hosting",
      description: "Vercel",
    },
    {
      title: "LLM",
      description: "GPT-4o",
    },
    {
      title: "ORM",
      description: "Drizzle",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Technical Details</CardTitle>
        <CardDescription>Overview of the technologies used in the project.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-center">
          <div>
            {technicalDetails.slice(0, 2).map((detail, index) => (
                <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                </div>
            ))}
          </div>
          <div>
            {technicalDetails.slice(2, 4).map((detail, index) => (
                <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                </div>
            ))}
          </div>
          <div>
            {technicalDetails.slice(4).map((detail, index) => (
                <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500"/>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                </div>
            ))}
          </div>
      </CardContent>
    </Card>
  )
}
