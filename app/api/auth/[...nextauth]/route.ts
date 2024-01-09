import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        const id = Number(message.user.id);
        const username =
          message.user.name?.split(' ')[0].toLowerCase() +
          String(Math.trunc(Math.random() * 10000000000));
        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            username: username,
          },
        });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
