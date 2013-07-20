function GETKNOTS(degree, ptsnumber){
	ris = [];
	stop = degree+ptsnumber+1;
	for(var i=0;i<stop;i++){
		if(i<=degree){
			ris.push(0);
		}else{
			if(i>=stop-(degree+1)){
				ris.push(ptsnumber-1);
			}else{
				ris.push(i-degree);
			}
		}
	}
	return ris;
}

function TRASLAPOINTS(values){
	x = values[0]
	y = values[1]
	z = values[2]
	function TRASLAPOINTS2(points){
		p = []
		for(a in points){
			c = [0,0,0]
			c[0] = points[a][0] + x
			c[1] = points[a][1] + y
			c[2] = points[a][2] + z
			p.push(c)
		}
		return p
	}
	return TRASLAPOINTS2
}

function SCALEPOINTS(value){
	x = value[0];
	y = value[1];
	z = value[2];
	function SCALEPOINTS2(points){
		p = [];
		for(a in points){
			c = [0,0,0];
			c[0] = points[a][0] * x;
			c[1] = points[a][1] * y;
			c[2] = points[a][2] * z;
			p.push(c);
		}
		return p;
	}
	return SCALEPOINTS2
}
var RED = [1,0,0]
var BLUE = [0,0,1]
var GREEN = [0,1,0]
var CELESTE = [0,1,1]
var BLACK = [0,0,0]
var YELLOW = [1,1,0]
var ORANGE = [1,0.65,0]
var BROWN = [0.65,0.16,0.16]
var GREY = [0.4,0.4,0.4]


var domain = DOMAIN([[0,1]])([10])
var domain2D = DOMAIN([[0,1],[0,1]])([10,10])
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([10,10,10])

var alpha = ATAN(10/0.8)
var cotan = COS(alpha)/SIN(alpha)

var pts1 = [[0,1,2],
			[0.25,1,1.95],[0.5,1,1.8],[0.65,1,1.5],
			[1.3,0.4,0.8],[1.4,0.5,0.9],[1.5,0.6,0.8],
			[2.4,1,1.8],[2.7,1,1.9],[3.1,1,1.8],
			[5.05,1,0.7],[5.25,1,0.65],[5.4,1,0.6],
			[10,1,0.2]]

var pts1_s = SCALEPOINTS([1,1,0.5])(pts1)
//var pts1 = [[0,0,2],
//			[0.25,1/9,1.95],[0.5,2/9,1.8],[0.65,3/9,1.5],
//			[1.3,4/9,0.6],[1.4,5/9,0.7],[1.5,6/9,0.6],
//			[2.4,7/9,1.5],[2.7,8/9,1.6],[3.1,1,1.5],
//			[5.05,1,0.9],[5.25,1,0.85],[5.4,1,0.8],
//			[10,1,0.2]]
//var pts1_s = SCALEPOINTS([1,0,1])(pts1)
//var pts1_2 = TRASLAPOINTS([0,1,0])(pts1_s)
var kns1 = GETKNOTS(3,pts1.length)
var curva1 = NUBS(S0)(3)(kns1)(pts1_s)

var pts2 = [[0,1,2],
			[0.25,1,1.95],[0.5,1,1.8],[0.65,1,1.5],
			[1.3,2-0.4,0.8],[1.4,2-0.5,0.9],[1.5,2-0.6,0.8],
			[2.4,1,1.8],[2.7,1,1.9],[3.1,1,1.8],
			[5.05,1,0.7],[5.25,1,0.65],[5.4,1,0.6],
			[10,1,0.2]]

var pts2_s = SCALEPOINTS([1,1,0.5])(pts2)
//var pts2 = [[0,2,2],
//			[0.25,2-1/9,1.95],[0.5,2-2/9,1.8],[0.65,2-3/9,1.5],
//			[1.3,2-4/9,0.6],[1.4,2-5/9,0.7],[1.5,2-6/9,0.6],
//			[2.4,2-7/9,1.5],[2.7,2-8/9,1.6],[3.1,1,1.5],
//			[5.05,1,0.9],[5.25,1,0.85],[5.4,1,0.8],
//			[10,1,0.2]]
//var pts2_s = SCALEPOINTS([1,0,1])(pts2)
//var pts2_2 = TRASLAPOINTS([0,1,0])(pts2_s)
var kns2 = GETKNOTS(3,pts2.length)
var curva2 = NUBS(S0)(3)(kns2)(pts2_s)

var pts3 = [[0,0,0],[10,1-0.1,0]]
var b3 = BEZIER(S0)(pts3)
var c3 = MAP(b3)(domain)

var pts4 = [[0,2,0],[10,1+0.1,0]]
var b4 = BEZIER(S0)(pts4)
var c4 = MAP(b4)(domain)

var pts5 = SCALEPOINTS([1,1,0.5])([[0,1,-2],[10,1,-0.2]])
var b5 = BEZIER(S0)(pts5)
var c5 = MAP(b5)(domain)

