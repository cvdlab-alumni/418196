
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
var domain = DOMAIN([[0,1]])([8])
var domain2D = DOMAIN([[0,1],[0,1]])([8,8])
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([8,8,8])
var BROWN = [0.54,0.27,0.07]
var RED = [1,0,0]
var RED2 = [0.8,0,0]
var BLACK = [0,0,0]
var PINK =[1,0.71,0.77]
var CELESTE = [0.53,0.81,1]
var GREEN = [0,1,0]
var YELLOW = [1,1,0]
var CARTAZUCCHERO = [0.47,0.53,0.6]
var BLUE = [0,0,1]
var ORANGE = [1,0.65,0]

var prof_base = 4.4
var prof_el_largo = 4.0
var prof_el_stretto = 3.6

var base = CUBOID([10.2,prof_base,1.5])

var sponda1 = COLOR(BROWN)(T([0,1,2])([2.6,0.2,1.5])(CUBOID([0.5,prof_el_largo,4.2])))
var sponda2 = COLOR(BROWN)(T([0,1,2])([2.6+4.5,0.2,1.5])(CUBOID([0.5,prof_el_largo,4.2])))

var cass1 = COLOR(RED)(T([0,1,2])([2.6+0.5,0.2,3.3-0.1])(CUBOID([4,prof_el_largo,1.2])))
var cass2 = COLOR(RED)(T([0,1,2])([2.6+0.5,0.2,3.3+1.2-0.05])(CUBOID([4,prof_el_largo,1.2])))
var maniglia = STRUCT([CUBOID([1.2,0.2,0.2]),T([0,1,2])([-0.1,-0.2,-0.1])(CUBOID([1.4,0.2,0.4]))])
var maniglia1 = COLOR(RED2)(T([0,1,2])([5.1-0.6,0,5.7-0.6-0.2])(maniglia))
var maniglia2 = COLOR(RED2)(T([2])([-1.2])(maniglia1))

var piano1 = COLOR(PINK)(T([0,1,2])([0.7,0.2,1.5+4.2])(CUBOID([8.8,prof_el_largo,0.5])))

var sponda3 = COLOR(CELESTE)(T([0,1,2])([4.85,0.2,1.5+4.2+0.5])(CUBOID([0.5,prof_el_largo,3])))

var piano2 = COLOR(GREEN)(T([0,1,2])([-4.6,0.2,1.5+4.2+0.5+3])(CUBOID([19.4,prof_el_largo,0.5])))


var pt_base = [[0,0,0],[0.6,0,0]]
var b_base = BEZIER(S0)(pt_base)
var pt_alt = [[2.7,0,3.4+1],[2.7,0,3.4]]
var b_altezza = BEZIER(S0)(pt_alt)
var srf1 = BEZIER(S1)([b_base,b_altezza])
var surface1 = MAP(srf1)(domain2D)
var pt_base_d = TRASLAPOINTS([0,prof_el_largo,0])([[0,0,0],[0.6,0,0]])
var b_base_d = BEZIER(S0)(pt_base_d)
var pt_alt_d = TRASLAPOINTS([0,prof_el_largo,0])([[2.7,0,3.4+1],[2.7,0,3.4]])
var b_altezza_d = BEZIER(S0)(pt_alt_d)
var srf1_d = BEZIER(S1)([b_base_d,b_altezza_d])
var sem_tria_s = BEZIER(S2)([srf1,srf1_d])
var sem_tria_s_map = MAP(sem_tria_s)(domain3D)
var pt_base2 = [[4.8,0,0],[4.8+0.6,0,0]]
var b_base2 = BEZIER(S0)(pt_base2)
var pt_alt2 = [[2.7,0,3.4],[2.7,0,3.4+1]]
var b_altezza2 = BEZIER(S0)(pt_alt2)
var srf2 = BEZIER(S1)([b_base2,b_altezza2])
var surface2 = MAP(srf2)(domain2D)
var pt_base2_d = TRASLAPOINTS([0,prof_el_largo,0])([[4.8,0,0],[4.8+0.6,0,0]])
var b_base2_d = BEZIER(S0)(pt_base2_d)
var pt_alt2_d= TRASLAPOINTS([0,prof_el_largo,0])([[2.7,0,3.4],[2.7,0,3.4+1]])
var b_altezza2_d = BEZIER(S0)(pt_alt2_d)
var srf2_d = BEZIER(S1)([b_base2_d,b_altezza2_d])
var sem_tria_d = BEZIER(S2)([srf2,srf2_d])
var sem_tria_d_map = MAP(sem_tria_d)(domain3D)
var triangoloRosa = COLOR(PINK)(T([0,1,2])([5.1-2.1-0.6,0.2,1.5+4.2+0.5+3+0.5])(STRUCT([sem_tria_d_map,sem_tria_s_map])))

