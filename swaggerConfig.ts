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
          "400": {
            description: "Usuário não encontrado ou senha incorreta",
          },
          "500": {
            description: "Erro no login",
          },
        },
      },
    },
    "/users": {
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
          "201": {
            description: "Usuário criado com sucesso",
          },
          "400": {
            description: "E-mail já registrado",
          },
          "500": {
            description: "Erro ao criar usuário",
          },
        },
      },
    },
    "/attendance": {
      get: {
        summary: "Listar todas as presenças",
        responses: {
          "200": {
            description: "Lista de presenças",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      name: { type: "string" },
                      User: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                        },
                      },
                      event: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          "500": {
            description: "Erro ao obter inscrições",
          },
        },
      },
    },
    "/events": {
      post: {
        summary: "Criar um evento",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Título do evento" },
                  content: { type: "string", description: "Conteúdo do evento" },
                  data: { type: "string", format: "date-time", description: "Data do evento" },
                  location: { type: "string", description: "Local do evento" },
                  authorId: { type: "string", description: "ID do autor" },
                },
                required: ["title", "data", "authorId"],
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Evento criado com sucesso",
          },
          "400": {
            description: "Data inválida ou campos obrigatórios ausentes",
          },
          "404": {
            description: "Autor não encontrado",
          },
          "500": {
            description: "Erro ao criar evento",
          },
        },
      },
    },
  },
};

export default swaggerConfig;
