/**
 * @Created Jan 25, 2018
 * @LastUpdate Jan 31, 2020
 * @author Kahin Akram
 */

function kmeans(data, k) {

    //Crap we need
    var iterations = 0;
    var maxLoops = 5;
    var iterations = 0;
    var qualityChange = 0;
    var oldqualitycheck = 0;
    var qualitycheck = 0;
    var converge = false;

    //Parse the data from strings to floats
    var new_array = parseData(data);

    //Task 4.1 - Select random k centroids
    var centroid = initCentroids(new_array,k);

    //Prepare the array for different cluster indices
    var clusterIndexPerPoint = new Array(new_array.length).fill(0);

    //Task 4.2 - Assign each point to the closest mean.
    clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

    //Master loop -- Loop until quality is good
    do {
        //Task 4.3 - Compute mean of each cluster
        centroid = computeClusterMeans(new_array, clusterIndexPerPoint, k);
        // assign each point to the closest mean.
        var clusterIndexPerPoint = assignPointsToMeans(new_array, centroid);

        //Task 4.4 - Do a quality check for current result
        qualitycheck = qualityCheck(centroid,new_array,clusterIndexPerPoint);

        //End the loop if...
        qualityChange = qualitycheck - oldqualitycheck;
        iterations++;

        if (iterations == maxLoops || qualityChange < 0)
            converge = true;

        oldqualitycheck = qualitycheck;
    }
    while (converge == false)
    //Return results
    return {
        assignments: clusterIndexPerPoint
    };

}

/**
 * Parse data from strings to floats
 * Loop over data length
      loop over every i in data
        Fill array with parsed values, use parseFloat
 * @param {*} data
 * @return {array}
 */
function parseData(data){

    var array = [];

    let dim = data.columns.length;
    for(let i = 0; i < data.length; i++) {
        point = Object.values(data[i]);
        float_point = [];
        for (let j = 0; j < dim; j++) {
            float_point[j] = parseFloat(point[j]);
        }
        array[i] = float_point;
    }
    
    return array;
}

/**
 * Task 4.1 - Randomly place K points
 * Loop over data and Use floor and random in Math
 * @return {array} centroid
 */

function initCentroids(data, k){

    //Create k centroids
    let indices = [];
    let centroid = [];

    for (let i = 0; i < k; i++) {
        let index = Math.floor(Math.random() * data.length);
        while (centroid.includes(index)) {
            index = Math.floor(Math.random() * data.length);
        }
        indices[i] = index;
        centroid[i] = data[index];
    }


    return centroid;
}

/**
* Taks 4.2 - Assign each item to the cluster that has the closest centroid
* Loop over points and fill array, use findClosestMeanIndex(points[i],means)
* Return an array of closest mean index for each point.
* @param points
* @param means
* @return {Array}
*/
function assignPointsToMeans(points, means) {
    let assignments = [];
    for (let i = 0; i < points.length; i++) {
        assignments[i] = findClosestMeanIndex(points[i], means);
    }
    return assignments;
};
/**
 * Calculate the distance to each mean, then return the index of the closest.
 * Loop over menas and fill distance array, use euclideanDistance(point,means[i])
 * return closest cluster use findIndexOfMinimum,
 * @param point
 * @param means
 * @return {Number}
*/
function findClosestMeanIndex(point, means){
    let distances = [];
    for (let i = 0; i < means.length; i++) {
        distances[i] = euclideanDistance(point, means[i]);
    }
    
    return findIndexOfMinimum(distances);
};
/**
 * Euclidean distance between two points in arbitrary dimension(column/axis)
 * @param {*} point1
 * @param {*} point2
 * @return {Number}
 */

function euclideanDistance(point1, point2){

    if (point1.length != point2.length)
        throw ("point1 and point2 must be of same dimension");

    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += (point1[i] - point2[i]) * (point1[i] - point2[i]);
    }

    return sum;

};

/**
 * Return the index of the smallest value in the array.
 *  Loop over the array and find index of minimum
 * @param array
 * @return {Number}
 */
function findIndexOfMinimum(array){
    let min = Math.min(...array);
    return array.indexOf(min);
};

/**
 * //Task 4.3 - Compute mean of each cluster
 * For each cluster loop over assignment and check if ass. equal to cluster index
 * if true fill array
 * then if array is not empty fill newMeans, use averagePosition(array)
 * @param {*} points
 * @param {*} assignments
 * @param {*} k
 * @returns {array}
 */
function computeClusterMeans(points, assignments, k){
    if (points.length != assignments.length)
        throw ("points and assignments arrays must be of same dimension");

    // for each cluster
    var newMeans = [];
    for (let i = 0; i < k; i++) {
        let clusterpoints = [];
        let index = 0;
        for (let j = 0; j < points.length; j++) {
            if (assignments[j] == i)
                clusterpoints[index++] = points[j];
        }
        newMeans[i] = averagePosition(clusterpoints);
    }

    return newMeans;
};

/**
 * Calculate quality of the results
 * For each centroid loop new_array and check if clusterIndexPerPoint equal clsuter
 * if true loop over centriod and calculate qualitycheck.
 * @param {*} centroid
 * @param {*} new_array
 * @param {*} clusterIndexPerPoint
 */
function qualityCheck(centroid, new_array, clusterIndexPerPoint) {
    let qualitycheck = 0;
    for (let i = 0; i < new_array.length; i++) {
        let cent = centroid[clusterIndexPerPoint[i]];
        qualitycheck += euclideanDistance(cent, new_array[i]);
    }

    return 1/qualitycheck;
}

/**
 * Calculate average of points
 * @param {*} points
 * @return {number}
 */
function averagePosition(points){

    var sums = points[0];
    for (var i = 1; i < points.length; i++){
        var point = points[i];
        for (var j = 0; j < point.length; j++){
            sums[j] += point[j];
        }
    }

    for (var k = 0; k < sums.length; k++)
        sums[k] /= points.length;

    return sums;
};
