package com.hahamx;

import android.os.Bundle;
import android.os.Handler;
import android.os.PersistableBundle;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.pgyersdk.update.PgyUpdateManager;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HaHaMx";
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        checkUpdate();
    }



    //建立在蒲公英平台的检测更新
    private void checkUpdate() {

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                new PgyUpdateManager.Builder()
                        .setForced(true)                //设置是否强制更新
                        .setUserCanRetry(true)         //失败后是否提示重新下载
                        .setDeleteHistroyApk(true)     // 检查更新前是否删除本地历史 Apk
                        .register();
            }
        }, 2000);

    }
}
