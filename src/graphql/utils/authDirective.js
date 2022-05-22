// const { ApolloError } = require('apollo-server-koa');
const { defaultFieldResolver } = require('graphql');
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');

const authMiddleware = require('./auth');

function authDirective(directiveName) {
  const typeDirectiveArgumentMaps = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
        requires: Role = ADMIN,
      ) on OBJECT | FIELD_DEFINITION
  
      enum Role {
        ADMIN
        USER
      }`,
    authDirectiveTransformer: (schema) => mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: async (fieldConfig) => {
        const auth = getDirective(schema, fieldConfig, directiveName)?.[0];
        console.log('auth', auth);
        if (auth) {
          const { requires } = auth;
          if (requires) {
            const { resolve = defaultFieldResolver } = fieldConfig;
            fieldConfig.resolve = async (source, args, context, info) => {
              const user = await authMiddleware.userAdminAuthorized(context.ctx);
              console.log('====================user======================', user);
              if (!user) {
                throw new Error('not authorized');
              }
              console.log('==========================================');
              return resolve(source, args, context, info);
            };
            console.log('fieldConfig', fieldConfig);
            return fieldConfig;
          }
        }
      },
    }),
  };
}

module.exports = { authDirective };