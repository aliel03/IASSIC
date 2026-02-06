function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ error: "Invalid token" });
    }

    res.status(500).render("error", {
        error: err,
    });
}

module.exports = { errorHandler };
