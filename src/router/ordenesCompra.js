//Tempalte de la vista
import Full from 'Container/Full'

const ordenesCompra = () => import('Views/ordenesCompra/index');

export default {
    path: '/ordenesCompra',
    component: Full,
    redirect: '/ordenesCompra',
    children: [
        {
            component: ordenesCompra,
            path: '/ordenesCompra',
            meta: {
                requiresAuth: false,
                title: 'Ordenes de Compra',
                breadcrumb: [
                    {
                        breadcrumbInactive: 'Ordenes de Compra /',
                    },
                    {
                        breadcrumbActive: 'inicio',

                    }
                ]
            }
        },

    ]
}
