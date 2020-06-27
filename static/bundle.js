const  wkx = require('wkx');

function geojson_to_WKT(obj_geojson) {
    return wkx.Geometry.parseGeoJSON(obj_geojson).toWkt()
}

function test_db_with() {
    var db = datascript.empty_db();
    var db1 = datascript.db_with(db, [[":db/add", 1, "name", "Ivan"],
                             [":db/add", 1, "age", 17]]);
    // var db2 = datascript.db_with(db1, [{":db/id": 2,
    //                            "name": "Igor",
    //                            "age": 35}]);
    var q = '[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]'; 
    console.log(datascript.q(q, db1))

  }
  


window.onload = function() {
    console.log('hello world!')
    test_db_with()
    const schema = {"position": {":db/valueType": ":db.type/string"}}


    const tx0 = 0 //事务时间！
    const datoms_geojson = [
        [1, "position", {"type": "Point", "coordinates": [100.0, 100.0]}, tx0],
        //[1, "position", {"type": "Point", "coordinates": [100.0, 100.0]}, tx0],
        [2, "position", {"type": "Point", "coordinates": [100.0, 100.0]}, tx0],
        [1, "position", {"type": "Point", "coordinates": [50.0, 100.0]}, tx0+1],
        [2, "position", {"type": "Point", "coordinates": [100.0, 50.0]}, tx0+2],
    ]
    const datoms = datoms_geojson.map( (d) => [d[0], d[1],  geojson_to_WKT(d[2]), d[3]])
    console.log(datoms)

    //const db = datascript.empty_db()
    const db = datascript.init_db(datoms)

    var q = '[:find ?e ?n :where [?e "position" ?n]]'
    console.log(datascript.q(q, db))
    //const db = datascript.db_with(datascript.empty_db(schema), datoms)
    console.log(db)
    //const e = datascript.entity(db, 1)
    //console.log(e.get("position"))

}