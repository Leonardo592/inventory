export const DesplegableUser = [
  {
    text: "Mi perfil",
    tipo: "miperfil",
  },
  {
    text: "Configuracion",
    tipo: "configuracion",
  },
  {
    text: "Cerrar sesión",
    tipo: "cerrarsesion",
  },
];

export const LinksArray = [
  {
    label: "Home",
    // icon: <AiOutlineHome />,
    to: "/",
  },
  {
    label: "Kardex",
    // icon: <v.iconocategorias />,
    to: "/kardex",
  },
  {
    label: "Reportes",
    // icon: <v.iconoreportes />,
    to: "/reportes",
  },

];
export const SecondarylinksArray = [
  {
    label: "Configuración",
    // icon: <AiOutlineSetting />,
    to: "/configurar",
  },

];


export const DataModulosConfiguracion = [
  {
    title: "Productos",
    subtitle: "registra tus productos",
    icono:"https://i.ibb.co/Sd39ZYV/productos.jpg",
    link: "/configurar/productos",

  },
  {
    title: "Personal",
    subtitle: "ten el control de tu personal",
    icono:"https://i.ibb.co/wS1vzqy/personal.jpg",
    link: "/configurar/personal",

  },

  {
    title: "Tu empresa",
    subtitle: "configura tus opciones básicas",
    icono:"https://i.ibb.co/dQ5ztjW/empresa.jpg",
    link: "/configurar/empresa",

  },
  {
    title: "Categoria de productos",
    subtitle: "asigna categorias a tus productos",
    icono:"https://i.ibb.co/Rc5x8sY/categoria.jpg",
    link: "/configurar/categorias",

  },
  {
    title: "Marca de productos",
    subtitle: "gestiona tus marcas",
    icono:"https://i.ibb.co/jG4B0SX/marca.png",
    link: "/configurar/marca",

  },

]


//tipo usuario
export const TipouserData = [
  {
    descripcion: "empleado",
    icono: "🪖",
  },
  {
    descripcion: "administrador",
    icono: "👑",
  },
];
//tipodoc
export const TipoDocData = [
  {
    descripcion: "Dni",
    icono: "🪖",
  },
  {
    descripcion: "Libreta electoral",
    icono: "👑",
  },
  {
    descripcion: "Otros",
    icono: "👑",
  },
];