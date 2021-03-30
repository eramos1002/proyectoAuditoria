const { appInit } = require("./appConf");
const { bdInit } = require("./bdConf");
const authentication = require("./middleware/authentication");
const userEndpoints = require("./endpoints/user");
const buildingEndpoints = require("./endpoints/building");
const auditEndpoints = require("./endpoints/audit");

// Conexión a la base de datos
const bd = bdInit();

// Creación de la aplicación
const api = appInit();

// Añade a la aplicación soporte para tokens JWT
authentication.register(api);

// Añade a la aplicación los endpoints de usuario
userEndpoints.register(api);

// Añade a la aplicación los endpoints de edificios
buildingEndpoints.register(api);

// Añade a la aplicación los endpoints de auditorías
auditEndpoints.register(api);

// Levantar la aplicación y ponerla a escuchar
const serviceName = process.env['SERVICE_NAME'] || 'server';
const deployPort = process.env['DEPLOY_PORT'] || 8080;
api.listen(deployPort, () => {
    console.log(`[APPLICATION] Listening '${serviceName}' at port ${deployPort}...`);
});
