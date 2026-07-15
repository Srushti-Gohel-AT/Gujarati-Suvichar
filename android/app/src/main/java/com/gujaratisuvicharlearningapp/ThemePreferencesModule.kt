package com.gujaratisuvicharlearningapp

import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ThemePreferencesModule(
  reactContext: ReactApplicationContext,
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "ThemePreferences"

  @ReactMethod
  fun setPreference(preference: String) {
    if (!isValidPreference(preference)) {
      return
    }

    ThemePreferenceResolver.cacheNative(reactApplicationContext, preference)

    val nightMode =
      when (preference) {
        "dark" -> AppCompatDelegate.MODE_NIGHT_YES
        "light" -> AppCompatDelegate.MODE_NIGHT_NO
        else -> AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
      }

    AppCompatDelegate.setDefaultNightMode(nightMode)
  }

  companion object {
    fun applyStoredPreference(context: android.content.Context) {
      ThemePreferenceResolver.applyTheme(context)
    }

    private fun isValidPreference(value: String): Boolean =
      value == "light" || value == "dark" || value == "system"
  }
}
