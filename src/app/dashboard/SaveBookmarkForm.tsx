const fetchSummary = async (url: string) => {
    try {
      const res = await fetch('/api/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
  
      const data = await res.json()
      return data.summary
    } catch {
      return 'Summary temporarily unavailable.'
    }
  }
  