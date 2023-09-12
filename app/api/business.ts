export async function getBusiness(token: string) {
  const res = await fetch(
    "https://api.greeninvoice.co.il/api/v1/businesses/me",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data ${res.status} ${res.body}`)
  }

  return res.json()
}
