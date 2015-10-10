# The Ocean Cleanup - Visual Survey API

Backend API for [The Ocean Cleanup Survey App](https://github.com/TheOceanCleanup/App)

## Remove 'Fake' Surveys

`db.surveys.remove({ events: { $elemMatch: { 'data.comment' : /*[FAKE SURVEY]*/}}})`

## Getting Started

### Installation

- Make sure that you have Node and NPM
- Install all npm modules `npm install`

### Start

`node app`

## Helping out

Want to help out? Great! Feel free to test the API, post issues/suggestions/improvements or help out and fix some of the outstanding issues/improvements.

## Conversion

The data collected in the app is send over as integers, this is the conversion table.

#### Windspeed

|#   | Description              |
|----|--------------------------|
|0   |  0 - 1 knots             |
|1   |  2 - 3 knots             |
|2   |  4 - 6 knots             |
|3   |  7 - 10 knots            |
|4   |  11 - 16 knots           |
|5   |  17 - 21 knots           |
|6   |  22 - 27 knots           |
|7   |  28+ knots               |

#### CloudCover

|#   | Description              |
|----|--------------------------|
|0   |  0%                      |
|1   |  25%                     |
|2   |  50%                     |
|3   |  75%                     |
|4   |  100%                    |

#### Type

|#   | Description              |
|----|--------------------------|
|0   |  1 pieces of debris      |
|1   |  2 - 5 pieces of debris  |
|2   |  6 - 10 pieces of debris |
|3   |  11 - 10 pieces of debris|
|4   |  100+ pieces of debris   |

#### Material -> Category
|#   | Description           |
|----|-----------------------|
|0   |  plastic              |
|0.0 |  fragment             |
|0.1 |  buoy/float           |
|0.2 |  rope/line            |
|0.3 |  net                  |
|0.4 |  bottle               |
|0.5 |  jug/bucket           |
|0.6 |  crate                |
|0.7 |  other                |
|0.8 |  bag                  |
|0.9 |  no clue              |

|#   | Description           |
|----|-----------------------|
|1   |  foam                 |
|1.0 |  fragment             |
|1.1 |  buoy/float           |
|1.2 |  cup                  |
|1.3 |  flip-flop            |
|1.4 |  crate                |
|1.5 |  other                |
|1.9 |  no clue              |

|#   | Description           |
|----|-----------------------|
|2   |  glass                |
|2.0 |  buoy                 |
|2.1 |  bottle               |
|2.2 |  light bulb           |
|2.3 |  other                |
|2.9 |  no clue              |

|#   | Description           |
|----|-----------------------|
|3   |  metal                |
|3.0 |  drum                 |
|3.1 |  spray can            |
|3.2 |  other                |
|2.9 |  no clue              |

|#   | Description           |
|----|-----------------------|
|4   |  wood                 |
|4.0 |  log                  |
|4.1 |  crate                |
|4.2 |  lumber               |
|4.3 |  other                |
|4.4 |  pallet               |
|4.9 |  no clue              |

|#   | Description           |
|----|-----------------------|
|5   |  other                |
|5.0 |  other                |

|#   | Description           |
|----|-----------------------|
|6   | no clue               |
|6.9 | no clue               |

#### Dimensions
|#   | Description             |
|----|-------------------------|
|0   |  0 - 10 cm              |
|1   |  10 - 100 cm            |
|2   |  1 - 10 m               |
|3   |  10+ m                  |

#### Distances
|#   | Description             |
|----|-------------------------|
|0   |  0 - 10 m               |
|1   |  10 - 50 m              |
|2   |  50 - 100 m             |
|3   |  100+ m                 |

And yes any of these items can sadly be found in the ocean.
