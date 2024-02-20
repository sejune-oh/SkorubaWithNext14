const envConfig = {
  SCOPE: process.env.STS_SCOPE,
  CLIENT_ID: process.env.STS_CLIENT_ID,
  CLIENT_SECRET: process.env.STS_CLIENT_SECRET,
  ISSUER: process.env.NEXT_PUBLIC_STS_ISSUER,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  REDIRECT_URL: process.env.NEXT_PUBLIC_REDIRECT_URL,
};

export const {
  SCOPE,
  CLIENT_ID,
  CLIENT_SECRET,
  ISSUER,
  NEXTAUTH_URL,
  REDIRECT_URL,
} = envConfig;
