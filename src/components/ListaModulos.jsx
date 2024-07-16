import { useEffect, useState } from "react";
import { useUsuariosStore } from "../store/UsuariosStore";

export function ListaModulos({ checkboxs, setCheckboxs, accion }) {

  const { dataModulos, dataPermisosEdit } = useUsuariosStore()
  const [isChecked, setIsChecked] = useState(true)

  useEffect(() => {
    if (accion == 'Editar') {
      const allDocs = []
      dataModulos.map((element) => {
        const statePermiso = dataPermisosEdit?.some((objeto) => objeto.modulos.nombre.includes(element.nombre))
        if(statePermiso){
          allDocs.push({...element, check: true})
        }
        else{
          allDocs.push({...element, check: false})
        }
      })

      setCheckboxs(allDocs)

    } else {
      setCheckboxs(dataModulos)
    }
  }, [dataPermisosEdit])

  const handlecheckbox = (id) => {
    setCheckboxs((prev) => {
      return prev?.map((item) => {
        if(item.id === id){
          return {...item, check:!item.check}
        }else{
          return {...item}
        }
      })
    })

    console.log(checkboxs)
  }

  const seleccionar = (e) => {
    let check = e.target.checked;
    setIsChecked(check)
    console.log(check)
  }

  return (
    <div>
      {
        checkboxs?.map((item, index) => {
          return (
            <div key={index} onClick={() => handlecheckbox(item.id)}>
              <input checked={item.check} type="checkbox" onChange={(e) => seleccionar(e)} />
              <span> {item.nombre} </span>
            </div>
          )
        })
      }

    </div>
  );

}