export async function getDocuments(token: string) {
  const body = {
    pageSize: 100,
    type: [100, 305],
    status: [0],
    fromDate: "2022-01-01",
    toDate: new Date().toISOString().substring(0, 10)
  }

  const res = await fetch(
    "https://api.greeninvoice.co.il/api/v1/documents/search",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body),
      cache: "no-store"
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data ${res.status} ${res.body}`)
  }

  return res.json()
}