var sup1_2 = BEZIER(S1)([curva1,curva2])
var sup1_3 = BEZIER(S1)([curva1,b3])
var sup2_4 = BEZIER(S1)([curva2,b4])
var sup3_5 = BEZIER(S1)([b3,b5])
var sup4_5 = BEZIER(S1)([b4,b5])

var sup1_2_map = MAP(sup1_2)(domain2D)
var sup1_3_map = MAP(sup1_3)(domain2D)
var sup2_4_map = MAP(sup2_4)(domain2D)
var sup3_5_map = MAP(sup3_5)(domain2D)
var sup4_5_map = MAP(sup4_5)(domain2D)

var sqrt = Math.sqrt(2)
var pts_S_1 = [[0,1,1],[-sqrt*SIN(PI/4),2,0]]
var b_S_1 = BEZIER(S0)(pts_S_1)
var pts_S_2 = [[-sqrt*SIN(PI/4),0,0],[-sqrt*2*SIN(PI/4),1,-1]]
var b_S_2 = BEZIER(S0)(pts_S_2)
var pts_S_3 = SCALEPOINTS([0,1,1])(pts_S_1)
var b_S_3 = BEZIER(S0)(pts_S_3)
var pts_S_4 = SCALEPOINTS([0,1,1])(pts_S_2)
var b_S_4 = BEZIER(S0)(pts_S_4)
var srf_S_1 = BEZIER(S1)([b_S_1,b_S_2])
var srf_S_2 = BEZIER(S1)([b_S_3,b_S_4])
var sol_S = BEZIER(S2)([srf_S_1,srf_S_2])
var sol_S_map = MAP(sol_S)(domain3D)

var sqrt_B = Math.sqrt(Math.pow((1-0.9),2)+Math.pow((0.1-0),2))
var pts_B_1 = TRASLAPOINTS([0.1,0,0])([[10+2*sqrt_B*SIN(PI/4),1,0.1],[10+sqrt_B*SIN(PI/4),0.9,0]])
var b_B_1 = BEZIER(S0)(pts_B_1)
var pts_B_2 = TRASLAPOINTS([0.1,0,0])([[10+sqrt_B*SIN(PI/4),1.1,0],[10,1,-0.1]])
var b_B_2 = BEZIER(S0)(pts_B_2)
var pts_B_3 = [[10,1,0.1],[10,0.9,0]]
var b_B_3 = BEZIER(S0)(pts_B_3)
var pts_B_4 = [[10,1.1,0],[10,1,-0.1]]
var b_B_4 = BEZIER(S0)(pts_B_4)
var srf_B_1 = BEZIER(S1)([b_B_1,b_B_2])
var srf_B_2 = BEZIER(S1)([b_B_3,b_B_4])
var sol_B = BEZIER(S2)([srf_B_1,srf_B_2])
var punta_zampa = MAP(sol_B)(domain3D)

var zampa = STRUCT([COLOR(RED)(sup1_2_map),COLOR(RED)(sup1_3_map),COLOR(RED)(sup2_4_map),COLOR(RED)(sup3_5_map),COLOR(RED)(sup4_5_map),COLOR(RED)(sol_S_map),punta_zampa])
var zampa_T = T([0,1,2])([2*sqrt*SIN(PI/4),-1,1])(zampa)
var zampa_R = R([0,2])(PI/4)(zampa_T)


//piano
var p_pts1 = [[0,0,0],[0,4,0]]
var p_b1 = BEZIER(S0)(p_pts1)

var p_pts3 = [[0,0,0],[0,0,0],[0,0,-0.4],[0,1,-0.8],[0,4,-0.8]]
var p_b3 = BEZIER(S0)(p_pts3)

var p_srf = BEZIER(S1)([p_b1,p_b3])
var p_srf_map = MAP(p_srf)(domain2D)

var p_pts2 = TRASLAPOINTS([6,0,0])(p_pts1)
var p_b2 = BEZIER(S0)(p_pts2)

var p_pts4 = TRASLAPOINTS([6,0,0])(p_pts3)
var p_b4 = BEZIER(S0)(p_pts4)

var p_srf2 = BEZIER(S1)([p_b2,p_b4])
var p_srf2_map = MAP(p_srf2)(domain2D)

var p_sol = BEZIER(S2)([p_srf,p_srf2])
var p_sol_map = MAP(p_sol)(domain3D)

var p_pts5 = [[10,0,0],[6,4,0]]
var p_b5 = BEZIER(S0)(p_pts5)

var p_pts7 = [[10,0,0],[10,0,0],[10,0,-0.4],[9,1,-0.8],[6,4,-0.8]]
var p_b7 = BEZIER(S0)(p_pts7)

var p_srf3 = BEZIER(S1)([p_b5,p_b7])
var p_srf3_map = MAP(p_srf3)(domain2D)

var p_sol2 = BEZIER(S2)([p_srf3,p_srf2])
var p_sol2_map = MAP(p_sol2)(domain3D)

