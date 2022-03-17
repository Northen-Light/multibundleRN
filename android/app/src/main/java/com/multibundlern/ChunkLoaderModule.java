package com.multibundlern;


import androidx.annotation.NonNull;

import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.CatalystInstanceImpl;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class ChunkLoaderModule extends ReactContextBaseJavaModule {

    public ChunkLoaderModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "ChunkLoader";
    }


    @ReactMethod
    public void loadChunk(int moduleId, Promise promise) {
        ReactApplicationContext reactApplicationContext = this.getReactApplicationContext();
        String assetURL = "assets://chunk-" + moduleId + ".bundle";
        CatalystInstance catalyst = reactApplicationContext.getCatalystInstance();
        ((CatalystInstanceImpl) catalyst).loadScriptFromAssets(reactApplicationContext.getAssets(), assetURL, false);
        promise.resolve(true);
    }
}
