/**
 * App Config File
 */
export default {
	appLogo: '/vuely/static/img/rmt/rmt.png',                                  // App Logo,
	darkLogo: '/vuely/static/img/rmt/rmt.png',							    // dark logo
	appLogo2: '/vuely/static/img/session.png', 
	// appLogo: '/surcaja/static/img/rmt/rmt.png',                                  // App Logo,
	// darkLogo: '/surcaja/static/img/rmt/rmt.png',							    // dark logo
	// appLogo2: '/surcaja/static/img/session.png',                                    // App Logo 2 For Login & Signup Page
	brand: 'Ruta Maya Travel',                                        			        // Brand Name
	copyrightText: 'RMT © 2020 Todos los derechos reservados.',             // Copyright Text
	enableUserTour: process.env.NODE_ENV === 'production' ? true : false,   // Enable User Tour
	weatherApiId: 'b1b15e88fa797225412429c1c50c122a1',						// weather API Id
	weatherApiKey: '69b72ed255ce5efad910bd946685883a'						// weather APi key
}
