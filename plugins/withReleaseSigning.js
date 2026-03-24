const { withAppBuildGradle, withGradleProperties } = require("expo/config-plugins");

/**
 * Expo config plugin that sets up Android release signing.
 *
 * Reads credentials from `keystore.properties` at the project root
 * and injects a release signing config into android/app/build.gradle.
 * Also enables minification and resource shrinking for release builds.
 */
function withReleaseSigning(config) {
  config = withAppBuildGradle(config, (cfg) => {
    let contents = cfg.modResults.contents;

    // Guard: don't apply twice
    if (contents.includes("keystorePropertiesFile")) {
      return cfg;
    }

    // --- 1. Load keystore.properties before the android { block ---
    const loader = [
      "",
      "def keystorePropertiesFile = rootProject.file('../keystore.properties')",
      "def keystoreProperties = new Properties()",
      "if (keystorePropertiesFile.exists()) {",
      "    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))",
      "}",
      "",
    ].join("\n");

    contents = contents.replace("android {", loader + "android {");

    // --- 2. Add release signing config after the debug block ---
    const releaseBlock = [
      "",
      "        release {",
      "            if (keystorePropertiesFile.exists()) {",
      '                storeFile file(keystoreProperties["storeFile"])',
      '                storePassword keystoreProperties["storePassword"]',
      '                keyAlias keystoreProperties["keyAlias"]',
      '                keyPassword keystoreProperties["keyPassword"]',
      "            }",
      "        }",
    ].join("\n");

    contents = contents.replace(
      /(signingConfigs\s*\{[\s\S]*?debug\s*\{[\s\S]*?\})\s*(\})/,
      `$1${releaseBlock}\n    $2`
    );

    // --- 3. Point release buildType at the release signing config ---
    contents = contents.replace(
      /\/\/ Caution! In production.*\n.*\/\/ see https:\/\/reactnative\.dev.*\n\s*signingConfig signingConfigs\.debug/,
      "signingConfig keystorePropertiesFile.exists() ? signingConfigs.release : signingConfigs.debug"
    );

    cfg.modResults.contents = contents;
    return cfg;
  });

  // --- 4. Enable minification + resource shrinking via gradle.properties ---
  config = withGradleProperties(config, (cfg) => {
    const entries = [
      { key: "android.enableMinifyInReleaseBuilds", value: "true" },
      { key: "android.enableShrinkResourcesInReleaseBuilds", value: "true" },
    ];

    for (const { key, value } of entries) {
      const existing = cfg.modResults.find(
        (p) => p.type === "property" && p.key === key
      );
      if (existing) {
        existing.value = value;
      } else {
        cfg.modResults.push({ type: "property", key, value });
      }
    }

    return cfg;
  });

  return config;
}

module.exports = withReleaseSigning;
