// schema.js
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var NurseModel = require('../models/Nurse');
var PatientModel = require('../models/Patient.js');


const nurseType = new GraphQLObjectType({
    name: 'nurse',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        fullName: {
          type: GraphQLString
        },
        nurseNumber: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      }
    }
  });


  const patientType = new GraphQLObjectType({
    name: 'patient',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        fullName: {
          type: GraphQLString
        },
        nurseNumber: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      }
    }
  });

  //
  // create a GraphQL query type that returns all nurses or a nurse by id
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        nurses: {
          type: new GraphQLList(nurseType),
          resolve: function () {
            const nurses = NurseModel.find().exec()
            if (!nurses) {
              throw new Error('Error')
            }
            return nurses
          }
        },
        nurse: {
          type: nurseType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const nurseInfo = NurseModel.findById(params.id).exec()
            if (!nurseInfo) {
              throw new Error('Error')
            }
            return nurseInfo
          }
        },
        patients: {
            type: new GraphQLList(patientType),
            resolve: function () {
              const patients = PatientModel.find().exec()
              if (!patients) {
                throw new Error('Error')
              }
              return patients
            }
          },
          patient: {
            type: patientType,
            args: {
              id: {
                name: '_id',
                type: GraphQLString
              }
            },
            resolve: function (root, params) {
              const patientInfo = PatientModel.findById(params.id).exec()
              if (!patientInfo) {
                throw new Error('Error')
              }
              return patientInfo
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
        addNurse: {
          type: nurseType,
          args: {
            fullName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            nurseNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const nurseModel = new NurseModel(params);
            const newNurse = nurseModel.save();
            if (!newNurse) {
              throw new Error('Error');
            }
            return newNurse
          }
        },
        updateNurse: {
          type: nurseType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            fullName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            email: {
              type: new GraphQLNonNull(GraphQLString)
            },
            nurseNumber: {
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return NurseModel.findByIdAndUpdate(params.id, { fullName: params.fullName, 
              email: params.email, nurseNumber: params.nurseNumber,
              password: params.password
               }, function (err) {
              if (err) return next(err);
            });
          }
        },
        deleteNurse: {
          type: nurseType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const deletedNurse = NurseModel.findByIdAndRemove(params.id).exec();
            if (!deletedNurse) {
              throw new Error('Error')
            }
            return deletedNurse;
          }
        },
        addPatient: {
            type: patientType,
            args: {
                fullName: {
                type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                type: new GraphQLNonNull(GraphQLString)
                },
                nurseNumber: {
                type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function (root, params) {
              const patientModel = new PatientModel(params);
              const newPatient = patientModel.save();
              if (!newPatient) {
                throw new Error('Error');
              }
              return newPatient
            }
          },
          updatePatient: {
            type: patientType,
            args: {
                fullName: {
                type: new GraphQLNonNull(GraphQLString)
                },
                email: {
                type: new GraphQLNonNull(GraphQLString)
                },
                nurseNumber: {
                type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(root, params) {
              return PatientModel.findByIdAndUpdate(params.id, { fullName: params.fullName, 
                email: params.email, nurseNumber: params.nurseNumber,
                password: params.password 
                 }, function (err) {
                if (err) return next(err);
              });
            }
          },
          deletePatient: {
            type: patientType,
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve(root, params) {
              const deletedPatient = PatientModel.findByIdAndRemove(params.id).exec();
              if (!deletedPatient) {
                throw new Error('Error')
              }
              return deletedPatient;
            }
          }
      }
    }
  });



 



  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  