function booleanProperty() {
  return function booleanFieldValueMetadata(target: any, key: string): void {
    const defaultValue = target[key];
    const localKey = `__mdl_private_symbol_${key}`;
    target[localKey] = defaultValue;

    Object.defineProperty(target, key, {
      get() { return (<any>this)[localKey]; },
      set(value: boolean) {
        (<any>this)[localKey] = value != null && `${value}` !== 'false';
      }
    });
  };
}

export {booleanProperty as BooleanProperty};
