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
      return (error)
   })
   return (portals.data.items)
}

exports.getPortalsUsers = async (portalId) => {
   let portalsUsers = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/users',
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return (error)
   })
   return (portalsUsers.data.items)
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
      return (error.response.data)
   })
   return (packageId)
}

// Retrieve package details
exports.getPortalsPackages = async (portalId, packageId) => {
   let portalsPackages = await axios({
      method: 'GET',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/packages/' + packageId,
      headers: { Authorization: constants.MS_API_KEY }
   }).catch(error => {
      return (error)
   })
   return (portalsPackages.data)
}

// Add files to a package
exports.putPortalsPackagesFiles = async (portalId, packageId, files) => {
   let files = await axios({
      method: 'PUT',
      baseURL: constants.apiUrl + '/portals/' + portalId + '/packages/' + packageId + '/files',
      headers: { Authorization: constants.MS_API_KEY },
      data: { files }
   }).catch(error => {
      return (error.response.data)
   })
   return (files)
}


// Generate webtoken for upload or download
exports.generateWebToken = async (params) => {

   let { portalId, portalUrl, packageId, senderEmail, grants, expiration, path, files, webhook } = params;

   if (!portalId || !portalUrl) {
      console.log('error: portalId or portalUrl is required')
      return ('error: portalId or portalUrl is required')
   }
   if (!senderEmail) {
      console.log('error: senderEmail required')
      return ('error: senderEmail required')
   }
   if (!path) {
      console.log('error: path required')
      return ('error: path required')
   }
   if (!expiration) {
      console.log('error: expiration required')
      return ({ error: 'expiration required' })
   }
   if (grants === ['download'] && !files) {
      console.log('error: file list required for download')
      return ({ error: 'file list required for download' })
   }
   if (!portalId) {
      portalId = await exports.getPortals(portalUrl).items[0].id
   }

   if (!packageId) {
      packageId = await exports.postPortalsPackages(portalId).id
   }

   if (grants[0] === "download") {
      let addFilesResult = await exports.putPortalsPackagesFiles(portalId, packageId, files)
   }

   let options = {
      method: 'POST',
      baseURL: config.apiUrl + '/portals/',
      url: portalId + '/packages/' + packageId + '/tokens',
      headers: { Authorization: apiKey },
      data: {
         user: { email: userEmail },
         expiresOn: expiration,
         destinationPath: '/path',
         grants: grants,
         notifications: [
            {
               type: 'webhook',
               url: webhook
            }
         ]
      }
   }

   let webToken = await axios(options)
      .then(data => {
         return ({ webToken: data.data.url })
      })
      .catch(error => {
         console.log(error)
         return ({ error })
      })
   return webToken
}

   // Load the config

   // const { apiKey, portalUrl, senderEmail, grants, expirationSeconds, path, files, webhook } = require('../client/src/config.json')

   // let expiration = new Date()
   // expiration.setSeconds(expiration.getSeconds() + expirationSeconds);

   // generateToken = async () => {
   //    let transferWebToken = await generateWebToken(
   //       apiKey, portalUrl, senderEmail, grants, expiration, path, files, webhook
   //    )
   //    console.log('TransferWebToken Object', transferWebToken)
   // }




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
