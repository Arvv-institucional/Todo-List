import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';

interface TareaCardProps {
    id: string;
    nombre: string;
    estado: string;
    onPressView?: () => void;
    onPressEdit?: () => void;
    onPressDelete?: () => void;
}

const STATUS_COLORS: Record<string, { text: string; background: string }> = {
    completado: { text: '#34C759', background: '#F0FBF3' },
    pendiente:  { text: '#FF9500', background: '#FFF8ED' },
    default:    { text: '#7B61FF', background: '#F3F0FF' },
};

function getStatusStyle(estado: string) {
    const lower = estado.toLowerCase();
    if (lower.includes('terminado')) return STATUS_COLORS.completado;
    if (lower.includes('pendiente')) return STATUS_COLORS.pendiente;
    return STATUS_COLORS.default;
}

const TareaCard = ({
    id,
    nombre,
    estado,
    onPressView,
    onPressEdit,
    onPressDelete,
}: TareaCardProps) => {
    const statusStyle = getStatusStyle(estado);

    const handleDelete = () => {
        if (onPressDelete) {
            onPressDelete();
            return;
        }
        Alert.alert('Eliminar tarea', `¿Deseas eliminar "${nombre}"?`, [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Eliminar',
                style: 'destructive',
                onPress: () => console.log(`Eliminando ${id}`),
            },
        ]);
    };

    return (
        <Card style={styles.card} elevation={2}>
            <Card.Content style={styles.content}>
                {/* Header: nombre + badge de estado */}
                <View style={styles.header}>
                    <Text style={styles.nombre} numberOfLines={1}>
                        {nombre}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.background }]}>
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {estado}
                        </Text>
                    </View>
                </View>

                {/* ID sutil */}
                <Text style={styles.idText}>#{id}</Text>

                {/* Divisor */}
                <View style={styles.divider} />

                {/* Botones */}
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[styles.btn, styles.btnOutlined]}
                        onPress={onPressView}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.btnOutlinedLabel}>Ver</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, styles.btnOutlined]}
                        onPress={onPressEdit}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.btnOutlinedLabel}>Editar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.btn, styles.btnDanger]}
                        onPress={handleDelete}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.btnDangerLabel}>Borrar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        // Sombra suave tipo iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    nombre: {
        flex: 1,
        fontSize: 17,
        fontWeight: '700',
        color: '#111111',
        marginRight: 10,
        letterSpacing: -0.3,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.1,
    },
    idText: {
        fontSize: 12,
        color: '#BBBBBB',
        fontWeight: '500',
        marginBottom: 16,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#EBEBEB',
        marginBottom: 14,
    },
    actions: {
        flexDirection: 'row',
        gap: 8,
    },
    btn: {
        flex: 1,
        paddingVertical: 9,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnOutlined: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FAFAFA',
    },
    btnOutlinedLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333333',
    },
    btnDanger: {
        backgroundColor: '#FEE2E2',
    },
    btnDangerLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#DC2626',
    },
});

export default TareaCard;