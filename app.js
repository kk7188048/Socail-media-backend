import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser';

const app =  express()
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
// }))
app.use(cors())
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

import userRoutes from './routers/user.routers.js';
import movieRoutes from './routers/movie.routers.js';
import theaterRoutes from './routers/theater.router.js';
import showRoutes from './routers/show.routers.js';
import bookingRoutes from './routers/booking.routers.js';
import { authenticate } from "./middleware/auth.middleware.js";
import eventRoutes from './routers/event.routers.js'; // Import event routes


app.use('/api/users', userRoutes);

// app.use(authMiddleware);

// app.use('/api/movies', movieRoutes);

 app.use('/api/theaters', theaterRoutes);

app.use('/api/shows', showRoutes);

app.use('/api/event', eventRoutes); // Mount event routes

// app.use('/api/bookings', bookingRoutes);


export {app}
