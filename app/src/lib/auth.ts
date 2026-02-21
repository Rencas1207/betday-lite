import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password?.trim();

        if (username === 'user_01' && password === '1234BetDayLite') {
          return {
            id: 'b7e2cd3b-702c-4ef3-b2a6-7b1c706993f7',
            name: 'User 01',
            email: 'user_01@example.com'
          };
        }

        if (username === 'new_user' && password === '1234BetDayLite') {
          return {
            id: 'f868eeb5-cdb3-4c7d-a64b-8a65313db439',
            name: 'NewUser',
            email: 'empty@example.com'
          };
        }

        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
