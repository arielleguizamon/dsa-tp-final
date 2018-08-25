'use strict';

const express = require('express'),
  filterMiddleware = require('./middlewares/filterMiddleware');
  var _ = require("lodash");
  _.mixin(require("lodash-inflection"));

var passport = require("passport"),
  slug = require('slug'),
  router = require('./authentication');

require('./passport')(passport);

var customRoutes = ['extra']

var models = ['team', 'user'];

router : _.reduce(customRoutes, (routes, model) => _.assign(routes, customRouteCreator(model)), {})

router : _.reduce(models, (routes, model) => _.assign(routes, routeCreator(model)), {})

function routeCreator(modelName) {
  var upperModelName = _.upperFirst(modelName)
  modelName = _.pluralize(modelName)

  var model = require('./controllers/' + modelName)

  var multiple = '/api/' + modelName;
  var one = '/api/' + modelName + '/:id';

  router.get(multiple, filterMiddleware.listFilter, model.list)
  router.get(multiple + '/count', filterMiddleware.listFilter, model.count)
  router.get(one, filterMiddleware.findOneFilter, model.get)
  router.put(one, [
    passport.authenticate('jwt', {session: false}),
    filterMiddleware.splitAssociations(upperModelName)
  ], model.update)
  router.post(multiple, [
    passport.authenticate('jwt', {session: false}),
    filterMiddleware.splitAssociations(upperModelName)
  ], model.create)
  router.delete(one, passport.authenticate('jwt', {session: false}), model.delete);

  return router;
}

function customRouteCreator(modelName) {
  var modelRoutes = require('./routes/extras')
  return modelRoutes.customRoutes(router, passport)
}

module.exports = router;
