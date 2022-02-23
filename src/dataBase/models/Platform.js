const { model, Schema } = require("mongoose");

const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
});

const Platform = model("platform", PlatformSchema, "platforms-collection");

module.exports = Platform;
