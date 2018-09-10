import DefaultLayout from "../containers/DefaultLayout";
import Equipos from "../views/Equipos";

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
  }
];

export default routes;
