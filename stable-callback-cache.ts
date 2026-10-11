export class StableCallbackCache {
  private readonly cache = new Map<string, () => void>();

  get(key: string, factory: () => void): () => void {
    if (!this.cache.has(key)) {
      this.cache.set(key, factory);
    }
    return this.cache.get(key)!;
  }
}
