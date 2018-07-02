# Key Metrics

Sidebar Closed:
Compute CTR of badge when it’s green: # clicks on non-0 green badge/ # of times shown
Compute CTR on Read Next given they opened pop-up

Compute CTR of badge when it’s red: # clicks on non-0 red badge / # of times shown
Compute CTR on For You given they opened the pop-up

Sidebar Open:

Similar CTRs to above

New Tab
Compute CTR on For You if sidebar is open

Retention:
Given first install, how long do users retain (for related, for reads)



# Overview of Laserlike’s apis and json

All of our APIs use https/TLS encryption. The cookie is used as a secret authorization token that is sent to our backend in the http headers and uniquely identifies a user on every request. Consequently any new cookie sent to our server creates a new "account".

We also always send a user-agent header to our REST apis.

# Account Management

## login

Login is called on first loading the extension. Login is purely based on cookie which is used as a unique identifier.

`login`

`
{
        "social_flag": "firefox"
      }
`

## Delete account
Extension calls api to delete account (based on cookie) and purge backend data. Extension enters a dormant mode where no data is being collected or sent to server.

`delete-account`


## Save email address

The user can opt to save their email address with the extension so they can receive a magic digest of content they might be interested in. Email update is called with their entered email.

API:
`update-email`

Payload

`{
“email”: “XYZ@abc.com”,
“Verification_method”: 2,
}
`




# Visited url collection

The Laserlike Firefox extension is designed to use your read urls to suggest new relevant content to read next. Thus, it logs past visited urls and also newly visited urls to the server.


## read history upload

Example of uploading a single url from visited history.

API:

`log`

Payload:
`
{
  "userActivity": {
    "deviceTimeUnixMicros": "1527205205309000",
    "deviceDurationMicros": "16000000",
    "eventType": "end",
    "read": {
      "cardID": "787833609495009480",
      "cardURL": "https://www.google.com/search?q=html+input+box&ie=utf-8&oe=utf-8&client=firefox-b-1-ab",
      "uiElement": "history"
    }
  },
  "clientInfo": {
    "os_type": "extension",
  },
}
`

## User navigates to url
When a user navigates to any url, a read log and also a "read next" feed request is sent to Laserlike.

### read telemetry
API:
`log`

End of visit payload:
 
 `{
  "userActivity": {
    "deviceTimeUnixMicros": "1527959704808000",
    "deviceDurationMicros": "18320000",
    "eventType": "end",
    "read": {
      "cardID": "1238659855800220614",
      "cardURL": "https://theoutline.com/post/4756/terra-closing-affordable-housing-crisis-bay-area?zd=1&zi=bbbluerq",
      "uiElement": "browser"
    }
  },
  "clientInfo": {
    "os_type": "extension",
  },
}`

Start of visit payload:
`{
  "userID": "56422",
  "userActivity": {
    "deviceTimeUnixMicros": "1527959686488000",
    "eventType": "start",
    "read": {
      "cardID": "1238659855800220614",
      "cardURL": "https://theoutline.com/post/4756/terra-closing-affordable-housing-crisis-bay-area?zd=1&zi=bbbluerq",
      "uiElement": "browser"
    }
  },
  "clientInfo": {
    "os_type": "extension",
  },
}`

### read next feed request
To render the “read next” section of content related to your current page, an additional “related” api call is made:

API:
`related`

Payload:

`{"search_like": {"vibe": [{"target": {"target": "u:https://www.theguardian.com/news/2018/may/29/the-financial-scandal-no-one-is-talking-about-big-four-accountancy-firms"}}]}}`

# Other

## Application Telemetry
### openView
We log the opening of various screens in the extension so we can track usage.

API:
`log`

Payload:
`{
  "userActivity": {
    "deviceTimeUnixMicros": "1527703017585000",
    "openView": {
      "name": "/sidebar"
    }
  },
  "clientInfo": {
    "os_type": "extension",
    "product_enum": "TrendsAndFriends"
  },
}`

### Other views
`   "openView": {
      "name": "/toolbar"
    }`

## Example Feedback on result
In the app the user can give feedback on a result, this talks to our log api -- for example here is a log for an off-topic/spam selection in a related feed.

API:
`log`

Payload:

`{
  "userActivity": {
    "deviceTimeUnixMicros": "1527701620286000",
    "feedback": {
      "cardID": "7987617938746190061",
      "position": "11885315616418037760",
      "cardURL": "https://www.washingtonexaminer.com/washington-secrets/trump-tax-cuts-spark-more-reductions-in-states",
      "badContent": {
        "spam": true
      }
    }
  },
}`


## Other Feedback payloads (TODO)

### Not Interesting

### Block site

# Ephemeral user model

The documents from browsing history are stored keyed by cookie. In order to generate a personalized “For You” feed of high quality content based on this history, Laserlike reads the publicly crawlable urls into ephemeral in-memory personalization servers. During this process the url is joined with Laserlike’s publicly crawled copy of the page, which is fully annotated with our custom entity detection and machine learning embedding models. These are synthesized into a user interest model which is used to serve the “For You” feed of recommended content.
