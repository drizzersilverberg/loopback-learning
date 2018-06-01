'use strict';

module.exports = function(Cat) {

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
