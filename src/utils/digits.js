export const salaryDigitsFormater = str => {
	let formatedNum
	/*
    104 Rules: salaryHigh
    00990 || 1 => 面議 
    00000 => 依公司規定
    01401 => 時薪140
  */

	switch (str) {
		case '00990':
			formatedNum = -100
			break
		case '00000':
			formatedNum = -1000
			break
		default:
			formatedNum = parseInt(Number(str))
	}
	// is hourly pay        e.g 01401
	if (str.charAt(1) !== '0' && str.charAt(str.length - 1) === '1') {
		formatedNum = 2
	}

	return formatedNum
}
