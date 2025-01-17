const express = require("express");
const fs = require("fs");
const cors = require("cors");
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", function (req, res) {
    res.send({
        message: "hello world",
    });
});
function promisified_read_file(resolve, reject) {
    fs.readFile("db.json", "utf-8", function (err, data) {
        if (err) {
            return reject(err);
        }
        resolve(data);
    });
}
function readfile() {
    return new Promise(promisified_read_file);
}
app.get("/users", function (req, res) {
    readfile()
        .then((data) => {
            res.send({
                message: "success",
                userdata: JSON.parse(data),
            });
        })
        .catch((err) => {
            res.send({
                message: "Error",
                error: err,
            });
        });
});
function updatefile(userId) {
    return new Promise((resolve, reject) => {
        let contents;
        fs.readFile("db.json", "utf-8", (err, data) => {
            if (err) {
                return reject(err);
            }
            contents = JSON.parse(data);
            let user = contents.users.find((u) => u.userId == userId);
            let increment = Math.floor(Math.random() * 10);
            user.points += increment;
            contents.history.push({
                id: user.userId,
                claimed: increment,
                transaction_time: Date.now(),
            });
            fs.writeFile(
                "db.json",
                JSON.stringify(contents, null, 2),
                (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(contents);
                }
            );
        });
    });
}
app.patch("/claim", function (req, res) {
    updatefile(req.body.userId)
        .then((data) => {
            res.send({ message: "successs" });
        })
        .catch((err) => {
            res.send({ message: "error", error: err });
        });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
