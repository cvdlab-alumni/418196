function esporta(modello_lar){
	var V = modello_lar[0];
	var FV = modello_lar[1];
	var risultato ="";
	for (var i = 0; i < V.length; i++){
		risultato += "v "+V[i][0]+" "+V[i][1]+" "+V[i][2]+" "+V[i][3]+"\n";
	}
	risultato += "f " +FV[0][0]+FV[0][1]+FV[0][2];
	for (var j=1; j<FV.length;j++){
		risultato+= FV[j][0]+"/"+FV[j][1]+"/"+FV[j][2]+"\n";
	}
	return risultato;
}