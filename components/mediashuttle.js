require('dotenv').config()
const axios = require('axios');
const constants = require('./constants');

// https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/
// Portals Endpoints

exports.getPortals = async (portalUrl) => {
   if (portalUrl) {
      if (portalUrl.search('.mediashuttle.com') === -1) {
         portalUrl += '.mediashuttle.com'
      }
   }
   let portals = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals',
      params: { url: portalUrl },
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: portals.data.items}
}

exports.getPortalsUsers = async (portalId) => {
   let portalsUsers = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/users',
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: portalsUsers.data.items}
}

// System-to-Person

// Create package
exports.postPortalsPackages = async (portalId) => {
   let packageId = await axios({
      method: 'POST',
      baseURL: constants.apiUrl + '/portals/',
      url: portalId + '/packages',
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: packageId}
}

// Retrieve package details
exports.getPortalsPackages = async (portalId, packageId) => {
   let portalsPackages = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/packages/' + packageId,
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: portalsPackages.data}
}

// Add files to a package
exports.putPortalsPackagesFiles = async (portalId, packageId, files) => {
   let fileResults = await axios({
      method: 'PUT',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/packages/' + packageId + '/files',
      headers: { Authorization: constants.MS_API_KEY },
      data: { files }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: fileResults}
}


// Generate webtoken for upload or download
exports.generateWebToken = async (params) => {

   let { portalId, portalUrl, packageId, userEmail, grants, expiration, destinationPath, files, webhook } = params;

   if (!portalId && !portalUrl) {
      console.log('error: portalId or portalUrl is required')
      return ('error: portalId or portalUrl is required')
   }
   
   if (!userEmail) {
      console.log('error: user email required')
   }
   
   if (!destinationPath) {
      destinationPath = '/signiant'
   }
   
   if (!expiration) {
      console.log('error: expiration required')
   }
   
   if (!portalId) {
      try {
         portalDetails = await exports.getPortals(portalUrl)
         portalId = portalDetails[0].id
      } catch (error) {
         return ({ error })
      }
   }
   
   if (!packageId) {
      try {
         packageIdDetails = await exports.postPortalsPackages(portalId)
         packageId = packageIdDetails.data.id
      } catch (error) {
         return ({ error })
      }
   }
   
   if (grants === ['download'] && !files) {
      console.log('error: file list required for download')
   }

   if (grants[0] === "download") {
      try {
         await exports.putPortalsPackagesFiles(portalId, packageId, files)
      } catch (error) {
         return ({ error })
      }
   }

   let options = {
      method: 'POST',
      baseURL: constants.apiUrl + '/portals/',
      url: portalId + '/packages/' + packageId + '/tokens',
      headers: { Authorization: constants.MS_API_KEY },
      data: {
         user: { email: userEmail },
         expiresOn: expiration,
         destinationPath,
         grants,
         notifications: [
            {
               type: 'webhook',
               url: webhook
            }
         ]
      }
   }

   let url;
   try {
      await axios(options)
         .then(data => {
            url = data.data.url
         })
   } catch (error) {
      return {error: error.response.statusText}

   }
   return {data: url}
}

//Subscriptions Endpoints

exports.getPortalsSubscriptions = async (portalId) => {
   let getPortalsSubscriptions = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/subscriptions',
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return (error)
   })
   return (getPortalsSubscriptions.data.items)
}
