import NextAuth from "next-auth";
export const dynamic = 'force-dynamic';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("رقم الهاتف وكلمة المرور مطلوبان");
        }

        const user = await prisma.user.findUnique({
          where: { phone: credentials.phone },
          include: { store: true }
        });

        if (!user || !user.password) {
          throw new Error("المستخدم غير موجود");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("كلمة المرور غير صحيحة");
        }

        if (!user.isActive) {
          throw new Error("هذا الحساب موقوف حالياً");
        }

        return {
          id: user.id,
          name: user.fullName,
          email: user.email,
          userType: user.userType,
          store: user.store
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.userType = user.userType;
        token.store = user.store;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.userType = token.userType;
        session.user.store = token.store;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
