/**
 * Checks to see if object is of type Error
 * @param e any object type
 * @returns the object inferred as an Error if it is an Error or undefined if it is not
 */
export function isErrorObject(e: any): Error | undefined {
    if ('message' in e) {
    return e;
   } else {
    return undefined;
    }
  }