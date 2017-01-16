// 20170113141955
// http://linksmart.cnet.se:8124/patient/xyz223/careplan

(function (careplan) { 
    careplan.jsondata = {
        "CarePlan": {
            "goal": "Lower Bloodpressure",
            "period": {
                "start": "2016-10-12",
                "end": "2016-11-24"
            },
            "activities": {
                "activity": [
                  {
                      "activityType": "StepsObservation",
                      "description": "Walk 5000 steps per day",
                      "when": {
                          "@period": "",
                          "@periodUnits": "",
                          "text": "HS"
                      },
                      "stepsRange": {
                          "min": "5000",
                          "max": "999999"
                      },
                      "device": {
                          "manufacturer": "Apple",
                          "model": "Apple Watch V2"
                      }
                  },
                  {
                      "activityType": "BloodPressureObservation",
                      "description": "Take Bloodpressure",
                      "when": {
                          "@period": "30",
                          "@periodUnits": "min",
                          "text": "PCV"
                      },
                      "systolicRange": {
                          "min": "100",
                          "max": "130"
                      },
                      "diastolicRange": {
                          "min": "50",
                          "max": "90"
                      },
                      "device": {
                          "manufacturer": "A&D Medical",
                          "model": "UA-767NFC"
                      }
                  }
                ]
            }
        }
    }; 

}(module.exports));