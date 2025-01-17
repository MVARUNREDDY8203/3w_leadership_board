import React, { useEffect, useState } from "react";
// const geturl = "http://localhost:3000/users";
// const claimUrl = "http://localhost:3000/claim";
const geturl = "https://threew-leadership-board.onrender.com/users";
const claimUrl = "https://threew-leadership-board.onrender.com/claim";
const UserList = () => {
    const [data, setData] = useState(null);
    const [history, setHistory] = useState(null);
    function fetchinfo() {
        return fetch(geturl)
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            })
            .then((data) => {
                const sortedData = data.userdata.users.sort(
                    (x, y) => y.points - x.points
                );
                const sortedHistory = data.userdata.history.sort(
                    (x, y) => y.timestamp - x.timestamp
                );
                setHistory(sortedHistory);
                setData(sortedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        fetchinfo();
    }, []);
    function claimPoints(uid) {
        return fetch(claimUrl, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: uid,
            }),
        })
            .catch((err) => {
                console.log(err);
                return;
            })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
                return;
            })
            .then((res) => {
                console.log(res);
                fetchinfo();
            });
    }
    return (
        data && (
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "100px",
                        marginRight: "100px",
                        fontWeight: "bolder",
                        fontSize: "30px",
                    }}
                >
                    <div>Ranking</div>
                    <div>userId</div>
                    <div>Username</div>
                    <div>Points</div>
                    <div>Claim points</div>
                </div>
                {data.map((x, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginLeft: "100px",
                            marginRight: "100px",
                        }}
                    >
                        <div>{idx + 1}</div>
                        <div>{x.userId}</div>
                        <div>{x.username}</div>
                        <div>{x.points}</div>
                        <button
                            onClick={() => {
                                console.log(x.userId);
                                claimPoints(x.userId);
                            }}
                        >
                            Claim points
                        </button>
                    </div>
                ))}
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginLeft: "100px",
                            marginRight: "100px",
                            fontWeight: "bolder",
                            fontSize: "30px",
                        }}
                    >
                        <div>Time of transaction</div>
                        <div>userid</div>
                        <div>claimed points</div>
                    </div>
                    {history &&
                        history.map((x, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    marginLeft: "100px",
                                    marginRight: "100px",
                                }}
                            >
                                <div>{Date(x.transaction_time).toString()}</div>
                                <div>{x.id}</div>
                                <div>{x.claimed}</div>
                            </div>
                        ))}
                </div>
            </div>
        )
    );
};
export default UserList;
