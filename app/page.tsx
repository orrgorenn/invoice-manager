interface IncomeItem {
  catalogNum: string
  description: string
  quantity: number
  price: number
  currency: string
  currencyRate: number
  vatType: number
  amount: number
  vat: number
  itemId: string
  amountTotal: number
}

interface PaymentMethod {
  name: string
  type: number
  subType: number
  price: number
  ref: number[]
  cancellable: boolean
}

interface ClientInfo {
  id: string
  name: string
  emails: string[]
  taxId: string
  self: boolean
}

interface BusinessInfo {
  type: number
  exemption: boolean
}

interface Document {
  id: string
  description: string
  type: number
  number: string
  documentDate: string
  creationDate: number
  status: number
  lang: string
  amountDueVat: number
  amountExemptVat: number
  amountExcludedVat: number
  amountLocal: number
  amountOpened: number
  vat: number
  amount: number
  currency: string
  currencyRate: number
  vatType: number
  income: IncomeItem[]
  payment: PaymentMethod[]
  client: ClientInfo
  business: BusinessInfo
  url: {
    he: string
    origin: string
  }
}

async function getToken() {
  const body = {
    id: process.env.GREEN_INVOICE_API_KEY,
    secret: process.env.GREEN_INVOICE_SECRET
  }

  const res = await fetch(
    "https://api.greeninvoice.co.il/api/v1/account/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

async function getBusiness(token: string) {
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
    throw new Error(`Failed to fetch data ${res.status}`)
  }

  return res.json()
}

async function getDocuments(token: string) {
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
      body: JSON.stringify(body)
    }
  )

  if (!res.ok) {
    throw new Error(`Failed to fetch data ${res.status}`)
  }

  return res.json()
}

export default async function Home() {
  const token = await getToken()
  const business = await getBusiness(token.token)
  const documents = await getDocuments(token.token)

  return (
    <main className="w-full h-full">
      <div className="p-4 text-xl">
        <span className="font-bold">{business?.name}</span> |{" "}
        <span>{business?.taxId}</span>
      </div>
      <div className="p-4 text-lg font-bold">חשבוניות פתוחות</div>
      <div className="p-4">
        {documents.items
          .filter((doc: Document) => doc.type === 305)
          .map((doc: Document) => (
            <div key={doc.id}>
              (מס׳ חשבונית {doc.number}){" "}
              <span className="font-bold">{doc.client.name}</span> | תאריך הפקה{" "}
              {doc.documentDate} - על סך
              {" " +
                new Intl.NumberFormat("he-IL", {
                  style: "currency",
                  currency: "ILS", // Change the currency code as needed
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(doc.amount)}
            </div>
          ))}
      </div>
    </main>
  )
}
