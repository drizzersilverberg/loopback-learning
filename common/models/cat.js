'use strict';

module.exports = function(Cat) {

  Cat.observer('before save', function(context, next) {
    if (context.instance) context.instance.updated = new Date();
    next();
  });

  Cat.afterRemote('findById', function (context, cat, next) {
    cat.description = cat.name + ' is ' + cat.age + ' years old and is a ' + cat.breed;
    next();
  });

  /* above function will add 'description' key to response body of GET cat/{id} endpoint */

  Cat.adoptable = function(id, callback) {
    Cat.findById(id, function(error, cat) {
      if (error) return callback("Error", null);
      if (!cat) return callback("Cat not found", null);
      let canAdopt = false;
      if (cat.breed != 'tiger' || (cat.age >= 10))
      canAdopt = true;
      callback(null, canAdopt);
    });
  }

  Cat.remoteMethod('adoptable', {
    accepts: {arg: 'id', type: 'any'},
    returns: {arg: 'adoptable', type: 'boolean'}
  });

};