var piano3 = COLOR(YELLOW)(T([0,1,2])([5.1-3.5,0.2,14.1])(CUBOID([7,prof_el_largo,0.5])))

var sponda4 = COLOR(BLACK)(T([0,1,2])([5.1-0.25,0.2,14.6])(CUBOID([0.5,prof_el_largo,2.5])))

var lato1 = CUBOID([3,prof_el_largo,0.2])
var lato2 = T([0,2])([3-0.2,0.2])(CUBOID([0.2,prof_el_largo,2.1]))
var lato3 = T([2])([2.1])(CUBOID([3,prof_el_largo,0.2]))
var lato4 = T([2])([0.2])(CUBOID([0.2,prof_el_largo,2.1]))

var cubo = T([0,1,2])([5.1-1.5,0.2,17.1])(STRUCT([lato1,lato2,lato3,lato4]))

var pts_giallo = [[0,0,0],[0.6,0,0]]
var pts_giallo_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_giallo)
var pts_giallo_2 = [[2.55,0,4.3],[2.55+0.6,0,4.3]]
var pts_giallo_2_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_giallo_2)
var b_giallo = BEZIER(S0)(pts_giallo)
var b_giallo_d = BEZIER(S0)(pts_giallo_d)
var b_giallo_2 = BEZIER(S0)(pts_giallo_2)
var b_giallo_2_d = BEZIER(S0)(pts_giallo_2_d)
var srf_giallo = BEZIER(S1)([b_giallo,b_giallo_d])
var srf_giallo_2 = BEZIER(S1)([b_giallo_2,b_giallo_2_d])
var giallo = BEZIER(S2)([srf_giallo,srf_giallo_2])
var gialloMap = MAP(giallo)(domain3D)
var gialloFinito = COLOR(YELLOW)(T([0,1,2])([5.1+5,0.2,9.7])(gialloMap))

var pts_giallo_s = SCALEPOINTS([-1,1,1])([[0,0,0],[0.6,0,0]])
var pts_giallo_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_giallo_s)
var pts_giallo_2_s = SCALEPOINTS([-1,1,1])([[2.55,0,4.3],[2.55+0.6,0,4.3]])
var pts_giallo_2_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_giallo_2_s)
var b_giallo_s = BEZIER(S0)(pts_giallo_s)
var b_giallo_d_s = BEZIER(S0)(pts_giallo_d_s)
var b_giallo_2_s = BEZIER(S0)(pts_giallo_2_s)
var b_giallo_2_d_s = BEZIER(S0)(pts_giallo_2_d_s)
var srf_giallo_s = BEZIER(S1)([b_giallo_s,b_giallo_d_s])
var srf_giallo_2_s = BEZIER(S1)([b_giallo_2_s,b_giallo_2_d_s])
var giallo_s = BEZIER(S2)([srf_giallo_s,srf_giallo_2_s])
var gialloMap_s = MAP(giallo_s)(domain3D)
var gialloFinito_s = COLOR(YELLOW)(T([0,1,2])([5.1-5,0.2,9.7])(gialloMap_s))

