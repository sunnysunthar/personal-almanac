// Global state
let currentStep = 1;
let primaryPerson = null;
let householdMembers = [];
let householdMemberCount = 0;

// Navigation functions
function nextStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep(step) {
    document.getElementById(`step-${currentStep}`).classList.remove('active');
    currentStep = step;
    document.getElementById(`step-${currentStep}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Primary person form handling
function savePrimaryAndContinue() {
    const form = document.getElementById('primary-form');

    // Validate required fields
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();

    if (!firstName || !lastName) {
        alert('Please enter your first and last name.');
        return;
    }

    // Collect dietary restrictions
    const dietary = Array.from(form.querySelectorAll('input[name="dietary"]:checked'))
        .map(checkbox => checkbox.value);

    // Save primary person data
    primaryPerson = {
        firstName: firstName,
        lastName: lastName,
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        address: form.address.value.trim(),
        birthday: form.birthday.value,
        dietary: dietary
    };

    nextStep(3);
}

// Household member management
function addHouseholdMember() {
    householdMemberCount++;
    const container = document.getElementById('household-members');

    const memberDiv = document.createElement('div');
    memberDiv.className = 'household-member';
    memberDiv.id = `household-member-${householdMemberCount}`;
    memberDiv.dataset.memberIndex = householdMemberCount;

    memberDiv.innerHTML = `
        <div class="member-header">
            <div class="member-number">Person ${householdMemberCount}</div>
            <button type="button" class="btn-remove" onclick="removeHouseholdMember(${householdMemberCount})">&times;</button>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label>First Name <span class="required">*</span></label>
                <input type="text" name="hh-firstName-${householdMemberCount}" required>
            </div>
            <div class="form-group">
                <label>Last Name <span class="required">*</span></label>
                <input type="text" name="hh-lastName-${householdMemberCount}" required>
            </div>
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="email" name="hh-email-${householdMemberCount}">
        </div>

        <div class="form-group">
            <label>Phone Number</label>
            <input type="tel" name="hh-phone-${householdMemberCount}">
        </div>

        <div class="form-group">
            <label>Birthday</label>
            <input type="date" name="hh-birthday-${householdMemberCount}">
        </div>

        <div class="form-group">
            <label>Dietary Restrictions</label>
            <div class="checkbox-group">
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="Vegetarian">
                    <span>Vegetarian</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="Vegan">
                    <span>Vegan</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="Gluten Free">
                    <span>Gluten Free</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="Dairy Free">
                    <span>Dairy Free</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="No Seafood">
                    <span>No Seafood</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="No Red Meat">
                    <span>No Red Meat</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" name="hh-dietary-${householdMemberCount}" value="No Egg">
                    <span>No Egg</span>
                </label>
            </div>
        </div>
    `;

    container.appendChild(memberDiv);
}

function removeHouseholdMember(index) {
    const memberDiv = document.getElementById(`household-member-${index}`);
    if (memberDiv) {
        memberDiv.remove();
    }
}

function collectHouseholdMembers() {
    householdMembers = [];
    const container = document.getElementById('household-members');
    const memberDivs = container.querySelectorAll('.household-member');

    memberDivs.forEach(memberDiv => {
        const index = memberDiv.dataset.memberIndex;

        const firstName = memberDiv.querySelector(`input[name="hh-firstName-${index}"]`).value.trim();
        const lastName = memberDiv.querySelector(`input[name="hh-lastName-${index}"]`).value.trim();

        if (firstName && lastName) {
            const dietary = Array.from(memberDiv.querySelectorAll(`input[name="hh-dietary-${index}"]:checked`))
                .map(checkbox => checkbox.value);

            householdMembers.push({
                firstName: firstName,
                lastName: lastName,
                email: memberDiv.querySelector(`input[name="hh-email-${index}"]`).value.trim(),
                phone: memberDiv.querySelector(`input[name="hh-phone-${index}"]`).value.trim(),
                address: primaryPerson.address, // Use primary person's address
                birthday: memberDiv.querySelector(`input[name="hh-birthday-${index}"]`).value,
                dietary: dietary
            });
        }
    });
}

// Review step
function displayReview() {
    collectHouseholdMembers();

    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';

    // Display primary person
    if (primaryPerson) {
        reviewContent.appendChild(createReviewCard(primaryPerson, 'primary'));
    }

    // Display household members
    householdMembers.forEach((member, index) => {
        reviewContent.appendChild(createReviewCard(member, `household-${index}`));
    });
}

function createReviewCard(person, id) {
    const card = document.createElement('div');
    card.className = 'review-person';

    const name = document.createElement('div');
    name.className = 'review-name';
    name.textContent = `${person.firstName} ${person.lastName}`;

    const details = document.createElement('div');
    details.className = 'review-details';

    if (person.email) {
        details.appendChild(createReviewItem('Email', person.email));
    }
    if (person.phone) {
        details.appendChild(createReviewItem('Phone', person.phone));
    }
    if (person.address) {
        details.appendChild(createReviewItem('Address', person.address));
    }
    if (person.birthday) {
        const date = new Date(person.birthday + 'T00:00:00');
        const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        details.appendChild(createReviewItem('Birthday', formatted));
    }
    if (person.dietary && person.dietary.length > 0) {
        details.appendChild(createReviewItem('Dietary Restrictions', person.dietary.join(', ')));
    }

    const editBtn = document.createElement('button');
    editBtn.className = 'review-edit';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
        if (id === 'primary') {
            nextStep(2);
        } else {
            nextStep(3);
        }
    };

    card.appendChild(name);
    card.appendChild(details);
    card.appendChild(editBtn);

    return card;
}

function createReviewItem(label, value) {
    const item = document.createElement('div');
    item.className = 'review-item';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'review-label';
    labelSpan.textContent = label + ':';

    const valueSpan = document.createElement('span');
    valueSpan.className = 'review-value';
    valueSpan.textContent = value;

    item.appendChild(labelSpan);
    item.appendChild(valueSpan);

    return item;
}

// Override nextStep for step 4 to display review
const originalNextStep = nextStep;
nextStep = function(step) {
    if (step === 4) {
        displayReview();
    }
    originalNextStep(step);
};

// Format phone number to standard US format: (XXX) XXX-XXXX
function formatPhoneNumber(phone) {
    if (!phone) return '';

    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
        return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }

    // Return original if can't format
    return phone;
}

// Form submission using Vercel serverless function
async function submitForm() {
    collectHouseholdMembers();

    // Prepare email content and structured data
    const emailContent = formatEmailContent();
    const subject = `Personal Almanac — ${primaryPerson.firstName} ${primaryPerson.lastName}`;
    const allPeople = [primaryPerson, ...householdMembers];

    try {
        // Send to API (email + Notion)
        const response = await fetch('/api/submit-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject: subject,
                body: emailContent,
                people: allPeople
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit entry');
        }

        // Show thank you page
        nextStep(5);

    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form. Please try again or contact us directly.');
    }
}

function formatEmailContent() {
    const allPeople = [primaryPerson, ...householdMembers];
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let content = 'Personal Almanac Entry\n\n';

    allPeople.forEach((person, index) => {
        content += `${person.firstName} ${person.lastName}\n`;

        if (person.email) {
            content += `  • Email: ${person.email}\n`;
        }
        if (person.phone) {
            const formattedPhone = formatPhoneNumber(person.phone);
            content += `  • Phone: ${formattedPhone}\n`;
        }
        if (person.address) {
            content += `  • Address: ${person.address}\n`;
        }
        if (person.birthday) {
            const date = new Date(person.birthday + 'T00:00:00');
            const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            content += `  • Birthday: ${formatted}\n`;
        }
        if (person.dietary && person.dietary.length > 0) {
            content += `  • Dietary Restrictions: ${person.dietary.join(', ')}\n`;
        }

        content += '\n';
    });

    content += `Submitted: ${date}`;

    return content;
}
