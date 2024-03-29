# Doctor-Availability-Finder



## Project Description :

Description:
Developed an API that provides the availability of a doctor on a specified date and time. The API
will accept two inputs, the date and time, and return whether the doctor is available or not. If the
doctor is not available on the specified date and time, the API should return the nearest
available date and time.The availability timings of the doctor is provided in a json below.
{
  "availabilityTimings": {
    "monday": [
      {
        "start": "08:30",
        "end": "11:45"
      }
    ],
    "tuesday": [
      {
        "start": "09:00",
        "end": "12:30"
      },
      {
        "start": "14:00",
        "end": "17:30"
      }
    ],
    "wednesday": [
      {
        "start": "10:00",
        "end": "13:15"
      }
    ],
    "thursday": [],
    "friday": [
      {
        "start": "08:30",
        "end": "12:00"
      }
    ],
    "saturday": [
      {
        "start": "11:00",
        "end": "14:30"
      }
    ],
    "sunday": []
  }
}

.
Endpoint:
GET /doctor-availability
Query Parameters:
date: string (required) - The date for which the availability is being queried (in the format
"YYYY-MM-DD").
time: string (required) - The time for which availability is being queried (in 24-hour format
"hh:mm").
Response:
If the doctor is available on the requested date and time, the response will be:
{ "isAvailable": true }
If the doctor is not available on the requested date and time, the response will be:
{
"isAvailable": false,
"nextAvailableSlot": {
"date": "YYYY-MM-DD",
"time": "hh:mm"
}
}
Where nextAvailableSlot.date is the next available calendar date, and nextAvailableSlot.time is
the start time against the first slot available.


## Technologies :
This project uses the following technologies :-

**Backend** :-
            Nodejs,
            Express,
            Dynamic JSON


           

**Api's**   :-  
             
    with GET request For Backend on your local system =  http://localhost:3000/doctor-availability

              
## Project Cloning and Running

Clone the project

```bash
  git clone 
```

Go to the project directory

```bash
  cd Doctor-Availability-Finder
```

Install dependencies on Main  folder

```bash
  npm install
```

### Starting the server :  
i) To run, open terminal on server folder and write command
```bash
  nodemon index.js
```

##  

Your Project will Successufully Running now ,
        If not running then make sure to adjust nodejs version : try node v14.20.1 

## SAMPLE REQUEST & RESPONSE:

1. Request : { “date”:”2023-04-12”,”time”:”11:00”}
Response:
{
"isAvailable": true
}
2. Request : { "date":"2023-04-12","time":"9:00"}
Response:
{
"isAvailable": false,
"nextAvailableSlot": {
"date": "2023-04-12",
"time": "10:15"
}
}
3. Request : { “date”:”2023-04-17”,”time”:”12:00”}
Response:
{
"isAvailable": false,
"nextAvailableSlot": {
"date": "2023-04-17",
"time": "14:15"
}
}   




## Creater

- [@Mo faishal Qureshi](https://github.com/faizqrs)




## Feedback

If you have any feedback, please reach out to me at
faisalqrs19@gmail.com 


