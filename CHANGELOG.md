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
    - Improved application screen-size responsivity
    - Added redirects file in public directory to prevent Page Not Found production error
    - Released the first beta version

## [0.1.1-beta] - 2023-12-30

### Added

    -   Delete comment by double clicking as an alias to contextmenu event

### Changed

    -   Fixed import paths
    -   Removed unnecessary return statement
    -   Fixed URL unintentionally changing when visiting specific video page
    -   Repositioned the video progress bar to improve mobile responsivity

## [0.2.0-beta] - 2023-12-31

### Added

    - Added a proper loading component and put it in use
    - Added touch and mouse swiping capabilities

## [0.3.0-beta] - 2023-1-1

### Added

    - Added zustand for state management
    - Added video stamps and video actions on video view for mobile sizes
    - Added numeral package to format likes and comments count
    - Added delete message on delete video

### Changed

    - Refactored code & broke components down
    - Fixed bug in video swiping
    - Allowed users to access video page without authentication
    - Modified UI
    - Uploaded video added to video key stack in sessionStorage

## PLANNED TODOS

    - Add video description
    - Add profile page
    - Add profile settings
