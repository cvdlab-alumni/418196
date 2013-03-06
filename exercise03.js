var i;
var j;
var s="";
for (var i = 1; i < 11; i++) {
	for (var j = 1; j < 11; j++){
		if( j === i){
			s += 1
		}else{
			s +=0
		}
		if(j !== 10)
			s += ", ";
	}
	console.log(s)
	s = "";
};