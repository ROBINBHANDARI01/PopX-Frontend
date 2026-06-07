import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  }),
);

// Using in memory for users rn

const users = [];

// register

app.post("/api/register", async (req, res) => {
  const { fullName, phone, email, password, company, isAgency } = req.body;

  const existing = users.find((u) => u.email === email);
  if (existing)
    return res.status(400).json({ message: "Email already registerd" });

  const hashPass = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now(),
    fullName,
    phone,
    email,
    password: hashPass,
    company,
    isAgency,
  };
  users.push(user);

  const token = sign(
    {
      id: user.id,
      name: user.fullName,
      email: user.email,
    },
    process.env.jwt_sec,
    { expiresIn: "1d" },
  );

  res
    .status(201)
    .json({ token, user: { name: user.fullName, email: user.email } });
});

// login

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "User Not Found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid Password" });

  const token = sign(
    { id: user.id, name: user.fullName, email: user.email },
    process.env.jwt_sec,
    { expiresIn: "1d" },
  );

  res
    .status(200)
    .json({ token, user: { name: user.fullName, email: user.email } });
});

app.get("/api/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });

  const token = auth.split(" ")[1];
  try {
    req.user = verify(token, process.env.jwt_sec);
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
