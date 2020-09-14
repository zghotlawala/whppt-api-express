const $id = require('./id');
const $logger = require('./logger');
const Security = require('./security');
const Mongo = require('./mongo');
const loadModules = require('./modules/loadModules');
const Image = require('./image');
const File = require('./file');
const $aws = require('./aws');
const Smtp = require('./smtp');
// const $atdw = require('./atdw');
// const $axios = require('./axios');

// const config = require(process.cwd() + '/whppt.config.js');

module.exports = options => {
  options.modules = options.modules || {};

  return Promise.all([Mongo({ $logger })]).then(([$mongo]) => {
    return {
      $id,
      $logger,
      $image: Image({ $logger, $mongo, $aws, $id, disablePublishing: options.disablePublishing }),
      $file: File({ $logger, $mongo, $aws, $id, disablePublishing: options.disablePublishing }),
      $security: Security({ $logger, $id, config: options }),
      $mongo,
      $modules: loadModules.then(modules => ({ ...modules, ...options.modules })),
      $email: { send: $aws.sendEmail, getDomainList: $aws.getDomainIdentities },
      $smtp: Smtp({ $mongo }),
      // $image: Image({ $logger, $mongo, $aws, $id }),
      // $atdw,
      // $axios,
      // $objectTypes: config.supportedTypes,
    };
  });
};
