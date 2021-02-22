require('dotenv').config()
const axios = require('axios');
const constants = require('./constants');

// https://app.swaggerhub.com/apis-docs/Signiant/MediaShuttle/
// Portals Endpoints

exports.getPortals = async (portalUrl) => {
   if (portalUrl) {
      if (portalUrl.search('.mediashuttle.com') === -1 ) {
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
