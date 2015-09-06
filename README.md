# Match.AI - xHacknight

Match.AI is an API build over IBM Bluemix Personality Insight Serivce. Based on linguistic analysis to extract cognitive and social characteristics from user's personal message. By deriving cognitive and social preferences, Match.AI allows you to improve usability. The service is generic engough to have wide range of applications.

Here are some typical usecases:
# User Review Personalization
# Dating App Recommendations
# Resume Classification
# Political Affiliation Service

## Match.AI - API Endpoints

`/map` - When a `POST` call is made to this endpoint with text, this end-point returns the personality traits for the individual in JSON.

`/match` - When a `POST` call is made to this end point with two personality JSON(s) as params, it returns a Personality Match Indicator across 3 specific perssonality trains - 'overall', 'needs' and 'values'.

`/bulk_match` - When a `POST` call is made to this end point with personal text params, it returns a list of match indicators for all scoped users.
