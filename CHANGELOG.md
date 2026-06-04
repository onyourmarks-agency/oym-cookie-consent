# Changelog

All notable changes to this project will be documented in this file.

## [3.5.0.1] - 2026-06-04

### Added
- Added `consentModeSetDefault` config option to control sending `gtag('consent', 'default', ...)` during init.

### Changed
- Consent mode `default` call in `init()` is now conditional and only sent when `consentModeSetDefault` is enabled.
- Updated docs with the new option, including usage guidance for projects that set consent defaults before loading this package.
- Updated distributed type definitions to include `consentModeSetDefault` in `ConfigType`.
- Included fresh build artifacts for this release.
