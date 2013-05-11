def GRID(args):
	model = ([[]],[[0]])
	for k,steps in enumerate(args):
		model = larExtrude(model,steps*[1])
	V,cells = model
	verts = AA(list)(scipy.array(V)/AA(float)(args))
	return MKPOL([verts,AA(AA(lambda h:h+1))(cells),None])

def DOMAIN(dims):
	def DOMAIN0(divs):
		g = GRID(divs)
		i = 1
		for item in dims:
			a = item[0]
			b = item[1]
			g = T([i])([a])(SCALE([i])([b-a])(g))
			i = i+1
		return g
	return DOMAIN0

def SCALEPOINTS(value):
	x = value[0]
	y = value[1]
	z = value[2]
	def SCALEPOINTS2(points):
		p = []
		for a in points:
			c = [0,0,0]
			c[0] = a[0]*x
			c[1] = a[1]*y
			c[2] = a[2]*z
			p.append(c)
		return p
	return SCALEPOINTS2


def TRASLAPOINTS(values):
	x = values[0]
	y = values[1]
	z = values[2]
	def TRASLAPOINTS2(points):
		p = []
		for a in points:
			c = [0,0,0]
			c[0] = a[0]+x
			c[1] = a[1]+y
			c[2] = a[2]+z
			p.append(c)
		return p
	return TRASLAPOINTS2

def DOMAIN(dims):
	def DOMAIN0(divs):
		g = GRID(divs)
		i = 1
		for item in dims:
			a = item[0]
			b = item[1]
			g = T([i])([a])(SCALE([i])([b-a])(g))
			i = i+1
		return g
	return DOMAIN0
#profilo laterale
dom = INTERVALS(1)(20)
p0 = [[1.29, 3.79], [1.2, 5.23], [2.73, 4.96], [2.57, 3.73]]
c0 = BEZIER(S1)(p0)
l0 = MAP(c0)(dom)


p1 = [[1.29, 3.79], [0.11, 3.78], [0.11, 3.83], [0.17, 3.85], [0.15, 3.96], [0.17,4.22], [0.12,4.29]]
l1 = POLYLINE(p1)

p2 = [[0.12, 4.29], [0.35, 4.6], [1.17, 4.83], [1.67, 4.99]]
c2 = BEZIER(S1)(p2)
l2 = MAP(c2)(dom)


p3 = [[1.67, 4.99],[1.76, 4.99], [1.86, 5]]
l3 = POLYLINE(p3)

p4 = [[1.86, 5], [2.66, 5.31], [3, 5.33], [3.44, 5.45]]
c4 = BEZIER(S1)(p4)
l4 = MAP(c4)(dom)

p5 = [[5.23, 5.49], [4.61, 5.57], [4.08, 5.6], [3.44, 5.45]]
c5 = BEZIER(S1)(p5)
l5 = MAP(c5)(dom)

p6 = [[5.23, 5.49], [6.27, 5.41], [7.5, 5.18], [7.88, 5.14]]
c6 = BEZIER(S1)(p6)
l6 = MAP(c6)(dom)

p7 = [[7.88, 5.14], [7.96, 5.04], [8.04, 5.07], [8.09, 4.82]]
c7 = BEZIER(S1)(p7)
l7 = MAP(c7)(dom)

p8 = [[8.09, 4.82], [8.03, 4.79], [8.15, 4.45], [8.18, 4.47], [8.18, 4.25], [7.34, 3.81]]
l8 = POLYLINE(p8)

p9 = [[5.99, 3.73], [5.77, 5.15], [7.41, 5.11], [7.34, 3.81]]
c9 = BEZIER(S1)(p9)
l9 = MAP(c9)(dom)

p10 = [[2.57, 3.73],[5.99, 3.73]]
l10 = POLYLINE(p10)

profilo_lat = T([1,2])([-0.11,-3.73])(STRUCT([l0,l1,l2,l3,l4,l5,l6,l7,l8,l9,l10]))
profilo_lat_ok = R([2,3])(PI/2)(profilo_lat)

