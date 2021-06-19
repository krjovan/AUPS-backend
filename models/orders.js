var mongoose = require( 'mongoose' );

var ordersSchema = new mongoose.Schema({
  amount: {
    type: Number
  },
  Date: {
    type: Date,
    required: true,
    default: new Date()
  },
  userID: {
    type: String,
    required: true
  },
  deliversID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


const Orders = module.exports = mongoose.model('Orders', ordersSchema);

module.exports.addOrder = function (order, callback) {
  order.save(callback);
}

module.exports.saveOrder = function (order, callback) {
  var query = {
      _id: order._id
  };
  Orders.findOneAndUpdate(query, order, callback);
}

module.exports.getOrderById = function (id, callback) {
  Orders.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Orders.find({}, callback);
}

module.exports.removeOrder = function (id, callback) {
  Orders.findById(id, (err, order) => {
    order.remove(callback);
  });
}