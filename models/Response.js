const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  vacancie: { type: Schema.Types.ObjectId, ref: 'Vacancie' },
  date: { type: Date, default: Date.now },
  budget: { type: Number, required: true },
  message: {type: String, required: true},
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  bornDate: {type: Date, required: true},
  phone: {type: Number, required: true},
  city: {type: String, required: true},
  status: {type: Number, default: 0},
  positionName: {type: String},
  imgUrl: {type: String},
})

module.exports = model('Response', schema)
