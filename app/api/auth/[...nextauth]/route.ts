import NextAuth, { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/db';
import { sha256 } from 'js-sha256';

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

        const randomUsername = () => {
          return (
            message.user.name?.split(' ')[0].toLowerCase() + String(Date.now())
          );
        };

        let username = randomUsername();
        let duplicateUsername = await prisma.user.findUnique({
          where: {
            username: username,
          },
        });
        while (!!duplicateUsername) {
          username = randomUsername();
          duplicateUsername = await prisma.user.findUnique({
            where: {
              username: username,
            },
          });
        }

        await prisma.user.update({
          where: {
            id: id,
          },
          data: {
            username: username,
            image: message.user.email
              ? sha256(message.user.email.toLowerCase())
              : '',
          },
        });
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
