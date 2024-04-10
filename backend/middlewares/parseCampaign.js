export const parseCampign = (req, res, next) => {
    try {
        if (req.body.timeGoal) {
            req.body.timeGoal = parseInt(req.body.timeGoal);
        }
        if (req.body.financialGoal) {
            req.body.financialGoal = parseInt(req.body.financialGoal);
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