var pts_tr_nero = SCALEPOINTS([4./3,4./3,4./3])([[0,0,0],[1.5,0,0]])
var pts_tr_nero_punta = SCALEPOINTS([4./3,4./3,4./3])([[0.75,0,1.3]])
var pts_tr_nero_d = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero)
var pts_tr_nero_punta_d = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_punta)
var b_tr_nero = BEZIER(S0)(pts_tr_nero)
var b_tr_nero_punta = BEZIER(S0)(pts_tr_nero_punta)
var b_tr_nero_d = BEZIER(S0)(pts_tr_nero_d)
var b_tr_nero_punta_d = BEZIER(S0)(pts_tr_nero_punta_d)
var srf_tr = BEZIER(S1)([b_tr_nero,b_tr_nero_d])
var srf_tr_punta = BEZIER(S1)([b_tr_nero_punta,b_tr_nero_punta_d])
var tr_nero = BEZIER(S2)([srf_tr,srf_tr_punta])
var triangoloNero = MAP(tr_nero)(domain3D)
var triangoloNeroFinito = COLOR(BLACK)(T([0,1,2])([5.1+5+0.6,0.4,9.7])(triangoloNero))
var triangoloNeroFinito_s = COLOR(BLACK)(T([0,1,2])([5.1-5-0.6-(1.5*4/3),0.4,9.7])(triangoloNero))

var pts_tr_nero_1 = SCALEPOINTS([2./3,2./3,2./3])([[0,0,0],[1.5,0,0]])
var pts_tr_nero_punta_1 = SCALEPOINTS([2./3,2./3,2./3])([[0.75,0,1.3]])
var pts_tr_nero_d_1 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_1)
var pts_tr_nero_punta_d_1 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_punta_1)
var b_tr_nero_1 = BEZIER(S0)(pts_tr_nero_1)
var b_tr_nero_punta_1 = BEZIER(S0)(pts_tr_nero_punta_1)
var b_tr_nero_d_1 = BEZIER(S0)(pts_tr_nero_d_1)
var b_tr_nero_punta_d_1 = BEZIER(S0)(pts_tr_nero_punta_d_1)
var srf_tr_1 = BEZIER(S1)([b_tr_nero_1,b_tr_nero_d_1])
var srf_tr_punta_1 = BEZIER(S1)([b_tr_nero_punta_1,b_tr_nero_punta_d_1])
var tr_nero_1 = BEZIER(S2)([srf_tr_1,srf_tr_punta_1])
var triangoloNero_1 = MAP(tr_nero_1)(domain3D)
var triangoloNeroFinito_1 = COLOR(BLACK)(T([0,1,2])([5.1-(1.5*2/3/2),0.4,13.1-(1.3*2/3)])(triangoloNero_1))

var pts_tr_nero_2 = [[0,0,0],[1.5,0,0]]
var pts_tr_nero_punta_2 = SCALEPOINTS([1,1,-1])([[0.75,0,1.3]])
var pts_tr_nero_d_2 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_2)
var pts_tr_nero_punta_d_2 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_punta_2)
var b_tr_nero_2 = BEZIER(S0)(pts_tr_nero_2)
var b_tr_nero_punta_2 = BEZIER(S0)(pts_tr_nero_punta_2)
var b_tr_nero_d_2 = BEZIER(S0)(pts_tr_nero_d_2)
var b_tr_nero_punta_d_2 = BEZIER(S0)(pts_tr_nero_punta_d_2)
var srf_tr_2 = BEZIER(S1)([b_tr_nero_2,b_tr_nero_d_2])
var srf_tr_punta_2 = BEZIER(S1)([b_tr_nero_punta_2,b_tr_nero_punta_d_2])
var tr_nero_2 = BEZIER(S2)([srf_tr_2,srf_tr_punta_2])
var triangoloNero_2 = MAP(tr_nero_2)(domain3D)
var triangoloNeroFinito_2 = COLOR(BLACK)(T([0,1,2])([5.1,0.4,14.1])(triangoloNero_2))
var triangoloNeroFinito_2_s = COLOR(BLACK)(T([0,1,2])([5.1-1.5,0.4,14.1])(triangoloNero_2))

var sponda5 = COLOR(CARTAZUCCHERO)(T([0,1,2])([5.1+3.5-0.5,0.2,14.6])(CUBOID([0.5,prof_el_largo,2])))
var sponda6 = COLOR(CARTAZUCCHERO)(T([0,1,2])([5.1-3.5,0.2,14.6])(CUBOID([0.5,prof_el_largo,2])))

