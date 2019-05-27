import { MAX_GRID_DEPTH} from "../constants/constants";



export function placeDisc(clickedColumnIndex, gridState){
    
    for(let i = MAX_GRID_DEPTH -1 ; i >= 0; i--){
        
        if(gridState.getIn([i, clickedColumnIndex]).props.class === 'emptyDisc'){
            return i;
        }
    }
    return -1;
}


export function checkWinner(currentDiscPosition, gridState){
    
    let currRow = currentDiscPosition[0];
    let currCol = currentDiscPosition[1];
    //pushing curr component into winning Deque
    const currClass = getClassName(currentDiscPosition,gridState);

    //Check if the board is full(i.e. Game Drawn)
    if(!gridState.some(curr => curr.some((innerElement)=>  innerElement.props.class === "emptyDisc")))
    return [currClass, "drawn"];

    //Check Horizontal

    if(checkHorizontal(currCol, currRow, gridState, currClass).length === 4){
        return [currClass , "horizontally"];
    }
    

    //Check Vertically
    if(checkVertical(currCol, currRow, gridState, currClass).length === 4){
        return [currClass , "vertically"];
    }


    if(checkDiagonal45deg(currCol, currRow, gridState, currClass).length === 4){
    
        return [currClass , "diagonally"];
    }

    if(checkDiagonal135deg(currCol, currRow, gridState, currClass).length === 4){
    
        return [currClass , "diagonally"];
    }

    return [currClass , "gameOn"];
};


function getCoinSpotComponent(currentDiscPosition,gridState){
    return gridState.getIn(currentDiscPosition);
}

function getClassName(currentDiscPosition,gridState){
    return gridState.getIn(currentDiscPosition).props.class;
}

//Check Horizontally

function checkHorizontal(currCol, currRow, gridState, currClass){
    let winDeque = [getCoinSpotComponent([currRow, currCol], gridState)];
    if(currCol+1 <= 6 && getClassName([currRow, currCol +1],gridState) === currClass && winDeque.length < 4)
        {
                winDeque.push(getCoinSpotComponent([currRow, currCol +1],gridState));
    
            if(currCol+2 <= 6 && getClassName([currRow, currCol +2],gridState) === currClass && winDeque.length < 4){
    
                winDeque.push(getCoinSpotComponent([currRow, currCol +2],gridState));

                if(currCol+3 <= 6 && getClassName([currRow, currCol +3],gridState) === currClass && winDeque.length < 4){

                    winDeque.push(getCoinSpotComponent([currRow, currCol +3],gridState));
                
                }

            }
        }
        if(currCol-1 >= 0 && getClassName([currRow, currCol -1],gridState) === currClass && winDeque.length < 4)
        {
            winDeque.unshift(getCoinSpotComponent([currRow, currCol -1],gridState));
            

            if(currCol-2 >= 0 && getClassName([currRow, currCol - 2],gridState) === currClass && winDeque.length < 4){
            
                winDeque.unshift(getCoinSpotComponent([currRow, currCol - 2],gridState) && winDeque.length < 4);
            
                
                if(currCol-3 >= 0 && getClassName([currRow, currCol - 3],gridState) === currClass && winDeque.length < 4){
            
                    winDeque.unshift(getCoinSpotComponent([currRow, currCol - 3],gridState));
            
                }

            }
        }
        
        return winDeque;
}


//Check Vertically


function checkVertical(currCol, currRow, gridState, currClass){
    let winDeque = [getCoinSpotComponent([currRow, currCol], gridState)];
    if(currRow+1 <= 5 && getClassName([currRow+1, currCol],gridState) === currClass && winDeque.length < 4)
        {
                winDeque.push(getCoinSpotComponent([currRow+1, currCol],gridState));
        
            if(currRow+2 <= 5 && getClassName([currRow+2, currCol],gridState) === currClass && winDeque.length < 4){
        
                winDeque.push(getCoinSpotComponent([currRow+2, currCol],gridState));
        
                
                if(currRow+3 <= 5 && getClassName([currRow+3, currCol],gridState) === currClass && winDeque.length < 4){
        
                    winDeque.push(getCoinSpotComponent([currRow+3, currCol],gridState));
        
                }

            }
        }
        
        return winDeque;
}


