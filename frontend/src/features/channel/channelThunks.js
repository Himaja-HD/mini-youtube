import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../app/axios";

// Get current user's channel
export const fetchChannelByUser = createAsyncThunk(
  "channels/fetchChannelByUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/channels/me", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch your channel"
      );
    }
  }
);

// Create a new channel
export const createChannel = createAsyncThunk(
  "channels/createChannel",
  async (channelData, thunkAPI) => {
    try {
      const { data } = await instance.post("/channels", channelData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create channel"
      );
    }
  }
);

// Update current user's channel
export const updateMyChannel = createAsyncThunk(
  "channels/updateMyChannel",
  async (updates, thunkAPI) => {
    try {
      const { data } = await instance.put("/channels/me", updates, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update channel"
      );
    }
  }
);

// Get all other channels for explore page
export const fetchAllOtherChannels = createAsyncThunk(
  "channels/fetchAllOtherChannels",
  async (_, thunkAPI) => {
    try {
      const { data } = await instance.get("/channels/explore");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch channels"
      );
    }
  }
);

// Delete a channel by ID
export const deleteChannel = createAsyncThunk(
  "channels/deleteChannel",
  async (channelId, thunkAPI) => {
    try {
      await instance.delete(`/channels/${channelId}`, {
        withCredentials: true,
      });
      return channelId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete channel"
      );
    }
  }
);

// Subscribe to a channel
export const subscribeToChannel = createAsyncThunk(
  "channels/subscribeToChannel",
  async (channelId, thunkAPI) => {
    try {
      await instance.post(`/channels/${channelId}/subscribe`, null, {
        withCredentials: true,
      });
      return channelId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to subscribe"
      );
    }
  }
);

// Unsubscribe from a channel
export const unsubscribeFromChannel = createAsyncThunk(
  "channels/unsubscribeFromChannel",
  async (channelId, thunkAPI) => {
    try {
      await instance.post(`/channels/${channelId}/unsubscribe`, null, {
        withCredentials: true,
      });
      return channelId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to unsubscribe"
      );
    }
  }
);

// Check if user is subscribed to a channel
export const fetchSubscriptionStatus = createAsyncThunk(
  "channels/fetchSubscriptionStatus",
  async (channelId, thunkAPI) => {
    try {
      const { data } = await instance.get(
        `/channels/${channelId}/is-subscribed`,
        {
          withCredentials: true,
        }
      );
      return {
        channelId,
        isSubscribed: data?.subscribed || false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription status"
      );
    }
  }
);

// Get a channel by handle
export const fetchChannelByHandle = createAsyncThunk(
  "channels/fetchChannelByHandle",
  async (handle, thunkAPI) => {
    try {
      const { data } = await instance.get(`/channels/handle/${handle}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch channel by handle"
      );
    }
  }
);
