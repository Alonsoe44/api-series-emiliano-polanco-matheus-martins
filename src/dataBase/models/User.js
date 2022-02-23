const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
  },
  series: {
    type: [Schema.Types.ObjectId],
    default: undefined,
  },
});

const User = model("user", UserSchema, "users-collection");

module.exports = User;