//Check Diagonally at 45 degrees

function checkDiagonal45deg(currCol, currRow, gridState, currClass){
    let winDeque = [getCoinSpotComponent([currRow, currCol], gridState)];
    //Check Diagonally NorthEast  SouthWest
    if(currRow - 1 >= 0 
        && currCol+1 <= 6 
        && getClassName([currRow -1 , currCol +1],gridState) === currClass 
        && winDeque.length < 4)
        {       
                winDeque.push(getCoinSpotComponent([currRow -1, currCol +1],gridState));
        
            if(currRow - 2 >= 0 
                && currCol+2 <= 6 
                && getClassName([currRow -2, currCol +2],gridState) === currClass 
                && winDeque.length < 4){
        
                winDeque.push(getCoinSpotComponent([currRow -2, currCol +2],gridState));
        
                if(currRow - 3 >= 0 
                    && currCol+3 <= 6 
                    && getClassName([currRow -3, currCol +3],gridState) === currClass 
                    && winDeque.length < 4){
        
                    winDeque.push(getCoinSpotComponent([currRow -3, currCol +3],gridState));
        
                }

            }
        }
        if(currRow + 1 <= 5 
            && currCol-1 >= 0 
            && getClassName([currRow + 1 , currCol - 1],gridState) === currClass 
            && winDeque.length < 4)
            {
                    winDeque.unshift(getCoinSpotComponent([currRow +1, currCol -1],gridState));
        
                if(currRow + 2 <= 5 
                    && currCol-2 >= 0 
                    && getClassName([currRow +2, currCol -2],gridState) === currClass 
                    && winDeque.length < 4){
        
                    winDeque.unshift(getCoinSpotComponent([currRow +2, currCol -2],gridState));
        
                    
                    if(currRow + 3 <= 5 
                        && currCol-3 >= 0 
                        && getClassName([currRow +3, currCol -3],gridState) === currClass 
                        && winDeque.length < 4){
        
                        winDeque.unshift(getCoinSpotComponent([currRow +3, currCol -3],gridState));
        
                    }
    
                }
            }        
    
        return winDeque;
}


//Check Diagonally at 135 degrees

function checkDiagonal135deg(currCol, currRow, gridState, currClass){
    let winDeque = [getCoinSpotComponent([currRow, currCol], gridState)];
    //Check Diagonally NorthEast  SouthWest
    if(currRow - 1 >= 0 
        && currCol-1 >= 0 
        && getClassName([currRow -1 , currCol -1],gridState) === currClass 
        && winDeque.length < 4)
        {
                winDeque.push(getCoinSpotComponent([currRow -1, currCol +1],gridState));
        
            if(currRow - 2 >= 0 
                && currCol-2 >= 0 
                && getClassName([currRow -2, currCol -2],gridState) === currClass 
                && winDeque.length < 4){
        
                winDeque.push(getCoinSpotComponent([currRow -2, currCol -2],gridState));
        
                if(currRow - 3 >= 0 
                    && currCol-3 >= 0 
                    && getClassName([currRow -3, currCol -3],gridState) === currClass 
                    && winDeque.length < 4){
        
                    winDeque.push(getCoinSpotComponent([currRow -3, currCol -3],gridState));
        
                }

            }
        }
        if(currRow + 1 <= 5 
            && currCol+1 <= 6 
            && getClassName([currRow + 1 , currCol + 1],gridState) === currClass 
            && winDeque.length < 4)
            {
                    winDeque.unshift(getCoinSpotComponent([currRow +1, currCol +1],gridState));
        
                if(currRow + 2 <= 5 
                    && currCol+2 <= 6 
                    && getClassName([currRow +2, currCol +2],gridState) === currClass 
                    && winDeque.length < 4){
        
                    winDeque.unshift(getCoinSpotComponent([currRow +2, currCol +2],gridState));
        
                    
                    if(currRow + 3 <= 5 
                        && currCol+3 <= 6 
                        && getClassName([currRow +3, currCol +3],gridState) === currClass 
                        && winDeque.length < 4){
        
                        winDeque.unshift(getCoinSpotComponent([currRow +3, currCol +3],gridState));
        
                    }
    
                }
            }        
            
        return winDeque;
}
