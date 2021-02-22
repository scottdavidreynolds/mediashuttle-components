const {
   getPortals,
   getPortalsUsers,
   getPortalsPackages,
   getPortalsSubscriptions
   } = require('./components/mediashuttle')

const {
   getAccountPortalsFilteredByName
   } = require('./workflows/getAccountPortalsFilteredByName')

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

// EgetPortals("wakatipu-send")
// EgetPortalsUsers("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a")
// EgetPortalsSubscriptions("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a")
// EgetAccountPortalsFilteredByName("Wak")
// EgetPortalsPackages("a0dc64fc-bd30-4e21-b6e1-de4d0592e24a","teJSu4drKj5MHRhqkAibtK")