#profilo musetto

p0 = [[0.43, 4.11], [4.03, 4.11]]
c0 = BEZIER(S1)(p0)
f0 = MAP(c0)(dom)

p1 = [[0.43, 4.11], [0.32, 4.31], [0.36, 4.82], [0.34, 5.13]]
c1 = BEZIER(S1)(p1)
f1 = MAP(c1)(dom)

p2 = [[0.34, 5.13], [0.44, 5.31], [0.45, 5.32], [0.58, 5.39]]
c2 = BEZIER(S1)(p2)
f2 = MAP(c2)(dom)

p3 = [[0.58, 5.39], [0.64, 5.58], [0.98, 5.67], [1.06, 5.71]]
c3 = BEZIER(S1)(p3)
f3 = MAP(c3)(dom)

p4 = [[1.06, 5.71], [1.19, 5.92], [3.28, 5.92], [3.32, 5.71]]
c4 = BEZIER(S1)(p4)
f4 = MAP(c4)(dom)

p5 = [[3.32, 5.71], [3.40,5.67], [3.82,5.58], [3.88, 5.39]]
c5 = BEZIER(S1)(p5)
f5 = MAP(c5)(dom)

p6 = [[3.88, 5.39], [4.01,5.32], [4.02,5.31], [4.12,5.16]]
c6 = BEZIER(S1)(p6)
f6 = MAP(c6)(dom)

p7 = [[4.12,5.16], [4.10,4.82], [4.14,4.31], [4.03,4.11]]
c7 = BEZIER(S1)(p7)
f7 = MAP(c7)(dom)

profilo_musetto = T([1,2])([-4.12,-4.11])(STRUCT([f0,f1,f2,f3,f4,f5,f6, f7]))
profilo_musetto_xz = R([2,3])(PI/2)(profilo_musetto)
profilo_musetto_ok = R([1,2])(-PI/2)(profilo_musetto_xz)


#profilo da sopra

p0 = [[0.29, 2.71], [0, 3.26], [0, 4.56], [0.32, 5.04]]
c0 = BEZIER(S1)(p0)
t0 = MAP(c0)(dom)

p1 = [[0.32, 5.04], [0.38, 5.18], [0.45, 5.28], [1.04, 5.44]]
c1 = BEZIER(S1)(p1)
t1 = MAP(c1)(dom)

p2 = [[1.04, 5.44], [1.27, 5.61], [2.14, 5.5], [2.74, 5.54]]
c2 = BEZIER(S1)(p2)
t2 = MAP(c2)(dom)

p3 = [[2.73, 5.54], [2.82, 5.44], [4.27, 5.46], [5.89, 5.63]]
c3 = BEZIER(S1)(p3)
t3 = MAP(c3)(dom)

p4 = [[5.89, 5.63], [7.25, 5.61], [7.78, 5.44], [7.79, 5.37]]
t4 = POLYLINE(p4)

p5 = [[7.8, 5.38], [7.98, 5.35], [8.14, 5.02], [8.16, 3.83]]
c5 = BEZIER(S1)(p5)
t5 = MAP(c5)(dom)

p6 = [[8.16, 3.83], [8.13, 3.04], [8.07, 2.25], [7.77, 2.24]]
c6 = BEZIER(S1)(p6)
t6 = MAP(c6)(dom)

p7 = [[7.77, 2.24], [7.76, 2.18], [7.24, 2.02], [5.91, 2]]
t7 = POLYLINE(p7)

p8 = [[5.91, 2], [4.54, 2.13], [2.8, 2.25], [2.72, 2.11]]
c8 = BEZIER(S1)(p8)
t8 = MAP(c8)(dom)

p9 = [[2.72, 2.11], [2.02, 2.17], [1.37, 2.01], [1, 2.22]]
c9 = BEZIER(S1)(p9)
t9 = MAP(c9)(dom)

