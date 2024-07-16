import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { AccionesTabla } from "./AccionesTabla";
import Swal from "sweetalert2";
import { Paginacion } from "./Paginacion";
import { useState } from "react";
import { useProductosStore } from "../../store/ProductosStore";

export function TablaProductos({ data, setOpenRegistro, setDataSelect, setAccion }) {

    const { eliminarProductos } = useProductosStore()

    const [pagina, setPagina] = useState(1)

    const editar = (data) => {
        if (data.descripcion === 'Generica') {
            Swal.fire({
                title: "Are you sure?",
                text: "No se puede modificar este registro",
                icon: "warning",
            })

            return;
        }
        setOpenRegistro(true)
        setDataSelect(data)
        setAccion('Editar')

    }

    const eliminar = (p) => {

        if (p.descripcion === 'Generica') {
            Swal.fire({
                title: "Are you sure?",
                text: "No se puede eliminar este registro",
                icon: "warning",
            })

            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await eliminarProductos({ id: p.id })
            }
        });
    }


    const columns = [
        {
            accessorKey: 'descripcion', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Descripcion',
            cell: (info) => <td data-title='Descripcion'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'stock', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Stock',
            enableSorting: false,
            cell: (info) => <td data-title='Stock'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'precioventa', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'P. Venta',
            cell: (info) => <td data-title='P. Venta'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'preciocompra', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'P. Compra',
            cell: (info) => <td data-title='P. Compra'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'categoria', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Categoria',
            cell: (info) => <td data-title='categoria'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'marca', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Marca',
            cell: (info) => <td data-title='marca'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'acciones',
            header: 'Acciones',
            enableSorting: false,
            cell: (info) => (
                <td className="acciones-tabla" >
                    <AccionesTabla
                        funcionEditar={() => editar(info.row.original)}
                        funcionEliminar={() => eliminar(info.row.original)}>

                    </AccionesTabla>
                </td>)
        }
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.column.columnDef.header}
                                    {header.column.getCanSort() && (
                                        <span style={{ cursor: 'pointer' }} onClick={header.column.getToggleSortingHandler()}>
                                            ⬍
                                        </span>
                                    )}
                                    {
                                        {
                                            asc: " 🔼",
                                            desc: " 🔽"
                                        }[header.column.getIsSorted()]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        table.getRowModel().rows.map((item) => (
                            <tr key={item.id}>
                                {
                                    item.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            <Paginacion table={table}
                irincio={() => table.setPageIndex(0)}
                pagina={table.getState().pagination.pageIndex + 1}
                setPagina={setPagina}
                maximo={table.getPageCount()}
            ></Paginacion>
        </div>
    );

}