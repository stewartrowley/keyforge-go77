const db = require('../models');
const Event = db.event;

exports.create = (req, res) => {
    if (!req.body[0].event_name) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
    Event
        .insertMany(req.body)
        .then((data) => {
            console.log(data);
            res.status(201).send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error occurred while creating a person'
            });
        });
}
exports.findAll = (req, res) => {
    Event.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || 'Some error occurred while getting a person.'
            });
        });
};
// exports.findId = (req, res) => {
//     const _id = req.params._id;
//     Event.find(
//         { deck_id: _id }
//     )
//       .then((data) => {
//         if (!data) res.status(404).send({ message: 'Not found in about' + _id });
//         else res.send(data);
//       })
//       .catch((error) => {
//         res.status(500).send({
//           message: 'Error retrieving aboutId' + _id,
//           error: error
//         });
//       });
// };
exports.findEvent = (req, res) => {
    const _id = req.params._id;
    Event.find(
        { event_name: _id }
    )
      .then((data) => {
        if (!data) res.status(404).send({ message: 'Not found in about' + _id });
        else res.send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: 'Error retrieving aboutId' + _id,
          error: error
        });
      });
};