p10 = [[1, 2.22], [0.63, 2.4], [0.35, 2.39], [0.29, 2.71]]
c10 = BEZIER(S1)(p10)
t10 = MAP(c10)(dom)

profilo_daSopra = T(2)(-2)(STRUCT([t0,t1,t2,t3,t4,t5,t6,t7,t8,t9,t10]))

prof_musetto = T(1)(8.16/2)(profilo_musetto_ok)
prof_laterale = T([1,2])([0.11,3.63/2])(profilo_lat_ok)
prof_daSopra = T(3)(4.29-3.73)(profilo_daSopra)

center_mode = STRUCT([prof_musetto, prof_laterale, prof_daSopra])


#EXERCISE 3:
#RUOTE


dom2D = DOMAIN([[0,1],[0,2*PI]])([15,15])
circle_pts = [[0,0,0],[5,0,0],[0,0,3],[5,0,6],[0,0,6]]
circle_pts_t = TRASLAPOINTS([5,0,0])(circle_pts)
circle_map = BEZIER(S1)(circle_pts_t)
tire = COLOR(BLACK)(MAP(ROTATIONALSURFACE(circle_map))(dom2D))

#RAGGI
domain1D = GRID([10])
domain2D = GRID([10,10])
domain3D = GRID([10,10,10])

p1 = [[0,0,0], [0.15,0.10,0], [0.15,0.10,0], [0.3,0,0]]
p1 = SCALEPOINTS([5,5,5])(p1)
b1 = BEZIER(S1)(p1)
c1 = MAP(b1)(domain2D)

p2 = [[-0.3,1,0], [0.15,1.2,0], [0.15,1.2,0], [0.6,1,0]]
p2 = SCALEPOINTS([5,5,5])(p2)
b2 = BEZIER(S1)(p2)
c2 = COLOR(RED)(MAP(b2)(domain2D))

p3 = [[0,0,0],[-0.1,0.7,0],[-0.1,0.7,0],[-0.3,1,0]]
p3 = SCALEPOINTS([5,5,5])(p3)
b3 = BEZIER(S2)(p3)
c3 = COLOR(GREEN)(MAP(b3)(domain2D))

p4 = [[0.3,0,0],[0.4,0.7,0],[0.4,0.7,0],[0.6,1,0]]
p4 = SCALEPOINTS([5,5,5])(p4)
b4 = BEZIER(S2)(p4)
c4 = COLOR(BLUE)(MAP(b4)(domain2D))

map_surface = COONSPATCH([b1,b2,b3,b4])
surface = SCALE([1,2,3])([1./3,1./3,1./3])(MAP(map_surface)(domain2D))

solid_map = THINSOLID(map_surface)
ray = T([1,2,3])([-0.15*5,1,3])(SCALE([1,2,3])([1./3,1./3,1./3])(MAP(solid_map)(domain3D)))

tot_ray = STRUCT(NN(5)([ray, R([1,2])(2*PI/5)]))

#CERCHIONE ESTERNO
cerchione = TUBE([5,5.5,6])(20)

#HUB
hub = T([3])([1.5])(MY_CYLINDER([1.5,3])(20))
wheel_big = STRUCT([tot_ray,cerchione, tire, hub])

wheel = S([1,2,3])([1./12,1./12,1./12])(wheel_big)

left_wheel = R([2,3])(PI/2)(wheel)
right_wheel = R([2,3])(-PI/2)(wheel)

front_left_wheel = T([1,3])([1.81,0.4])(left_wheel)
back_left_wheel = T([1,3])([6.49,0.4])(left_wheel)
front_right_wheel = T([1,2,3])([1.81,3.65,0.4])(right_wheel)
back_right_wheel = T([1,2,3])([6.49,3.65,0.4])(right_wheel)
wheels = STRUCT([front_left_wheel, back_left_wheel, back_right_wheel, front_right_wheel])

tutto = STRUCT([wheels,center_mode])

#esercizio 4 

