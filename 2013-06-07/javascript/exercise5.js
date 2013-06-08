var numero_colonne = 80;
var numero_righe = 80;
var altezza = 2;
var fattore_di_scala = [0.5,0.5,0.1];
var parti = 40;

var verde = [0,1,0];
var marrone = [0.54,0.27,0.07];
var nocciola = [0.85,0.65,0.12];
var nero = [0,0,0];
var celeste = [0.4,0.8,0.67];

function generaNumero(min, max) {
  return Math.random() * (max - min) + min;
}

var z = function (u,v) {
	var pt = 0;
	if(u>numero_righe/6 || v>numero_colonne/8){
		pt = ((SIN(u/4)+1)*Math.pow(u,4/3))*0.2+ ((COS(v/8)+1)*Math.pow(v,1.2)*0.1);
	}
	return pt
}

var coordinate2ordinali = function (numero_colonne) {
	return function (coordinate) {
		var riga = coordinate[0];
		var colonna = coordinate[1];
		return riga*numero_colonne+colonna;
	}
}

var ordinale2coordinata = function(punto) {
	var riga = punto/numero_righe
	var colonna = punto/numero_colonne
	return [riga, colonna]
}

var getPunto = function (punti, coordinata) {
	return punti[coordinate2ordinali(numero_colonne)(coordinata)];
}

var verifica_coordinata = function (coordinata) {
	var riga=coordinata[0]
	var colonna=coordinata[1]
	if ((colonna<numero_colonne) && (riga<numero_righe) && (riga>-1) && (colonna>-1)) {
		return [riga,colonna]
	} else {
		return null
	}
}

var est = function (coordinata) {
	return verifica_coordinata([coordinata[0],coordinata[1]+1])
}

var ovest = function (coordinata) {
	return verifica_coordinata([coordinata[0], coordinata[1]-1])	
}

var nord = function (coordinata) {
	return verifica_coordinata([coordinata[0]-1, coordinata[1]])
}

var sud = function (coordinata) {
	return verifica_coordinata([coordinata[0]+1, coordinata[1]])	
}

//date le coordinate di un punto ritorna tutti i punti della cella quadrata di cui esso è il 
//punto in alto a sinistra
var punti_del_complesso = function(coordinata) {
	var punti =[coordinata, est(coordinata), sud(est(coordinata)), sud(coordinata)]
	return punti; 
}

//dati i punti di una cella quadrata, ritorna le due celle triangolari di cui è composto
var complesso_delle_celle = function (punti_del_complesso) {
	var celle = [
				[punti_del_complesso[0],punti_del_complesso[1],punti_del_complesso[3]],
				[punti_del_complesso[1],punti_del_complesso[2],punti_del_complesso[3]]
				]
	return celle
}

function coordinata2celle(lunghezza_rihe, lunghezza_colonne) {
	var nuove_celle = [];
	for (var i=0; i<lunghezza_rihe-1; i++) {
		for (var j=0; j<lunghezza_colonne-1; j++) {
			cs = complesso_delle_celle(punti_del_complesso([i,j]))
			nuove_celle.push(cs[0].map(coordinate2ordinali(lunghezza_colonne)))
			nuove_celle.push(cs[1].map(coordinate2ordinali(lunghezza_colonne)))
		}
	}
	return nuove_celle;
}

var cells = function (numeroDiPunti, lunghezzaRiga) {
	var nuove_celle = [];
	for (var i=1; i<numeroDiPunti-lunghezzaRiga; i++) {
		if ((i%lunghezzaRiga)!==0) {
			nuove_celle.pusaltezza([i-1,i,i+lunghezzaRiga-1]);
			nuove_celle.pusaltezza([i,i+lunghezzaRiga-1,i+lunghezzaRiga]);
		}
	}
	return nuove_celle;
}

var generaPunti = function (numero_righe, numero_colonne) {
	var riga = [];
	for (var i=0; i<numero_righe; i++) {
		for (var j=0; j<numero_colonne; j++) {
			riga.push([i,j,1]);
		}
	}
	return riga;
}

var c = coordinata2celle(numero_righe, numero_colonne);
var p = generaPunti(numero_righe, numero_colonne);

p = p.map(function(e){e[2] = z(e[0],e[1])*fattore_di_scala[2]; return e});
p = p.map(function(e){e[0]*=fattore_di_scala[0]; e[1]*=fattore_di_scala[1]; return e});
var punti = p;

var terreno = COLOR(nocciola)(SIMPLICIAL_COMPLEX(punti)(c));

