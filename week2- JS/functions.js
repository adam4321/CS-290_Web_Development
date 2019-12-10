/******************************************************************************
** Author:      Adam Wright
** Description: Demonstration of hoisting in JavaScript
******************************************************************************/


// Function expression form allows hoisting so this function call works
chessboard();

function chessboard() {
    let a = "";
    let x = 8;
    let y = 8;

    console.log('\n');

    for (let i = 1; i <=y; i++) {

        for (let j = 1; j <=x; j++) {

            let h = i+j;

            if (h % 2 == 0) {
                a += "  ";
            } else {
                a += "# ";
            }    
        }
        a += "\n";
    }
    console.log(a);
}


// Function below is assigned to a variable and thus doesn't hoist, so this call before definition doesn't work
chessboard();

var chessboard = function() {
    let a = "";
    let x = 8;
    let y = 8;

    console.log('\n');

    for (let i = 1; i <=y; i++) {

        for (let j = 1; j <=x; j++) {

            let h = i+j;
            
            if (h % 2 == 0) {
                a += "  ";
            } else {
                a += "# ";
            }     
        } 
        a += "\n";
    }
    console.log(a);
}
