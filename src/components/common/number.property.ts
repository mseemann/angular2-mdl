function numberProperty() {

  return function numberFieldValueMetadata(target: any, key: string): void {
    const defaultValue = target[key];
    const localKey = `__mdl_private_symbol_${key}`;
    target[localKey] = defaultValue;

    Object.defineProperty(target, key, {
      get() { return (<any>this)[localKey]; },
      set(value: number|string) {
        if (typeof value === 'undefined' ) {
          value = null;
        } else if ( typeof value === 'string') {
          value = parseInt(<string>value);
        }
        (<any>this)[localKey] = value;
      }
    });
  };
}

export {numberProperty as NumberProperty};
