package com.reactlibrary;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import hlfsdk.Hlfsdk;

public class HlfWrapperModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public HlfWrapperModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "HlfWrapper";
    }

    @ReactMethod
    public void sampleMethod(Promise promise) {
        try {
            String result = Hlfsdk.hello();
            promise.resolve(result);
        } catch (IllegalViewOperationException e) {
            promise.reject("E_GET_ERROR", e);
        }
    }

    @ReactMethod
    public void enroll(String user, String pass, String connectionProfilePath, Promise promise) {
        try {
            String result = Hlfsdk.enroll(user, pass, connectionProfilePath);
            promise.resolve(result);
        } catch (IllegalViewOperationException e) {
            promise.reject("E_VIEW_ERROR", e);
        } catch (Exception e) {
            promise.reject("E_ENROLL_ERROR", e);
        }
    }
}
