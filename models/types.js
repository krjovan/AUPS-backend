var mongoose = require( 'mongoose' );

var typesSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});


const Types = module.exports = mongoose.model('Types', typesSchema);

module.exports.addType = function (type, callback) {
  type.save(callback);
}

module.exports.saveType = function (type, callback) {
  var query = {
      _id: type._id
  };
  Types.findOneAndUpdate(query, type, callback);
}

module.exports.getTypeById = function (id, callback) {
  Types.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Types.find({}, callback);
}

module.exports.removeType = function (id, callback) {
  Types.findById(id, (err, type) => {
    type.remove(callback);
  });
}