var pts_tr_nero_3 = [[0,0,-0.8],[0.8,0,0]]
var pts_tr_nero_punta_3 = [[0,0,0]]
var pts_tr_nero_d_3 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_3)
var pts_tr_nero_punta_d_3 = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_punta_3)
var b_tr_nero_3 = BEZIER(S0)(pts_tr_nero_3)
var b_tr_nero_punta_3 = BEZIER(S0)(pts_tr_nero_punta_3)
var b_tr_nero_d_3 = BEZIER(S0)(pts_tr_nero_d_3)
var b_tr_nero_punta_d_3 = BEZIER(S0)(pts_tr_nero_punta_d_3)
var srf_tr_3 = BEZIER(S1)([b_tr_nero_3,b_tr_nero_d_3])
var srf_tr_punta_3 = BEZIER(S1)([b_tr_nero_punta_3,b_tr_nero_punta_d_3])
var tr_nero_3 = BEZIER(S2)([srf_tr_3,srf_tr_punta_3])
var triangoloNero_3 = MAP(tr_nero_3)(domain3D)
var triangoloNeroFinito_3 = COLOR(BLACK)(T([0,1,2])([5.1+0.5/2,0.4,9.2])(triangoloNero_3))

var pts_tr_nero_3_s = SCALEPOINTS([-1,1,1])([[0,0,-0.8],[0.8,0,0]])
var pts_tr_nero_punta_3_s = [[0,0,0]]
var pts_tr_nero_d_3_s = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_3_s)
var pts_tr_nero_punta_d_3_s = TRASLAPOINTS([0,prof_el_stretto,0])(pts_tr_nero_punta_3_s)
var b_tr_nero_3_s = BEZIER(S0)(pts_tr_nero_3_s)
var b_tr_nero_punta_3_s = BEZIER(S0)(pts_tr_nero_punta_3_s)
var b_tr_nero_d_3_s = BEZIER(S0)(pts_tr_nero_d_3_s)
var b_tr_nero_punta_d_3_s = BEZIER(S0)(pts_tr_nero_punta_d_3_s)
var srf_tr_3_s = BEZIER(S1)([b_tr_nero_3_s,b_tr_nero_d_3_s])
var srf_tr_punta_3_s = BEZIER(S1)([b_tr_nero_punta_3_s,b_tr_nero_punta_d_3_s])
var tr_nero_3_s = BEZIER(S2)([srf_tr_3_s,srf_tr_punta_3_s])
var triangoloNero_3_s = MAP(tr_nero_3_s)(domain3D)
var triangoloNeroFinito_3_s = COLOR(BLACK)(T([0,1,2])([5.1-0.5/2,0.4,9.2])(triangoloNero_3_s))

var pts_b_spondaR = [[0,0,0],[0.6*COS(PI/6),0,-0.6*SIN(PI/6)]]
var pts_b_spondaR_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_b_spondaR)
var pts_a_spondaR = [[1.8,0,3],[1.8+0.6,0,3]]
var pts_a_spondaR_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_a_spondaR)
var b_b_spondaR = BEZIER(S0)(pts_b_spondaR)
var b_b_spondaR_d = BEZIER(S0)(pts_b_spondaR_d)
var b_a_spondaR = BEZIER(S0)(pts_a_spondaR)
var b_a_spondaR_d = BEZIER(S0)(pts_a_spondaR_d)
var srf_b_spondaR = BEZIER(S1)([b_b_spondaR,b_b_spondaR_d])
var srf_a_spondaR = BEZIER(S1)([b_a_spondaR,b_a_spondaR_d])
var sol_spondaR = BEZIER(S2)([srf_b_spondaR,srf_a_spondaR])
var spondaR_map = MAP(sol_spondaR)(domain3D)
var spondaR = COLOR(RED)(T([0,1,2])([5.1+4.4,0.2,6.2])(spondaR_map))

