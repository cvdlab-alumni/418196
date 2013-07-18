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

function arc (alpha, r, R) {

	var domain = DOMAIN([[0,alpha],[r,R]])([90,1]);

	var mapping = function (v) {
		var a = v[0];
		var r = v[1];
		return [r*COS(a), r*SIN(a)];
	}

	var model = MAP(mapping)(domain);

	return model;
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


var domain = DOMAIN([[0,1]])([20])
var domain2D = DOMAIN([[0,1],[0,1]])([20,20])
var domain3D = DOMAIN([[0,1],[0,1],[0,1]])([20,20,20])
var domainC = DOMAIN([[0,1],[0,2*PI]])([40,40])


var pts1 = [[0,0,0],[-4,0,0],[-6.6,0,0],[-6,0,0.9],[-4.5,0,1],[-4,0,2],[-4,0,4]]
var b1 = BEZIER(S0)(pts1)
var c1 = MAP(b1)(domain)

var srf_base = ROTATIONAL_SURFACE(b1)
var srf_base_map = MAP(srf_base)(domainC)
var cyl = T([2])([4])(CYL_SURFACE([4,1.5])([40]))

var disk = T([2])([5.5])(DISK(4)(30))

var parte_inf = STRUCT([srf_base_map,disk])

var pts2 = [[0,0,3.8],
			[-4,0,3.8],[-4,0,3.8],
			[-5.5,0,4],
			[-3,0,4.8],[-3,0,4.8],[-3,0,4.8],
			[-3,0,15]]
var pts2_T = TRASLAPOINTS([0,0,1.5])(pts2)
var b2 = BEZIER(S0)(pts2_T)
var c2 = MAP(b2)(domain)

var srf_corpo = ROTATIONAL_SURFACE(b2)
var srf_corpo_map = MAP(srf_corpo)(domainC)

var coperchio = T([2])([16.5])(DISK(3)(40))

//triangolino sopra il coperchio
var pts3 = [[0,0,0],[4,0.3,0],[4,0.3,0],[0,0.6,0]]
var b3 = BEZIER(S0)(pts3)
var c3 = MAP(b3)(domain)

var pts4 = [[0,0,0],[0,0.6,0]]
var b4 = BEZIER(S0)(pts4)

var srf3 = BEZIER(S1)([b3,b4])
var srf3_map = MAP(srf3)(domain2D)

var pts5 = TRASLAPOINTS([0,0,0.2])(pts3)
var b5 = BEZIER(S0)(pts5)

var pts6 = TRASLAPOINTS([0,0,0.2])(pts4)
var b6 = BEZIER(S0)(pts6)

var srf4 = BEZIER(S1)([b5,b6])
var srf4_map = MAP(srf4)(domain2D)

var sol = BEZIER(S2)([srf3,srf4])
var sol_map = MAP(sol)(domain3D)

var triangolino = T([1])([-0.3])(sol_map)
var triangolino_posto = T([0,1,2])([-3.2,0,16.5])(triangolino)

//beccuccio
var a = [0,0,0]
var b = [1.5,0,0]
var c = [0.75,-1.5*COS(PI/4),0]
var d = [0.25,0,0.5]
var e = [1.25,0,0.5]
var f = [0.75,-1.5*COS(PI/4)+0.25,0.5]

var pts1 = [a,b]
var pts2 = [a,c]
var pts3 = [b,c]
var pts4 = [d,e]
var pts5 = [d,f]
var pts6 = [e,f]

var b1 = BEZIER(S0)(pts1)
var b2 = BEZIER(S0)(pts2)
var b3 = BEZIER(S0)(pts3)
var b4 = BEZIER(S0)(pts4)
var b5 = BEZIER(S0)(pts5)
var b6 = BEZIER(S0)(pts6)

var srf1 = BEZIER(S1)([b1,b4])
var srf2 = BEZIER(S1)([b2,b5])
var srf3 = BEZIER(S1)([b3,b6])

var srf1_map = MAP(srf1)(domain2D)
var srf2_map = MAP(srf2)(domain2D)
var srf3_map = MAP(srf3)(domain2D)

var beccuccio = STRUCT([srf1_map,srf2_map,srf3_map])
var beccuccio_posto = T([0,2])([2.8,16])(T([1])([-0.75])(R([0,1])([PI/2])(R([1,2])([PI/2])(beccuccio))))

//valvola
var esagono = EXTRUDE([0.4])(DISK(0.7)([6]))
var cil = T([2])([0.4])(EXTRUDE([0.2])(arc(2*PI,0.2,0.5)))

var valvola = R([0,2])([PI/2])(STRUCT([esagono,cil]))
var valvola_posto = T([0,2])([3.8,4.5])(COLOR(YELLOW)(valvola))

//maniglia
var m_pts1 = [[0,0,0],[-4,0,0],[-4,0,-4]]
var m_b1 = BEZIER(S0)(m_pts1)

var m_pts2 = [[2,0,0],[0,0,0]]
var m_b2 = BEZIER(S0)(m_pts2)

var m_pts3 = [[-4,0,-4],[-4,0,-6]]
var m_b3 = BEZIER(S0)(m_pts3)

var m_pts12 = [[0,0,-1],[-3,0,-1],[-3,0,-4]]
var m_b12 = BEZIER(S0)(m_pts12)

var m_pts22 = [[2,0,-1],[0,0,-1]]
var m_b22 = BEZIER(S0)(m_pts22)

var m_pts32 = [[-3,0,-4],[-3,0,-6]]
var m_b32 = BEZIER(S0)(m_pts32)

var m_pts1t = TRASLAPOINTS([0,1,0])(m_pts1)
var m_b1t = BEZIER(S0)(m_pts1t)

var m_pts2t = TRASLAPOINTS([0,1,0])(m_pts2)
var m_b2t = BEZIER(S0)(m_pts2t)

var m_pts3t = TRASLAPOINTS([0,1,0])(m_pts3)
var m_b3t = BEZIER(S0)(m_pts3t)

var m_pts12t = TRASLAPOINTS([0,1,0])(m_pts12)
var m_b12t = BEZIER(S0)(m_pts12t)

var m_pts22t = TRASLAPOINTS([0,1,0])(m_pts22)
var m_b22t = BEZIER(S0)(m_pts22t)

var m_pts32t = TRASLAPOINTS([0,1,0])(m_pts32)
var m_b32t = BEZIER(S0)(m_pts32t)

var m_pts4 = [[-4,0,-6],[-4,0,-10],[0,0,-10]]
var m_b4 = BEZIER(S0)(m_pts4)

var m_pts5 = [[0,0,-10],[2,0,-10]]
var m_b5 = BEZIER(S0)(m_pts5)

var m_pts42 = [[-3,0,-6],[-3,0,-9],[0,0,-9]]
var m_b42 = BEZIER(S0)(m_pts42)

var m_pts52 = [[0,0,-9],[2,0,-9]]
var m_b52 = BEZIER(S0)(m_pts52)

var m_pts4t = TRASLAPOINTS([0,1,0])(m_pts4)
var m_b4t = BEZIER(S0)(m_pts4t)

var m_pts5t = TRASLAPOINTS([0,1,0])(m_pts5)
var m_b5t = BEZIER(S0)(m_pts5t)

var m_pts42t = TRASLAPOINTS([0,1,0])(m_pts42)
var m_b42t = BEZIER(S0)(m_pts42t)

var m_pts52t = TRASLAPOINTS([0,1,0])(m_pts52)
var m_b52t = BEZIER(S0)(m_pts52t)

var m_srf1 = BEZIER(S1)([m_b1,m_b12])
var m_srf1_map = MAP(m_srf1)(domain2D)

var m_srf2 = BEZIER(S1)([m_b2,m_b22])
var m_srf2_map = MAP(m_srf2)(domain2D)

var m_srf3 = BEZIER(S1)([m_b3,m_b32])
var m_srf3_map = MAP(m_srf3)(domain2D)

var m_srf4 = BEZIER(S1)([m_b4,m_b42])
var m_srf4_map = MAP(m_srf4)(domain2D)

var m_srf5 = BEZIER(S1)([m_b5,m_b52])
var m_srf5_map = MAP(m_srf5)(domain2D)

var m_srf1t = BEZIER(S1)([m_b1t,m_b12t])
var m_srf1t_map = MAP(m_srf1t)(domain2D)

var m_srf2t = BEZIER(S1)([m_b2t,m_b22t])
var m_srf2t_map = MAP(m_srf2t)(domain2D)

var m_srf3t = BEZIER(S1)([m_b3t,m_b32t])
var m_srf3t_map = MAP(m_srf3t)(domain2D)

var m_srf4t = BEZIER(S1)([m_b4t,m_b42t])
var m_srf4t_map = MAP(m_srf4t)(domain2D)

var m_srf5t = BEZIER(S1)([m_b5t,m_b52t])
var m_srf5t_map = MAP(m_srf5t)(domain2D)

var m_srf6 = BEZIER(S1)([m_b12,m_b12t])
var m_srf6_map = MAP(m_srf6)(domain2D)

var m_srf7 = BEZIER(S1)([m_b22,m_b22t])
var m_srf7_map = MAP(m_srf7)(domain2D)

var m_srf8 = BEZIER(S1)([m_b32,m_b32t])
var m_srf8_map = MAP(m_srf8)(domain2D)

var m_srf9 = BEZIER(S1)([m_b42,m_b42t])
var m_srf9_map = MAP(m_srf9)(domain2D)

var m_srf10 = BEZIER(S1)([m_b52,m_b52t])
var m_srf10_map = MAP(m_srf10)(domain2D)


var maniglia = T([1])([-0.5])(STRUCT([m_srf1_map,m_srf2_map,m_srf3_map,
				m_srf1t_map,m_srf2t_map,m_srf3t_map,
				m_srf4_map,m_srf5_map,
				m_srf4t_map,m_srf5t_map,
				m_srf6_map,m_srf7_map,m_srf8_map,m_srf9_map,m_srf10_map]))
var maniglia_posto = COLOR([0.55,0.27,0.25])(T([0,2])([-3,16.5])(maniglia))

var model = STRUCT([coperchio,
					srf_corpo_map,srf_base_map,cyl,
					triangolino_posto,
					beccuccio_posto,
					valvola_posto,maniglia_posto])
DRAW(model)
