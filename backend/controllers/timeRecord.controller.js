import TimeRecord from "../models/timeRecord.model.js";

export const createTimeRecord = async (req, res) => {
    try {
        const { amount, date, description, timeDonationId } = req.body;

        const timeRecord = new TimeRecord({
            amount,
            date,
            description,
            timeDonation: timeDonationId,
        });

        await timeRecord.save();

        res.status(201).json(timeRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
