import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Convocatoria } from '../types/convocatoria';
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ConvocatoriaInfoCardProps {
    convocatoria: Convocatoria;
    addProyectoButton: boolean;
}


export default function ConvocatoriaInfoCard({ convocatoria, addProyectoButton }: ConvocatoriaInfoCardProps) {

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <Card className="flex">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-2xl font-bold">{convocatoria.nombre_convocatoria}</CardTitle>
                        <p className="text-sm text-muted-foreground">Competition ID: {convocatoria.id_convocatoria}</p>
                    </div>
                    {addProyectoButton && (
                        <Link href={`/estudiante/convocatorias/${convocatoria.id_convocatoria}`}>
                            <Button variant="default">Agregar proyecto</Button>
                        </Link>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Registration Period</h3>
                        <p className="mt-1 font-semibold">{formatDate(convocatoria.fecha_inicio_inscripcion.toString())} - {formatDate(convocatoria.fecha_cierre_inscripcion.toString())}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Qualification Deadline</h3>
                        <p className="mt-1 font-semibold">{formatDate(convocatoria.fecha_limite_calificacion.toString())}</p>
                    </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-md">
                    <h3 className="text-sm font-medium text-primary mb-2">Competition Period</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">Start Date</p>
                            <p className="font-semibold">{formatDate(convocatoria.fecha_inicio_convocatoria.toString())}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Closing Date</p>
                            <p className="font-semibold">{formatDate(convocatoria.fecha_cierre_convocatoria.toString())}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                        {convocatoria.CategoriaConvocatoria.map((categoria) => (
                            <Badge key={categoria.id_categoria} variant="secondary">
                                {categoria.nombre_categoria}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}