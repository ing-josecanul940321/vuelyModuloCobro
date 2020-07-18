//Tempalte de la vista
import Full from 'Container/Full'

const movimientoServicios = () => import('Views/movimientoServicios/index');

export default {
    path: '/movimientoServicios',
    component: Full,
    redirect: '/movimientoServicios',
    children: [
        {
            component: movimientoServicios,
            path: '/movimientoServicios',
            meta: {
                requiresAuth: false,
                title: 'Movimiento de Servicios',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Movimiento de Servicios /',
                    },
                    {
                        breadcrumbActive: 'inicio',

                    }
                ]
            }
        },

    ]
}
