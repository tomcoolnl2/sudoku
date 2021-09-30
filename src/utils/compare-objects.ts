
/**
 * Compare two simple objects
 * @param k1 
 * @param k2 
 * @returns Weather the objects are equal
 */
export function compareObjects(k1: unknown, k2: unknown): boolean {
	if (k1 === null || k2 === null) return false
	if (Array.isArray(k1) || Array.isArray(k2)) return false
	if (k1 !== Object(k1) || k2 !== Object(k2)) return false
	return Object.entries(k1).toString() === Object.entries(k2).toString()
}