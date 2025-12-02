// src/components/SubmitForm.js
import React, { useState } from "react";
import { API_BASE } from "../api/config";

export default function SubmitForm() {
  const [enteredName, setEnteredName] = useState("");
  const [status, setStatus] = useState(""); // optional UX status

  const handleSubmit = async (e) => {
    // If this is a form submit (recommended), always prevent default.
    if (e && e.preventDefault) e.preventDefault();

    setStatus("sending...");
    try {
      // IMPORTANT: Replace `/api/YourEndpoint` with your real backend route.
      const url = `${API_BASE}/api/YourController/YourAction`; 
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: enteredName })
      });

      // Basic response handling
      if (!response.ok) {
        const text = await response.text().catch(() => "no body");
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      // Try to parse JSON; if endpoint returns no JSON adjust accordingly
      const data = await response.json().catch(() => null);
      console.log("API response:", data);
      setStatus("sent ✅");
    } catch (err) {
      console.error("Submit error:", err);
      setStatus(`error: ${err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            placeholder="Enter name"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>{status}</div>
    </div>
  );
}
