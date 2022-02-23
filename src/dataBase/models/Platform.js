const { model, Schema } = require("mongoose");

const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  series: {
    type: [Schema.Types.ObjectId],
    default: undefined,
  },
});

const Platform = model("platform", PlatformSchema, "platforms-collection");

module.exports = Platform;