var p_pts6 = [[10,4,0],[6,4,0]]
var p_b6 = BEZIER(S0)(p_pts6)

var p_pts8 = [[10,4,0],[10,4,0],[10,4,-0.4],[9,4,-0.8],[6,4,-0.8]]
var p_b8 = BEZIER(S0)(p_pts8)

var p_srf4 = BEZIER(S1)([p_b8,p_b6])
var p_srf4_map = MAP(p_srf4)(domain2D)

var p_srf5 = BEZIER(S1)([p_b7,p_b5])
var p_srf5_map = MAP(p_srf5)(domain2D)

var p_sol3 = BEZIER(S2)([p_srf5,p_srf4])
var p_sol3_map = MAP(p_sol3)(domain3D)

var p_pts9 = TRASLAPOINTS([0,4,0])(p_pts6)
var p_b9 = BEZIER(S0)(p_pts9)

var p_pts10 = TRASLAPOINTS([0,4,0])(p_pts8)
var p_b10 = BEZIER(S0)(p_pts10)

var p_srf6 = BEZIER(S1)([p_b10,p_b9])
var p_srf6_map = MAP(p_srf6)(domain2D)

var p_sol4 = BEZIER(S2)([p_srf6,p_srf4])
var p_sol4_map = MAP(p_sol4)(domain3D)

var p_srf7 = BEZIER(S1)([p_b3,p_b4])
var p_srf7_map = MAP(p_srf7)(domain2D)

var p_srf8 = BEZIER(S1)([p_b1,p_b2])
var p_srf8_map = MAP(p_srf8)(domain2D)

var p_srf9 = BEZIER(S1)([p_b4,p_b7])
var p_srf9_map = MAP(p_srf9)(domain2D)

var p_srf10 = BEZIER(S1)([p_b2,p_b5])
var p_srf10_map = MAP(p_srf10)(domain2D)

var p_srf11 = BEZIER(S1)([p_b7,p_b8])
var p_srf11_map = MAP(p_srf11)(domain2D)

var p_srf12 = BEZIER(S1)([p_b5,p_b6])
var p_srf12_map = MAP(p_srf12)(domain2D)

var p_srf13 = BEZIER(S1)([p_b8,p_b10])
var p_srf13_map = MAP(p_srf13)(domain2D)

var p_srf14 = BEZIER(S1)([p_b6,p_b9])
var p_srf14_map = MAP(p_srf14)(domain2D)

var p_sol5 = T([0,1,2])([0,4,-0.8])(CUBOID([6,4,0.8]))

var piano = STRUCT([p_srf_map,p_srf8_map,p_srf7_map,
	p_srf9_map,p_srf10_map,p_srf11_map,p_srf12_map,
	p_srf13_map,p_srf14_map,p_srf6_map,p_sol5])

var piano1 = piano
var zampa1 = STRUCT([sup1_2_map,sup1_3_map,sup2_4_map,sup3_5_map,sup4_5_map,sol_S_map])
var punta1_T = T([0,1,2])([2*sqrt*SIN(PI/4),-1,1])(punta_zampa)
var punta1_R = R([0,2])(PI/4)(punta1_T)
var zampa1_T = T([0,1,2])([2*sqrt*SIN(PI/4),-1,1])(zampa1)
var zampa1_R = R([0,2])(PI/4)(zampa1_T)
var zampa1 = T([0,1,2])([5,5,-0.8])(R([0,1])([-PI/4])(zampa1_R))
var punta1 = T([0,1,2])([5,5,-0.8])(R([0,1])([-PI/4])(punta1_R))
var parteBLUE = STRUCT([COLOR(BLUE)(piano1),COLOR(BLUE)(zampa1),punta1])

var piano2 = S([0])([-1])(piano1)
var zampa2 = S([0])([-1])(zampa1)
var punta2 = S([0])([-1])(punta1)
var parteYELLOW = STRUCT([COLOR(YELLOW)(piano2),COLOR(YELLOW)(zampa2),COLOR(GREY)(punta2)])

var piano3 = S([1])([-1])(piano1)
var zampa3 = S([1])([-1])(zampa1)
var punta3 = S([1])([-1])(punta1)
var parteRED = STRUCT([COLOR(RED)(piano3),COLOR(RED)(zampa3),COLOR(GREY)(punta3)])
var parteRED_T = T([0,1,2])([0,16,0])(parteRED)

var piano4 = S([0])([-1])(piano3)
var zampa4 = S([0])([-1])(zampa3)
var punta4 = S([0])([-1])(punta3)
var parteGREEN = STRUCT([COLOR(GREEN)(piano4),COLOR(GREEN)(zampa4),COLOR(GREY)(punta4)])
var parteGREEN_T = T([0,1,2])([0,16,0])(parteGREEN)

var tavolo = STRUCT([parteYELLOW, parteBLUE, parteGREEN_T, parteRED_T])
DRAW(tavolo)