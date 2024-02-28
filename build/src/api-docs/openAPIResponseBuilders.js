"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApiResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const serviceResponse_1 = require("@common/models/serviceResponse");
function createApiResponse(schema, description, statusCode = http_status_codes_1.StatusCodes.OK) {
    return {
        [statusCode]: {
            description,
            content: {
                'application/json': {
                    schema: (0, serviceResponse_1.ServiceResponseSchema)(schema),
                },
            },
        },
    };
}
exports.createApiResponse = createApiResponse;
// Use if you want multiple responses for a single endpoint
// import { ResponseConfig } from '@asteasolutions/zod-to-openapi';
// import { ApiResponseConfig } from '@common/models/openAPIResponseConfig';
// export type ApiResponseConfig = {
//   schema: z.ZodTypeAny;
//   description: string;
//   statusCode: StatusCodes;
// };
// export function createApiResponses(configs: ApiResponseConfig[]) {
//   const responses: { [key: string]: ResponseConfig } = {};
//   configs.forEach(({ schema, description, statusCode }) => {
//     responses[statusCode] = {
//       description,
//       content: {
//         'application/json': {
//           schema: ServiceResponseSchema(schema),
//         },
//       },
//     };
//   });
//   return responses;
// }
