export const region = {
    HK: {
      eng: 'Hong Kong',
      chi: '香港',
      district: {
        CW: {
          eng: 'Central and Western District',
          chi: '中西區'
        },
        EST: {
          eng: 'Eastern District',
          chi: '東區'
        },
        WC: {
          eng: 'Wan Chai District',
          chi: '灣仔區'
        },
        STH: {
          eng: 'Southern District',
          chi: '南區'
        },
      }
    },
    KLN: {
      eng: 'Kowloon',
      chi: '九龍',
      district: {
        KLC: {
          eng: 'Kowloon City District',
          chi: '九龍城區'
        },
        KT: {
          eng: 'Kwun Tong District',
          chi: '觀塘區'
        },
        SSP: {
          eng: 'Sham Shui Po District',
          chi: '深水埗區'
        },
        WTS: {
          eng: 'Wong Tai Sin District',
          chi: '黃大仙區'
        },
        YTM: {
          eng: 'Yau Tsim Mong District',
          chi: '油尖旺區'
        },
      }
    },
    NT: {
      eng: 'New Territories',
      chi: '新界',
      district: {
        ILD: {
          eng: 'Islands District',
          chi: '離島區'
        },
        KC: {
          eng: 'Kwai Tsing District',
          chi: '葵青區'
        },
        NTH: {
          eng: 'North District',
          chi: '北區'
        },
        SK: {
          eng: 'Sai Kung District',
          chi: '西貢區'
        },
        ST: {
          eng: 'Sha Tin District',
          chi: '沙田區'
        },
        TP: {
          eng: 'Tai Po District',
          chi: '大埔區'
        },
        TW: {
          eng: 'Tsuen Wan District',
          chi: '荃灣區'
        },
        TM: {
          eng: 'Tuen Mun District',
          chi: '屯門區'
        },
        YL: {
          eng: 'Yuen Long District',
          chi: '元朗區'
        }
      }
    }
};

// Array of
export const areas = Object.values(region).map(item =>{return {chi:item.chi, eng:item.eng}})
export const districtsOfHK = Object.values(region.HK.district).map(district => district)
export const districtsOfKLN = Object.values(region.KLN.district).map(district => district)
export const districtsOfNT = Object.values(region.NT.district).map(district => district)