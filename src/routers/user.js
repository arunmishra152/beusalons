const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Order = require('../models/orders')

router.post('/updateOrder', async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $lookup: {
                    from: 'Order',
                    localField: "userId",
                    foreignField: "userId",
                    as: 'UserData'
                },
            },
            {
                $unwind: '$UserData',
    
            },
            {
                $group:
                {
                    _id: { userId: '$UserData.userId', name: '$name' },
                    numberOfOrders: { $sum: 1 },
                    averagebillvalue: { $avg: '$UserData.subtotal' },
    
                },
            }
            , { $project: { 'userId': '$_id.userId', 'numberOfOrders': 1, 'name': '$_id.name','_id': 0 } },
            { $sort: { userId: 1 } }
        ])
    
        for (let userdata of user) {
            var query = {userId: userdata.userId}
            await User.findOneAndUpdate(query, { $set:  {'NoOfOrders' : userdata.numberOfOrders }})
        }
        res.status(200).send({success:true, message: "Successfully updated"});
    }
    catch (error) {
        res.status(400).send("Something went wrong")
    }
    
   
})

module.exports = router