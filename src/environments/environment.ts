// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/// Start UAT Configuration

export const environment = {
  production: true,
  apiEndpoint : 'http://localhost:52595'
};

//END

/// Start LIVE Configuration

/* 
export const environment = {
  production: false,
  apiEndpoint : 'https://d276tifqd61bl1.cloudfront.net'
};
*/

//END

/*
export const environment = {
  production: false,
  apiEndpoint : 'http://questaenngramapi-env.eba-6exk4uwq.ap-south-1.elasticbeanstalk.com'
};
*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