p1 = [[0,0,0],[0.3,0.3,0],[0.6,0,0]]
p1 = SCALEPOINTS([5,5,5])(p1)
b1 = BEZIER(S1)(p1)
c1 = MAP(b1)(domain2D)

p2 = [[0,1.5,0.3],[0.6,1.5,0.3]]
p2 = SCALEPOINTS([5,5,5])(p2)
b2 = BEZIER(S1)(p2)
c2 = MAP(b2)(domain2D)

p3 = [[0,0,0],[0,0.3,0.2],[0,0.3,0.2],[0,0.35,0.22],[0,1.5,0.3]]
p3 = SCALEPOINTS([5,5,5])(p3)
b3 = BEZIER(S2)(p3)
c3 = MAP(b3)(domain2D)

p4 = TRASLAPOINTS([3,0,0])(p3)
b4 = BEZIER(S2)(p4)
c4 = MAP(b4)(domain2D)

map_surface_1 = COONSPATCH([b1,b2,b3,b4])

solid_map_1 = THINSOLID(map_surface_1)
steering_element_1 = COLOR(RED)(SCALE([1,2,3])([1./3,1./3,1./3])(MAP(solid_map_1)(domain3D)))

p5 = [[-0.2,2,0.3],[0.3,2.2,0.3],[0.8,2,0.3]]
p5 = SCALEPOINTS([5,5,5])(p5)
b5 = BEZIER(S1)(p5)
c5 = MAP(b5)(domain2D)

p6 = [[0,1.5,0.3],[-0.1,1.8,0.3],[-0.2,2,0.3]]
p6 = SCALEPOINTS([5,5,5])(p6)
b6 = BEZIER(S2)(p6)
c6 = MAP(b6)(domain2D)

p7 = [[0.6,1.5,0.3],[0.7,1.8,0.3],[0.8,2,0.3]]
p7 = SCALEPOINTS([5,5,5])(p7)
b7 = BEZIER(S2)(p7)
c7 = MAP(b7)(domain2D)

map_surface_2 = COONSPATCH([b2,b5,b6,b7])
surface_2 = SCALE([1,2,3])([1./3,1./3,1./3])(MAP(map_surface_2)(domain2D))

solid_map_2 = THINSOLID(map_surface_2)
steering_element_2 = COLOR(BLACK)(SCALE([1,2,3])([1./3,1./3,1./3])(MAP(solid_map_2)(domain3D)))

steering_elemnt = T([1,2])([-1.5,3])(STRUCT([steering_element_1,steering_element_2]))

el1 = R([1,2])(PI/2)(steering_elemnt)
el2 = R([1,2])(-PI/2)(steering_elemnt)

esterno = COLOR(BLACK)(T(3)(1.5)(TORUS([15,13])([30,40])))

interno = COLOR(RED)(MY_CYLINDER([3.5,0.5])(20))

steering = S([1,2,3])([1./50,1./50,1./50])(STRUCT([steering_elemnt, el1, el2,esterno,interno]))
steering_1 = R([1,3])(-PI/2)(R([1,2])(-PI/2)(steering))
steering_ok = T([1,2,3])([3,1,1])(steering_1)

tutto = STRUCT([center_mode, steering_ok, wheels])

#ESERCIZIO5

#cofano
p1 = [[0,0,0],[0.5,-0.2,0],[1.7,-0.2,0],[2.2,0,0]]
b1 = BEZIER(S1)(p1)
c1 = COLOR(RED)(MAP(b1)(domain2D))

p2 = [[0.35,1.4,0.5],[0.85,1.3,0.5],[1.35,1.3,0.5],[1.85,1.4,0.5]]
b2 = BEZIER(S1)(p2)
c2 = COLOR(RED)(MAP(b2)(domain2D))

p3 = [[0,0,0],[0.2,0.2,0.3],[0.35,1.4,0.5]]
b3 = BEZIER(S2)(p3)
c3 = COLOR(RED)(MAP(b3)(domain2D))

