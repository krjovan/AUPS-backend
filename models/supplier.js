var mongoose = require( 'mongoose' );

var supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});


const Suppliers = module.exports = mongoose.model('Suppliers', supplierSchema);

module.exports.addSupplier = function (supplier, callback) {
  supplier.save(callback);
}

module.exports.saveSupplier = function (supplier, callback) {
  var query = {
      _id: supplier._id
  };
  Suppliers.findOneAndUpdate(query, supplier, callback);
}

module.exports.getSupplierById = function (id, callback) {
  Suppliers.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Suppliers.find({}, callback);
}

module.exports.removeSupplier = function (id, callback) {
  Suppliers.findById(id, (err, supplier) => {
      supplier.remove(callback);
  });
}