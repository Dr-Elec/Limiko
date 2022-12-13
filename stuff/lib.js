export function RandomInt(min, max) {
	return Math.floor(Math.random() * Math.floor(max) + min);
}
export function shuffle(array) {//Тасование Фишера — Йетса.
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export function constrain(min, val, max) {
	if (val < min) return min;
	else if (val > max) return max;
	return val;
}