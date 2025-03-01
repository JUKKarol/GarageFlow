'use client'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { RepairDetails } from '@/shared/types';

Font.register({
    family: 'Roboto',
    src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
  });

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      fontFamily: 'Roboto',
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 10
    }
  });

  interface Invoice {
    id: string;
    startedAt: string;
    finishedAt: string;
    price: number;
    description: string;
    customerName: string;
    customerPhoneNumber: string;
    customerEmail: string;
    repairDetails: RepairDetails[];
  }

  const InvoiceDocument = (invoice: Invoice) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Faktura VAT</Text>
          <Text style={styles.subtitle}>Nr: {invoice.id}</Text>
          <Text style={styles.subtitle}>Data rozpoczecia: {invoice.startedAt}</Text>
          <Text style={styles.subtitle}>Kwota: {invoice.price}</Text>
        </View>
      </Page>
    </Document>
  );

export function GenerateInvoice({ invoice }: { invoice: Invoice }) {
    return (
        <PDFDownloadLink document={InvoiceDocument(invoice)} fileName={`faktura-${invoice.id}.pdf`}>
            {({ loading }) =>
                loading ? 'Ładowanie dokumentu...' : 'Pobierz fakturę'
            }
        </PDFDownloadLink>
    )
}