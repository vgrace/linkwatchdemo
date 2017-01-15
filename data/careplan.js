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
                      "activityType": "ActivityObservation",
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
                  },
                  {
                      "activityType": "BloodPressureObservation",
                      "description": "Take Bloodpressure",
                      "when": {
                          "@period": "30",
                          "@periodUnits": "min",
                          "text": "PCD"
                      },
                      "device": {
                          "manufacturer": "A&D Medical",
                          "model": "UA-767NFC"
                      }
                  },
                  {
                      "activityType": "BloodPressureObservation",
                      "description": "Take Bloodpressure",
                      "when": {
                          "@period": "15",
                          "@periodUnits": "min",
                          "text": "ACM"
                      },
                      "device": {
                          "manufacturer": "A&D Medical",
                          "model": "UA-767NFC"
                      }
                  },
                  {
                      "activityType": "Appointment",
                      "description": "Discussion on the results of your Blood Pressure Monitoring",
                      "time": {
                          "@start": "2016-12-10T09:00:00Z",
                          "@end": "2016-12-10T11:00:00Z"
                      },
                      "location": "Schloss Birlinghoven, Konrad-Adenauer-Straße, 53754 Sankt Augustin",
                      "attendence": {
                          "attendee": "Dr Medicus"
                      }
                  }
                ]
            }
        }
    }; 

}(module.exports));