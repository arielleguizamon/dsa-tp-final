'use strict';

var _ = require('lodash');

exports.listFilter = (req, res, next) => {
  req.options = {
    skip: parseInt(_.get(req, 'query.skip', 0)),
    limit: parseInt(_.get(req, 'query.limit', 20)),
    sort: {
      [_.get(req, 'query.orderBy', '_id')]: _.get(req, 'query.sort', 1)
    }
  };

  // TODO: Deep filtesring
  req.populate = _.split(_.get(req, 'query.populate', ''), ',');
  req.fields = _.split(_.get(req, 'query.fields', ''), ',');
  delete req.query.skip;
  delete req.query.limit;
  delete req.query.orderBy;
  delete req.query.sort;
  delete req.query.fields;
  delete req.query.populate;
  next();
}

exports.findOneFilter = (req, res, next) => {
  req.populate = _.split(_.get(req, 'query.populate', ''), ',');
  req.fields = _.split(_.get(req, 'query.fields', ''), ',');
  next();
}
exports.splitAssociations = (model) => {
  return (req, res, next) => {

    // var virtuals = require('mongoose').model(model).schema.virtuals
    var schema = require('mongoose').model(model).schema.paths
    // var mergedSchema = _.merge(schema, virtuals)

    let fields = _.filter(schema, (each) => {
      return (each.instance == 'Array' || !_.isUndefined(each.options.foreignField) && each.path != 'id')
    })
    // let fields2 = _.filter(virtuals, (each) => {
    //   return ( !_.isUndefined(each.options.foreignField) && each.path != 'id')
    // })

    _.each(fields, (each) => {
      let associationName = each.path
      if (req.body[associationName]) {
        req.body[associationName] = _.split(req.body[associationName], ',');
      }
    })
    // _.each(fields2, (each) => {
    //   let associationName = each.path
    //   if (req.body[associationName]) {
    //     req.body[associationName] = _.split(req.body[associationName], ',');
    //   }
    // })

    next()
  }
}
