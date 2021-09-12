
/**
 * Compares 2 arrays of any dimension
 * @param arr1 
 * @param arr2 
 */
 export function compareArrays(arr1: any[], arr2: any[]): boolean {

    // if either array is not even a array, return false
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false

    // compare lengths
    if (arr1.length !== arr2.length) return false

    for (let i = 0, l = arr1.length; i < l; i += 1) {
        // Check if we have nested arrays
        if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
            // recurse into nested arrays
            if (!compareArrays(arr1[i], arr2[i])) return false     
        }           
        else if (arr1[i] !== arr2[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false
        }           
    }       
    return true
}