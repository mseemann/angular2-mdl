/**
 * Wrapper for mdl error messages.
 * istanbul ignore next  LCOV_EXCL_LINE
 */
export class MdlError extends Error {
  constructor(value: string) {
    /* istanbul ignore next  LCOV_EXCL_LINE */
    super(value);
  }
}

export class MdlStructureError extends MdlError {
  constructor(child: string, requiredParent: string) {
    /* istanbul ignore next LCOV_EXCL_LINE */
    super(`"${child}" requires "${requiredParent}" as a parent.`);
  }
}
