package com.gujaratisuvicharlearningapp

import android.content.Context
import android.content.res.Configuration
import androidx.appcompat.app.AppCompatDelegate

object ThemePreferenceResolver {
  const val THEME_PREFS = "theme_prefs"
  const val PREF_KEY = "colorSchemePreference"
  private const val ASYNC_STORAGE_KEY = "@theme/colorSchemePreference"

  fun resolve(context: Context): String? {
    readNative(context)?.let { return it }
    readAsyncStorage(context)?.let { preference ->
      cacheNative(context, preference)
      return preference
    }
    return null
  }

  fun applyTheme(context: Context) {
    val nightMode =
      when (resolve(context)) {
        "dark" -> AppCompatDelegate.MODE_NIGHT_YES
        "light" -> AppCompatDelegate.MODE_NIGHT_NO
        else -> AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
      }

    AppCompatDelegate.setDefaultNightMode(nightMode)
  }

  fun cacheNative(context: Context, preference: String) {
    context
      .getSharedPreferences(THEME_PREFS, Context.MODE_PRIVATE)
      .edit()
      .putString(PREF_KEY, preference)
      .commit()
  }

  private fun readNative(context: Context): String? =
    context
      .getSharedPreferences(THEME_PREFS, Context.MODE_PRIVATE)
      .getString(PREF_KEY, null)
      ?.takeIf { isValidPreference(it) }

  private fun readAsyncStorage(context: Context): String? {
    val dbNames = listOf("RKStorage", "AsyncStorage")
    val tables = listOf("catalystLocalStorage", "Storage")

    for (dbName in dbNames) {
      try {
        context.openOrCreateDatabase(dbName, Context.MODE_PRIVATE, null).use { db ->
          for (table in tables) {
            try {
              db.rawQuery(
                "SELECT value FROM $table WHERE key = ? LIMIT 1",
                arrayOf(ASYNC_STORAGE_KEY),
              ).use { cursor ->
                if (cursor.moveToFirst()) {
                  normalizeStoredValue(cursor.getString(0))?.let { return it }
                }
              }
            } catch (_: Exception) {
              // Try the next table name used by AsyncStorage versions.
            }
          }
        }
      } catch (_: Exception) {
        // Try the next database name used by AsyncStorage versions.
      }
    }

    return null
  }

  private fun normalizeStoredValue(rawValue: String?): String? {
    if (rawValue.isNullOrBlank()) {
      return null
    }

    val trimmed = rawValue.trim()
    val unquoted =
      if (trimmed.length >= 2 && trimmed.first() == '"' && trimmed.last() == '"') {
        trimmed.substring(1, trimmed.length - 1)
      } else {
        trimmed
      }

    return unquoted.takeIf { isValidPreference(it) }
  }

  private fun isValidPreference(value: String): Boolean =
    value == "light" || value == "dark" || value == "system"

  fun isDark(context: Context): Boolean =
    when (resolve(context)) {
      "dark" -> true
      "light" -> false
      else ->
        (context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) ==
          Configuration.UI_MODE_NIGHT_YES
    }
}
