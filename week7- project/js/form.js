/***************************************************************************
** Description: client-side JS for form to submit the entered values to
**              http bin and then render the entered values
***************************************************************************/

// Attach click handler to http submit form
document.getElementById('urlSubmit').addEventListener('click', function(event){
    let req = new XMLHttpRequest();

    // Receive city from form
    let post = '';
    post = document.getElementById('longUrl').value;

    if (post === '') {
        alert('Please enter an email address');
    }

    req.open('POST', 'http://httpbin.org/post', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {

            // Log the response
            console.log(JSON.parse(req.responseText));

            // Pull the value out of the response
            let response = JSON.parse(req.responseText).json;
            
            // Display the entered value
            document.getElementById('originalUrl').textContent = post;

            // Display the returned value
            document.getElementById('shortUrl').textContent = response;
        } else {
            let str = "Error in network request: " + response.statusText;
            console.log(str);
            alert(str);
        }});
        
    // Send the request
    req.send(JSON.stringify(post));
    
    // Run once for each button click
    event.preventDefault();
})
