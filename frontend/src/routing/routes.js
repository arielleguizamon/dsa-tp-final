import DefaultLayout from "../containers/DefaultLayout";
import Equipos from "../views/Equipos";
import Puntuaciones from "../views/Puntuaciones";
import Servicios from "../views/Servicios";

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  {
    path: "/equipos",
    exact: true,
    name: "Equipos",
    component: Equipos.Listado
  },
  {
    path: "/equipos/crear",
    exact: true,
    name: "Crear",
    component: Equipos.Crear
  },
  {
    path: "/equipos/unirse",
    exact: true,
    name: "Unirse",
    component: Equipos.Unirse
  },
  {
    path: "/puntuaciones/equipos",
    exact: true,
    name: "Equipos",
    component: Puntuaciones.Equipos
  },
  {
    path: "/puntuaciones/juegos",
    exact: true,
    name: "Juegos",
    component: Puntuaciones.Juegos
  },
  {
    path: "/servicios/levantados",
    exact: true,
    name: "Levantados",
    component: Servicios.Levantados
  }
];

export default routes;
