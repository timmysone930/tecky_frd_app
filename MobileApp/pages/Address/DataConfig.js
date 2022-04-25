const HKdata = require("./HKGS_Dataset_2019-District.json")
// const HKDistricts = [...new Set(HKdata.features.map(function (item:any) {
//     return item.properties.DISTRICT_T
// }))]
const HKDistricts= {};
for (let item of HKdata.features) {
    result[item.properties.DISTRICT_T] = {
        DISTRICT_T: item.properties.DISTRICT_T,
        DISTRICT_E: item.properties.DISTRICT_E,
        CNAME: item.properties.CNAME,
        ENAME: item.properties.ENAME
    }
}

export default HKDistricts
// console.log(HKdata.features[1].properties.DISTRICT_T)
// console.log(result)