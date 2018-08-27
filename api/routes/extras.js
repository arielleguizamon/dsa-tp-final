'use strict';
const user = require('../controllers/users')
const team = require('../controllers/teams')

module.exports.customRoutes = function customRoutes(router, passport) {
  router.get('/api/puntuacion-juego/:id', (req, res) => {
    let data = {
      date: "201808082233",
      id_juego: req.params.id,
      puntajes: [
        {
          id_team: 1,
          defensivo: 1000,
          ofensivo: 100,
          disclousure: 0
        }, {
          id_team: 2,
          defensivo: 2000,
          ofensivo: 200,
          disclousure: 0
        }, {
          id_team: 3,
          defensivo: 980,
          ofensivo: 20,
          disclousure: 0
        }, {
          id_team: 4,
          defensivo: 400,
          ofensivo: 40,
          disclousure: 0
        }
      ]
    }
    return res.json(data)
  });
  router.get('/api/puntuacion-equipo/:idjuego/:idequipo', (req, res) => {
    let data = {
      date: "201808082233",
      id_juego: req.params.idjuego,
      id_team: req.params.idequipo,
      puntajes: [
        {
          id_usuario: 1,
          defensivo: 1000,
          ofensivo: 100,
          disclousure: 0
        }, {
          id_usuario: 2,
          defensivo: 2000,
          ofensivo: 200,
          disclousure: 0
        }, {
          id_usuario: 3,
          defensivo: 980,
          ofensivo: 20,
          disclousure: 0
        }, {
          id_usuario: 4,
          defensivo: 400,
          ofensivo: 40,
          disclousure: 0
        }
      ]
    }
    return res.json(data)
  });
  router.get('/api/servicios-levantados/:idequipo', (req, res) => {
    let data = {
      id_team: req.params.idequipo,
      nombre_team: 'defcon',
      vm: '10.10.32.12',
      servicios: [
        {
          nombre: 'servicio1',
          puerto: 35060,
          estado: 0
        }, {
          nombre: 'servicio2',
          puerto: 36000,
          estado: 1
        }, {
          nombre: 'servicio3',
          puerto: 36239,
          estado: 0
        }, {
          nombre: 'servicio4',
          puerto: 36292,
          estado: 0
        }
      ]
    }
    return res.json(data)
  });
  router.get('/api/servicios-levantados', (req, res) => {
    let data = {
      equipos: [
        {
          id_team: 1,
          nombre_team: 'defcon',
          vm: '10.10.32.12',
          servicios: [
            {
              nombre: 'servicio1',
              puerto: 35060,
              estado: 0
            }, {
              nombre: 'servicio2',
              puerto: 36000,
              estado: 1
            }, {
              nombre: 'servicio3',
              puerto: 36239,
              estado: 0
            }, {
              nombre: 'servicio4',
              puerto: 36292,
              estado: 0
            }
          ]
        }, {
          id_team: 2,
          nombre_team: 'partyhard',
          vm: '10.10.32.13',
          servicios: [
            {
              nombre: 'servicio1',
              puerto: 35060,
              estado: 1
            }, {
              nombre: 'servicio2',
              puerto: 36000,
              estado: 1
            }, {
              nombre: 'servicio3',
              puerto: 36239,
              estado: 1
            }, {
              nombre: 'servicio4',
              puerto: 36292,
              estado: 0
            }
          ]
        }, {
          id_team: 3,
          nombre_team: 'hackz0rz',
          vm: '10.10.32.14',
          servicios: [
            {
              nombre: 'servicio1',
              puerto: 35060,
              estado: 0
            }, {
              nombre: 'servicio2',
              puerto: 36000,
              estado: 0
            }, {
              nombre: 'servicio3',
              puerto: 36239,
              estado: 0
            }, {
              nombre: 'servicio4',
              puerto: 36292,
              estado: 0
            }
          ]
        }
      ]
    }
    return res.json(data)
  });
  router.get('/api/desafios/:idusuario', (req, res) => {
    let data = {
      date: "201808082233",
      id_juego: '123',
      id_equipo: '1',
      id_usuario: req.params.idusuario,
      desafios: [
        {
          id_desafio: '1',
          titulo: 'lorem ipsm',
          categoria: 'crypto',
          puntos: 25,
          descripcion: 'lorem ipsm dolor sit amet',
          Hint1: {
            id_hint: 1,
            disponible: false,
            porcentaje: 10
          },
          Hint2: {
            id_hint: 2,
            disponible: true,
            porcentaje: 10
          },
          adjunto: 'loremipsum.com/adjunto.zip'
        }, {
          id_desafio: '2',
          titulo: 'lorem ipsm',
          categoria: 'forensia',
          puntos: 30,
          descripcion: 'lorem ipsm dolor sit amet',
          Hint1: {
            id_hint: 1,
            disponible: false,
            porcentaje: 10
          },
          Hint2: {
            id_hint: 2,
            disponible: true,
            porcentaje: 10
          },
          adjunto: 'loremipsum.com/adjunto.zip'
        }, {
          id_desafio: '3',
          titulo: 'lorem ipsm',
          categoria: 'forensia',
          puntos: 10,
          descripcion: 'lorem ipsm dolor sit amet',
          Hint1: {
            id_hint: 1,
            disponible: false,
            porcentaje: 10
          },
          Hint2: {
            id_hint: 2,
            disponible: true,
            porcentaje: 10
          },
          adjunto: 'loremipsum.com/adjunto.zip'
        }, {
          id_desafio: '4',
          titulo: 'lorem ipsm',
          categoria: 'crypto',
          puntos: 50,
          descripcion: 'lorem ipsm dolor sit amet',
          Hint1: {
            id_hint: 1,
            disponible: false,
            porcentaje: 10
          },
          Hint2: {
            id_hint: 2,
            disponible: true,
            porcentaje: 10
          },
          adjunto: 'loremipsum.com/adjunto.zip'
        }
      ]
    }
    return res.json(data)
  });
  router.post('/api/users', user.create)
  router.get('/api/usuario/:id/activar/:token', user.activateUser)
  router.post('/api/usuario/recover', user.recover)
  router.post('/api/usuario/reset', user.reset)
  router.put('/api/equipo/:id/habilitar', passport.authenticate('jwt', {session: false}), team.activateTeam)
}
