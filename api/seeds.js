let bcrypt = require("bcrypt");

let User = require("./models/user");
let Team = require("./models/team");

async function run() {
  /* User seeds */
  let salt = bcrypt.genSaltSync(4);
  let hash = bcrypt.hashSync("admin", salt);

  let useradmin = {
    username: "admin",
    password: hash,
    nombre: "admin",
    apellido: "admin",
    email: "admin@admin.com",
    habilitado: true,
    administrator: true
  };

  let salt2 = bcrypt.genSaltSync(4);
  let hash2 = bcrypt.hashSync("user", salt2);

  let userdata = {
    username: "user",
    password: hash2,
    nombre: "user",
    apellido: "user",
    email: "user@user.com",
    habilitado: true,
    administrator: false
  };

  let userdata2 = {
    username: "user2",
    password: hash2,
    nombre: "user2",
    apellido: "user2",
    email: "user2@user2.com",
    habilitado: true,
    administrator: false
  };

  try {
    await User.create(useradmin);
    console.log("User admin Created");
  } catch (e) {
    // console.log(e);
  }
  /*   try {
    user = await User.create(userdata);
    console.log('User Created');
  } catch (e) {
    // console.log(e);
  }
  try {
    user2 = await User.create(userdata2);
    console.log('User2 Created');
  } catch (e) {
    // console.log(e);
  } */

  /* Team seeds */

  /*   let team = {
    nombre: 'team 1',
    slug: 'team-1',
    organizacion: 'organizacion',
    imagen: 'https://unaracnidounacamiseta.com/wp-content/uploads/2012/07/lorem.jpg',
    token: 'askdjq123',
    ip: '10.10.10.10',
    aprobado: true,
    capitan: user.id,
    jugadores: [user2.id]
  }

  try {
    team = await Team.create(team)
    console.log('team created');
  } catch (e) {
    // console.log(e);
  } */
}
run().catch(error => console.log(err));