p4 = [[2.2,0,0],[2.0,0.2,0.3],[1.85,1.4,0.5]]
b4 = BEZIER(S2)(p4)
c4 = COLOR(RED)(MAP(b4)(domain2D))

map_surface = COONSPATCH([b1,b2,b3,b4])
solid_map = THINSOLID(map_surface)

cofano = R([1,2])(-PI/2)(T([1])([-1.1])(COLOR(YELLOW)(S(3)(1./3)(S([1,2,3])([1./3,1./3,1./3])(MAP(solid_map)(domain3D))))))
cofano_ok = T([1,2,3])([0.5,1.8,0.6])(R([1,3])(PI/12)(cofano))


#portiera
p1 = [[0,0,0],[2.2,0.15,0]]
b1 = BEZIER(S1)(p1)
c1 = COLOR(RED)(MAP(b1)(domain2D))

p2 = [[-0.5,1,0],[0.2,0.8,0],[0.2,0.8,0],[2.5,1.15,0]]
b2 = BEZIER(S1)(p2)
c2 = COLOR(RED)(MAP(b2)(domain2D))

#a = [[2.6, 5,0], [2.8, 4.5,0], [3, 4.9,0], [3.1, 4,0]]
a = [[3.1,4,0],[3,4.9,0],[2.8,4.5,0],[2.6,5,0]]
p3 = TRASLAPOINTS([-3.1,-4,0])(a)
b3 = BEZIER(S2)(p3)
c3 = COLOR(RED)(MAP(b3)(domain2D))

p4 = [[2.2,0.15,0],[2.4,0.9,0],[2.4,0.9,0],[2.4,0.9,0],[2.5,1.15,0]]
b4 = BEZIER(S2)(p4)
c4 = COLOR(RED)(MAP(b4)(domain2D))

map_surface = COONSPATCH([b1,b2,b3,b4])
solid_map = THINSOLID(map_surface)

portiera = R([2,3])(PI/2)(COLOR(YELLOW)(SCALE(3)(1./3)(S([1,2,3])([1./3,1./3,1./3])(MAP(solid_map)(domain3D)))))
portiera_ok = T([1,2,3])([2.7,1./6,0.2])(portiera)

#finestrino
p1 = [[0,0,0],[2.2,0.2,0]]
b1 = BEZIER(S1)(p1)
c1 = COLOR(RED)(MAP(b1)(domain2D))

a = [[3.1, 5.1,0], [3.6, 5.3,0], [3.9, 5.6,0], [5.3, 5.55,0]]
p2 = TRASLAPOINTS([-3.1,-4.8,0])(a)
b2 = BEZIER(S1)(p2)
c2 = COLOR(RED)(MAP(b2)(domain2D))

#a = [[2.6, 5,0], [2.8, 4.5,0], [3, 4.9,0], [3.1, 4,0]]
p3 = [[0,0,0],[0,0.3,0]]
b3 = BEZIER(S2)(p3)
c3 = COLOR(RED)(MAP(b3)(domain2D))

p4 = [[2.2,0,0],[2.2,0.55,0]]
b4 = BEZIER(S2)(p4)
c4 = COLOR(RED)(MAP(b4)(domain2D))

map_surface = COONSPATCH([b1,b2,b3,b4])
solid_map = THINSOLID(map_surface)

CELESTE = Color4f([0.0, 0.0, 1.0, 0.2])
finestrino= R([2,3])(PI/2)(COLOR(CELESTE)(SCALE(3)(1./6)(S([1,2,3])([1./3,1./3,1./3])(MAP(solid_map)(domain3D)))))
finestrino_ok = T([1,2,3])([0.2+2.7,1./6,1.2])(finestrino)

portiera_2 = T(2)(3.8)(portiera_ok)
finestrino_2 = T(2)(3.8)(finestrino_ok)
tutto = STRUCT([center_mode,portiera_ok,wheels,cofano_ok,finestrino_ok,portiera_2, finestrino_2])
VIEW(tutto)

