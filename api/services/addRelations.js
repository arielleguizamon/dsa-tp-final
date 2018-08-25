const _ = require('lodash');
module.exports.addRelations = (models, id, field) => {
  _.forEach(models, (relation) => {
    _.forEach(relation.values, (association) => {
      console.log('association is equal to', association)
      relation.model.findByIdAndUpdate(association, {
        $push: {
          [field]: id
        }
      }, {
        safe: true,
        upsert: true,
        new: true
      }, function(err, model) {
        console.log(err);
      })
    })
  })
}
