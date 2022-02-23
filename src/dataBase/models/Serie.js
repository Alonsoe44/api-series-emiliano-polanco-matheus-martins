const { model, Schema } = require("mongoose");

const SerieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  platform: {
    type: [Schema.Types.ObjectId],
    default: undefined,
    ref: "user",
  },
});

const Serie = model("series", SerieSchema, "series-collection");

module.exports = Serie;
