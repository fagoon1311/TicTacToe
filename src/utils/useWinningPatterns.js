export const useWinningPatterns = (size) => {
    let initialboard = Array.from({  length: size*size  }, (_, index) => index);
    let winningPatterns = []

    // all horizontal rows.
    // all patters
    for(let i = 0; i < initialboard.length; i+=size){
        let curr = []
        for(let j = i; j < i+size; j++){
            curr.push(initialboard[j]) 
        }
        winningPatterns.push(curr)
        curr = []
    }
    // all vertical rows.
    for(let i = 0; i < size; i++){
        let curr = []
        for(let j = i; j < initialboard.length; j+=size){
            curr.push(initialboard[j])
        }
        winningPatterns.push(curr)
    }
    let primary = []
    let secondary = []

    // Primary diagonal.
    for(let i = 0; i < initialboard.length; i+=size+1){
        primary.push(initialboard[i])
    }
    // secondary diagonal.
    for(let i = size-1; i < initialboard.length-1; i+=size-1){
        secondary.push(initialboard[i])
    }
    winningPatterns.push(primary)
    winningPatterns.push(secondary)

    return winningPatterns
}

