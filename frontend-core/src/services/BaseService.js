import angular from 'angular';
var BASE_URL = process.env.base_url;

var BASIC_AUTH_KEY = 'basic-auth-cred';
class BaseService {
  constructor($http,$cookies) {
    this.BASE_URL  = BASE_URL;
    this.$http = $http;
    this.$cookies = $cookies;
    // also set in default
    // note that this is essentially a hack
    // some admin services rely on ng-resource
    // thus bypass base service to make request
    if(this.hasBasicAuth()){
      this.$http.defaults.headers.common.Authorization = this.computeBasicAuthString(this.getBasicAuth());
    }
  }
  setLoginToken(token){
    this.$cookies.put("loginToken",token,{
                expires:new Date(Date.now() + 120*60*1000) //expires in 120 minutes
            });
  }
  setBasicAuth(credential){
    if(!credential.username || !credential.password){
      throw new Error('Invalid credential given, no username or password');
    }
    this.$cookies.put(BASIC_AUTH_KEY,JSON.stringify(credential),{
      expires: new Date(Date.now() + 4*60*60*1000) // in 4 hours
    });
    // also set in default
    this.$http.defaults.headers.common.Authorization = this.computeBasicAuthString(credential);
  }
  hasBasicAuth(){
    return !!(this.getBasicAuth());
  }
  getBasicAuth(){
    var value = this.$cookies.get(BASIC_AUTH_KEY);
    if(!value){
      return null;
    }
    return JSON.parse(value);
  }
  computeBasicAuthString(credential){
    return 'Basic ' + window.btoa(credential.username
          +':'+credential.password);
  }
  request(method,path,body){
    var loginToken = this.$cookies.get("loginToken");
    var headers = {
        "Content-Type":"application/json"
    };
    if(loginToken){
      headers['ept-login-token'] = loginToken;
    }
    if(this.hasBasicAuth()) {
      var credential = this.getBasicAuth();
      headers['Authorization'] = this.computeBasicAuthString(credential);
    }
    return this.$http({
      method:method,
      url:this.BASE_URL + path,
      headers:headers,
      data:body
    }).then(function(response){ //upon response success, return only the body;
      return response.data;
    });
  }
  post(path,body){
    return this.request("POST",path,body);
  }
  get(path){
    return this.request("GET",path,null);
  }
  put(path,body){
    return this.request("PUT",path,body);
  }
  patch(path,body){
    return this.request("PATCH",path,body);
  }
  delete(path){
    return this.request("DELETE",path);
  }
}

export default angular.module('ept.common.BaseService', [])
  .service('BaseService', ['$http','$cookies',BaseService])
  .name;
