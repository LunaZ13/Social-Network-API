
const { Schema, model, Types } = require("mongoose");

const reactSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
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
      default: Date.now
    }
  },
  {
    toJSON: {
      getters: true,
    },
    // id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      unique: true,
      required: true,
      minlength: 6,
      maxlength: 280
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
// reactionCount virtual to get total count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// create thought model using the thoughtSchema
const Thought = model("thought", thoughtSchema);

module.exports = Thought;