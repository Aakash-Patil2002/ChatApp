const checkAuth = (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in CheckAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  
module.exports = checkAuth;
 