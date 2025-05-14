import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await fetch(`http://192.168.1.100:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data.body),
    });
    const json = await response.json();
    console.log("Login API Response:", json); // BURASI KRİTİK

    if (json.success == 1) {
      localStorage.setItem("token", json.data.token.accessToken);
      data.navigate("/");
    } else {
      data.sethatamesaji(json.message);
    }
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
});