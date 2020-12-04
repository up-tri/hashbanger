export class URLHashbangItem {
  public key: string;
  public value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public toString() {
    return `${this.key}=${this.value}`;
  }
}

export default class URLHashbang {
  private delimiter = '&';
  private bangs: URLHashbangItem[] = [];

  constructor(hash: string = null, delimiter = '&') {
    this.delimiter = delimiter;
    if (hash === null) {
      return;
    }

    const splittedHashString = hash.split('!', 2);
    if (splittedHashString.length == 2) {
      splittedHashString[1].split(this.delimiter).forEach(item => {
        const keyAndValue = item.split('=');
        if (keyAndValue.length === 2) {
          this.bangs.push(new URLHashbangItem(keyAndValue[0], keyAndValue[1]));
        }
      });
    }
  }

  public append(key: string, value: string): void {
    if (key === '') {
      return;
    }
    this.bangs.push({ key, value });
  }

  public delete(key: string): void {
    if (key === '') {
      return;
    }
    for (const item of this.bangs) {
      if (item.key === key) {
        delete this.bangs[this.bangs.indexOf(item)];
      }
    }
  }

  public entries(): URLHashbangItem[] {
    return this.bangs;
  }

  public get(key: string): string {
    if (key === '') {
      return;
    }
    return this.bangs.find(item => item.key === key)?.value;
  }

  public getAll(key: string): string[] {
    if (key === '') {
      return;
    }
    return this.bangs.filter(item => item.key === key).map(item => item.value);
  }

  public has(key: string) {
    for (const item of this.bangs) {
      if (item.key === key) return true;
    }
    return false;
  }

  public keys(): string[] {
    return this.bangs.map(item => item.key);
  }

  public set(key: string, value: string) {
    if (key === '') {
      return;
    }
    this.bangs.filter(item => item.key !== key);
    this.append(key, value);
  }

  public sort() {
    this.bangs.sort((left, right) => {
      if (left.key < right.key) {
        return -1;
      }
      if (left.key === right.key) {
        return 0;
      }
      return 1;
    });
  }

  public toString(): string {
    return this.bangs
      .map(item => `${item.key}=${item.value}`)
      .join(this.delimiter);
  }
}
