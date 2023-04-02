import bcrypt from "bcrypt"
import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { Strategy as LocalStrategy } from "passport-local"

// local imports
import config from "./config"
import prisma from "./prisma"
const BCRYPT_SALT_ROUNDS = 12
// Register
passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        let userFound = await prisma.users.findFirst({
          where: {
            username,
          },
        })
        if (userFound) done(null, false, { message: "Username already taken" })
        else {
          const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
          const user = await prisma.users.create({
            data: {
              username,
              password: hashedPassword,
            },
          })
          done(null, user)
        }
      } catch (error) {
        done(error)
      }
    }
  )
)

// Login
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const userFound = await prisma.users.findFirst({
          where: {
            username,
          },
        })
        if (!userFound) done(null, false, { message: "Bad username" })
        else {
          const isVerified = await bcrypt.compare(password, userFound.password)
          if (isVerified) {
            done(null, userFound)
          } else {
            done(null, false, { message: "Password do not match" })
          }
        }
      } catch (error) {
        done(error)
      }
    }
  )
)

// JWT for all authenticated route
passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const userFound = await prisma.users.findFirst({
          where: {
            id: jwtPayload.id,
          },
        })

        if (!userFound) {
          done(null, false, { message: "Authorization failed" })
        } else {
          done(null, userFound)
        }
      } catch (error) {
        done(error)
      }
    }
  )
)
