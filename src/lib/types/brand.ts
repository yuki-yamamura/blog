export declare class Brand<T extends symbol> {
  private readonly __brand: {
    readonly [K in T]: unknown;
  };
}
