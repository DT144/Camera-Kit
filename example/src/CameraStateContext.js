import React, { createContext, useReducer, useContext } from 'react';

function assertExhaustive(action, message = `Reached unexpected case in exhaustive switch`) {
    throw new Error(message);
}

const initialState = Object.freeze({
    position: 'front',
    mirrorHorizontally: false,
    snapshotUri: undefined,
    videoRecording: undefined,
    videoUri: undefined,
    reduceSafeArea: false,
});

export const CameraStateContext = createContext(initialState);
export const CameraStateDispatchContext = createContext(() => {});

const cameraStateReducer = (state, action) => {
    switch (action.type) {
        case 'toggleCameraPosition':
            return {
                ...state,
                position: state.position === 'front' ? 'back' : 'front',
            };

        case 'toggleMirrorHorizontally':
            return {
                ...state,
                mirrorHorizontally: !state.mirrorHorizontally,
            };
        case 'setSnapshot':
            return {
                ...state,
                snapshotUri: action.snapshotUri,
            };
        case 'setVideoRecording':
            return {
                ...state,
                videoRecording: action.videoRecording,
            };
        case 'setVideo':
            return {
                ...state,
                videoUri: action.videoUri,
            };
        case 'toggleSafeArea':
            return {
                ...state,
                reduceSafeArea: !state.reduceSafeArea,
            };
        default:
            assertExhaustive(action);
    }
};

export const CameraContext = ({ children }) => {
    const [state, dispatch] = useReducer(cameraStateReducer, initialState);

    return (
        <CameraStateContext.Provider value={state}>
            <CameraStateDispatchContext.Provider value={dispatch}>{children}</CameraStateDispatchContext.Provider>
        </CameraStateContext.Provider>
    );
};

export function useCameraState() {
    const cameraState = useContext(CameraStateContext);

    if (!cameraState) {
        throw new Error('useCameraState must be used within a CameraContext');
    }

    return cameraState;
}

export function useCameraStateDispatch() {
    const dispatch = useContext(CameraStateDispatchContext);

    if (!dispatch) {
        throw new Error('useCameraStateDispatch must be used within a CameraContext');
    }

    return dispatch;
}
