const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

function buildDropDown() {

    // get all the events that we know about
    let currentEvents = getEvents();

    // get a list of unique city names
    let eventCities = currentEvents.map(event => event.city);
    let uniqueCities = new Set(eventCities);
    let dropdownChoices = ['All', ...uniqueCities];

    const dropdownTemplate = document.getElementById('dropdown-item-template');
    const dropdownMenu = document.getElementById('city-dropdown')
    dropdownMenu.innerHTML = '';

    // for each of those city names:
    for (let i = 0; i < dropdownChoices.length; i++) {

        let cityName = dropdownChoices[i];

        // - make a dropdown item HTML element
        let dropdownItem = dropdownTemplate.content.cloneNode(true);

        // let dropdownItem = <li><a class = "dropdown-item" href="#"></a></li>
        dropdownItem.querySelector('a').innerText = cityName;

        // - add that element to the dropdown menu
        dropdownMenu.appendChild(dropdownItem);
    }

    // to be continued...?
    displayEvents(currentEvents);
    displayStats(currentEvents);
    document.getElementById('stats-location').textContent = 'All';
}

function getEvents() {

    let eventsJson = localStorage.getItem('mba-events');

    let storedEvents = events;

    if (eventsJson == null) {
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }

    return storedEvents;
}

function saveEvents(events) {
    
    let eventsJson = JSON.stringify(events);

    localStorage.setItem('mba-events', eventsJson);

}

function displayEvents(events) {

    // get the table to put the events in
    const eventTable = document.getElementById('events-table');

    // clear the table
    eventTable.innerHTML = '';

    // loop through events
    for (let i = 0; i < events.length; i++) {
        let event = events[i];
        // - fill the table with rows 
        //      - make a <tr></tr>
        let eventRow = document.createElement('tr');
        //      - make a <td> for each property
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        let date = new Date(event.date);
        eventDate.innerText = date.toLocaleDateString(undefined, { dateStyle: 'long' });
        eventRow.appendChild(eventDate);

        //      - put the data into each <td>
        //      -append the row to the <tbody>
        eventTable.appendChild(eventRow);
    }
}


// The 4 Functions below is a long form version of the revised 5th function, which is more efficient and does what all 4 of the others do.

// function sumAttendance(events) {
//     let sum = 0;

//     for(let i = 0; i < events.length; i++) {
//         let event = events[i];

//         sum = sum + event.attendance;
//     }

//     return sum;
// }

// function avgAttendance(events) {
//     //TODO: calculate the average attendance and return it
//     let sum = 0;

//     for(let i = 0; i < events.length; i++) {
//         let event = events[i];

//         sum = sum + event.attendance;
//     }

//     let average = sum / events.length;

//     return average;
// }

// function minAttendance() {
//     let currentEvents = getEvents();
//     let eventAttendance = currentEvents.map(event => event.attendance);
//     let uniqueAttendance = new Set(eventAttendance);
//     let attendanceNumbers = ['All', ...uniqueAttendance];

//     let min = events[0].attendance;

//     for (let i = 0; i < attendanceNumbers.length; i++) {
//         if (min > attendanceNumbers[i]) {
//             min = attendanceNumbers[i];
//         }

//     }

//     return min;
// }

// function maxAttendance() {
//     let currentEvents = getEvents();
//     let eventAttendance = currentEvents.map(event => event.attendance);
//     let uniqueAttendance = new Set(eventAttendance);
//     let attendanceNumbers = ['All', ...uniqueAttendance];

//     let max = 0;

//     for (let i = 0; i < attendanceNumbers.length; i++) {
//         if (max < attendanceNumbers[i]) {
//             max = attendanceNumbers[i];
//         }

//     }

//     return max;
// }

function calculateStats(events) {

    let sum = 0;
    let max = 0;
    //events[0].attendance takes the first number index in the array, instead of setting to 0.
    let min = events[0].attendance;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum = sum + event.attendance; //calculate sum

        if (min > event.attendance) { //calculate smallest number in the array
            min = event.attendance;
        }

        if (max < event.attendance) { //calculate largest number in the array
            max = event.attendance;
        }
    }

    let average = sum / events.length; //calculate average of the sum of all numbers

    let stats = { //make an object for all 4 variables
        sum,
        average,
        min,
        max
    }

    return stats; //return the object with all 4 values

}


function displayStats(events) {
    let stats = calculateStats(events);
    // calculating and displaying the total attendance
    // let total = sumAttendance(events); <=== this is what I used when using the 4 independent functions
    document.getElementById('total-attendance').innerHTML = stats.sum.toLocaleString();

    // calculating and displaying the avg attendance
    // let average = avgAttendance(events); <=== this is what I used when using the 4 independent functions
    document.getElementById('avg-attendance').textContent = Math.round(stats.average).toLocaleString();
    // calculating and displaying the min attendance
    // let min = minAttendance(events); <=== this is what I used when using the 4 independent functions
    document.getElementById('least-attended').innerHTML = stats.min.toLocaleString();

    // calculating and displaying the max attendance
    // let max = maxAttendance(events); <=== this is what I used when using the 4 independent functions
    document.getElementById('max-attended').innerHTML = stats.max.toLocaleString();
}

function filterByCity(element) {

    // //figure out which city we want
    let cityName = element.textContent;

    document.getElementById('stats-location').innerHTML = cityName;
    

    // //get all the events
    let allEvents = getEvents();

    // //filter those events to just one city
    let filteredEvents = [];

    // for (let i = 0; i < allEvents.length; i++) {
    //     let event = allEvents[i];

    //     if (event.city == cityName || cityName == 'All') {
    //         filteredEvents.push(event);
    //     }
    // }

    //shorthand version of above for loop
    if (cityName == 'All') {
        filteredEvents = allEvents;
    } else {
        filteredEvents = allEvents.filter(event => event.city == cityName);
    }
    
       

    //call displayStats with the events for that city
    displayStats(filteredEvents);
    //call displayEvents with the events for that city
    displayEvents(filteredEvents);
}

function saveNewEvent() {
    // get the html form element
    let newEventForm = document.getElementById('newEventForm');
    //create an object from the <input>s
    let formData = new FormData(newEventForm);
    
    // <input name="city" value="Kernersville" />
    // let newEvent = { city: 'Kernersville'};
    let newEvent = Object.fromEntries(formData.entries());

    // fix the formats of the data
    newEvent.attendance = parseInt(newEvent.attendance);
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    // get all the current events
    let allEvents = getEvents();
    // add our new event
    allEvents.push(newEvent);
    // save all events with the new event
    saveEvents(allEvents);

    // reset the form inputs
    newEventForm.reset();

    // hide the Bootstrap modal
    let modalElement = document.getElementById('addEventModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    // display all events again
    buildDropDown();
}