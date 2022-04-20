var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var EmergencyAlertModel = require('../models/EmergencyAlert');
//
// Create a GraphQL Object Type for EmergencyAlertModel model
const emergencyAlertType = new GraphQLObjectType({
    name: 'emergencyAlert',
    fields: function () {
      return {
        message: {
          type: GraphQLString
        },
        nurse: {
          type: GraphQLString
        }
      }
    }
  });
  //
  // create a GraphQL query type that returns all emergencyAlert or a emergencyAlert by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        emergencyAlerts: {
          type: new GraphQLList(emergencyAlertType),
          resolve: function () {
            const emergencyAlert = EmergencyAlertModel.find().exec()
            if (!emergencyAlert) {
              throw new Error('Error')
            }
            return emergencyAlert
          }
        },
        emergencyAlertByID: {
          type: emergencyAlertType,
          args: {
            nurse: {
              name: '_nurse',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const emergencyAlertInfo = EmergencyAlertModel.findById(params.id).exec()
            if (!emergencyAlertInfo) {
              throw new Error('Error')
            }
            return emergencyAlertInfo
          }
        }
      }
    }
  });
  //
  // add mutations for CRUD operations
  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addEmergencyAlert: {
          type: emergencyAlertType,
          args: {
            message: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const emergencyAlertModel = new EmergencyAlertModel(params);
            const newEmergencyAlert = emergencyAlertModel.save();
            if (!newEmergencyAlert) {
              throw new Error('Error');
            }
            return newEmergencyAlert
          }
        },
        updateEmergencyAlert: {
          type: emergencyAlertType,
          args: {
            message: {
              type: new GraphQLNonNull(GraphQLString)
            },
            nurse: {
                name: 'nurse',
                type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return EmergencyAlertModel.findByIdAndUpdate(params.nurse, { 
                message: params.message
            }, function (err) {
              if (err) return next(err);
            });
          }
        },
        deleteEmergencyAlert: {
          type: emergencyAlertType,
          args: {
            nurse: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const deletedEmergencyAlert = EmergencyAlertModel.findByIdAndRemove(params.nurse).exec();
            if (!deletedEmergencyAlert) {
              throw new Error('Error')
            }
            return deletedEmergencyAlert;
          }
        }
      }
    }
  });
  
  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  