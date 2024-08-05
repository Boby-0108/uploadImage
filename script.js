$(document).ready(function() {
    let counter = 1;

    $('#add-another').click(function() {
        
        //not add the other if privious element iamge is not selected

        let allImagesSelected = true;
        $('.image-upload').each(function() {
            if (!$(this).val()) {
                allImagesSelected = false;
            }
        });

        if (!allImagesSelected) {
            alert('Please select an image for the previous element.');
            return; 
        }

  
        counter++;

        let newHtml = `
            <div class="browser-container" id="browser-${counter}">
                <input type="file" class="image-upload" />
                <img src="chrome.jpeg" alt="Secondary Image" class="browser-image">
                <select id="browser-${counter}-select" name="browser-${counter}">
                    <option value="primary">Primary</option>
                    <option value="secondary" selected>Secondary</option>
                </select>
                <span class="remove-button">Remove</span>
            </div>
        `;
        
        $('#browsers').append(newHtml);
    });

    $('#browsers').on('click', '.remove-button', function() {
        let parentDiv = $(this).parent();
        let isPrimary = parentDiv.find('select').val() === 'primary';

        if (isPrimary) {
            alert('You cannot delete the primary browser.');
        } else {
            parentDiv.remove();
        }
    });

    $('#browsers').on('change', 'select', function() {
        if ($(this).val() === 'primary') {      
            $('select').not(this).val('secondary');
        }
    });

    $('#browsers').on('change', '.image-upload', function(event) {
        let reader = new FileReader();
        let file = event.target.files[0];
        let imgElement = $(this).siblings('.browser-image');

        reader.onload = function(e) {
            imgElement.attr('src', e.target.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });
});

