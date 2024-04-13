export const parseCampign = (req, res, next) => {
    try {
        console.log(req.body);
        if (req.body.timeGoal) {
            req.body.timeGoal = parseInt(req.body.timeGoal);
        }

        if (req.body.timeGoalPeriod) {
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
        console.log(req.body);
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
