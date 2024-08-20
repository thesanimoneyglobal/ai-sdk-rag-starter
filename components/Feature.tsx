import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      title: "Input of Data through UI",
      description: "Easily input data using a user-friendly interface. Simply put data into input to add new information to the knowledge base.",
    },
    {
      title: "Natural Language Requests",
      description: "Retrieve information by making natural language requests, allowing you to interact with the knowledge base conversationally.",
    },
  ]

  return (
    <div className="flex-row flex space-x-2">
      {features.map((feature, index) => (
        <Card key={index} className="w-full md:w-[380px]">
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription className={'text-xs'}>{feature.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className={'text-sm'}>{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
