// import express from "express"
// import { ApolloServer } from "@apollo/server"
// import { expressMiddleware } from "@as-integrations/express5"
// import mongoose, { Query } from "mongoose";
// import dotenv from "dotenv"
// import cors from "cors"
// import { typeDefs, resolvers } from "./graphql/schema.js";
// import{authMiddleware} from './middleware/auth.js';

// //Load env variables
// dotenv.config();

// const app = express();

// app.use(express.json());


// //Apollo GraphQL setup
// const typeDefs =  `
// type Query {
//   hello: String

// }
// `;

// const resolvers = {
//     Query: {
//         hello: () => "Hello Banking App Backend",
//     },
// };

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// const startServer = async() => {
//     //start the Apollo Server
//     await server.start();

//     //Use expressMiddleware to integrate Apollo Server
//     app.use(
//         '/graphql', //This is the path for your GraphQL
       
//         expressMiddleware(server,{
//             context:async({req,res})=>{
//                 authMiddleware(req,res,()=>{});
//                 return {user: req.user}
//             },
//         })
//     );

//     //MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log("MongoDB connected");
//      const PORT = process.env.PORT || 4000
//     app.listen(PORT, ()=>{
//         console.log(`Server ready at http://localhost:${PORT}/graphql`);

//     });
// })
// .catch(err=>console.error("MongoDB error:",err));

// };
// startServer();


import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { typeDefs, resolvers } from "./graphql/schema.js";
import { authMiddleware } from './middleware/auth.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Apollo GraphQL setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    // Start Apollo Server
    await server.start();

    // Integrate Apollo Server with Express
    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req, res }) => {
                await authMiddleware(req, res, () => {});
                return { user: req.user };
            },
        })
    );

    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("MongoDB connected");
            const PORT = process.env.PORT || 4000;
            app.listen(PORT, () => {
                console.log(`Server ready at http://localhost:${PORT}/graphql`);
            });
        })
        .catch(err => console.error("MongoDB error:", err));
};

startServer();
