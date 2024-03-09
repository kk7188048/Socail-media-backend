import mongoose from 'mongoose';

const { Schema } = mongoose;

const showSchema = new Schema(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'movieSchema',
      required: true,
    },
    theater: {
      type: Schema.Types.ObjectId,
      ref: 'theaterSchema',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default showSchema;
