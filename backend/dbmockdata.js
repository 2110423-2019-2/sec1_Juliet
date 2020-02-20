var db = require('./dbconnection');
var util = require('./util');
var tripService = require('./service/trip');
var userService = require('./service/user');
var driverService = require('./service/driver');
var adminService = require('./service/admin');
var userimage = require('./userimage')
var members = [
    {
        username: "driver1",
        password: "123456",
        firstname: "Jiraphat",
        lastname: "Khupa",
        phone_number: "0897651212",
        email: "jira@gmail.com",
    }, {
        username: "driver2",
        password: "123456",
        firstname: "Jinwara",
        lastname: "Janejane",
        phone_number: "0897651212",
        email: "jin@gmail.com",
    }, {
        username: "member1",
        password: "123456",
        firstname: "Budsakorn",
        lastname: "Khosagrid",
        phone_number: "0897651212",
        email: "ming@gmail.com",
    }, {
        username: "member2",
        password: "123456",
        firstname: "Romnalin",
        lastname: "Kitkaset",
        phone_number: "0897651212",
        email: "mil@gmail.com",
    }, {
        username: "member3",
        password: "123456",
        firstname: "Palmmanee",
        lastname: "Thappha",
        phone_number: "0897651212",
        email: "palm@gmail.com",
    }]

var trip = [
    {
        departure_detail: "Chula",
        destination_detail: "Airport",
        owner: 1,
        car_brand: "toyota",
        plate_license: "AB1234",
        capacity: 4,
        departure_province: "Bangkok",
        destination_province: "Bangkok",
        price: 20,
        start_datetime: "2020-03-09 08:00:00"
    }, {
        departure_detail: "Chula",
        destination_detail: "School",
        owner: 1,
        car_brand: "honda",
        plate_license: "CC1111",
        capacity: 2,
        departure_province: "Bangkok",
        destination_province: "Buriram",
        price: 150,
        start_datetime: "2020-03-09 10:00:00"
    }, {
        departure_detail: "Home",
        destination_detail: "School",
        owner: 2,
        car_brand: "honda",
        plate_license: "ZZ9999",
        capacity: 3,
        departure_province: "Buriram",
        destination_province: "Buriram",
        price: 15,
        start_datetime: "2020-03-10 10:00:00"
    }, {
        departure_detail: "Home",
        destination_detail: "School",
        owner: 2,
        car_brand: "honda",
        plate_license: "ZZ9999",
        capacity: 1,
        departure_province: "Buriram",
        destination_province: "Bangkok",
        price: 150,
        start_datetime: "2020-03-10 14:44:00"
    },
]
var mock = () => {
    //members
    var created_at = util.timeformatter(new Date());
    var amount = 0;
    var photo = userimage
    members.map(item => userService.register(item.username, { ...item, photo }, created_at, amount, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log("insert member username:", item.username, " and password: ", item.password)
        }
    }))

    //admin
    db.query(
        `insert into admin (username, password) values ('admin','1234')`, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("insert admin username: admin and password: 1234")
            }
        }
    );

    //request to be driver
    var drivers = [1, 2]
    drivers.map(i => {
        driverService.driverReq(i, { driving_license: "1234567890123456789012345", edited_at: created_at }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("request to be driver id: ", i)
            }
        })
    })

    //approved driver
    drivers.map(i =>
        adminService.driverApprove('admin', created_at, i, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("approved to be driver id: ", i)
            }
        })
    )

    //trip
    var departure_latitude = 13.747879
    var departure_longtitude = 100.493117
    var destination_latitude = 13.747879
    var destination_longtitude = 100.493117
    trip.map(item =>
        tripService.createTrip(created_at, { ...item, departure_latitude, departure_longtitude, destination_latitude, destination_longtitude }, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("insert trip by owner: ", item.owner)
            }
        }
        )
    )
    db.end();
}

mock()