var pts_b_spondaR_s = [[0,0,0],[-0.6*COS(PI/6),0,-0.6*SIN(PI/6)]]
var pts_b_spondaR_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_b_spondaR_s)
var pts_a_spondaR_s = [[-1.8,0,3],[-1.8-0.6,0,3]]
var pts_a_spondaR_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_a_spondaR_s)
var b_b_spondaR_s= BEZIER(S0)(pts_b_spondaR_s)
var b_b_spondaR_d_s = BEZIER(S0)(pts_b_spondaR_d_s)
var b_a_spondaR_s = BEZIER(S0)(pts_a_spondaR_s)
var b_a_spondaR_d_s = BEZIER(S0)(pts_a_spondaR_d_s)
var srf_b_spondaR_s= BEZIER(S1)([b_b_spondaR_s,b_b_spondaR_d_s])
var srf_a_spondaR_s = BEZIER(S1)([b_a_spondaR_s,b_a_spondaR_d_s])
var sol_spondaR_s = BEZIER(S2)([srf_b_spondaR_s,srf_a_spondaR_s])
var spondaR_map_s = MAP(sol_spondaR_s)(domain3D)
var spondaR_s= COLOR(RED)(T([0,1,2])([5.1-4.4,0.2,6.2])(spondaR_map_s))

var pts_b_spondaB = [[0,0,-0.5],[0,0,0]]
var pts_b_spondaB_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_b_spondaB)
var pts_a_spondaB = [[3.7*COS(PI/6),0,-3.7*SIN(PI/6)],[3.7*COS(PI/6)+0.5*COS(PI/3),0,-3.7*SIN(PI/6)+0.5*SIN(PI/3)]]
var pts_a_spondaB_d = TRASLAPOINTS([0,prof_el_largo,0])(pts_a_spondaB)
var b_b_spondaB = BEZIER(S0)(pts_b_spondaB)
var b_b_spondaB_d = BEZIER(S0)(pts_b_spondaB_d)
var b_a_spondaB = BEZIER(S0)(pts_a_spondaB)
var b_a_spondaB_d = BEZIER(S0)(pts_a_spondaB_d)
var srf_b_spondaB = BEZIER(S1)([b_b_spondaB,b_b_spondaB_d])
var srf_a_spondaB = BEZIER(S1)([b_a_spondaB,b_a_spondaB_d])
var sol_spondaB = BEZIER(S2)([srf_b_spondaB,srf_a_spondaB])
var spondaB_map = MAP(sol_spondaB)(domain3D)
var spondaB = COLOR(BLUE)(T([0,1,2])([5.1+4.4,0.2,6.2])(spondaB_map))

var pts_b_spondaB_s = [[0,0,-0.5],[0,0,0]]
var pts_b_spondaB_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_b_spondaB_s)
var pts_a_spondaB_s = [[-3.7*COS(PI/6),0,-3.7*SIN(PI/6)],[-3.7*COS(PI/6)-0.5*COS(PI/3),0,-3.7*SIN(PI/6)+0.5*SIN(PI/3)]]
var pts_a_spondaB_d_s = TRASLAPOINTS([0,prof_el_largo,0])(pts_a_spondaB_s)
var b_b_spondaB_s = BEZIER(S0)(pts_b_spondaB_s)
var b_b_spondaB_d_s = BEZIER(S0)(pts_b_spondaB_d_s)
var b_a_spondaB_s = BEZIER(S0)(pts_a_spondaB_s)
var b_a_spondaB_d_s = BEZIER(S0)(pts_a_spondaB_d_s)
var srf_b_spondaB_s = BEZIER(S1)([b_b_spondaB_s,b_b_spondaB_d_s])
var srf_a_spondaB_s = BEZIER(S1)([b_a_spondaB_s,b_a_spondaB_d_s])
var sol_spondaB_s = BEZIER(S2)([srf_b_spondaB_s,srf_a_spondaB_s])
var spondaB_map_s = MAP(sol_spondaB_s)(domain3D)
var spondaB_s = COLOR(BLUE)(T([0,1,2])([5.1-4.4,0.2,6.2])(spondaB_map_s))

var sponda7 = COLOR(ORANGE)(T([0,1,2])([5.1+4.4+2.8*COS(PI/6)+0.5*SIN(PI/6),0.2,5.7-2.8*SIN(PI/6)+0.5*COS(PI/6)])(R([0,2])([PI/6])(CUBOID([0.5,prof_el_largo,2.5]))))
var sponda8 = COLOR(ORANGE)(T([0,1,2])([5.1-4.4-2.8*COS(PI/6)-0.5*SIN(PI/6)-0.5*COS(PI/6),0.2,5.7-2.8*SIN(PI/6)+0.5*COS(PI/6)-0.5*SIN(PI/6)])(R([0,2])([-PI/6])(CUBOID([0.5,prof_el_largo,2.5]))))

