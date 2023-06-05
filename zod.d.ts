declare module 'zod' {
    export const z: any;
    export class ZodError extends Error {
      errors: any[];
    }
  }
  