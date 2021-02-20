const {getPortals} = require("../components/mediashuttle")

exports.getAccountPortalsFilteredByName = async (itemFilter) => {
   let response=[];
   portals = await getPortals()
   portals.map(portal => {
      if (portal.name.substring(0,3) === itemFilter) {
         response.push(
            {
               portalId: portal.id,
               name: portal.name
            }
         )
      } 
   })
   return response
}