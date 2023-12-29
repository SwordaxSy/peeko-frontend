# Change Log

All changes applied on this project code base will be documented in this file.

## [Unreleased] 2023-06-21

### Added

    - Initiated react app
    - Installed initial necessary packages
    - Started forming the project code structure

## [Unreleased] 2023-06-22

### Added

    - Built the authentication page

## [Unreleased] 2023-06-23

### Added

    - Built the activation page
    - Connected the client to the server API

## [Unreleased] 2023-06-24

### Added

    - Built the home & video pages
    - Designed the main app screen
    - Coded the functionality to request videos and navigate between them
    - Loaded the first server-sent video

## [Unreleased] 2023-06-25

### Added

    - Coded the functionality to fetch real video post metadata
    - Coded the functionality to fetch real comments
    - Coded the functionality to post comments

## [Unreleased] 2023-06-26

### Added

    - Added post video modal
    - Completed video posting functionality

### Changed

    - Fixed a bug where the comments section could contain comments from another post
    - Fixed the comments section flashing comments of a post that failed loading and was skipped

## [0.0.0-dev] 2023-06-26

### Added

    - Video post success/failure alert
    - Disable prev navigation button when no prev video exists
    - Released the first development & testing version of the web app

### Changed

    - Fixed some bugs where video failure would auto-swipe to the wrong swipe direction sometimes

## [0.0.1-dev] 2023-06-27

### Added

    - Responsive design to the website

### Changed

    - Fixed some bugs

## [0.0.2-dev] 2023-06-27

### Added

    - Show video failure error message in an alert

## [0.0.3-dev] - 2023-06-27

### Added

    - Only allow video posting input to accept video files

## [0.0.4-dev] - 2023-06-27

### Changed

    - Made video autoplay while muted
    - Fixed video not playing when clicking directly on play button

## [0.0.5-dev] - 2023-06-28

### Added

    - Confirmation prompts
    - Delete video feature
    - Delete comment feature
    - Fixed share button not working unless click is on the share icon

### Changed

    - Replaced unnecessary object exporting with custom hooks and used export default

## [0.1.0-beta] - 2023-12-29

### Changed

    - Refactored and rewrote many parts of the code
    - Switched from fetch API to axios
    - Removed background blurred video to fix video not loading error
    - Fixed video information and video not matching
    - Added placeholder video in case no videos are there to display
    - When post video popup is open, comments are closed on mobile mode
    - Fixed the comments not being darkened when post video modal is opened
    - Released the first beta version

## PLANNED TODOS

    - Add profile page
    - Add profile settings