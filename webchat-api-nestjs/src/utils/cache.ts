import { ICache } from 'tnwx';

export class DefaultCache implements ICache {

  private map: Map<string, string> = new Map<string, string>();

  async get(key: string): Promise<string> {
    return this.map.get(key) || '';
  }

 set(key: string, jsonValue: string): any {
    this.map.set(key, jsonValue);
  }

  remove(key: string): any {
    this.map.delete(key);
  }
}
