import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { getToken } from "./api/token"
import { getBusiness } from "./api/business"
import { getDocuments } from "./api/documents"

export default async function Home() {
  const tokenResponse = await getToken()
  const business: Business = await getBusiness(tokenResponse.token)
  const documentsResponse = await getDocuments(tokenResponse.token)

  const documents = documentsResponse.items

  const totalInvoices = documents
    ?.filter((doc: Document) => doc.type === 305)
    .reduce((sum: number, doc: Document) => sum + doc.amount, 0)

  const totalOrders = documents
    ?.filter((doc: Document) => doc.type === 100)
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
            }).format(totalOrders!)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 flex flex-col items-center justify-center">
              {documents
                ?.filter((doc: Document) => doc.type === 100)
                .sort((a: Document, b: Document) =>
                  a.client.name.localeCompare(b.client.name)
                )
                .map((doc: Document) => (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div
                          key={doc.id}
                          className="flex flex-col w-full flex-1 items-start p-6 mb-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:cursor-pointer"
                        >
                          <div>
                            <span className="font-bold">{doc.client.name}</span>{" "}
                            ({doc.number})
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
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div>
                              <span className="font-bold">
                                {doc.client.name}
                              </span>{" "}
                              ({doc.number})
                            </div>
                          </DialogTitle>
                          <DialogDescription className="text-right">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-right">
                                    כמות
                                  </TableHead>
                                  <TableHead className="text-right">
                                    פירוט
                                  </TableHead>
                                  <TableHead className="text-right">
                                    מחיר ליח׳
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              {doc.income.map((incomeItem) => (
                                <TableBody key={incomeItem.itemId}>
                                  <TableRow>
                                    <TableCell className="text-right">
                                      {incomeItem.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {incomeItem.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {incomeItem.price}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))}
                            </Table>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="invoices">
          <AccordionTrigger className="p-4 text-lg font-bold underline">
            חשבוניות פתוחות - סה״כ{" "}
            {new Intl.NumberFormat("he-IL", {
              style: "currency",
              currency: "ILS",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(totalInvoices!)}
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 flex flex-col items-center justify-center">
              {documents
                ?.filter((doc: Document) => doc.type === 305)
                .sort((a: Document, b: Document) =>
                  a.client.name.localeCompare(b.client.name)
                )
                .map((doc: Document) => (
                  <>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div
                          key={doc.id}
                          className="flex flex-col w-full flex-1 items-start p-6 mb-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 hover:cursor-pointer"
                        >
                          <div>
                            <span className="font-bold">{doc.client.name}</span>{" "}
                            ({doc.number})
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
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            <div>
                              <span className="font-bold">
                                {doc.client.name}
                              </span>{" "}
                              ({doc.number})
                            </div>
                          </DialogTitle>
                          <DialogDescription className="text-right">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-right">
                                    כמות
                                  </TableHead>
                                  <TableHead className="text-right">
                                    פירוט
                                  </TableHead>
                                  <TableHead className="text-right">
                                    מחיר ליח׳
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              {doc.income.map((incomeItem) => (
                                <TableBody key={incomeItem.itemId}>
                                  <TableRow>
                                    <TableCell className="text-right">
                                      {incomeItem.quantity}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {incomeItem.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      {incomeItem.price}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              ))}
                            </Table>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </>
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
        }).format(totalOrders! + totalInvoices!)}
      </div>
    </main>
  )
}
