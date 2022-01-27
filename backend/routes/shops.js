var express = require("express");
var router = express.Router();
const vendor = require("../models/vendor");

router.get("/", (req, res) => {
    // find the vendor and send back arrays of open and closed vendor 
    vendor
        .find()
        .then((vendor_found) => {
            let open = []
            let closed = []
            let current = new Date()
            let hrs = current.getHours()
            let mins = current.getMinutes()
            let time = hrs * 60 + mins
            vendor_found.forEach(ven => {
                let o = ven.open_time
                let c = ven.close_time
                let o_hrs = parseInt(o.split(":")[0])
                let o_mins = parseInt(o.split(":")[1])
                let c_hrs = parseInt(c.split(":")[0])
                let c_mins = parseInt(c.split(":")[1])
                let o_time = o_hrs * 60 + o_mins
                let c_time = c_hrs * 60 + c_mins
                if (o_time < c_time) {
                    if (time >= o_time && time <= c_time) {
                        open.push(ven.email)
                    }
                    else {
                        closed.push(ven.email)
                    }
                }
                else {
                    // open in evening and closes in the morning    
                    if (time >= o_time || time <= c_time) {
                        open.push(ven.email)
                    }
                    else {
                        closed.push(ven.email)
                    }
                }
            })
            res.status(200).send({ open: open, closed: closed })
        })
        .catch((err) => res.status(404).json(err));
});

module.exports = router;
