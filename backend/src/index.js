// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@as-integrations/express5";
// import { Mongoose } from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";

// //load env configuration
// dotenv.config();
// const app =express();

// Mongoose.connect(process.env.MONGO_URI)
//    .then(()=> console.log("MongoDB Connected"))
//    .catch(err=> console.error("MongoDB error:", err));


//    const typeDefs=`type Query{
//    hello:string
//    }`
// const resolvers={
//     Query:{
//         hello:()=>"Hello Banking Ap Backend",
//     },
// };

// const server=new ApolloServer({
//     typeDefs,
//     resolvers,
// });
// const startServer=async()=>{
//     await server.start()
// }

// app.use (
//     '/graphql',
//     cors(),
//     express.json(),
//     expressMiddleware(server)
// )

// const PORT =process.env.PORT||4000;
// app.listen(PORT,()=>{
//     console.log(`Server ready at http://localhost:${PORT}/graphql`);

// })















import express from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import mongoose, { Query } from "mongoose";
import dotenv from "dotenv"
import cors from "cors"


//Load env variables
dotenv.config();

const app = express();

//MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.error("MongoDB error:",err));

//Apollo GraphQL setup
const typeDefs =  `
type Query {
  hello: String

}
`;

const resolvers = {
    Query: {
        hello: () => "Hello Banking App Backend",
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async() => {
    //start the Apollo Server
    await server.start();

    //Use expressMiddleware to integrate Apollo Server
    app.use(
        '/graphql', //This is the path for your GraphQL
        cors(),
        express.json(),
        expressMiddleware(server)
    )
    //start express server
    const PORT = process.env.PORT || 4000
    app.listen(PORT, ()=>{
        console.log(`Server ready at http://localhost:${PORT}/graphql`);

    });

};
startServer();