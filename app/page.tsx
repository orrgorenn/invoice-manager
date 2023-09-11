import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"

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

  const totalInvoices = documents.items
    .filter((doc: Document) => doc.type === 305)
    .reduce((sum: number, doc: Document) => sum + doc.amount, 0)

  const totalOrders = documents.items
    .filter((doc: Document) => doc.type === 100)
    .reduce((sum: number, doc: Document) => sum + doc.amount, 0)

  return (
    <main className="w-full h-full">
      <div className="p-4 text-xl">
        <span className="font-bold">{business?.name}</span> |{" "}
        <span>{business?.taxId}</span>
      </div>
      <hr />
      <Accordion type="single" collapsible>
        <AccordionItem value="orders">
          <AccordionTrigger className="p-4 text-lg font-bold underline">
            הזמנות פתוחות - סה״כ{" "}
            {new Intl.NumberFormat("he-IL", {
              style: "currency",
              currency: "ILS", // Change the currency code as needed
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(totalOrders)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 flex flex-col items-center justify-center">
              {documents.items
                .filter((doc: Document) => doc.type === 100)
                .map((doc: Document) => (
                  <div
                    key={doc.id}
                    className="flex flex-col w-full flex-1 items-start p-6 mb-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                  >
                    <div>
                      <span className="font-bold">{doc.client.name}</span> (
                      {doc.number})
                    </div>
                    <div>{doc.documentDate}</div>
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
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="invoices">
          <AccordionTrigger className="p-4 text-lg font-bold underline">
            חשבוניות פתוחות - סה״כ{" "}
            {new Intl.NumberFormat("he-IL", {
              style: "currency",
              currency: "ILS", // Change the currency code as needed
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(totalInvoices)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 flex flex-col items-center justify-center">
              {documents.items
                .filter((doc: Document) => doc.type === 305)
                .map((doc: Document) => (
                  <div
                    key={doc.id}
                    className="flex flex-col w-full flex-1 items-start p-6 mb-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                  >
                    <div>
                      <span className="font-bold">{doc.client.name}</span> (
                      {doc.number})
                    </div>
                    <div>{doc.documentDate}</div>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="p-4 text-lg font-bold">
        סה״כ{" "}
        {new Intl.NumberFormat("he-IL", {
          style: "currency",
          currency: "ILS", // Change the currency code as needed
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(totalOrders + totalInvoices)}
      </div>
    </main>
  )
}
