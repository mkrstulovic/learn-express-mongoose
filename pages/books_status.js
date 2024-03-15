let BookInstance = require('../models/bookinstance');
let Book = require('../models/book');

function get_available () {
  return BookInstance.find({status: {$eq: 'Available'}}, 'book status')
    .populate('book');}

get_available_list = async () => {
  let available_list = await get_available().exec();
  return available_list.map(function(avail) {
    return Book(avail.book).title + " : " + avail.status;
  });
};

exports.show_all_books_status = function(res) {
  get_available_list()
  .then((data) => res.send(data))
    .catch((_) => res.send('No authors found'));
}