import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createInvoice } from "@/modules/appointments/services/invoiceService"
import useAuthStore from "@/shared/stores/authStore"
import { validateWithZod } from "@/shared/tools/validation"
import { z } from "zod"
import { Document, Page, Text, View, StyleSheet, Font, PDFDownloadLink } from '@react-pdf/renderer'
import { RepairDetails } from '@/shared/types';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 'light' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 'normal' },
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        backgroundColor: '#ffffff',
        fontFamily: 'Roboto',
    },
    header: {
        marginBottom: 20,
        borderBottom: '1pt solid #cccccc',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        width: '30%',
        color: '#666666',
    },
    value: {
        width: '70%',
        color: '#333333',
    },
    table: {
        display: 'flex',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#cccccc',
        marginTop: 10,
        marginBottom: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        borderBottomStyle: 'solid',
    },
    tableHeaderRow: {
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        borderBottomStyle: 'solid',
        flexDirection: 'row',
        padding: 8,
    },
    tableNameCol: {
        width: '70%',
        fontWeight: 'bold',
        padding: 8,
    },
    tablePriceCol: {
        width: '30%',
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 8, 
    },
    tableCell: {
        padding: 8,
    },
    tableNameCell: {
        width: '70%',
    },
    tablePriceCell: {
        width: '30%',
        textAlign: 'right',
    },
    summaryRow: {
        flexDirection: 'row',
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        borderTopStyle: 'solid',
        paddingTop: 8,
    },
    summaryLabel: {
        width: '70%',
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 8,
    },
    summaryValue: {
        width: '30%',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#888888',
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        borderTopStyle: 'solid',
        paddingTop: 10,
        fontSize: 10,
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

const InvoiceSchema = z.object({
    repairId: z.string(),
    customerAddress: z.string().min(5, "Adres klienta jest wymagany"),
    nip: z.string().optional(),
})

interface InvoiceDialogProps {
    repairId: string;
}

export function InvoiceDialog({ repairId }: InvoiceDialogProps) {
    const [open, setOpen] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const { token, isAuthenticated } = useAuthStore.getState()
    
    const [invoice, setInvoice] = useState({
        repairId,
        customerAddress: "",
        nip: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoice((prev) => ({ ...prev, [name]: value }));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    const formatPrice = (price: number) => {
        return price.toFixed(2) + ' PLN';
    };

    const InvoiceDocument = ({ invoice }: { invoice: Invoice }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>Faktura VAT</Text>
                    <Text>Nr: {invoice.id}</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dane faktury</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Data rozpoczęcia:</Text>
                        <Text style={styles.value}>{formatDate(invoice.startedAt)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Data zakończenia:</Text>
                        <Text style={styles.value}>{formatDate(invoice.finishedAt)}</Text>
                    </View>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Dane klienta</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Klient:</Text>
                        <Text style={styles.value}>{invoice.customerName}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Telefon:</Text>
                        <Text style={styles.value}>{invoice.customerPhoneNumber}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={styles.value}>{invoice.customerEmail}</Text>
                    </View>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Szczegóły naprawy</Text>
                    
                    <View style={styles.table}>
                        <View style={styles.tableHeaderRow}>
                            <Text style={styles.tableNameCol}>Nazwa</Text>
                            <Text style={styles.tablePriceCol}>Cena</Text>
                        </View>
                        
                        {invoice.repairDetails.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, styles.tableNameCell]}>{item.name}</Text>
                                <Text style={[styles.tableCell, styles.tablePriceCell]}>{formatPrice(item.price)}</Text>
                            </View>
                        ))}
                    </View>
                    
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Suma:</Text>
                        <Text style={styles.summaryValue}>{formatPrice(invoice.price)}</Text>
                    </View>
                </View>
                
                {invoice.description && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Opis</Text>
                        <Text>{invoice.description}</Text>
                    </View>
                )}
                
                <Text style={styles.footer}>
                    Dziękujemy za skorzystanie z naszych usług.
                </Text>
            </Page>
        </Document>
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!token || !isAuthenticated) {
            setErrors({ form: "Nie jesteś zalogowany" });
            return;
        }

        const { isValid, errors: validationErrors } = validateWithZod(InvoiceSchema, invoice);

        if (!isValid) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await createInvoice(token, invoice);
            setGeneratedInvoice(response.data);
            setErrors({});
        } catch (error) {
            console.error("Failed to create invoice:", error);
            setErrors({ form: "Failed to create invoice" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    Generuj fakturę
                </Button>
            </DialogTrigger>
            <DialogContent className="text-white bg-zinc-950">
                <DialogHeader>
                    <DialogTitle>Wygeneruj fakturę</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <label htmlFor="customerAddress">Adres klienta</label>
                            <Input
                                id="customerAddress"
                                name="customerAddress"
                                value={invoice.customerAddress}
                                onChange={handleInputChange}
                                placeholder="Adres Klienta"
                            />
                            {errors.customerAddress && (
                                <p className="text-red-500 text-sm">{errors.customerAddress}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="nip">NIP</label>
                            <Input
                                id="nip"
                                name="nip"
                                value={invoice.nip}
                                onChange={handleInputChange}
                                placeholder="NIP"
                            />
                            {errors.nip && (
                                <p className="text-red-500 text-sm">{errors.nip}</p>
                            )}
                        </div>
                        
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Generuje..." : "Wygeneruj fakturę"}
                        </Button>

                        {errors.form && <div className="text-red-600">{errors.form}</div>}
                        
                        {generatedInvoice && (
                            <div className="mt-4">
                                <PDFDownloadLink
                                    document={<InvoiceDocument invoice={generatedInvoice} />}
                                    fileName={`invoice-${generatedInvoice.id}.pdf`}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {({ loading }) => (loading ? 'Przygotowanie dokumentu...' : 'Pobierz')}
                                </PDFDownloadLink>
                            </div>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}