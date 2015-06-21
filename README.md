# server

Backend for The Ocean Cleanup Survey App

## Remove 'Fake' Surveys

`db.surveys.remove({ events: { $elemMatch: { 'data.comment' : '[FAKE SURVEY]'}}})`
