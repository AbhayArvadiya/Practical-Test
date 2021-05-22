const User = require("../models/User"),
    { LANGUAGES } = require("../domain/languages");


/***********************************************************
 * users function return the all the users
 * Method: GET
 *
 * Return:
 * 	- 200: Success
 * 	- 404: Not Found
 * 	- 500: Server error
 ***********************************************************/
const users = (request, response) => {

    let { page } = request.query;

    if (isNaN(page)) return response.status(400).json({ error: LANGUAGES.en.MISSING_FILDS });

    let query = [{
        $match: {
                _id: {
                    $ne: request.user._id,
                },
            },
        },
        { $sort: { "_id": -1 } },
        {
            $lookup: {
                from: "profiles",
                localField: "_id",
                foreignField: "user_id",
                as: "profile",
            },
        },
        {
            $unwind: "$profile",
        },
        {
            $facet: {
                metadata: [{ $count: "totalUsers" }],
                users: [
                    { $skip: page * 8 },
                    { $limit: 8 },
                    {
                        $project: {
                            _id: 1,
                            first_name: 1,
                            last_name: 1,
                            username: 1,
                            email: 1,
                            phone: 1,
                            profile_image: "$profile.profile_image",
                        },
                    },
                ],
            },
        },
        {
            $project: {
                users: 1,
                totalUsers: { $arrayElemAt: ["$metadata.totalUsers", 0] },
            },
        },
    ];

    User.aggregate(query).exec((err, users) => {
        if (err || !users) return response.status(200).json({ users: [], totalUsers: 0 });
        return response.status(200).json(users[0]);
    });
};


















//     User.find()
//         .populate("profile")
//         .sort({ _id: -1 })
//         .then(users => {
//             console.log(users,">>>>>>>>>>.")
//             if (!users || !users.length) return res.state(404).json({ message: "No users found!" });

//             return res.json({ users: users, count: users.length });
//         })
//         .catch(error => {
//             returnres.status(500).json({ error: error });
//         });
// };

module.exports = { users };