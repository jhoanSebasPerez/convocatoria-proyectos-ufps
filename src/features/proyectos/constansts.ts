export const getStatusColor = (status: string) => {
    switch (status) {
        case 'Activo':
            return 'bg-green-500'
        case 'En progreso':
            return 'bg-blue-500'
        case 'Pendiente':
            return 'bg-yellow-500'
        default:
            return 'bg-gray-500'
    }
}