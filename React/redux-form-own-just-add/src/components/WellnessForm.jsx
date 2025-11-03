import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntry } from "../redux/wellnessSlice";

function WellnessForm() {
  const [input, setInput] = useState("");
  //checkbox
  const hydration = [
    { id: "Water", name: "Water" },
    { id: "Juice", name: "Juice" },
    { id: "Tea", name: "Tea" },
    { id: "Coffee", name: "Coffee" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions);

  const [selectedRadio, setSelectedRadio] = useState("");
  console.log(selectedRadio);

  const handleChecked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((item) => item !== value));
    }
  };
  //slider
  const [sliderValue, setSliderValue] = useState(8);
  console.log(sliderValue);

  const [inputNumber, setInputNumber] = useState("");

  const [goalChecked, setGoalChecked] = useState(false);

  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();

    if (!input || selectedOptions.length === 0 || !selectedRadio) {
      alert("Please fill Name, Mood, and Screen Time.");
    }
    const newSubmit = {
      input,
      selectedOptions,
      selectedRadio,
      sliderValue,
      inputNumber,
      goalChecked: goalChecked ? "Yes" : "No",
    };
    dispatch(addEntry(newSubmit));
    setInput("");
    setSelectedOptions([]);
    setSelectedRadio("");
    setSliderValue(8);
    setInputNumber("");
    setGoalChecked("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleForm}>
        {/* input fiuld */}
        <input
          type="text"
          placeholder="Enter name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {/* checkbox */}
        <p name="check">Hydration</p>
        {hydration.map((drink) => (
          <div>
            <label key={drink.id}>
              <input
                type="checkbox"
                name="check"
                value={drink.name}
                checked={selectedOptions.includes(drink.id)}
                onChange={handleChecked}
              />
              {drink.name}
            </label>
          </div>
        ))}
        {/* radioButton */}
        <p name="radioBtn">Mood</p>
        <label>
          <input
            type="radio"
            name="radioBtn"
            value="Happy"
            checked={selectedRadio === "Happy"}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          Happy
        </label>
        <label>
          <input
            type="radio"
            name="radioBtn"
            value="Neutral"
            checked={selectedRadio === "Neutral"}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          Neutral
        </label>
        <label>
          <input
            type="radio"
            name="radioBtn"
            value="Sad"
            checked={selectedRadio === "Sad"}
            onChange={(e) => setSelectedRadio(e.target.value)}
          />
          Sad
        </label>
        {/* slider */}
        <label htmlFor="slider">Sleep Hours:</label>
        <input
          type="range"
          id="slider"
          min="0"
          max="12"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
        />

        <label htmlFor="screenTime">screen time (hrs):</label>
        <input
          type="number"
          id="screenTime"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <p>Goal Completed:</p>
        <label>
          <input
            type="checkbox"
            checked={goalChecked}
            onChange={(e) => setGoalChecked(e.target.checked)}
          />
          {goalChecked ? "Yes" : "No"}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default WellnessForm;
