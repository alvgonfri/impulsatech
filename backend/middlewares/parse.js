export const parseCampign = (req, res, next) => {
    try {
        if (req.body.timeGoal) {
            req.body.timeGoal = parseInt(req.body.timeGoal);
        }

        if (
            req.body.timeGoalPeriod &&
            !(req.body.timeGoalPeriod instanceof Object)
        ) {
            req.body.timeGoalPeriod = JSON.parse(req.body.timeGoalPeriod);
            if (
                req.body.timeGoalPeriod.startDate === "" ||
                req.body.timeGoalPeriod.endDate === ""
            ) {
                return res
                    .status(400)
                    .json([
                        "Por favor, introduce las fechas de inicio y fin del objetivo de tiempo",
                    ]);
            }
        }

        if (req.body.financialGoal) {
            req.body.financialGoal = parseInt(req.body.financialGoal);
        }

        if (req.body.tags) {
            req.body.tags = JSON.parse(req.body.tags);
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const parseFinancialDonation = (req, res, next) => {
    try {
        if (req.body.amount) {
            req.body.amount = parseInt(req.body.amount);
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const parseTimeDonation = (req, res, next) => {
    try {
        if (req.body.amount) {
            req.body.amount = parseInt(req.body.amount);
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const parseTimeRecord = (req, res, next) => {
    try {
        if (req.body.amount) {
            req.body.amount = parseInt(req.body.amount);
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
