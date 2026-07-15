import Foundation
import React
import UIKit

@objc(ThemePreferences)
class ThemePreferences: NSObject, RCTBridgeModule {
  static func moduleName() -> String! {
    "ThemePreferences"
  }

  static func requiresMainQueueSetup() -> Bool {
    false
  }

  @objc
  func setPreference(_ preference: NSString) {
    guard Self.isValidPreference(preference as String) else {
      return
    }

    Self.cachePreference(preference as String)
    Self.applyInterfaceStyle(preference: preference as String)
  }

  @objc
  static func resolvePreference() -> String? {
    if let native = UserDefaults.standard.string(forKey: prefKey),
      isValidPreference(native)
    {
      return native
    }

    if let asyncStorage = readAsyncStoragePreference(), isValidPreference(asyncStorage) {
      cachePreference(asyncStorage)
      return asyncStorage
    }

    return nil
  }

  @objc
  static func applyStoredPreference() {
    applyInterfaceStyle(preference: resolvePreference())
  }

  private static let prefKey = "colorSchemePreference"
  private static let asyncStorageKey = "@theme/colorSchemePreference"

  private static func cachePreference(_ preference: String) {
    UserDefaults.standard.set(preference, forKey: prefKey)
    UserDefaults.standard.synchronize()
  }

  private static func isValidPreference(_ preference: String) -> Bool {
    preference == "light" || preference == "dark" || preference == "system"
  }

  private static func applyInterfaceStyle(preference: String?) {
    let style = interfaceStyle(for: preference)

    for scene in UIApplication.shared.connectedScenes {
      guard let windowScene = scene as? UIWindowScene else {
        continue
      }

      for window in windowScene.windows {
        window.overrideUserInterfaceStyle = style
      }
    }
  }

  static func interfaceStyle(for preference: String?) -> UIUserInterfaceStyle {
    switch preference {
    case "dark":
      return .dark
    case "light":
      return .light
    default:
      return .unspecified
    }
  }

  private static func readAsyncStoragePreference() -> String? {
    if let value = UserDefaults.standard.string(forKey: asyncStorageKey) {
      return normalizeStoredValue(value)
    }

    let fileManager = FileManager.default
    guard
      let appSupport = fileManager.urls(
        for: .applicationSupportDirectory,
        in: .userDomainMask,
      ).first
    else {
      return nil
    }

    if let manifestValue = findManifestValue(startingAt: appSupport, depth: 0) {
      return manifestValue
    }

    let candidateDirectories = [
      appSupport.appendingPathComponent("RCTAsyncStorage"),
      appSupport.appendingPathComponent("RNCAsyncStorage"),
      appSupport.appendingPathComponent("com.gujaratisuvicharlearningapp/RCTAsyncStorage"),
      appSupport.appendingPathComponent("org.reactjs.native.example.GujaratiSuvicharLearningApp/RCTAsyncStorage"),
    ]

    for directory in candidateDirectories where fileManager.fileExists(atPath: directory.path) {
      if let manifestValue = readManifestValue(in: directory) {
        return manifestValue
      }
    }

    return nil
  }

  private static func findManifestValue(startingAt directory: URL, depth: Int) -> String? {
    if depth > 4 {
      return nil
    }

    if let manifestValue = readManifestValue(in: directory) {
      return manifestValue
    }

    guard
      let contents = try? FileManager.default.contentsOfDirectory(
        at: directory,
        includingPropertiesForKeys: nil,
        options: [.skipsHiddenFiles],
      )
    else {
      return nil
    }

    for url in contents where url.hasDirectoryPath {
      if let manifestValue = findManifestValue(startingAt: url, depth: depth + 1) {
        return manifestValue
      }
    }

    return nil
  }

  private static func readManifestValue(in directory: URL) -> String? {
    let manifestURL = directory.appendingPathComponent("manifest.json")

    guard
      let data = try? Data(contentsOf: manifestURL),
      let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
      let rawValue = json[asyncStorageKey] as? String
    else {
      return nil
    }

    return normalizeStoredValue(rawValue)
  }

  private static func normalizeStoredValue(_ rawValue: String) -> String? {
    let trimmed = rawValue.trimmingCharacters(in: .whitespacesAndNewlines)

    if trimmed.hasPrefix("\""), trimmed.hasSuffix("\""), trimmed.count >= 2 {
      let unquoted = String(trimmed.dropFirst().dropLast())
      return isValidPreference(unquoted) ? unquoted : nil
    }

    return isValidPreference(trimmed) ? trimmed : nil
  }
}
