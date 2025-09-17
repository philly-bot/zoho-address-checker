# Zoho CRM Address Checker Setup Guide

## Overview
This script prevents duplicate leads by checking if a similar address already exists in the Projects module when a new lead is created or updated.

## Features
- **Smart Address Matching**: Handles variations like "123 East 23rd St" vs "123 E 23 St"
- **Street Address Only**: Focuses on street addresses, ignoring city/postal code differences
- **Popup Notification**: Alerts users when a potential match is found
- **Fuzzy Matching**: Uses 80% word similarity threshold for flexible matching

## Installation Steps

### 1. Access Zoho CRM Developer Console
1. Log into your Zoho CRM account
2. Go to **Setup** → **Developer Space** → **Functions**
3. Click **Create Function**

### 2. Create the Function
1. **Function Name**: `AddressChecker`
2. **Module**: Select **Leads**
3. **Trigger**: Choose **Before Save** or **After Save**
4. **Description**: "Checks for existing projects with similar addresses"

### 3. Add the Script Code
Copy and paste the entire JavaScript code from `zoho_crm_address_checker.js` into the function editor.

### 4. Configure Function Parameters
- **Input Parameters**: None required
- **Output Type**: Void
- **Execution Timeout**: 30 seconds (recommended)

### 5. Test the Function
1. Save the function
2. Test with a sample lead record
3. Verify the popup appears when a match is found

## How It Works

### Address Normalization
The script normalizes addresses by:
- Converting to lowercase
- Removing punctuation
- Standardizing abbreviations (Street → St, Avenue → Ave, etc.)
- Removing extra spaces

### Matching Logic
- Compares normalized addresses word by word
- Requires 80% word similarity for a match
- Allows for slight variations in formatting

### Example Matches
- "123 East 23rd Street" matches "123 E 23 St"
- "456 North Main Ave" matches "456 N Main Avenue"
- "789 West Oak Blvd" matches "789 W Oak Boulevard"

## Customization Options

### Adjust Matching Sensitivity
To make matching more or less strict, modify the threshold in the `isAddressSimilar` function:
```javascript
// Current: 80% match required
return matchPercentage >= 0.8;

// More strict: 90% match required
return matchPercentage >= 0.9;

// Less strict: 70% match required
return matchPercentage >= 0.7;
```

### Add More Abbreviations
To handle additional address variations, add them to the `abbreviations` object:
```javascript
var abbreviations = {
    // ... existing abbreviations ...
    "circle": "cir",
    "terrace": "ter",
    "highway": "hwy"
};
```

### Change Address Field
If your CRM uses a different field name for addresses, update the field reference:
```javascript
// Change from "Mailing Street" to your field name
var leadAddress = leadRecord.get("Your_Address_Field_Name");
```

## Troubleshooting

### Common Issues
1. **Function not triggering**: Ensure the trigger is set to "Before Save" or "After Save"
2. **No popup appearing**: Check browser popup blockers
3. **Performance issues**: Reduce the search limit in `zoho.crm.searchRecords("Projects", searchCriteria, 1, 200)`

### Debug Mode
Enable console logging by adding this at the beginning of the `checkForExistingProject` function:
```javascript
console.log("Checking address: " + leadAddress);
```

## Security Considerations
- The script only reads data from the Projects module
- No sensitive data is logged
- Popup messages don't expose confidential information

## Support
For issues or customization requests, refer to the Zoho CRM documentation or contact your system administrator.
