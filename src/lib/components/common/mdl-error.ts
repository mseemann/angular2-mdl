/**
 * Wrapper for mdl error messages.
 */
export class MdlError extends Error {
  constructor(value: string) {
    super();
    super.message = value;
  }
}

export class MdlStructureError extends MdlError {
  constructor(child: string, requiredParent: string) {
    super(`"${child}" requires "${requiredParent}" as a parent.`);
  }
}
