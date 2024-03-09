import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'userSchema',
      required: true,
    },
    show: {
      type: Schema.Types.ObjectId,
      ref: 'showSchema',
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'BOOKED',
    },
  },
  {
    timestamps: true,
  }
);

export default bookingSchema;
