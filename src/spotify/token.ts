export interface Token {
  token: string | null;
  currentTime: Date | null;
  expiresIn: Date | null;
}

let token: Token = {
  token: null,
  currentTime: null,
  expiresIn: null,
};

export const setToken = (newToken: string): void => {
  const tokenTime = new Date();
  const expiresIn = new Date(tokenTime.getTime() + 3600 * 1000);
  token = {
    token: newToken,
    currentTime: tokenTime,
    expiresIn,
  };
};

export const getToken = (): Token => {
  return token;
};
