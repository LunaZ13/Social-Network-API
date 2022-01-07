const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      // match email
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
// friendCount virtual
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// create user model using the userSchema
const user = model("user", userSchema);

module.exports = user;
