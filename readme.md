# Javascript modules for interacting with Media Shuttle API


## Started June 20 2021. Scott Reynolds, Solution Consultant, Signiant, Inc.

These JS components can be imported into your Media Shuttle projects to perform functions against the published API accessible from https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/

## Current module list:

GET /portals | getPortals
-------------|-----------
GET /portals/:portalId/users | getPortalsUsers
POST /portals/:portalId/packages | postPortalsPackages
GET /portals/:portalId/packages/:packageId | getPortalsPackages
PUT /portals/:portalId/packages/:packageId | putPortalsPackagesFiles  
<br>

## Utility modules:  

### generateWebToken(params) - returns a S2P webtoken in one call.

input | notes
---|---
params = { | 
   portalId or portalUrl,     |only one required
   packageId,                 |optional
   userEmail,                 |email for tracking
   grants,                    |"download" or "upload"
   expiration,                |ISO Date
   destinationPath,           |only required for upload
   files,                     |only required for upload
   webhook                    |optional url
}

res.data.url = webtoken_url