import { createServer } from "@graphql-yoga/node";

//especificação de interface
const typeDefs = `
  type Livro {
    id: ID!
    titulo: String!
    genero: String!
    edicao: Int
    preco: Float
  },
  type Query{
    effectiveJava: Livro!
  }
`

// const typeDefs = `
//   type Query {
//     hello: String!
//     name: String!
//     id: ID!
//     location: String!
//     age: Int!
//     ofAge: Boolean!
//     salary: Float!
//   }
// `


const resolvers = {
  Query: {
    effectiveJava(){
      return {
        id: '123456',
        titulo: 'Effective Java',
        genero: 'Técnico',
        edicao: 3,
        preco: 43.9
      }      
    }
  }
}


//resolver (implementação)
// const resolvers = {
//   Query: {
//     hello(){
//       return "Hello, GraphQL!"  
//     },
//     name(){
//       return "Maria"
//     },
//     id(){'
//       return "uma_chave"
//     },
//     location(){
//       return "SP"
//     },
//     age(){
//       return 29
//     },
//     ofAge(){
//       return true
//     },
//     salary(){
//       return 2.5
//     }
//   }
// }

const server = createServer({
  schema: {
    typeDefs,
    resolvers
  }
})

server.start(() => {
  console.log("Servidor no ar")
})