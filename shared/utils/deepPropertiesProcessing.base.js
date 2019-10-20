/**
 * Deep object properties processing.
 * 
 * @param {Object} obj
 * @param {function(any, string|number): boolean} ifFunction ifFunction(objectPart, key)
 * @param {function(any, string|number): void} thenFunction thenFunction(objectPart, key)
 * @returns {Object} Modify obj
 */
function deepObjectPropertiesProcessing(obj, ifFunction, thenFunction) {
	Object.keys(obj).forEach(key => {
		if (obj[key] && typeof obj[key] === 'object') {
			deepObjectPropertiesProcessing(obj[key], ifFunction, thenFunction);
		}
		// zmeny vo vyšších leveloch sa musia robiť po zmenách v nižších, aby sa nestratilo mapovanie
		if (ifFunction(obj, key)) thenFunction(obj, key);
	});
	return obj;
};

module.exports = deepObjectPropertiesProcessing;
