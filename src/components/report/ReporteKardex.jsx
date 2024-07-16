import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    }
});

export function ReporteKardex({ data }) {
    console.log(data);

    const renderTableRow = (rowData, isHeader = false) => {
        return (
            <View style={styles.tableRow} key={rowData.fecha}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{rowData.fecha}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{rowData.descripcion}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{rowData.detalle}</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{rowData.cantidad}</Text>
                </View>
            </View>
        );
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

    return (
        <Document title="Reporte de movimientos">
            <Page size="A4" orientation="landscape">
                <View style={styles.section}>
                    <Text>Movimientos de Kardex</Text>
                    <Text>Fecha y Hora de Impresión: {formattedDate}</Text>
                    <View style={styles.table}>
                        {renderTableRow({
                            fecha: "Fecha",
                            descripcion: "Producto",
                            detalle: "Movimiento",
                            cantidad: "Cantidad"
                        }, true)}
                        {data?.map(movement => renderTableRow(movement))}
                    </View>
                </View>
            </Page>
        </Document>
    );
}
