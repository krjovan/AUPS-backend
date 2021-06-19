var mongoose = require( 'mongoose' );

var stocksSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  minimumNeeded: {
    type: Number,
    required: true
  },
  maximum: {
    type: Number,
    required: true
  },
  articleID: {
    type: mongoose.Schema.Types.ObjectId,
   // required: true
  }
});


const Stocks = module.exports = mongoose.model('Stocks', stocksSchema);

module.exports.addStock = function (stock, callback) {
  stock.save(callback);
}

module.exports.saveStock = function (stock, callback) {
  var query = {
      _id: stock._id
  };
  Stocks.findOneAndUpdate(query, stock, callback);
}

module.exports.getStockById = function (id, callback) {
  Stocks.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Stocks.find({}, callback);
}

module.exports.removeStock = function (id, callback) {
  Stocks.findById(id, (err, stock) => {
      stock.remove(callback);
  });
}