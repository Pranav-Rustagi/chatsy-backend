export const logFunctionStart = (functionName: string) => {
    console.log("\n===========================================\n");
    console.log(`${functionName}: start\n`);

}

export const logFunctionEnd = (functionName: string) => {
    console.log(`\n${functionName}: end`);
    console.log("\n===========================================\n");
}