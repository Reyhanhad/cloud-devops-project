const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Cloud DevOps API is running"
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/api/info", (req, res) => {
    res.json({
        application: "Cloud DevOps Project",
        version: "1.0.0",
        environment: "development"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});