const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { sendMail } = require("../../config/mailer");

const createReferral = async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const referral = await prisma.referral.create({
            data: { referrerName, referrerEmail, refereeName, refereeEmail },
        });

        // Send email notification
        const subject = "Referral Received!";
        const message = `Hello ${refereeName},<br><br>You have been referred by ${referrerName}.<br><br>Best regards,<br>Your Company`;
        sendMail(refereeEmail, subject, message);

        res.status(201).json(referral);
    } catch (error) {
        res.status(500).json({ error: "Failed to create referral" });
    }
};

module.exports = {
    createReferral,
};
