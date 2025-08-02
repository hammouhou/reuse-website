// this makes sure the html is fully loaded before we try to mess with it
document.addEventListener('DOMContentLoaded', function() {

    //  1st DOM manipulation : button hover effect 
    // lets make the buttons change color when you hover on them
    const allButtons = document.querySelectorAll('.button-primary, .button-secondary');

    allButtons.forEach(function(button) {
        // when the mouse goes over the button
        button.onmouseover = function() {
            if (this.classList.contains('button-primary')) {
                this.style.backgroundColor = '#2a7aaf'; // Darker blue
            } else {
                this.style.backgroundColor = '#3a8a3d'; // Darker green
            }
        };

        // when the mouse leaves the button
        button.onmouseout = function() {
            if (this.classList.contains('button-primary')) {
                this.style.backgroundColor = '#3B9AE1'; // Original blue
            } else {
                this.style.backgroundColor = '#4CAF50'; // Original green
            }
        };
    });


    // 2nd DOM manipulation : partner link hover effect 
    // same thing but for the partner links on the partners page
    const partnerLinks = document.querySelectorAll('.partner-name-link');

    partnerLinks.forEach(function(link) {
        link.onmouseover = function() {
            this.style.color = '#3a8a3d'; // dark green
        };
        link.onmouseout = function() {
            this.style.color = '#4CAF50'; // normal green
        };
    });


    // array implementation: this is super extra but there is no other place to put dynamic array as requested
    // this dynamically create the our team section from an array
    
    // an array to hold all the team member info
    const teamMembers = [
        {
            name: "Hammou Houdjedje",
            title: "Volunteer",
            image: "images/About-Us-Team-Member-Hammou.png"
        },
        {
            name: "Victor Carvalho",
            title: "Volunteer",
            image: "images/About-Us-Team-Member-Victor.png"
        },
        {
            name: "Roisin Casey",
            title: "Volunteer",
            image: "images/About-Us-Team-Member-Roisin.png"
        }
    ];

    // find the div where we want to put the team members
    const teamContainer = document.getElementById('team-container');


    // we only want to run this code if we are on the about us page (where the container exists)
    if (teamContainer) {
        let teamHTML = ''; // Start with an empty string
        
        // loop through the array and build the HTML for each member
        for (let i = 0; i < teamMembers.length; i++) {
            teamHTML = teamHTML + `
                <div class="col-md-4 team-member">
                    <img src="${teamMembers[i].image}" alt="Team member ${teamMembers[i].name}">
                    <h4>${teamMembers[i].name}</h4>
                    <p>${teamMembers[i].title}</p>
                </div>
            `;
        }
        // put the finished html into the container on the page
        teamContainer.innerHTML = teamHTML;
    }


    // this is the validation required by the project (for Schedule a Pick Up page)
    const pickupForm = document.getElementById('pickup-form');
    if (pickupForm) {
        pickupForm.addEventListener('submit', function(event) {
            // this stops the form from trying to submit to a server
            event.preventDefault();

            // get the values from the form fields
            const fullName = document.getElementById('fullName').value;
            const description = document.getElementById('description').value;
            const estimatedValue = document.getElementById('value').value;

            // check if important fields are empty
            if (fullName === '' || description === '') {
                alert('Please fill out your name and a description of the donation.');
                return; // Stop the function
            }

            // check if the estimated value is a number, this might be used in the future to implement an auto caculator of pick up worthy donations
            if (isNaN(estimatedValue) || estimatedValue === '') {
                alert('Please enter a valid number for the estimated value.');
                return; // Stop the function
            }

            // if everything is okay, show a success message
            alert('Thank you! Your pickup request has been submitted.');
            pickupForm.reset(); // this clears the form after it's sent
        });
    }
});