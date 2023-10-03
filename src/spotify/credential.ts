export class Credential {
  private token: string | null;
  private createdAt: Date | null;
  private expiresIn: Date | null;

  constructor() {
    this.token = null;
    this.createdAt = null;
    this.expiresIn = null;
  }

  setToken(token: string, now = new Date()): void {
    this.token = token;
    this.createdAt = now;
    this.expiresIn = new Date(now.getTime() + 3600 * 1000);
  }

  getToken(): string | null {
    return this.token;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  getExpiresIn(): Date | null {
    return this.expiresIn;
  }

  hasExpired(): boolean {
    if (this.expiresIn == null) {
      return true;
    }
    return new Date() >= this.expiresIn;
  }
}

export const credential = new Credential();