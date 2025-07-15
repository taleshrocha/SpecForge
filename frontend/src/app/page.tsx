'use client'

import { useMemo } from "react"
import { useGetAllRequirements } from "./requirements/tanstack/queries/use-get-all-requirements.query"

export default function Home() {
  const { data: requirements, isLoading, error } = useGetAllRequirements()
  
  const memoizedRequirements = useMemo(() => {
    if (requirements) {
      console.log('All requirements data:', requirements)
      return requirements
    }
    return []
  }, [requirements])
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading requirements</div>
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    <div>
      <h1>Requirements Page</h1>
      <p>Total requirements: {memoizedRequirements.length}</p>
      {memoizedRequirements.length > 0 && (
        <pre>{JSON.stringify(memoizedRequirements, null, 2)}</pre>
      )}
    </div>

      </main>
    </div>
  );
}
