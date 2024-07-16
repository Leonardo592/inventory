import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { AccionesTabla } from "./AccionesTabla";
import Swal from "sweetalert2";
import { useMarcaStore } from '../../store/MarcaStore'
import { Paginacion } from "./Paginacion";
import { useState } from "react";
import { useCategoriasStore } from "../../store/CategoriasStore";

// export function TablaCategorias({ data, setOpenRegistro, setDataSelect, setAccion }) {

//     const { eliminarCategorias } = useCategoriasStore()

//     const [pagina, setPagina] = useState(1)

//     const editar = (data) => {
//         if (data.descripcion === 'General') {
//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "No se puede modificar este registro",
//                 icon: "warning",
//             })

//             return;
//         }
//         setOpenRegistro(true)
//         setDataSelect(data)
//         setAccion('Editar')

//     }

//     const eliminar = (p) => {

//         if (p.descripcion === 'General') {
//             Swal.fire({
//                 title: "Are you sure?",
//                 text: "No se puede eliminar este registro",
//                 icon: "warning",
//             })

//             return;
//         }

//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Si, eliminar"
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 await eliminarCategorias({ id: p.id })
//             }
//         });
//     }


//     const columns = [
//         {
//             accessorKey: 'descripcion', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
//             header: 'Descripcion',
//             cell: (info) => <td data-title='Descripcion'>
//                 <span>{info.getValue()}</span>
//             </td>
//         },

//         {
//             accessorKey: 'color', // ACCESO A LA COLUMNA DE LA BASE DE DATOS
//             header: 'Color',
//             cell: (info) => <td data-title='Color'>
//                 <span>{info.getValue()}</span>
//             </td>
//         },

//         {
//             accessorKey: 'acciones',
//             header: 'Acciones',
//             enableSorting: false,
//             cell: (info) => (
//                 <td className="acciones-tabla" >
//                     <AccionesTabla
//                         funcionEditar={() => editar(info.row.original)}
//                         funcionEliminar={() => eliminar(info.row.original)}>

//                     </AccionesTabla>
//                 </td>)
//         }
//     ];

//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getPaginationRowModel: getPaginationRowModel()
//     })

//     return (
//         <div className="overflow-x-auto">
//             <table className="table-auto w-full">
//                 <thead>
//                     {table.getHeaderGroups().map((headerGroup) => (
//                         <tr key={headerGroup.id}>
//                             {headerGroup.headers.map((header) => (
//                                 <th key={header.id} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                     {header.column.columnDef.header}
//                                     {header.column.getCanSort() && (
//                                         <span style={{ cursor: 'pointer' }} onClick={header.column.getToggleSortingHandler()}>
//                                             ⬍
//                                         </span>
//                                     )}
//                                     {
//                                         {
//                                             asc: " 🔼",
//                                             desc: " 🔽"
//                                         }[header.column.getIsSorted()]
//                                     }
//                                 </th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>

//                 <tbody className="bg-white divide-y divide-gray-200">
//                     {
//                         table.getRowModel().rows.map((item) => (
//                             <tr key={item.id}>
//                                 {
//                                     item.getVisibleCells().map((cell) => (
//                                         <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
//                                             {
//                                                 flexRender(cell.column.columnDef.cell, cell.getContext())
//                                             }
//                                         </td>
//                                     ))
//                                 }
//                             </tr>
//                         ))
//                     }
//                 </tbody>

//             </table>

//             <Paginacion table={table}
//                 irincio={() => table.setPageIndex(0)}
//                 pagina={table.getState().pagination.pageIndex + 1}
//                 setPagina={setPagina}
//                 maximo={table.getPageCount()}
//             ></Paginacion>
//         </div>
//     );

// }




export function TablaCategorias({ data, setOpenRegistro, setDataSelect, setAccion }) {
    const { eliminarCategorias, eliminarCategoriasMultiples } = useCategoriasStore();
    const [pagina, setPagina] = useState(1);
    const [selectedRows, setSelectedRows] = useState(new Set());

    const toggleRowSelection = (id) => {
        setSelectedRows((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    const editar = (data) => {
        if (data.descripcion === 'General') {
            Swal.fire({
                title: "Are you sure?",
                text: "No se puede modificar este registro",
                icon: "warning",
            });
            return;
        }
        setOpenRegistro(true);
        setDataSelect(data);
        setAccion('Editar');
    };

    const eliminar = async (id) => {
        if (id.descripcion === 'General') {
            Swal.fire({
                title: "Are you sure?",
                text: "No se puede eliminar este registro",
                icon: "warning",
            });
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
                await eliminarCategorias({ id });
            }
        });
    };

    const eliminarSeleccionados = async () => {
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
                await eliminarCategoriasMultiples(Array.from(selectedRows));
                setSelectedRows(new Set());
            }
        });
    };

    const columns = [
        {
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={selectedRows.has(row.original.id)}
                    onChange={() => toggleRowSelection(row.original.id)}
                />
            ),
        },
        {
            accessorKey: 'descripcion',
            header: 'Descripcion',
            cell: (info) => (
                <td data-title='Descripcion'>
                    <span>{info.getValue()}</span>
                </td>
            ),
        },
        {
            accessorKey: 'color',
            header: 'Color',
            cell: (info) => (
                <td data-title='Color'>
                    <span>{info.getValue()}</span>
                </td>
            ),
        },
        {
            accessorKey: 'acciones',
            header: 'Acciones',
            enableSorting: false,
            cell: (info) => (
                <td className="acciones-tabla">
                    <AccionesTabla
                        funcionEditar={() => editar(info.row.original)}
                        funcionEliminar={() => eliminar(info.row.original.id)}
                    />
                </td>
            ),
        },
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection: Array.from(selectedRows),
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <button
                onClick={eliminarSeleccionados}
                className={`bg-red-500 p-2 text-white rounded-md ${selectedRows.size < 2 ? 'hidden' : ''}`}
            >
                Eliminar Seleccionados
            </button>
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
                                    {header.column.getIsSorted() && {
                                        asc: " 🔼",
                                        desc: " 🔽",
                                    }[header.column.getIsSorted()]}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {table.getRowModel().rows.map((item) => (
                        <tr key={item.id}>
                            {item.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 whitespace-nowrap">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Paginacion
                table={table}
                irincio={() => table.setPageIndex(0)}
                pagina={table.getState().pagination.pageIndex + 1}
                setPagina={setPagina}
                maximo={table.getPageCount()}
            />
        </div>
    );
}