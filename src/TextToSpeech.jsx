import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const Example = () => {
  const [text, setText] = useState("Welcome");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
  };
  const { speak, cancel, supported, voices,  } =
    useSpeechSynthesis({
      onEnd,
    });
  const voice = voices[voiceIndex] || null;

  return (
    <div className="container">
      <div className="container__input">
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <div className="data">
            <div className="dropdown">
              <label htmlFor="voice"> Select Voice</label>
              <select
                id="voices"
                name="voice"
                value={voiceIndex || ""}
                onChange={(event) => {
                  setVoiceIndex(event.target.value);
                }}
              >
                {voices.map((option, index) => (
                  <option key={option.voiceURI} value={index}>
                    {`${option.lang} - ${option.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="ranges">
              <div lass="range">
                <label htmlFor="rate">Rate</label>
                <input
                  min="0.5"
                  max="2"
                  defaultValue="1"
                  step="0.1"
                  id="rate"
                  type="range"
                  onChange={(event) => {
                    setRate(event.target.value);
                  }}
                />
              </div>

              <div lass="range">
                <label htmlFor="pitch">Pitch</label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  defaultValue="1"
                  step="0.1"
                  id="pitch"
                  onChange={(event) => {
                    setPitch(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="text-content">
              <textarea
                id="text"
                name="message"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              ></textarea>
            </div>
            <div>
              <button
                id="start"
                className="btn-green"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Start
              </button>
              <button id="cancel" className="btn-red" onClick={() => cancel()}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Example;
