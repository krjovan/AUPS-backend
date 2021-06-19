var mongoose = require( 'mongoose' );

var deliversSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  articlesId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


const Delivers = module.exports = mongoose.model('Delivers', deliversSchema);

module.exports.addDeliver = function (deliver, callback) {
  deliver.save(callback);
}

module.exports.saveDeliver = function (deliver, callback) {
  var query = {
      _id: deliver._id
  };
  Delivers.findOneAndUpdate(query, deliver, callback);
}

module.exports.getDeliverById = function (id, callback) {
  Delivers.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Delivers.find({}, callback);
}

module.exports.removeDeliver = function (id, callback) {
  Delivers.findById(id, (err, deliver) => {
    deliver.remove(callback);
  });
}