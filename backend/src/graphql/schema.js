// import {gql} from "graphql-tag"
// import {userTypeDefs} from "./userTypeDefs.js";
// import { userResolvers } from "../resolvers/userResolver";
// import { helloTypeDefs } from "./helloTypeDefs.js";
// import { helloResolver } from "../resolvers/helloResolvers.js";

// const baseTypeDefs= gql`
// type Query{
// _empty:String
// }
// type Mutation{
// _empty:String
// }`;

// export const typeDefs=[baseTypeDefs, userTypeDefs,helloTypeDefs];
// export const resolvers=[userResolvers,helloResolver];



















import { gql } from "graphql-tag";
import { userTypeDefs } from "./userTypeDefs.js";
import { userResolvers } from "../resolvers/userResolver.js";   // corrected filename
import { helloTypeDefs } from "./helloTypeDefs.js";
import { helloResolver } from "../resolvers/helloResolvers.js";

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [baseTypeDefs, userTypeDefs, helloTypeDefs];
export const resolvers = [userResolvers, helloResolver];
