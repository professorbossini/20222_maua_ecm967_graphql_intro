import { createServer } from "@graphql-yoga/node";

const usuarios = [
  {
    id: '100',
    nome: 'Jose',
    idade: 22,
    livros: [
      {
        id: '1',
        titulo: "Effective Java",
        genero: 'Tecnico',
        edicao: 3,
        preco: 39.99
      },
      {
        id: '2',
        titulo: 'Concrete Mathematics',
        genero: 'Tecnico',
        edicao: 1,
        preco: 89.99
      }
    ]
  },
  {
    id: '101',
    nome: 'Maria',
    idade: 29,
    livros: [
      {
        id: '5',
        titulo: 'Programming Challenges',
        genero: 'Tecnico',
        edicao: 1,
        preco: 39.99
      }
    ]
  }
]


const livros = [
  {
    id: '1',
    titulo: 'Effective Java',
    genero: "Técnico",
    edicao: 3,
    preco: 39.99
  },
  {
    id: '2',
    titulo: 'Concrete Mathematics',
    genero: 'Tecnico',
    edicao: 1,
    preco: 89.99
  }
]

//especificação de interface
const typeDefs = `
  type Usuario {
    id: ID!,
    nome: String!,
    idade: Int!,
    livros: [Livro!]
  },
  type Livro {
    id: ID!
    titulo: String!
    genero: String!
    edicao: Int
    preco: Float
  },
  type Query{
    usuarios: [Usuario!]!
    livros(precoMaximo: Float!): [Livro!]!
    adicionar (numeros: [Float!]!): Float!
    notas: [Int!]!
    bemVindo(nome: String): String!
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
    usuarios(){
      return usuarios  
    },
    livros (parent, args, ctx, info){
      return livros.filter(l => l.preco <= args.precoMaximo)
    },
    adicionar(parent, args, ctx, info){
      return args.numeros.length === 0 ? 0 : args.numeros.reduce((ac, v) => ac + v)
    },
    notas (parent, args, ctx, info){
      return [10, 2, 7, 7, 8]
    },
    bemVindo(parent, args, ctx, info){
      console.log(`parent: ${JSON.stringify(parent)}`)
      console.log(`args: ${JSON.stringify(args)}`)
      // console.log(`ctx: ${JSON.stringify(ctx)}`)
      // console.log(`info: ${JSON.stringify(info)}`)
      return `Bem vindo, ${args.nome ? args.nome : ' visitante'}`
    },
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