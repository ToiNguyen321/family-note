declare module '@dudigital/react-native-zoomable-view' {
  import React from 'react';
  import { ViewProps, StyleProp, ViewStyle } from 'react-native';

  export interface ReactNativeZoomableViewProps extends ViewProps {
    zoomEnabled?: boolean;
    initialZoom?: number;
    maxZoom?: number;
    minZoom?: number;
    zoomStep?: number;
    pinchToZoomInSensitivity?: number;
    pinchToZoomOutSensitivity?: number;
    movementSensibility?: number;
    doubleTapDelay?: number;
    bindToBorders?: boolean;
    zoomCenteringLevelDistance?: number;
    style?: StyleProp<ViewStyle>;
    onZoomAfter?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onZoomBefore?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onZoomEnd?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onLongPress?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onDoubleTapAfter?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onDoubleTapBefore?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onShiftingEnd?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onShiftingBefore?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
    onShiftingAfter?: (event: any, gestureState: any, zoomableViewEventObject: any) => void;
  }

  export class ReactNativeZoomableView extends React.Component<ReactNativeZoomableViewProps> {}
}
