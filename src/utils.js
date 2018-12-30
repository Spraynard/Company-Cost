Number.prototype.costFormat = function() {
	return this.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};