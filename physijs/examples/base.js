var vars1 = {
	health: 100,
	fortMesh: null
};

var vars2 = {
	health: 100,
	fortMesh: null
};

function Base(posX, posY, posZ, rot, bID, scene, vars) {
	
	var islandMesh = null;
	var fortMesh = null;

	var islandMaterial = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/islandTexture.jpg' ) }),
		.2, 
		.4 
	);
	

	var callbackIsland = function( geometry ) {


	    var islandMesh =  new Physijs.ConvexMesh(
				geometry,
				islandMaterial
				, 0 // static
		);
	    islandMesh.position.set( posX, posY, posZ );
	    islandMesh.scale.set( 1.6, 1.3, 1.6 );
	    islandMesh.rotation.y = rot;
	    islandMesh.overdraw = true;
	    islandMesh.castShadow =  islandMesh.receiveShadow = true;
	    scene.add( islandMesh );
	};

	var callbackFort = function( geometry ) {

		

	    vars.fortMesh =  new Physijs.ConvexMesh(
				geometry,
				islandMaterial
				, 0 // static
		);
	    vars.fortMesh.position.set( posX, posY, posZ );
	    vars.fortMesh.scale.set( 1.3, 1.3, 1.3 );
	    vars.fortMesh.rotation.y = rot - 0.3;
	    vars.fortMesh.overdraw = true;
	    vars.fortMesh.castShadow =  vars.fortMesh.receiveShadow = true;

	    vars.fortMesh.addEventListener(
			'collision',
			function( collided_with, linearVelocity, angularVelocity ) {
				if ( collided_with instanceof Physijs.SphereMesh ) vars.health -= 100;
			}
		);

	    scene.add( vars.fortMesh );
	};

	// Load the model
	var loader = new THREE.JSONLoader();
	//var callbackIsland = function ( geometry, materials ) { createScene( geometry, materials, 90, FLOOR, 50, 105 ) };
	//var callbackFemale = function ( geometry, materials ) { createScene( geometry, materials, -80, FLOOR, 50, 0 ) };

	loader.load( "models/island.js", callbackIsland );
	loader.load( "models/fort.js", callbackFort );


	// Function to update the base
	this.updateBase = updateBase;
	function updateBase () {

		//check if base has enough health
		if(vars.health < 1 && vars.fortMesh != null){
			scene.remove( vars.fortMesh );
			//todo: add wreck to scene
		}
		
	}


}