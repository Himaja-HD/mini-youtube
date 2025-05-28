import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChannelByUser,
  updateMyChannel,
  fetchAllOtherChannels,
  createChannel,
  deleteChannel,
  subscribeToChannel,
  unsubscribeFromChannel,
  fetchSubscriptionStatus,
  fetchChannelByHandle,
} from "./channelThunks";

const initialState = {
  currentChannel: null,        // current
  viewedChannel: null,         // viewed
  otherChannels: [],           // others
  subscribed: {},              // subs
  loadingCurrent: false,       // loadingCurr
  loadingPublic: false,        // loadingPub
  loadingOthers: false,        // loadingOther
  updating: false,             // updating
  subscriptionLoading: false,  // loadingSubs
  error: null,                 // error
};

const channelSlice = createSlice({
  name: "channels",            // sliceName
  initialState,                // initState
  reducers: {
    clearChannelError(state) {  // clearError
      state.error = null;
    },
    clearViewedChannel(state) { // clearViewed
      state.viewedChannel = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // fetch current channel by user
      .addCase(fetchChannelByUser.pending, (state) => {
        state.loadingCurrent = true;   // loading
        state.error = null;            // clearError
      })
      .addCase(fetchChannelByUser.fulfilled, (state, action) => {
        state.loadingCurrent = false;  // done
        state.currentChannel = action.payload; // setData
      })
      .addCase(fetchChannelByUser.rejected, (state, action) => {
        state.loadingCurrent = false;  // done
        state.error = action.payload || action.error.message;  // setError
        state.currentChannel = null;   // reset
      })

      // update channel
      .addCase(updateMyChannel.pending, (state) => {
        state.updating = true;          // updating
        state.error = null;             // clearError
      })
      .addCase(updateMyChannel.fulfilled, (state, action) => {
        state.updating = false;         // done
        state.currentChannel = action.payload; // updateData
      })
      .addCase(updateMyChannel.rejected, (state, action) => {
        state.updating = false;         // done
        state.error = action.payload || action.error.message;  // setError
      })

      // create channel
      .addCase(createChannel.pending, (state) => {
        state.loadingCurrent = true;   // loading
        state.error = null;            // clearError
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loadingCurrent = false;  // done
        state.currentChannel = action.payload; // setData
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loadingCurrent = false;  // done
        state.error = action.payload || action.error.message;  // setError
      })

      // fetch other channels
      .addCase(fetchAllOtherChannels.pending, (state) => {
        state.loadingOthers = true;    // loading
        state.error = null;            // clearError
      })
      .addCase(fetchAllOtherChannels.fulfilled, (state, action) => {
        state.loadingOthers = false;   // done
        state.otherChannels = action.payload; // setData
      })
      .addCase(fetchAllOtherChannels.rejected, (state, action) => {
        state.loadingOthers = false;   // done
        state.error = action.payload || action.error.message;  // setError
      })

      // delete channel
      .addCase(deleteChannel.pending, (state) => {
        state.loadingCurrent = true;   // loading
        state.error = null;            // clearError
      })
      .addCase(deleteChannel.fulfilled, (state) => {
        state.loadingCurrent = false;  // done
        state.currentChannel = null;   // reset
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loadingCurrent = false;  // done
        state.error = action.payload || action.error.message;  // setError
      })

      // subscribe
      .addCase(subscribeToChannel.pending, (state) => {
        state.subscriptionLoading = true;  // loading
        state.error = null;                 // clearError
      })
      .addCase(subscribeToChannel.fulfilled, (state, action) => {
        state.subscriptionLoading = false; // done
        state.subscribed[action.payload] = true; // addSub
      })
      .addCase(subscribeToChannel.rejected, (state, action) => {
        state.subscriptionLoading = false; // done
        state.error = action.payload || action.error.message;  // setError
      })

      // unsubscribe
      .addCase(unsubscribeFromChannel.pending, (state) => {
        state.subscriptionLoading = true;  // loading
        state.error = null;                 // clearError
      })
      .addCase(unsubscribeFromChannel.fulfilled, (state, action) => {
        state.subscriptionLoading = false; // done
        delete state.subscribed[action.payload]; // removeSub
      })
      .addCase(unsubscribeFromChannel.rejected, (state, action) => {
        state.subscriptionLoading = false; // done
        state.error = action.payload || action.error.message;  // setError
      })

      // fetch subscription status
      .addCase(fetchSubscriptionStatus.pending, (state) => {
        state.subscriptionLoading = true;  // loading
        state.error = null;                 // clearError
      })
      .addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
        state.subscriptionLoading = false; // done
        const { channelId, isSubscribed } = action.payload;  // unpack
        if (isSubscribed) {
          state.subscribed[channelId] = true;  // addSub
        } else {
          delete state.subscribed[channelId];  // removeSub
        }
      })
      .addCase(fetchSubscriptionStatus.rejected, (state, action) => {
        state.subscriptionLoading = false; // done
        state.error = action.payload || action.error.message;  // setError
      })

      // fetch public channel by handle
      .addCase(fetchChannelByHandle.pending, (state) => {
        state.loadingPublic = true;       // loading
        state.error = null;               // clearError
      })
      .addCase(fetchChannelByHandle.fulfilled, (state, action) => {
        state.loadingPublic = false;      // done
        state.viewedChannel = action.payload;  // setData
      })
      .addCase(fetchChannelByHandle.rejected, (state, action) => {
        state.loadingPublic = false;      // done
        state.error = action.payload || action.error.message;  // setError
        state.viewedChannel = null;       // reset
      });
  },
});

export const { clearChannelError, clearViewedChannel } = channelSlice.actions;  // actions
export default channelSlice.reducer;                                           // reducer