var spondaN = COLOR(BLACK)(T([0,1,2])([10.2-0.5/COS(PI/6),0.2,1.5])(R([0,2])([PI/6])(CUBOID([0.5,prof_el_largo,4.0]))))
var spondaN_s = COLOR(BLACK)(T([0,1,2])([0.5*TAN(PI/6)*SIN(PI/6),0.2,1.5-0.5*TAN(PI/6)*COS(PI/6)])(R([0,2])([-PI/6])(CUBOID([0.5,prof_el_largo,4.0]))))

var pts_triN_base = [[0,0,0],[1,0,1]]
var pts_triN_base_d = TRASLAPOINTS([0,prof_el_stretto,0])(pts_triN_base)
var pts_triN_alt = [[1,0,0]]
var pts_triN_alt_d = TRASLAPOINTS([0,prof_el_stretto,0])(pts_triN_alt)
var b_triN_base = BEZIER(S0)(pts_triN_base)
var b_triN_base_d = BEZIER(S0)(pts_triN_base_d)
var b_triN_alt = BEZIER(S0)(pts_triN_alt)
var b_triN_alt_d = BEZIER(S0)(pts_triN_alt_d)
var srf_triN_base = BEZIER(S1)([b_triN_base,b_triN_base_d])
var srf_triN_alt = BEZIER(S1)([b_triN_alt,b_triN_alt_d])
var sol_triN = BEZIER(S2)([srf_triN_base,srf_triN_alt])
var triN_map = MAP(sol_triN)(domain3D)
var triN = COLOR(BLACK)(T([0,1,2])([5.1+1,0.4,1.5])(triN_map))

var pts_triN_base_s = [[0,0,0],[-1,0,1]]
var pts_triN_base_d_s = TRASLAPOINTS([0,prof_el_stretto,0])(pts_triN_base_s)
var pts_triN_alt_s = [[-1,0,0]]
var pts_triN_alt_d_s = TRASLAPOINTS([0,prof_el_stretto,0])(pts_triN_alt_s)
var b_triN_base_s = BEZIER(S0)(pts_triN_base_s)
var b_triN_base_d_s = BEZIER(S0)(pts_triN_base_d_s)
var b_triN_alt_s = BEZIER(S0)(pts_triN_alt_s)
var b_triN_alt_d_s = BEZIER(S0)(pts_triN_alt_d_s)
var srf_triN_base_s = BEZIER(S1)([b_triN_base_s,b_triN_base_d_s])
var srf_triN_alt_s = BEZIER(S1)([b_triN_alt_s,b_triN_alt_d_s])
var sol_triN_s = BEZIER(S2)([srf_triN_base_s,srf_triN_alt_s])
var triN_map_s = MAP(sol_triN_s)(domain3D)
var triN_s = COLOR(BLACK)(T([0,1,2])([5.1-1,0.4,1.5])(triN_map_s))

var cubetto = COLOR(BLACK)(T([0,1,2])([5.1+9,0.4,9.7])(CUBOID([0.5,prof_el_stretto,0.5])))
var cubetto_s = COLOR(BLACK)(T([0,1,2])([5.1-9-0.5,0.4,9.7])(CUBOID([0.5,prof_el_stretto,0.5])))

var model = STRUCT([base,sponda1,sponda2,cass1,cass2,maniglia1,maniglia2,spondaN,spondaN_s,triN,triN_s,
					piano1,piano2,sponda3,triangoloNeroFinito_3,triangoloNeroFinito_3_s,
					spondaR,spondaR_s,spondaB,spondaB_s,sponda7,sponda8,
					triangoloRosa,gialloFinito,triangoloNeroFinito,cubetto,cubetto_s,
					gialloFinito_s,triangoloNeroFinito_s,triangoloNeroFinito_1,
					triangoloNeroFinito_2,triangoloNeroFinito_2_s,
					piano3,sponda4,sponda5,sponda6,
					cubo])
DRAW(model)