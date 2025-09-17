// Zoho CRM Address Checker Script
// This script checks for potential project matches based on street address
// Place this in the Leads module's "Before Save" or "After Save" trigger

function checkForExistingProject(leadRecord) {
    try {
        // Get the address field from the lead record
        var leadAddress = leadRecord.get("Mailing Street");
        
        // If no address is provided, skip the check
        if (leadAddress == null || leadAddress.trim() == "") {
            return;
        }
        
        // Normalize the lead address for comparison
        var normalizedLeadAddress = normalizeAddress(leadAddress);
        
        // Search for projects with similar addresses
        var searchCriteria = "Mailing Street:is not null";
        var projects = zoho.crm.searchRecords("Projects", searchCriteria, 1, 200);
        
        if (projects != null && projects.length > 0) {
            for (var i = 0; i < projects.length; i++) {
                var project = projects[i];
                var projectAddress = project.get("Mailing Street");
                
                if (projectAddress != null && projectAddress.trim() != "") {
                    var normalizedProjectAddress = normalizeAddress(projectAddress);
                    
                    // Check for address similarity
                    if (isAddressSimilar(normalizedLeadAddress, normalizedProjectAddress)) {
                        // Show popup notification
                        showAddressMatchPopup(leadAddress, projectAddress);
                        break; // Stop after first match to avoid multiple popups
                    }
                }
            }
        }
    } catch (error) {
        console.log("Error in address checking: " + error.message);
    }
}

// Function to normalize addresses for better matching
function normalizeAddress(address) {
    if (address == null) return "";
    
    var normalized = address.toLowerCase().trim();
    
    // Remove common punctuation
    normalized = normalized.replace(/[.,]/g, "");
    
    // Standardize common abbreviations
    var abbreviations = {
        "street": "st",
        "avenue": "ave",
        "road": "rd",
        "boulevard": "blvd",
        "drive": "dr",
        "lane": "ln",
        "court": "ct",
        "place": "pl",
        "north": "n",
        "south": "s",
        "east": "e",
        "west": "w",
        "northeast": "ne",
        "northwest": "nw",
        "southeast": "se",
        "southwest": "sw"
    };
    
    // Apply abbreviations
    for (var full in abbreviations) {
        var regex = new RegExp("\\b" + full + "\\b", "gi");
        normalized = normalized.replace(regex, abbreviations[full]);
    }
    
    // Remove extra spaces
    normalized = normalized.replace(/\s+/g, " ");
    
    return normalized.trim();
}

// Function to check if two addresses are similar
function isAddressSimilar(address1, address2) {
    if (address1 == address2) return true;
    
    // Split addresses into words
    var words1 = address1.split(" ");
    var words2 = address2.split(" ");
    
    // Check if they have the same number of words (allowing for 1 difference)
    if (Math.abs(words1.length - words2.length) > 1) return false;
    
    // Count matching words
    var matches = 0;
    var totalWords = Math.max(words1.length, words2.length);
    
    for (var i = 0; i < words1.length; i++) {
        for (var j = 0; j < words2.length; j++) {
            if (words1[i] == words2[j]) {
                matches++;
                break;
            }
        }
    }
    
    // Consider it a match if at least 80% of words match
    var matchPercentage = matches / totalWords;
    return matchPercentage >= 0.8;
}

// Function to show popup notification
function showAddressMatchPopup(leadAddress, projectAddress) {
    var message = "Possible project found!\n\n" +
                  "Lead Address: " + leadAddress + "\n" +
                  "Similar Project Address: " + projectAddress + "\n\n" +
                  "Please search the Projects module for more details.";
    
    // Show alert popup
    alert(message);
    
    // Optional: Log the match for audit purposes
    console.log("Address match found - Lead: " + leadAddress + ", Project: " + projectAddress);
}

// Main function to be called from Zoho CRM trigger
function main(leadRecord) {
    checkForExistingProject(leadRecord);
}

// Alternative function for manual testing
function testAddressCheck() {
    // Create a test lead record object
    var testLead = {
        get: function(field) {
            if (field == "Mailing Street") {
                return "123 East 23rd Street"; // Test address
            }
            return null;
        }
    };
    
    checkForExistingProject(testLead);
}
