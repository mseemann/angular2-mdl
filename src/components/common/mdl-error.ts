/**
 * Wrapper for mdl error messages.
 */
export class MdlError extends Error {
  constructor(value: string) {
    super();
    super.message = value;
  }
}
