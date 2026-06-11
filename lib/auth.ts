import { SignJWT, jwtVerify } from "jose";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new TextEncoder().encode("portfolio_mhafizsuryadinata_secret_key_987654321_secure");
  }
  return new TextEncoder().encode(secret);
};

export async function createSessionToken(payload: { userId: string; username: string }) {
  const secret = getJwtSecret();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as { userId: string; username: string };
  } catch (error) {
    return null;
  }
}
