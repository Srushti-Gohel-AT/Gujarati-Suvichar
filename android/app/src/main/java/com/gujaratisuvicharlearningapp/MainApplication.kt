package com.gujaratisuvicharlearningapp

import android.app.Application
import android.content.Context
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

class MainApplication : Application(), ReactApplication {

  override fun attachBaseContext(base: Context) {
    ThemePreferenceResolver.applyTheme(base)
    super.attachBaseContext(base)
  }

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          add(ThemePreferencesPackage())
        },
    )
  }

  override fun onCreate() {
    ThemePreferenceResolver.applyTheme(this)
    super.onCreate()
    loadReactNative(this)
  }
}
