const envConfig = {
  SCOPE: process.env.AUTH_DUENDEIDENTITYSERVER6_SCOPE,
  CLIENT_ID: process.env.AUTH_DUENDEIDENTITYSERVER6_ID,
  CLIENT_SECRET: process.env.AUTH_DUENDEIDENTITYSERVER6_SECRET,
  ISSUER: process.env.AUTH_DUENDEIDENTITYSERVER6_ISSUER,
  NEXTAUTH_URL: process.env.AUTH_URL,
  REDIRECT_URL: process.env.AUTH_DUENDEIDENTITYSERVER6_REDIRECT_URL,
};

export const {
  SCOPE,
  CLIENT_ID,
  CLIENT_SECRET,
  ISSUER,
  NEXTAUTH_URL,
  REDIRECT_URL,
} = envConfig;
