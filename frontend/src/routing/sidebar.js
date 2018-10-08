export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      title: true,
      name: "DSA"
    },
    {
      name: "Equipos",
      icon: "fa fa-users",
      url: "/equipos"
    },
    {
      name: "Puntuaciones",
      icon: "fa fa-users",
      children: [
        {
          name: "Juegos",
          icon: "fa fa-users",
          url: "/puntuaciones/juegos"
        },
        {
          name: "Equipos",
          icon: "fa fa-users",
          url: "/puntuaciones/equipos"
        }
      ]
    },
    {
      name: "Servicios",
      icon: "fa fa-users",
      children: [
        {
          name: "Levantados",
          icon: "fa fa-users",
          url: "/servicios/levantados"
        },
        {
          name: "Por Equipo",
          icon: "fa fa-users",
          url: "/servicios/por-equipo"
        },
        {
          name: "Mas Explotados",
          icon: "fa fa-users",
          url: "/servicios/mas-explotados"
        }
      ]
    },
    {
      name: "Desafíos",
      icon: "fa fa-users",
      url: "/desafios"
    }
  ]
};
