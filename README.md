# Zoho CRM Address Checker

A JavaScript solution for Zoho CRM that prevents duplicate leads by checking for existing projects with similar addresses when new leads are created or updated.

## 🚀 Features

- **Smart Address Matching**: Handles variations like "123 East 23rd St" vs "123 E 23 St"
- **Street Address Focus**: Compares only street addresses, ignoring city/postal code differences
- **Popup Notifications**: Alerts users when potential matches are found
- **Fuzzy Matching**: Uses 80% word similarity threshold for flexible matching
- **Address Normalization**: Standardizes abbreviations and formatting for better matching

## 📋 Prerequisites

- Zoho CRM account with Developer Space access
- Basic understanding of Zoho CRM Functions
- Administrator permissions to create custom functions

## 🛠️ Installation

### 1. Access Zoho CRM Developer Console
1. Log into your Zoho CRM account
2. Navigate to **Setup** → **Developer Space** → **Functions**
3. Click **Create Function**

### 2. Create the Function
- **Function Name**: `AddressChecker`
- **Module**: Select **Leads**
- **Trigger**: Choose **Before Save** or **After Save**
- **Description**: "Checks for existing projects with similar addresses"

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

## 🔧 How It Works

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

## ⚙️ Customization

### Adjust Matching Sensitivity
Modify the threshold in the `isAddressSimilar` function:

```javascript
// Current: 80% match required
return matchPercentage >= 0.8;

// More strict: 90% match required
return matchPercentage >= 0.9;

// Less strict: 70% match required
return matchPercentage >= 0.7;
```

### Add More Abbreviations
Add additional address variations to the `abbreviations` object:

```javascript
var abbreviations = {
    // ... existing abbreviations ...
    "circle": "cir",
    "terrace": "ter",
    "highway": "hwy"
};
```

### Change Address Field
Update the field reference if your CRM uses different field names:

```javascript
// Change from "Mailing Street" to your field name
var leadAddress = leadRecord.get("Your_Address_Field_Name");
```

## 🐛 Troubleshooting

### Common Issues
1. **Function not triggering**: Ensure the trigger is set to "Before Save" or "After Save"
2. **No popup appearing**: Check browser popup blockers
3. **Performance issues**: Reduce the search limit in the searchRecords function

### Debug Mode
Enable console logging by adding this at the beginning of the `checkForExistingProject` function:

```javascript
console.log("Checking address: " + leadAddress);
```

## 🔒 Security Considerations

- The script only reads data from the Projects module
- No sensitive data is logged
- Popup messages don't expose confidential information

## 📁 Project Structure

```
Zoho Address Checker/
├── zoho_crm_address_checker.js    # Main JavaScript function
├── zoho_crm_setup_guide.md        # Detailed setup instructions
├── README.md                       # This file
└── .gitignore                     # Git ignore rules
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For issues or customization requests, refer to the Zoho CRM documentation or contact your system administrator.

## 📚 Additional Resources

- [Zoho CRM Functions Documentation](https://www.zoho.com/crm/developer/docs/functions.html)
- [Zoho CRM API Reference](https://www.zoho.com/crm/developer/docs/api/v2/)
- [JavaScript Best Practices for Zoho CRM](https://www.zoho.com/crm/developer/docs/functions/best-practices.html)
