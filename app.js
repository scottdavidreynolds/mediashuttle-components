const {
   getPortals,
   getPortalsUsers,
   getPortalsPackages,
   getPortalsSubscriptions,
   generateWebToken
   } = require('./index')

console.log("Media Shuttle Components testing")

const EgetPortals = async (portalUrl) => {
   console.log('getPortals')
   let portals = await getPortals(portalUrl)
   console.log(portals)
}

const EgetPortalsUsers = async (portalId) => {
   console.log('getPortalsUsers')
   let portalsUsers = await getPortalsUsers(portalId)
   console.log(portalsUsers)
}

const EgetPortalsSubscriptions = async (portalId) => {
   console.log('getPortalsSubscriptions')
   let portalsSubscriptions = await getPortalsSubscriptions(portalId)
   console.log(portalsSubscriptions)
}

const EgetAccountPortalsFilteredByName = async (itemFilter) => {
   console.log('getAccountPortalsFilteredByName')
   let results = await getAccountPortalsFilteredByName(itemFilter)
   console.log(results)
}

const EgetPortalsPackages = async (portalId, packageId) => {
   console.log('getPortalsPackages')
   let results = await getPortalsPackages(portalId, packageId)
   console.log(results)
}

const EgenerateWebToken = async (params) => {
   let expiration = new Date()
   expiration.setSeconds(expiration.getSeconds() + 10000);

   params = {
      portalUrl: "ms-s2p-api-demo",
      userEmail: 'sreynolds@signiant.com',
      grants: ["download"],
      expiration,
      files: [
         {
           "path": "example/example_file.mp4",
           "isDirectory": false,
           "size": 200000
         }
       ],
      webhook: "https://www.signiant.com"

   }
   console.log('generateWebToken')
   let results = await generateWebToken(params)
   console.log(results)
}

// EgetPortals("wakatipu-send")
EgetPortalsUsers("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a")
// EgetPortalsSubscriptions("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a")
// EgetAccountPortalsFilteredByName("Wak")
// EgetPortalsPackages("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a","teJSu4drKj5MHRhqkAibtK")
// EgenerateWebToken()