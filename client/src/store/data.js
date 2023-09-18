import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    messages: [],
};

const dataSlice = createSlice({
    name:'data',
    initialState: initialState,
    reducers: {
        setRenderMessage(state, action) {
            state.messages.push(action.payload);
        }
    },

})
const dataActions = dataSlice.actions;

export default dataSlice;
export { dataActions };