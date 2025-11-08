import { ModuleCard } from "@/components/education/module-card"
import { modules } from "@/lib/education-data"

export default function EducationPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Education</h1>
        <p className="text-muted-foreground">Browse modules and start learning.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <ModuleCard key={m.id} {...m} />
        ))}
      </div>
    </div>
  )
}
