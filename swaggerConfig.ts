import { OpenAPIV3 } from "openapi-types";

const swaggerConfig: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentação da API usando Swagger",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor local",
    },
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Realizar login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string", description: "E-mail do usuário" },
                  password: { type: "string", description: "Senha do usuário" },
                },
                required: ["email", "password"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", description: "Token JWT" },
                  },
                },
              },
            },
          },
          "400": { description: "Usuário não encontrado ou senha incorreta" },
          "500": { description: "Erro no login" },
        },
      },
    },
    "/users": {
      get: {
        summary: "Listar todos os usuários",
        responses: {
          "200": {
            description: "Lista de usuários",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      email: { type: "string" },
                      registroAcademico: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          "500": { description: "Erro ao listar usuários" },
        },
      },
      post: {
        summary: "Criar um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Nome do usuário" },
                  email: { type: "string", description: "E-mail do usuário" },
                  password: { type: "string", description: "Senha do usuário" },
                  registroAcademico: {
                    type: "string",
                    description: "Registro acadêmico do usuário",
                  },
                },
                required: ["name", "email", "password", "registroAcademico"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Usuário criado com sucesso" },
          "400": { description: "E-mail já registrado" },
          "500": { description: "Erro ao criar usuário" },
        },
      },
    },
    "/users/{id}": {
      get: {
        summary: "Obter um usuário por ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID do usuário",
          },
        ],
        responses: {
          "200": { description: "Usuário encontrado" },
          "404": { description: "Usuário não encontrado" },
          "500": { description: "Erro ao buscar usuário" },
        },
      },
      put: {
        summary: "Atualizar um usuário",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID do usuário",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Nome do usuário" },
                  email: { type: "string", description: "E-mail do usuário" },
                  password: { type: "string", description: "Senha do usuário" },
                  registroAcademico: {
                    type: "string",
                    description: "Registro acadêmico do usuário" },
                },
              },
            },
          },
        },
        responses: {
          "200": { description: "Usuário atualizado com sucesso" },
          "400": { description: "E-mail já registrado" },
          "500": { description: "Erro ao atualizar usuário" },
        },
      },
      delete: {
        summary: "Excluir um usuário",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID do usuário",
          },
        ],
        responses: {
          "200": { description: "Usuário deletado com sucesso" },
          "404": { description: "Usuário não encontrado" },
          "500": { description: "Erro ao deletar usuário" },
        },
      },
    },

    "/events": {
      get: {
        summary: "Listar todos os eventos",
        responses: {
          "200": {
            description: "Lista de eventos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      title: { type: "string" },
                      content: { type: "string" },
                      date: { type: "string", format: "date-time" },
                      location: { type: "string" },
                      authorId: { type: "string" },
                    },
                  },
                },
              },
            },
          },
          "500": { description: "Erro ao listar eventos" },
        },
      },
      post: {
        summary: "Criar um novo evento",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Título do evento" },
                  content: { type: "string", description: "Conteúdo do evento" },
                  date: { type: "string", format: "date-time", description: "Data do evento" },
                  location: { type: "string", description: "Local do evento" },
                  authorId: { type: "string", description: "ID do autor" },
                },
                required: ["title", "date", "authorId"],
              },
            },
          },
        },
        responses: {
          "201": { description: "Evento criado com sucesso" },
          "400": { description: "Data inválida ou campos obrigatórios ausentes" },
          "404": { description: "Autor não encontrado" },
          "500": { description: "Erro ao criar evento" },
        },
      },
      put: {
        summary: "Atualizar um evento",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID do evento",
          },
        ],
        responses: {
          "200": { description: "Evento atualizado com sucesso" },
          "400": { description: "Data inválida ou campos obrigatórios ausentes" },
          "404": { description: "Evento não encontrado" },
          "500": { description: "Erro ao atualizar evento" },
        },
      },
      delete: {
        summary: "Excluir um evento",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID do evento",
          },
        ],
        responses: {
          "200": { description: "Evento deletado com sucesso" },
          "404": { description: "Evento não encontrado" },
          "500": { description: "Erro ao deletar evento" },
        },
      },
    },
  },
};

export default swaggerConfig;
