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
var VitalSignsModel = require('../models/VitalSigns.js');
var EmergencyAlertModel = require('../models/EmergencyAlert');
var MotivationalTipsModel = require('../models/MotivationalTips');
var DailyInformationModel = require('../models/DailyInformation');

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

const motivationalTipsType = new GraphQLObjectType({
  name: 'motivationalTips',
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

const dailyInformationType = new GraphQLObjectType({
  name: 'dailyInformation',
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      pulseRate: {
        type: GraphQLString
      },
      bloodPressure: {
        type: GraphQLString
      },
      weight: {
        type: GraphQLString
      },
      temperature: {
        type: GraphQLString
      },
      respiratoryRate: {
        type: GraphQLString
      }
    }
  }
})

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
        patientNumber: {
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


  const vitalSignsType = new GraphQLObjectType({
    name: 'vitalSigns',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        bodyTemp: {
          type: GraphQLString
        },
        heartRate: {
          type: GraphQLString
        },
        bloodPressure: {
          type: GraphQLString
        },
        respiratoryRate: {
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
          },
          vitals: {
            type: new GraphQLList(vitalSignsType),
            resolve: function () {
              const vitals = VitalSignsModel.find().exec()
              if (!vitals) {
                throw new Error('Error')
              }
              return vitals
            }
          },
          vitalSigns: {
            type: vitalSignsType,
            args: {
              id: {
                name: '_id',
                type: GraphQLString
              }
            },
            resolve: function (root, params) {
              const vitalSignsInfo = VitalSignsModel.findById(params.id).exec()
              if (!vitalSignsInfo) {
                throw new Error('Error')
              }
              return vitalSignsInfo
            }
          },
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
          },
          motivationalTips: {
            type: new GraphQLList(motivationalTipsType),
            resolve: function () {
              const motivationalTips = MotivationalTipsModel.find().exec()
              if (!motivationalTips) {
                throw new Error('Error')
              }
              return motivationalTips
            }
          },
          motivationalTipsByID: {
            type: motivationalTipsType,
            args: {
              nurse: {
                name: '_nurse',
                type: GraphQLString
              }
            },
            resolve: function (root, params) {
              const motivationalTipstInfo = MotivationalTipstModel.findById(params.id).exec()
              if (!motivationalTipsInfo) {
                throw new Error('Error')
              }
              return motivationalTipsInfo
            }
          },
          dailyInformationAll: {
            type: new GraphQLList(dailyInformationType),
            resolve: function () {
              const dailyInformation = DailyInformationModel.find().exec()
              if (!dailyInformation) {
                throw new Error('Error')
              }
              return dailyInformation
            }
          },
          dailyInformationByID: {
            type: dailyInformationType,
            args: {
              id: {
                name: '_id',
                type: GraphQLString
              }
            },
            resolve: function (root, params) {
              const dailyInfo = dailyInformationModel.findById(params.id).exec()
              if (!dailyInfo) {
                throw new Error('Error')
              }
              return dailyInfo
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
                patientNumber: {
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
                patientNumber: {
                type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(root, params) {
              return PatientModel.findByIdAndUpdate(params.id, { fullName: params.fullName, 
                email: params.email, patientNumber: params.patientNumber,
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
          },
          addVitalSigns: {
            type: vitalSignsType,
            args: {
                bodyTemp: {
                type: new GraphQLNonNull(GraphQLString)
                },
                heartRate: {
                type: new GraphQLNonNull(GraphQLString)
                },
                bloodPressure: {
                type: new GraphQLNonNull(GraphQLString)
                },
                respiratoryRate: {
                type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: function (root, params) {
              const vitalSignsModel = new VitalSignsModel(params);
              const newVitalSigns = vitalSignsModel.save();
              if (!newVitalSigns) {
                throw new Error('Error');
              }
              return newVitalSigns
            }
          },
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
          },
          addMotivationalTips: {
            type: motivationalTipsType,
            args: {
              message: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve: function (root, params) {
              const motivationalTipsModel = new MotivationalTipsModel(params);
              const newMotivationalTips = motivationalTipsModel.save();
              if (!newMotivationalTips) {
                throw new Error('Error');
              }
              return newMotivationalTips
            }
          },
          addDailyInformation: {
            type: dailyInformationType,
            args: {
              pulseRate: {
                type: new GraphQLNonNull(GraphQLString)
              },
              bloodPressure: {
                type: new GraphQLNonNull(GraphQLString)
              },
              weight: {
                type: new GraphQLNonNull(GraphQLString)
              },
              temperature: {
                type: new GraphQLNonNull(GraphQLString)
              },
              respiratoryRate: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve: function (root, params) {
              const dailyInformationModel = new DailyInformationModel(params);
              const newDailyInformation = dailyInformationModel.save();
              if (!newDailyInformation) {
                throw new Error('Error');
              }
              return newDailyInformation
            }
          },
          updateDailyInformation: {
            type: dailyInformationType,
            args: {
              pulseRate: {
                type: new GraphQLNonNull(GraphQLString)
              },
              bloodPressure: {
                type: new GraphQLNonNull(GraphQLString)
              },
              weight: {
                type: new GraphQLNonNull(GraphQLString)
              },
              temperature: {
                type: new GraphQLNonNull(GraphQLString)
              },
              respiratoryRate: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve(root, params) {
              return DailyInformationModel.findByIdAndUpdate(params.id, { 
                  pulseRate: params.pulseRate, bloodPressure: params.bloodPressure, weight: params.weight, temperature: params.temperature, respiratoryRate: params.respiratoryRate
              }, function (err) {
                if (err) return next(err);
              });
            }
          },
          deleteDailyInformation: {
            type: dailyInformationType,
            args: {
              id: {
                type: new GraphQLNonNull(GraphQLString)
              }
            },
            resolve(root, params) {
              const deletedDailyInformation = dailyInformationModel.findByIdAndRemove(params.id).exec();
              if (!deletedDailyInformation) {
                throw new Error('Error')
              }
              return deletedDailyInformation;
            }
          }
      }
    }
  });



 



  //
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
  