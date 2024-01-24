const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;

// Function to read the doctor's availability from the JSON file
const readAvailabilityData = async () => {
    try {
        const data = await fs.readFile('Availability.json', 'utf8');
        return JSON.parse(data)?.availabilityTimings || {};
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        throw err; // Rethrow the error for proper handling in the route
    }
};

app.get('/doctor-availability', async (req, res) => {
    const { date, time } = req.query;

    // Validate date and time formats
    const requestedDate = new Date(date);
    const requestedTime = new Date(`1970-01-01T${time}`);

    if (isNaN(requestedDate) || isNaN(requestedTime)) {
        return res.status(400).json({ error: 'Invalid date or time format.' });
    }

    const dayOfWeek = requestedDate.getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    try {
        // Read availability data asynchronously
        const availabilityTimings = await readAvailabilityData();

        const availability = availabilityTimings[days[dayOfWeek]] || [];

        if (availability.some(slot => time >= slot.start && time <= slot.end)) {
            res.json({ isAvailable: true });
        } else {
            // Find the next available slot
            const nextAvailability = days
                .map(day => availabilityTimings[day])
                .find(slots => slots && slots.length > 0);

            if (nextAvailability) {
                const nextAvailableSlot = {
                    date: new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toISOString().split('T')[0],
                    time: nextAvailability[0].start,
                };
                res.json({ isAvailable: false, nextAvailableSlot });
            } else {
                res.json({ isAvailable: false });
            }
        }
    } catch (error) {
        console.error(`Error processing the request: ${error}`);
        res.status(500).json({ error: 'Error processing the request.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
