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

interface Business {
  id: string
  logo: string
  type: number
  taxId: string
  name: string
  nameEn: string
  title: string
  titleEn: string
  category: number
  subCategory: number
  address: string
  addressEn: string
  city: string
  cityEn: string
  cityId: number
  zip: string
  phone: string
  fax: string
  mobile: string
  website: string
  email: string
  templateId: number
  skinId: number
  signature: string
  bankDisplay: boolean
  bankDisplayEn: boolean
  bankName: string
  bankBranch: string
  bankAccount: string
  bankSwift: string
  bankAba: string
  bankIban: string
  bankBeneficiary: string
  bankNameEn: string
  bankBranchEn: string
  bankAccountEn: string
  bankSwiftEn: string
  bankAbaEn: string
  bankIbanEn: string
  bankBeneficiaryEn: string
  creationDate: number
  lastUpdateDate: number
  exemption: boolean
  notifyEmail: string
  deductionDoc: string
  bookkeepingDoc: string
  accountantEmails: string[]
  accountantDocsEmailSettings: number
  accountantReportEmailSettings: number
  senderEmailSettings: string
  documentsEmailSettings: number
  incomeReportEmailSettings: number
  incomeReportFormatType: number
  emailSubjectType: string
  accountingType: string
  deductionId: number
  deductionRate: number
  advanceTaxRate: number
  advanceNationalInsuranceRate: number
  active: boolean
  accountEmail: string
  documentCount: number
  settings: {
    documentCurrency: string
    documentLang: string
    documentRounding: boolean
    documentCopyCurrencyRates: boolean
    documentVatType: number
    rowVatType: number
    mixedVatEnabled: boolean
    receiptIncomeEnabled: boolean
    unsignedEnabled: boolean
    attachmentEnabled: boolean
    depositDocumentsEnabled: boolean
    encoding: string
    showForeignAddress: boolean
    foundationDate: string
  }
  footerTextHe: string
  footerTextEn: string
}
