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


    // array implementation: this dynamically creates the our team section from an array
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

    const teamContainer = document.getElementById('team-container');

    if (teamContainer) {
        let teamHTML = '';
        for (let i = 0; i < teamMembers.length; i++) {
            teamHTML = teamHTML + `
                <div class="col-md-4 team-member">
                    <img src="${teamMembers[i].image}" alt="Team member ${teamMembers[i].name}">
                    <h4>${teamMembers[i].name}</h4>
                    <p>${teamMembers[i].title}</p>
                </div>
            `;
        }
        teamContainer.innerHTML = teamHTML;
    }

    // --- Unified Form Validation Function ---
    // This one function will handle all our forms!
    function validateForm(formId, requiredFields) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // always stop the form from submitting

                // loop through the fields we need to check
                for (let i = 0; i < requiredFields.length; i++) {
                    const fieldId = requiredFields[i];
                    const inputField = document.getElementById(fieldId);
                    const fieldValue = inputField.value.trim();

                    // 1. Check if the field is empty
                    if (fieldValue === '') {
                        alert('Please fill out all required fields.');
                        return; // Stop the function
                    }
                    
                    // 2. NEW: Check for a valid email format
                    // if the id of the input contains the word 'Email', we check it
                    if (fieldId.toLowerCase().includes('email')) {
                        // this is a simple pattern to check for something@something.something
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(fieldValue)) {
                            alert('Please enter a valid email address.');
                            return; // Stop the function
                        }
                    }

                    // 3. NEW: Check for a valid phone number format
                    // if the id of the input is 'contactPhone', we check it
                    if (fieldId === 'contactPhone') {
                        // this checks if the value is not a number or is less than 7 digits
                        if (isNaN(fieldValue) || fieldValue.length < 7) {
                           alert('Please enter a valid phone number with at least 7 digits.');
                           return; // Stop the function
                        }
                    }
                }

                // if all checks pass, show the success message
                alert('Thank you! Your form has been submitted.');
                form.reset(); // clear the form
            });
        }
    }

    // --- Using the Unified Function for Each Form ---
    // Now we just call our function for each form on the site.
    
    // 1. Validate the Schedule a Pick Up form
    validateForm('pickup-form', ['fullName', 'email', 'description', 'value']);

    // 2. Validate the Partner Sign Up form
    validateForm('partner-form', ['fullName', 'businessEmail', 'organizationName']);

    // 3. Validate the Contact Us form
    validateForm('contact-form', ['contactName', 'contactEmail', 'contactPhone', 'contactMessage']);


});