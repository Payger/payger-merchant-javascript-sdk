import endpointsConfig from './endpoints.js';
import environments from './environments.js';

export default class Config {
	
	constructor(env, oauth2) {
        this.env = env,
		this.url = this.getUrl(env.toLowerCase()),
		this.oauth2 = oauth2,
		this.endpoints = endpointsConfig
	}

	getUrl(env){
        let environment = environments.find(function(item) {
            return item.code === env;
        });

		if(!environment){
            environment = environments.find(function(item) {
                return item.default == true;
            });
		}

		return environment.url;
	}
}