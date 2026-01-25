const vehicleFuelInfoModel = require('../models/vehicleFuelInfo');
const rideModel = require('../models/ride');
const fuelUpModel = require('../models/fuelUp');


const vehicleInfo = async (req) => {
    const vehicleId = req.body.vehicleId;
    let noOfFuelUps = await fuelUpModel.countDocuments({ vehicleId: vehicleId });
        // const vehicleId = req.body.vehicleId;
    const totalAmount = await fuelUpModel.find(
        { vehicleId: vehicleId },
        { amount: 1, _id: 0 });
    const amountResult = totalAmount.map(item => item.amount);
    console.log("Function: Total amount Spent: ", amountResult);
    const sumTotalAmount = amountResult.reduce((acc, curr) => acc + curr, 0);
    console.log("Function: Sum of Total amount Spent: ", sumTotalAmount);

    const totalLiters = await fuelUpModel.find({ vehicleId: vehicleId },
        { liters: 1, _id: 0 });
    const litersResult = totalLiters.map(item => item.liters);
    console.log("Function: Total Liters of Fuel: ", litersResult);
    const sumTotalLiters = litersResult.reduce((acc, curr) => acc + curr, 0);
    console.log("Function: Sum of Total Liters of Fuel: ", sumTotalLiters);
    // console.log(`Total no of Fuel ups on VehicleId: ${vehicleId},`, noOfFuelUps);

    const rideDistance = await rideModel.find({ vehicleId: vehicleId },
        { distance: 1, _id: 0 });
    const totalRideDistance = rideDistance.map(item => item.distance);
    console.log("Total rides Distances:", totalRideDistance);

    // Get all the FuelUp distances by Vehicle I'd in form of an Array,
    const fuelUpDistance = await fuelUpModel.find({ vehicleId: vehicleId },
        {tripDistance: 1, _id:0});
    const totaFuelUpDistance = fuelUpDistance.map(item => item.tripDistance);
    console.log("Total Fuel Up Distances:", totaFuelUpDistance);

    // sum all the Ride distances in a single Array,
    const sumRide = totalRideDistance.reduce((acc, curr) => acc + curr, 0);

    // sum all the FuelUp distances in a single Array,
    const sumFuelUp = totaFuelUpDistance.reduce((acc, curr) => acc + curr, 0);

    // For sum of sumRide and sumFuelUp to get total Kms Driven as a Single Result,
    const totalDistance = sumRide + sumFuelUp;

    const litersPer100Km = (sumTotalLiters / totalDistance) * 100;

    return {
        totalFuelUps: noOfFuelUps,
        totalAmountSpent: sumTotalAmount,
        totalLitersOfFuel: sumTotalLiters,
        totalKmsDriven: totalDistance,
        litersPer100Km: litersPer100Km
    };
};


module.exports = {
    vehicleInfo
};
