var viewer = new Cesium.Viewer('cesiumContainer');
viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromRadians(0.5, 0.5,viewer.camera.getMagnitude())
});

var socket = io.connect('http://localhost:3000');

var cesiumCollection = new Cesium.BillboardCollection;
viewer.scene.primitives.add(cesiumCollection);
var entitiesMap = new Map();


socket.on('birds', (data) => {
    if (!entitiesMap.has(data.id)) {
        //add
        let cesiumObject = cesiumCollection.add(convertToCesiumObj(data));
        entitiesMap.set(data.id, cesiumObject);
    } else {
        // update
        let cesiumObject = entitiesMap.get(data.id);
        Object.assign(cesiumObject, convertToCesiumObj(data));
    }
});

function convertToCesiumObj(data){
    return {
        image: data.entity.image,
        scale: data.id === 1 ? 0.3 :0.15,
        color: data.id === 1 ? Cesium.Color.RED : undefined,
        position : Cesium.Cartesian3.fromRadians(Math.random() , Math.random() )
    }
}