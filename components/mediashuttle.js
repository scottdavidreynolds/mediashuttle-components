require('dotenv').config()
const axios = require('axios');
const config = require('./config');

async function callApi (params) {
   params.headers = { Authorization: config.MS_API_KEY }
   let response
   try {
      response = await axios(params)
   } catch (error) {
      return error
   }
   return response
}

// https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/
// Portals Endpoints

exports.getPortals = async (portalUrl) => {
   if (portalUrl) {
      if (portalUrl.search('.mediashuttle.com') === -1) {
         portalUrl += '.mediashuttle.com'
      }
   }

   let params = {
      method: 'GET',
      baseURL: config.apiUrl + '/portals',
      params: { url: portalUrl }
   }

   try {
      result = await callApi(params)
      return {data: result.data.items}
   } catch (error) {
      return {error: error.response.statusText}
   }
}

exports.getPortalsUsers = async (portalId) => {
   let params = {
      method: 'GET',
      baseURL: config.apiUrl + '/portals/' + portalId + '/users',
   }
   
   try {
      result = await callApi(params)
      return {data: result.data.items}
   } catch (error) {
      return {error: error.response.statusText}
   }
}

// System-to-Person

// Create package
exports.postPortalsPackages = async (portalId) => {
   let packageId = await axios({
      method: 'POST',
      baseURL: config.apiUrl + '/portals/',
      url: portalId + '/packages',
      headers: { Authorization: config.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: packageId}
}

// Retrieve package details
exports.getPortalsPackages = async (portalId, packageId) => {
   let portalsPackages = await axios({
      method: 'GET',
      baseURL: config.apiUrl + '/portals/' + portalId + '/packages/' + packageId,
      headers: { Authorization: config.MS_API_KEY }
   }).catch(error => {
      return {error: error.response.statusText}
   })
   return {data: portalsPackages.data}
}

// Add files to a package
exports.putPortalsPackagesFiles = async (portalId, packageId, files) => {
   let fileResults = await axios({
      method: 'PUT',
      baseURL: config.apiUrl + '/portals/' + portalId + '/packages/' + packageId + '/files',
      headers: { Authorization: config.MS_API_KEY },
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
      baseURL: config.apiUrl + '/portals/',
      url: portalId + '/packages/' + packageId + '/tokens',
      headers: { Authorization: config.MS_API_KEY },
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
      baseURL: config.apiUrl + '/portals/' + portalId + '/subscriptions',
      headers: { Authorization: config.MS_API_KEY }
   }).catch(error => {
      return (error)
   })
   return (getPortalsSubscriptions.data.items)
}
