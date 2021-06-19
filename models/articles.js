var mongoose = require( 'mongoose' );

var articlesSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    //required: true
  },
  typeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


const Articles = module.exports = mongoose.model('Articles', articlesSchema);

module.exports.addArticle = function (article, callback) {
  article.save(callback);
}

module.exports.saveArticle = function (article, callback) {
  var query = {
      _id: article._id
  };
  Articles.findOneAndUpdate(query, article, callback);
}

module.exports.getArticleById = function (id, callback) {
  Articles.findById(id, callback);
}

module.exports.geAll = function (callback) {
  Articles.find({}, callback);
}

module.exports.removeArticle = function (id, callback) {
  Articles.findById(id, (err, article) => {
      article.remove(callback);
  });
}