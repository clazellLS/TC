exports.validate = function (line, next) {
	var input = line.split(':');
	if (input.length > 4 || input.length < 4) {
		next(new Error('Enter correct value'));
	} else {
		next(null, line);
	}
}

exports.validateAndParseInt = function (valueToParse,next) {
	if (valueToParse !== null) {
		if (valueToParse.length > 0) {
			if (!isNaN(valueToParse)) {
				var retValue = parseInt(valueToParse);
			} else throw new Error('Not an Int');
		} else throw new Error('Not an Int');
	} else throw new Error('Not an Int');
	return retValue;
}