const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const cors = require('cors');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(express.json());

app.use(cors());

app.post('/calculate-distance', async (req, res) => {
  const { fromDistrict, fromState, toDistrict, toState } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Calculate the distance between ${fromDistrict}, ${fromState} and ${toDistrict}, ${toState} and give the value in kms only. then print carbon footprint from ${fromDistrict} to ${toDistrict} through different modes of transport like flight, train, bus, car, bike. 1st line of the output should have the value with units, next line should show "Carbon Footprint for Different Modes of Transport" and next consecutive lines should print the carbonfoot prints, give output in this format
                        Distance between ${fromDistrict}, ${fromState} and ${toDistrict}, ${toState} = ___ kms
                        Carbon Footprint for Different Modes of Transport
                        Flight: ___kg CO2e
                        Train: ___kg CO2e
                        Bus: ___kg CO2e
                        Car: ___kg CO2e
                        Bike: ___kg CO2e`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ distance: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/submit-suggestion', async (req, res) => {
  const { fromDistrict, fromState, toDistrict, toState, carbonFootprint, numberOfPeople, mealOptions, modeOfTravel } = req.body;
  const selectedMealOptions = Object.entries(mealOptions)
    .filter(([_, value]) => value)
    .map(([key]) => key);

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `suggest all the restaurants and hotels separately for ${selectedMealOptions.join(', ')} when ${modeOfTravel} is the mode of travel and calculate the carbonfootprint for ${numberOfPeople} people if the user uses that on the way from ${fromDistrict}, ${fromState} to ${toDistrict}, ${toState}. give carbon foot print in kg CO2e. 
                  give seperately for given meal optinsthat u can take from ${selectedMealOptions.join(', ')}
                  for the 1st meal, give restaurant and hotels and go to the next
                  give in the following formate without any * in the result          

                  For Breakfast/Lunch/Dinner :
                  "Hotels":
                  1. Hotel name - location - __Kg CO2e for ${numberOfPeople} people
                  2. Hotel name - location - __Kg CO2e for ${numberOfPeople} people......

                  Restaurants:
                  1. Restaurant name - location - __Kg CO2e for ${numberOfPeople} people
                  2. Restaurant name - location - __Kg CO2e for ${numberOfPeople} people.........

                  always give results in numbered order
                  give the carbon footprints upto 2 decimal values
                  i should be able to access the carbon footprint value

                  element in a new line

                  dont add any ** in the response and topics should be in seperate line
                  1st line should have the topic Hotels:
                  then the following lines should have the the suggestions and same for the restaurants
                  each result should be in a new line

                 

                  It sould be in the form

                
                

                  Always give correct value

                    `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ suggestion: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/suggest-ecofriendly', async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const { fromDistrict, fromState, toDistrict, toState} = req.body;
  const prompt = `Suggest some Eco friendly places to visit on the way from ${fromDistrict}, ${fromState} to ${toDistrict}, ${toState} . give answer in points.give a maximum of 7 points. dont have any * in the answer. 
                    give the result in the format
                    name - place - description about the place.
                    
                    do not add any other symbols in the answer`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    res.json({ distance: text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/", async (req, res) => {
  return res.status(200).send({ "Message": "ok" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
