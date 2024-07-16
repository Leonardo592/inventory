import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { AccionesTabla } from "./AccionesTabla";
import Swal from "sweetalert2";
import { useKardexStore } from '../../store/KardexStore'
import { Paginacion } from "./Paginacion";
import { useState } from "react";

export function TablaKardex({ data, setOpenRegistro, setDataSelect, setAccion }) {

    const { eliminarKardex } = useKardexStore()

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

        if (p.estado === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Este registro ya fue eliminado",
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
                await eliminarKardex({ id: p.id })
            }
        });
    }


    const columns = [
        {
            accessorKey: 'descripcion', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Producto',
            cell: (info) => <td data-title='Producto'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'fecha', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Fecha',
            cell: (info) => <td data-title='Fecha'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'tipo', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Tipo',
            cell: (info) => <td data-title='Tipo'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'detalle', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Motivo',
            cell: (info) => <td data-title='Detalle'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'nombres', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Usuario',
            cell: (info) => <td data-title='Usuario'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'cantidad', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Cantidad',
            cell: (info) => <td data-title='Cantidad'>
                <span>{info.getValue()}</span>
            </td>
        },

        {
            accessorKey: 'stock', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
            header: 'Stock',
            cell: (info) => <td data-title='Stock'>
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