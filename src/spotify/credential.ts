export class Credential {
  private token: string | null;
  private createdAt: Date | null;
  private expiresAt: Date | null;

  constructor() {
    this.token = null;
    this.createdAt = null;
    this.expiresAt = null;
  }

  setToken(token: string, expiresIn: number, now = new Date()): void {
    this.token = token;
    this.createdAt = now;
    this.expiresAt = new Date(now.getTime() + expiresIn * 1000);
  }

  getToken(): string | null {
    return this.token;
  }

  getCreatedAt(): Date | null {
    return this.createdAt;
  }

  getExpiresAt(): Date | null {
    return this.expiresAt;
  }

  hasExpired(): boolean {
    if (this.expiresAt == null) {
      return true;
    }
    return new Date() >= this.expiresAt;
  }
}

export const credential = new Credential();