import mongoose from "mongoose";
import  mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
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
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

eventSchema.plugin( mongooseAggregatePaginate)
// adds pagination support to the MongoDB aggregation framework. It's particularly useful when you want to perform complex queries and aggregations on large datasets and need to paginate the results.
export default eventSchema;
