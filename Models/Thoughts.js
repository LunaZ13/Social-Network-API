const { Schema, model, Types } = require("mongoose");

const reactSchema = new Schema(
  {
    reactionId: {
      type: ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    userName: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    // thoughttext
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    reactions: [reactSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const thought = model("thought", thoughtSchema);

module.exports = thought;