var laghetto = COLOR(celeste)(CUBOID([(numero_righe-1)*fattore_di_scala[1],(numero_colonne-1)*fattore_di_scala[0],altezza*fattore_di_scala[2]]));

function albero(altezza, r, parti) {
	var tronco = COLOR(marrone)(EXTRUDE([2*altezza/3])(CIRCLE(r)(parti)));
	var seg = [[2*r,0,0],[0,0,2*altezza/3]]
	var dom = DOMAIN([[0,1],[0,2*PI]])([1,parti]);
	var chioma = COLOR(verde)(MAP(ROTATIONAL_SURFACE(BEZIER(S0)(seg)))(dom));
	var base_chioma = COLOR(verde)(DISK(2*r)(parti))
	return STRUCT([T([2])([-altezza/3])(tronco),T([2])([altezza/3])(chioma),T([2])([altezza/3])(base_chioma)]);
}

function foresta(centro, r) {
	var alberelli = [];
	for (var i=0; i<20; i++) {
		var x = centro[0]+(Math.random()*r-r/2);
		var y = centro[1]+(Math.random()*r-r/2);
		var zeta = z(x,y);
		var albero_da_traslare = albero(1*fattore_di_scala[0],0.1*fattore_di_scala[0], parti)
		var alberello = T([0,1,2])([x*fattore_di_scala[0],y*fattore_di_scala[1],zeta*fattore_di_scala[2]])(albero_da_traslare);
		alberelli.push(alberello);
	}
	return STRUCT(alberelli);
}


function casa(coordinata) {
	var x = generaNumero(0.4, 0.9) * fattore_di_scala[0]
	var y = generaNumero(0.4,0.9) * fattore_di_scala[1]
	var z = 0.5+(generaNumero(0.5, 1) * fattore_di_scala[2]);
	return T([0,1,2])(getPunto(punti, coordinata))(T([0,2])([-x,-z/3])(CUBOID([x,y,z])));
}

function quattro_case(centro) {
	var casette = [];
	var coordinate = [sud(centro),sud(ovest(centro)),ovest(centro), centro];
	for (var i=0; i<coordinate.length; i++) {
		if (coordinate[i]!==null) {
			casette.push(casa(coordinate[i]));
		}
	}
	return STRUCT(casette);
}

//data la coordinata di un punto, il numero di riche e di colonne ritorna una strada di tot righe e tot colonne il cui vertice è il punto passato come coordinate
var strada = function(coordinate, larghezza, lunghezza) {
	var punti_strada = [];
	for (var riga=0; riga<=larghezza; riga++) {
		for (var col=0; col<=lunghezza; col++) {
			punti_strada.push(getPunto(punti, [coordinate[0]+riga, coordinate[1]+col]))
		}	
	}
	
	var celle = coordinata2celle(larghezza+1, lunghezza+1);
	return COLOR(nero)(T([2])([0.005])(SIMPLICIAL_COMPLEX(punti_strada)(celle)));
}

var c1 = [parseInt(numero_colonne/6,10),parseInt(numero_righe/3,10)]
var c2 = [parseInt(numero_colonne/2.5,10),parseInt(2*numero_righe/6,10)]
var c3 = [parseInt(numero_colonne/2.5,10),parseInt(1*numero_righe/6,10)]
var c4 = [parseInt(numero_colonne/3,10),parseInt(1*numero_righe/6,10)]

var fr1 = foresta([parseInt(numero_colonne/6,10),parseInt(2*numero_righe/3,10)],4)
var fr2 = foresta([parseInt(numero_colonne/2.5,10),parseInt(2*numero_righe/3,10)],10)
var fr3 = foresta([parseInt(numero_colonne/1.5,10),parseInt(numero_righe/3,10)],7)
var fr4 = foresta([parseInt(numero_colonne/1.7,10),parseInt(2*numero_righe/3,10)],8)

//dato il centro genera un gruppo di 4 case con la strada che le circonda
var quartiere = function (centro) {
	var qc = quattro_case(centro);
	var strada_sud = strada(sud(ovest(centro)), 1, 3);
	var strada_est = strada(nord(nord(est(centro))), 3, 1);
	var strada_nord = strada(nord(ovest(nord(ovest(centro)))),1, 3);
	var strada_ovest = strada(nord(ovest(ovest(centro))),3, 1);
	return STRUCT([strada_sud,strada_est,strada_nord,strada_ovest, qc]);
}

var model = STRUCT([laghetto, 
	fr1, fr2, fr3, fr4,  
	quartiere(c1), quartiere(c2), quartiere(c3), quartiere(c4),
	terreno]);
DRAW(model);