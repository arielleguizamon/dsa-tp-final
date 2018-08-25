let bcrypt = require('bcrypt');

let User = require('./models/user')

async function run() {

  /* User seeds */
  let salt = bcrypt.genSaltSync(4);
  let hash = bcrypt.hashSync('admin', salt);

  let user = {
    username: 'admin',
    password: hash,
    role: 'superadmin'
  }
  await User.create(user);
  console.log('User Created');
}
run().catch(error => console.log('User already exists'));
