const express = require("express");
const { PrismaClient } = require("@prisma/client");
const referralRoutes = require("./routes/referralRoutes");
const cors = require("cors");
const app = express();
const prisma = new PrismaClient();
const { exec } = require("child_process");

require("../config/migrate");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check database connection
prisma
    .$connect()
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    });

// Use referral routes
app.use("/api/referrals", referralRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
